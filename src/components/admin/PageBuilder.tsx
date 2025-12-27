import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Plus, ArrowLeft, Save, Eye, Loader2 } from 'lucide-react';
import type { Database } from '@/integrations/supabase/types';
import PageBlocksList from './PageBlocksList';
import BlockEditor from './BlockEditor';
import BlockPalette from './BlockPalette';

type Page = Database['public']['Tables']['pages']['Row'];
type PageBlock = Database['public']['Tables']['page_blocks']['Row'];
type BlockType = Database['public']['Enums']['block_type'];

interface PageBuilderProps {
  pageId?: string;
  onBack: () => void;
}

const PageBuilder = ({ pageId, onBack }: PageBuilderProps) => {
  const [page, setPage] = useState<Page | null>(null);
  const [blocks, setBlocks] = useState<PageBlock[]>([]);
  const [loading, setLoading] = useState(!!pageId);
  const [saving, setSaving] = useState(false);
  const [editingBlock, setEditingBlock] = useState<PageBlock | null>(null);
  const [showPalette, setShowPalette] = useState(false);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    if (pageId) {
      fetchPage();
    }
  }, [pageId]);

  const fetchPage = async () => {
    if (!pageId) return;
    setLoading(true);
    
    const [pageRes, blocksRes] = await Promise.all([
      supabase.from('pages').select('*').eq('id', pageId).single(),
      supabase.from('page_blocks').select('*').eq('page_id', pageId).order('order_index'),
    ]);
    
    if (pageRes.data) {
      setPage(pageRes.data);
      setTitle(pageRes.data.title);
      setSlug(pageRes.data.slug);
    }
    if (blocksRes.data) {
      setBlocks(blocksRes.data);
    }
    setLoading(false);
  };

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  };

  const handleSavePage = async (publish: boolean = false) => {
    if (!title.trim()) {
      toast({ title: "Error", description: "Page title is required", variant: "destructive" });
      return;
    }
    
    setSaving(true);
    const pageSlug = slug || generateSlug(title);
    
    try {
      if (page) {
        await supabase.from('pages').update({
          title: title.trim(),
          slug: pageSlug,
          is_published: publish ? true : page.is_published,
        }).eq('id', page.id);
        
        toast({ title: publish ? "Page published!" : "Page saved" });
      } else {
        const { data, error } = await supabase.from('pages').insert({
          title: title.trim(),
          slug: pageSlug,
          is_published: publish,
        }).select().single();
        
        if (error) throw error;
        setPage(data);
        toast({ title: "Page created!" });
      }
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
    setSaving(false);
  };

  const handleAddBlock = async (blockType: BlockType) => {
    if (!page) {
      await handleSavePage();
      return;
    }
    
    const newBlock = {
      page_id: page.id,
      block_type: blockType,
      title: getDefaultTitle(blockType),
      content: getDefaultContent(blockType),
      settings: {},
      order_index: blocks.length,
      is_visible: true,
    };
    
    const { data, error } = await supabase.from('page_blocks').insert(newBlock).select().single();
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }
    
    setBlocks([...blocks, data]);
    setShowPalette(false);
    toast({ title: "Block added" });
  };

  const handleReorderBlocks = async (newBlocks: PageBlock[]) => {
    setBlocks(newBlocks);
    
    // Update order in database
    const updates = newBlocks.map((block, index) => 
      supabase.from('page_blocks').update({ order_index: index }).eq('id', block.id)
    );
    await Promise.all(updates);
  };

  const handleUpdateBlock = async (updatedBlock: PageBlock) => {
    const { error } = await supabase.from('page_blocks')
      .update({
        title: updatedBlock.title,
        content: updatedBlock.content,
        settings: updatedBlock.settings,
        is_visible: updatedBlock.is_visible,
      })
      .eq('id', updatedBlock.id);
    
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }
    
    setBlocks(blocks.map(b => b.id === updatedBlock.id ? updatedBlock : b));
    setEditingBlock(null);
    toast({ title: "Block updated" });
  };

  const handleDeleteBlock = async (blockId: string) => {
    await supabase.from('page_blocks').delete().eq('id', blockId);
    setBlocks(blocks.filter(b => b.id !== blockId));
    toast({ title: "Block deleted" });
  };

  const getDefaultTitle = (type: BlockType): string => {
    const titles: Record<BlockType, string> = {
      hero: 'Hero Section',
      text: 'Text Block',
      image: 'Image',
      gallery: 'Image Gallery',
      cards: 'Cards Section',
      cta: 'Call to Action',
      news_feed: 'News Feed',
      leadership: 'Leadership',
      contact_form: 'Contact Form',
      map: 'Map',
      accordion: 'FAQ / Accordion',
      tabs: 'Tabbed Content',
      video: 'Video',
      stats: 'Statistics',
      testimonials: 'Testimonials',
    };
    return titles[type];
  };

  const getDefaultContent = (type: BlockType): Record<string, any> => {
    const defaults: Partial<Record<BlockType, Record<string, any>>> = {
      hero: { headline: 'Welcome to Our School', subheadline: 'Excellence in Education', buttonText: 'Learn More', buttonLink: '/about' },
      text: { body: 'Enter your content here...' },
      image: { src: '', alt: '', caption: '' },
      cards: { items: [{ title: 'Card 1', description: 'Description', icon: '' }] },
      cta: { headline: 'Ready to Join?', description: 'Contact us today', buttonText: 'Get Started', buttonLink: '/contact' },
      stats: { items: [{ value: '1000+', label: 'Students' }, { value: '50+', label: 'Teachers' }] },
    };
    return defaults[type] || {};
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (editingBlock) {
    return (
      <BlockEditor
        block={editingBlock}
        onSave={handleUpdateBlock}
        onCancel={() => setEditingBlock(null)}
      />
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h2 className="text-2xl font-heading font-bold">
              {page ? 'Edit Page' : 'Create New Page'}
            </h2>
            <p className="text-muted-foreground">
              Drag and drop blocks to build your page
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {page && (
            <Button variant="outline" size="sm" onClick={() => window.open(`/preview/${page.slug}`, '_blank')}>
              <Eye className="h-4 w-4 mr-2" /> Preview
            </Button>
          )}
          <Button variant="secondary" onClick={() => handleSavePage(false)} disabled={saving}>
            <Save className="h-4 w-4 mr-2" /> Save Draft
          </Button>
          <Button onClick={() => handleSavePage(true)} disabled={saving}>
            {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
            Publish
          </Button>
        </div>
      </div>

      {/* Page Settings */}
      <div className="bg-card rounded-xl border p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Page Title</label>
            <Input
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (!page) setSlug(generateSlug(e.target.value));
              }}
              placeholder="Enter page title..."
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">URL Slug</label>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground text-sm">/</span>
              <Input
                value={slug}
                onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                placeholder="page-url"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Blocks Area */}
      <div className="bg-muted/30 rounded-xl border-2 border-dashed border-border min-h-[400px] p-4">
        {blocks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Plus className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Start Building</h3>
            <p className="text-muted-foreground mb-4">Add your first block to start building the page</p>
            <Button onClick={() => setShowPalette(true)}>
              <Plus className="h-4 w-4 mr-2" /> Add Block
            </Button>
          </div>
        ) : (
          <>
            <PageBlocksList
              blocks={blocks}
              onReorder={handleReorderBlocks}
              onEdit={setEditingBlock}
              onDelete={handleDeleteBlock}
              onToggleVisibility={(block) => handleUpdateBlock({ ...block, is_visible: !block.is_visible })}
            />
            <div className="mt-4 flex justify-center">
              <Button variant="outline" onClick={() => setShowPalette(true)}>
                <Plus className="h-4 w-4 mr-2" /> Add Block
              </Button>
            </div>
          </>
        )}
      </div>

      {/* Block Palette Modal */}
      {showPalette && (
        <BlockPalette
          onSelect={handleAddBlock}
          onClose={() => setShowPalette(false)}
        />
      )}
    </div>
  );
};

export default PageBuilder;
