import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Save, Loader2 } from 'lucide-react';

type SiteContent = { id: string; key: string; title: string; content: { value?: string }; category: string };

const ContentManager = () => {
  const [content, setContent] = useState<SiteContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    supabase.from('site_content').select('*').order('category').then(({ data }) => {
      setContent((data as SiteContent[]) || []);
      setLoading(false);
    });
  }, []);

  const handleSave = async (item: SiteContent) => {
    setSaving(item.id);
    const { error } = await supabase.from('site_content').update({ content: item.content }).eq('id', item.id);
    if (error) toast({ title: "Error", description: "Failed to save", variant: "destructive" });
    else toast({ title: "Saved", description: `${item.title} updated` });
    setSaving(null);
  };

  const updateValue = (id: string, value: string) => {
    setContent(content.map(c => c.id === id ? { ...c, content: { value } } : c));
  };

  if (loading) return <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>;

  const grouped = content.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, SiteContent[]>);

  return (
    <div>
      <h2 className="text-2xl font-heading font-bold mb-6">Site Content</h2>
      {Object.entries(grouped).map(([category, items]) => (
        <div key={category} className="mb-8">
          <h3 className="text-lg font-semibold capitalize mb-4 text-muted-foreground">{category}</h3>
          <div className="space-y-4">
            {items.map(item => (
              <div key={item.id} className="bg-card p-4 rounded-lg border">
                <label className="text-sm font-medium">{item.title}</label>
                {(item.content.value?.length || 0) > 100 ? (
                  <Textarea value={item.content.value || ''} onChange={e => updateValue(item.id, e.target.value)} className="mt-2" />
                ) : (
                  <Input value={item.content.value || ''} onChange={e => updateValue(item.id, e.target.value)} className="mt-2" />
                )}
                <Button size="sm" className="mt-2" onClick={() => handleSave(item)} disabled={saving === item.id}>
                  {saving === item.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4 mr-1" />} Save
                </Button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContentManager;
