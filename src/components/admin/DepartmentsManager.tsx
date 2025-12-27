import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Plus, Save, Trash2, Loader2 } from 'lucide-react';
import type { Database } from '@/integrations/supabase/types';

type Dept = Database['public']['Tables']['departments']['Row'];

const DepartmentsManager = () => {
  const [depts, setDepts] = useState<Dept[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Dept | null>(null);
  const { toast } = useToast();

  const fetchDepts = async () => {
    const { data } = await supabase.from('departments').select('*').order('order_index');
    setDepts(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchDepts(); }, []);

  const handleSave = async () => {
    if (!editing) return;
    const { id, ...data } = editing;
    if (id) await supabase.from('departments').update(data).eq('id', id);
    else await supabase.from('departments').insert(data);
    toast({ title: "Saved" });
    setEditing(null);
    fetchDepts();
  };

  const handleDelete = async (id: string) => {
    await supabase.from('departments').delete().eq('id', id);
    toast({ title: "Deleted" });
    fetchDepts();
  };

  if (loading) return <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-heading font-bold">Departments</h2>
        <Button onClick={() => setEditing({ id: '', name: '', description: '', head_name: '', head_title: '', image_url: '', teacher_count: 0, order_index: depts.length, is_visible: true, created_at: '', updated_at: '' })} className="gap-2"><Plus className="h-4 w-4" /> Add</Button>
      </div>
      
      {editing && (
        <div className="bg-card p-4 rounded-lg border mb-6 space-y-4">
          <Input placeholder="Name" value={editing.name} onChange={e => setEditing({ ...editing, name: e.target.value })} />
          <Textarea placeholder="Description" value={editing.description || ''} onChange={e => setEditing({ ...editing, description: e.target.value })} />
          <Input placeholder="Head Name" value={editing.head_name || ''} onChange={e => setEditing({ ...editing, head_name: e.target.value })} />
          <Input placeholder="Head Title" value={editing.head_title || ''} onChange={e => setEditing({ ...editing, head_title: e.target.value })} />
          <Input type="number" placeholder="Teacher Count" value={editing.teacher_count || 0} onChange={e => setEditing({ ...editing, teacher_count: parseInt(e.target.value) })} />
          <div className="flex gap-2">
            <Button onClick={handleSave}><Save className="h-4 w-4 mr-1" /> Save</Button>
            <Button variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {depts.map(d => (
          <div key={d.id} className="bg-card p-4 rounded-lg border flex justify-between items-center">
            <div>
              <p className="font-medium">{d.name}</p>
              <p className="text-sm text-muted-foreground">{d.head_name} • {d.teacher_count} teachers</p>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="ghost" onClick={() => setEditing(d)}>Edit</Button>
              <Button size="sm" variant="ghost" className="text-destructive" onClick={() => handleDelete(d.id)}><Trash2 className="h-4 w-4" /></Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DepartmentsManager;
