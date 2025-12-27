import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, Save, Plus, Trash2 } from 'lucide-react';
import type { Database } from '@/integrations/supabase/types';

type PageBlock = Database['public']['Tables']['page_blocks']['Row'];
type BlockType = Database['public']['Enums']['block_type'];

interface BlockEditorProps {
  block: PageBlock;
  onSave: (block: PageBlock) => void;
  onCancel: () => void;
}

const BlockEditor = ({ block, onSave, onCancel }: BlockEditorProps) => {
  const [title, setTitle] = useState(block.title || '');
  const [content, setContent] = useState<Record<string, any>>(block.content as Record<string, any> || {});
  const [isVisible, setIsVisible] = useState(block.is_visible);

  const handleSave = () => {
    onSave({
      ...block,
      title,
      content,
      is_visible: isVisible,
    });
  };

  const updateContent = (key: string, value: any) => {
    setContent({ ...content, [key]: value });
  };

  const renderBlockFields = () => {
    switch (block.block_type) {
      case 'hero':
        return (
          <>
            <div className="space-y-2">
              <Label>Headline</Label>
              <Input value={content.headline || ''} onChange={(e) => updateContent('headline', e.target.value)} placeholder="Main headline..." />
            </div>
            <div className="space-y-2">
              <Label>Subheadline</Label>
              <Input value={content.subheadline || ''} onChange={(e) => updateContent('subheadline', e.target.value)} placeholder="Supporting text..." />
            </div>
            <div className="space-y-2">
              <Label>Background Image URL</Label>
              <Input value={content.backgroundImage || ''} onChange={(e) => updateContent('backgroundImage', e.target.value)} placeholder="https://..." />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Button Text</Label>
                <Input value={content.buttonText || ''} onChange={(e) => updateContent('buttonText', e.target.value)} placeholder="Learn More" />
              </div>
              <div className="space-y-2">
                <Label>Button Link</Label>
                <Input value={content.buttonLink || ''} onChange={(e) => updateContent('buttonLink', e.target.value)} placeholder="/about" />
              </div>
            </div>
          </>
        );

      case 'text':
        return (
          <div className="space-y-2">
            <Label>Content</Label>
            <Textarea value={content.body || ''} onChange={(e) => updateContent('body', e.target.value)} placeholder="Enter your content..." rows={10} />
          </div>
        );

      case 'image':
        return (
          <>
            <div className="space-y-2">
              <Label>Image URL</Label>
              <Input value={content.src || ''} onChange={(e) => updateContent('src', e.target.value)} placeholder="https://..." />
            </div>
            <div className="space-y-2">
              <Label>Alt Text</Label>
              <Input value={content.alt || ''} onChange={(e) => updateContent('alt', e.target.value)} placeholder="Image description..." />
            </div>
            <div className="space-y-2">
              <Label>Caption</Label>
              <Input value={content.caption || ''} onChange={(e) => updateContent('caption', e.target.value)} placeholder="Optional caption..." />
            </div>
          </>
        );

      case 'cta':
        return (
          <>
            <div className="space-y-2">
              <Label>Headline</Label>
              <Input value={content.headline || ''} onChange={(e) => updateContent('headline', e.target.value)} placeholder="Call to action headline..." />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea value={content.description || ''} onChange={(e) => updateContent('description', e.target.value)} placeholder="Supporting description..." rows={3} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Button Text</Label>
                <Input value={content.buttonText || ''} onChange={(e) => updateContent('buttonText', e.target.value)} placeholder="Get Started" />
              </div>
              <div className="space-y-2">
                <Label>Button Link</Label>
                <Input value={content.buttonLink || ''} onChange={(e) => updateContent('buttonLink', e.target.value)} placeholder="/contact" />
              </div>
            </div>
          </>
        );

      case 'stats':
        const stats = content.items || [];
        return (
          <div className="space-y-4">
            <Label>Statistics</Label>
            {stats.map((stat: any, index: number) => (
              <div key={index} className="flex gap-2 items-end">
                <div className="flex-1 space-y-1">
                  <Label className="text-xs">Value</Label>
                  <Input value={stat.value} onChange={(e) => {
                    const newStats = [...stats];
                    newStats[index] = { ...stat, value: e.target.value };
                    updateContent('items', newStats);
                  }} placeholder="1000+" />
                </div>
                <div className="flex-1 space-y-1">
                  <Label className="text-xs">Label</Label>
                  <Input value={stat.label} onChange={(e) => {
                    const newStats = [...stats];
                    newStats[index] = { ...stat, label: e.target.value };
                    updateContent('items', newStats);
                  }} placeholder="Students" />
                </div>
                <Button variant="ghost" size="icon" className="text-destructive" onClick={() => {
                  updateContent('items', stats.filter((_: any, i: number) => i !== index));
                }}><Trash2 className="h-4 w-4" /></Button>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={() => updateContent('items', [...stats, { value: '', label: '' }])}>
              <Plus className="h-4 w-4 mr-1" /> Add Statistic
            </Button>
          </div>
        );

      case 'cards':
        const cards = content.items || [];
        return (
          <div className="space-y-4">
            <Label>Cards</Label>
            {cards.map((card: any, index: number) => (
              <div key={index} className="border rounded-lg p-3 space-y-2">
                <div className="flex justify-between">
                  <Label className="text-xs">Card {index + 1}</Label>
                  <Button variant="ghost" size="sm" className="text-destructive h-6" onClick={() => {
                    updateContent('items', cards.filter((_: any, i: number) => i !== index));
                  }}><Trash2 className="h-3 w-3" /></Button>
                </div>
                <Input value={card.title} onChange={(e) => {
                  const newCards = [...cards];
                  newCards[index] = { ...card, title: e.target.value };
                  updateContent('items', newCards);
                }} placeholder="Card Title" />
                <Textarea value={card.description} onChange={(e) => {
                  const newCards = [...cards];
                  newCards[index] = { ...card, description: e.target.value };
                  updateContent('items', newCards);
                }} placeholder="Card description..." rows={2} />
                <Input value={card.link || ''} onChange={(e) => {
                  const newCards = [...cards];
                  newCards[index] = { ...card, link: e.target.value };
                  updateContent('items', newCards);
                }} placeholder="Link (optional)" />
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={() => updateContent('items', [...cards, { title: '', description: '', link: '' }])}>
              <Plus className="h-4 w-4 mr-1" /> Add Card
            </Button>
          </div>
        );

      case 'video':
        return (
          <>
            <div className="space-y-2">
              <Label>Video URL (YouTube or direct)</Label>
              <Input value={content.url || ''} onChange={(e) => updateContent('url', e.target.value)} placeholder="https://youtube.com/watch?v=..." />
            </div>
            <div className="space-y-2">
              <Label>Title</Label>
              <Input value={content.videoTitle || ''} onChange={(e) => updateContent('videoTitle', e.target.value)} placeholder="Video title..." />
            </div>
          </>
        );

      case 'accordion':
        const faqs = content.items || [];
        return (
          <div className="space-y-4">
            <Label>FAQ Items</Label>
            {faqs.map((faq: any, index: number) => (
              <div key={index} className="border rounded-lg p-3 space-y-2">
                <div className="flex justify-between">
                  <Label className="text-xs">Item {index + 1}</Label>
                  <Button variant="ghost" size="sm" className="text-destructive h-6" onClick={() => {
                    updateContent('items', faqs.filter((_: any, i: number) => i !== index));
                  }}><Trash2 className="h-3 w-3" /></Button>
                </div>
                <Input value={faq.question} onChange={(e) => {
                  const newFaqs = [...faqs];
                  newFaqs[index] = { ...faq, question: e.target.value };
                  updateContent('items', newFaqs);
                }} placeholder="Question" />
                <Textarea value={faq.answer} onChange={(e) => {
                  const newFaqs = [...faqs];
                  newFaqs[index] = { ...faq, answer: e.target.value };
                  updateContent('items', newFaqs);
                }} placeholder="Answer" rows={2} />
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={() => updateContent('items', [...faqs, { question: '', answer: '' }])}>
              <Plus className="h-4 w-4 mr-1" /> Add FAQ
            </Button>
          </div>
        );

      default:
        return (
          <div className="text-muted-foreground text-center py-8">
            <p>Block editor for "{block.block_type}" coming soon.</p>
            <p className="text-sm mt-2">You can edit the raw JSON content below:</p>
            <Textarea
              value={JSON.stringify(content, null, 2)}
              onChange={(e) => {
                try {
                  setContent(JSON.parse(e.target.value));
                } catch {}
              }}
              className="mt-4 font-mono text-xs"
              rows={10}
            />
          </div>
        );
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={onCancel}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h2 className="text-2xl font-heading font-bold">Edit Block</h2>
          <p className="text-muted-foreground capitalize">{block.block_type.replace('_', ' ')}</p>
        </div>
      </div>

      <div className="bg-card rounded-xl border p-6 space-y-6">
        <div className="space-y-2">
          <Label>Block Title</Label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Section title..." />
        </div>

        <div className="flex items-center gap-2">
          <Switch checked={isVisible} onCheckedChange={setIsVisible} id="visibility" />
          <Label htmlFor="visibility" className="cursor-pointer">Visible on page</Label>
        </div>

        <div className="border-t pt-6">
          <h3 className="font-semibold mb-4">Content</h3>
          {renderBlockFields()}
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={onCancel}>Cancel</Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" /> Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BlockEditor;
