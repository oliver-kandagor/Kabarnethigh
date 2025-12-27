import { Button } from '@/components/ui/button';
import { X, Type, Image, LayoutGrid, Megaphone, Users, MessageSquare, Map, Video, BarChart3, Quote, ListCollapse, Layers, Newspaper, Play } from 'lucide-react';
import type { Database } from '@/integrations/supabase/types';

type BlockType = Database['public']['Enums']['block_type'];

interface BlockPaletteProps {
  onSelect: (type: BlockType) => void;
  onClose: () => void;
}

const blockCategories = [
  {
    name: 'Layout',
    blocks: [
      { type: 'hero' as BlockType, label: 'Hero Section', icon: LayoutGrid, description: 'Large banner with headline and CTA' },
      { type: 'cards' as BlockType, label: 'Cards', icon: Layers, description: 'Grid of content cards' },
      { type: 'stats' as BlockType, label: 'Statistics', icon: BarChart3, description: 'Display key numbers and metrics' },
    ],
  },
  {
    name: 'Content',
    blocks: [
      { type: 'text' as BlockType, label: 'Text Block', icon: Type, description: 'Rich text content area' },
      { type: 'image' as BlockType, label: 'Image', icon: Image, description: 'Single image with caption' },
      { type: 'gallery' as BlockType, label: 'Gallery', icon: Layers, description: 'Image gallery grid' },
      { type: 'video' as BlockType, label: 'Video', icon: Video, description: 'Embed YouTube or video file' },
    ],
  },
  {
    name: 'Interactive',
    blocks: [
      { type: 'accordion' as BlockType, label: 'Accordion', icon: ListCollapse, description: 'Expandable FAQ sections' },
      { type: 'tabs' as BlockType, label: 'Tabs', icon: Layers, description: 'Tabbed content sections' },
      { type: 'cta' as BlockType, label: 'Call to Action', icon: Megaphone, description: 'Promotional banner with button' },
    ],
  },
  {
    name: 'Dynamic',
    blocks: [
      { type: 'news_feed' as BlockType, label: 'News Feed', icon: Newspaper, description: 'Display latest news posts' },
      { type: 'leadership' as BlockType, label: 'Leadership', icon: Users, description: 'Staff/leadership profiles' },
      { type: 'testimonials' as BlockType, label: 'Testimonials', icon: Quote, description: 'Student/parent quotes' },
    ],
  },
  {
    name: 'Forms & Utility',
    blocks: [
      { type: 'contact_form' as BlockType, label: 'Contact Form', icon: MessageSquare, description: 'Email contact form' },
      { type: 'map' as BlockType, label: 'Map', icon: Map, description: 'Google Maps embed' },
    ],
  },
];

const BlockPalette = ({ onSelect, onClose }: BlockPaletteProps) => {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-2xl shadow-2xl max-w-3xl w-full max-h-[80vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-heading font-bold">Add Block</h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="p-4 overflow-y-auto max-h-[calc(80vh-80px)]">
          {blockCategories.map((category) => (
            <div key={category.name} className="mb-6">
              <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                {category.name}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {category.blocks.map((block) => (
                  <button
                    key={block.type}
                    onClick={() => onSelect(block.type)}
                    className="flex items-start gap-3 p-3 rounded-lg border hover:border-primary hover:bg-primary/5 transition-colors text-left group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors flex-shrink-0">
                      <block.icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-sm">{block.label}</p>
                      <p className="text-xs text-muted-foreground line-clamp-2">{block.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlockPalette;
