import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Eye, EyeOff, Loader2, FileText, ExternalLink } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import type { Database } from '@/integrations/supabase/types';
import PageBuilder from './PageBuilder';

type Page = Database['public']['Tables']['pages']['Row'];

const PagesManager = () => {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPageId, setEditingPageId] = useState<string | null>(null);
  const [creatingNew, setCreatingNew] = useState(false);
  const { toast } = useToast();

  const fetchPages = async () => {
    const { data } = await supabase.from('pages').select('*').order('created_at', { ascending: false });
    setPages(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchPages(); }, []);

  const handleDelete = async (id: string) => {
    await supabase.from('pages').delete().eq('id', id);
    toast({ title: "Page deleted" });
    fetchPages();
  };

  const togglePublish = async (page: Page) => {
    await supabase.from('pages').update({ is_published: !page.is_published }).eq('id', page.id);
    toast({ title: page.is_published ? "Page unpublished" : "Page published" });
    fetchPages();
  };

  if (editingPageId || creatingNew) {
    return (
      <PageBuilder
        pageId={editingPageId || undefined}
        onBack={() => {
          setEditingPageId(null);
          setCreatingNew(false);
          fetchPages();
        }}
      />
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-heading font-bold">Pages</h2>
          <p className="text-muted-foreground">Create and manage custom pages with drag-and-drop builder</p>
        </div>
        <Button onClick={() => setCreatingNew(true)} className="gap-2">
          <Plus className="h-4 w-4" /> New Page
        </Button>
      </div>

      {pages.length === 0 ? (
        <div className="bg-card rounded-xl border p-12 text-center">
          <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No pages yet</h3>
          <p className="text-muted-foreground mb-4">Create your first custom page using the visual builder</p>
          <Button onClick={() => setCreatingNew(true)}>
            <Plus className="h-4 w-4 mr-2" /> Create Page
          </Button>
        </div>
      ) : (
        <div className="space-y-2">
          {pages.map((page) => (
            <div key={page.id} className="bg-card rounded-lg border p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{page.title}</p>
                    {page.is_homepage && (
                      <Badge variant="secondary" className="text-xs">Homepage</Badge>
                    )}
                    <Badge variant={page.is_published ? "default" : "outline"} className="text-xs">
                      {page.is_published ? 'Published' : 'Draft'}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">/{page.slug}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-1">
                {page.is_published && (
                  <Button variant="ghost" size="icon" asChild>
                    <a href={`/p/${page.slug}`} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                )}
                <Button variant="ghost" size="icon" onClick={() => togglePublish(page)}>
                  {page.is_published ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
                <Button variant="ghost" size="icon" onClick={() => setEditingPageId(page.id)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Page</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete "{page.title}"? This will also delete all blocks on this page.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(page.id)} className="bg-destructive text-destructive-foreground">
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PagesManager;
