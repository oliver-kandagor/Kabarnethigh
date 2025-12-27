import { useState } from 'react';
import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Save, Send, Clock, Star } from 'lucide-react';
import type { Database } from '@/integrations/supabase/types';

type Post = Database['public']['Tables']['posts']['Row'];
type PostCategory = Database['public']['Enums']['post_category'];
type PostStatus = Database['public']['Enums']['post_status'];

interface PostEditorProps {
  post: Post | null;
  onSave: () => void;
  onCancel: () => void;
}

const postSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(200, "Title is too long"),
  excerpt: z.string().trim().max(500, "Excerpt is too long").optional(),
  content: z.string().trim().min(1, "Content is required").max(50000, "Content is too long"),
  category: z.enum(['news', 'announcement', 'event', 'achievement', 'sports', 'academics', 'general']),
  featured_image_url: z.string().url().optional().or(z.literal('')),
  seo_title: z.string().max(70).optional(),
  seo_description: z.string().max(160).optional(),
});

const PostEditor = ({ post, onSave, onCancel }: PostEditorProps) => {
  const [title, setTitle] = useState(post?.title || '');
  const [excerpt, setExcerpt] = useState(post?.excerpt || '');
  const [content, setContent] = useState(post?.content || '');
  const [category, setCategory] = useState<PostCategory>(post?.category || 'general');
  const [featuredImageUrl, setFeaturedImageUrl] = useState(post?.featured_image_url || '');
  const [isFeatured, setIsFeatured] = useState(post?.is_featured || false);
  const [seoTitle, setSeoTitle] = useState(post?.seo_title || '');
  const [seoDescription, setSeoDescription] = useState(post?.seo_description || '');
  const [scheduledAt, setScheduledAt] = useState(post?.scheduled_at ? new Date(post.scheduled_at).toISOString().slice(0, 16) : '');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSeo, setShowSeo] = useState(false);

  const { user } = useAuth();
  const { toast } = useToast();

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .substring(0, 50) + '-' + Date.now().toString(36);
  };

  const handleSave = async (status: PostStatus) => {
    setErrors({});
    
    const validation = postSchema.safeParse({
      title,
      excerpt: excerpt || undefined,
      content,
      category,
      featured_image_url: featuredImageUrl || undefined,
      seo_title: seoTitle || undefined,
      seo_description: seoDescription || undefined,
    });

    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};
      validation.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsLoading(true);

    const postData = {
      title: title.trim(),
      excerpt: excerpt.trim() || null,
      content: content.trim(),
      category,
      featured_image_url: featuredImageUrl.trim() || null,
      is_featured: isFeatured,
      status,
      author_id: user!.id,
      published_at: status === 'published' ? new Date().toISOString() : null,
      scheduled_at: status === 'scheduled' && scheduledAt ? new Date(scheduledAt).toISOString() : null,
      seo_title: seoTitle.trim() || null,
      seo_description: seoDescription.trim() || null,
    };

    try {
      if (post) {
        const { error } = await supabase
          .from('posts')
          .update(postData)
          .eq('id', post.id);

        if (error) throw error;

        toast({
          title: "Success",
          description: status === 'published' ? "Post published!" : status === 'scheduled' ? "Post scheduled!" : "Post saved as draft",
        });
      } else {
        const { error } = await supabase
          .from('posts')
          .insert({
            ...postData,
            slug: generateSlug(title),
          });

        if (error) throw error;

        toast({
          title: "Success",
          description: status === 'published' ? "Post published!" : status === 'scheduled' ? "Post scheduled!" : "Post saved as draft",
        });
      }

      onSave();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save post",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onCancel}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h2 className="text-2xl font-heading font-bold">
              {post ? 'Edit Post' : 'New Post'}
            </h2>
            <p className="text-muted-foreground">
              {post ? 'Update your post content' : 'Create a new news post or announcement'}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-xl border border-border p-6 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Title *</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title..."
            className={errors.title ? 'border-destructive' : ''}
          />
          {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="excerpt">Excerpt</Label>
          <Textarea
            id="excerpt"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="Brief summary of the post..."
            rows={2}
            className={errors.excerpt ? 'border-destructive' : ''}
          />
          {errors.excerpt && <p className="text-sm text-destructive">{errors.excerpt}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Select value={category} onValueChange={(value) => setCategory(value as PostCategory)}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="news">News</SelectItem>
                <SelectItem value="announcement">Announcement</SelectItem>
                <SelectItem value="event">Event</SelectItem>
                <SelectItem value="achievement">Achievement</SelectItem>
                <SelectItem value="sports">Sports</SelectItem>
                <SelectItem value="academics">Academics</SelectItem>
                <SelectItem value="general">General</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="featured_image">Featured Image URL</Label>
            <Input
              id="featured_image"
              value={featuredImageUrl}
              onChange={(e) => setFeaturedImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className={errors.featured_image_url ? 'border-destructive' : ''}
            />
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Switch
              id="featured"
              checked={isFeatured}
              onCheckedChange={setIsFeatured}
            />
            <Label htmlFor="featured" className="flex items-center gap-2 cursor-pointer">
              <Star className="h-4 w-4 text-yellow-500" />
              Featured Post
            </Label>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="content">Content *</Label>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your post content here..."
            rows={15}
            className={`font-mono text-sm ${errors.content ? 'border-destructive' : ''}`}
          />
          {errors.content && <p className="text-sm text-destructive">{errors.content}</p>}
          <p className="text-xs text-muted-foreground">
            {content.length}/50000 characters
          </p>
        </div>

        {/* SEO Section */}
        <div className="border-t border-border pt-6">
          <button
            type="button"
            onClick={() => setShowSeo(!showSeo)}
            className="text-sm font-medium text-primary hover:underline"
          >
            {showSeo ? 'Hide' : 'Show'} SEO Settings
          </button>

          {showSeo && (
            <div className="mt-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="seo_title">SEO Title (max 70 characters)</Label>
                <Input
                  id="seo_title"
                  value={seoTitle}
                  onChange={(e) => setSeoTitle(e.target.value)}
                  placeholder="Custom title for search engines..."
                  maxLength={70}
                />
                <p className="text-xs text-muted-foreground">{seoTitle.length}/70</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="seo_description">SEO Description (max 160 characters)</Label>
                <Textarea
                  id="seo_description"
                  value={seoDescription}
                  onChange={(e) => setSeoDescription(e.target.value)}
                  placeholder="Custom description for search engines..."
                  rows={2}
                  maxLength={160}
                />
                <p className="text-xs text-muted-foreground">{seoDescription.length}/160</p>
              </div>
            </div>
          )}
        </div>

        {/* Schedule Section */}
        <div className="space-y-2">
          <Label htmlFor="scheduled_at" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Schedule for later (optional)
          </Label>
          <Input
            id="scheduled_at"
            type="datetime-local"
            value={scheduledAt}
            onChange={(e) => setScheduledAt(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
          <Button variant="outline" onClick={onCancel} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            variant="secondary"
            onClick={() => handleSave('draft')}
            disabled={isLoading}
            className="gap-2"
          >
            <Save className="h-4 w-4" />
            Save Draft
          </Button>
          {scheduledAt && (
            <Button
              variant="secondary"
              onClick={() => handleSave('scheduled')}
              disabled={isLoading}
              className="gap-2"
            >
              <Clock className="h-4 w-4" />
              Schedule
            </Button>
          )}
          <Button
            onClick={() => handleSave('published')}
            disabled={isLoading}
            className="gap-2"
          >
            <Send className="h-4 w-4" />
            Publish
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PostEditor;
