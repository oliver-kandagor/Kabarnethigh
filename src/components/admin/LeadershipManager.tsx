import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Plus, Save, Trash2, Loader2 } from 'lucide-react';
import type { Database } from '@/integrations/supabase/types';

type Leader = Database['public']['Tables']['leadership']['Row'];

const LeadershipManager = () => {
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Leader | null>(null);
  const { toast } = useToast();

  const fetchLeaders = async () => {
    const { data } = await supabase.from('leadership').select('*').order('order_index');
    setLeaders(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchLeaders(); }, []);

  const handleSave = async () => {
    if (!editing) return;
    const { id, ...data } = editing;
    if (id) await supabase.from('leadership').update(data).eq('id', id);
    else await supabase.from('leadership').insert(data);
    toast({ title: "Saved" });
    setEditing(null);
    fetchLeaders();
  };

  const handleDelete = async (id: string) => {
    await supabase.from('leadership').delete().eq('id', id);
    toast({ title: "Deleted" });
    fetchLeaders();
  };

  if (loading) return <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-heading font-bold">Leadership</h2>
        <Button onClick={() => setEditing({ id: '', name: '', title: '', role: '', bio: '', image_url: '', email: '', phone: '', order_index: leaders.length, is_visible: true, created_at: '', updated_at: '' })} className="gap-2"><Plus className="h-4 w-4" /> Add</Button>
      </div>
      
      {editing && (
        <div className="bg-card p-4 rounded-lg border mb-6 space-y-4">
          <Input placeholder="Name" value={editing.name} onChange={e => setEditing({ ...editing, name: e.target.value })} />
          <Input placeholder="Title" value={editing.title} onChange={e => setEditing({ ...editing, title: e.target.value })} />
          <Input placeholder="Role" value={editing.role} onChange={e => setEditing({ ...editing, role: e.target.value })} />
          <Textarea placeholder="Bio" value={editing.bio || ''} onChange={e => setEditing({ ...editing, bio: e.target.value })} />
          <Input placeholder="Image URL" value={editing.image_url || ''} onChange={e => setEditing({ ...editing, image_url: e.target.value })} />
          <div className="flex gap-2">
            <Button onClick={handleSave}><Save className="h-4 w-4 mr-1" /> Save</Button>
            <Button variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {leaders.map(l => (
          <div key={l.id} className="bg-card p-4 rounded-lg border flex justify-between items-center">
            <div>
              <p className="font-medium">{l.name}</p>
              <p className="text-sm text-muted-foreground">{l.title} - {l.role}</p>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="ghost" onClick={() => setEditing(l)}>Edit</Button>
              <Button size="sm" variant="ghost" className="text-destructive" onClick={() => handleDelete(l.id)}><Trash2 className="h-4 w-4" /></Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeadershipManager;
