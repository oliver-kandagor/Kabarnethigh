import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Plus, Trash2, Loader2, Shield } from 'lucide-react';
import type { Database } from '@/integrations/supabase/types';

type UserRole = Database['public']['Tables']['user_roles']['Row'];
type AppRole = Database['public']['Enums']['app_role'];

const UserRolesManager = () => {
  const [roles, setRoles] = useState<(UserRole & { email?: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState<AppRole>('content_editor');
  const { toast } = useToast();

  const fetchRoles = async () => {
    const { data } = await supabase.from('user_roles').select('*');
    setRoles(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchRoles(); }, []);

  const handleAdd = async () => {
    if (!newEmail) return;
    // Find user by email from profiles
    const { data: profile } = await supabase.from('profiles').select('user_id').eq('full_name', newEmail).maybeSingle();
    if (!profile) { toast({ title: "User not found", variant: "destructive" }); return; }
    
    const { error } = await supabase.from('user_roles').insert({ user_id: profile.user_id, role: newRole });
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: "Role added" }); setNewEmail(''); fetchRoles(); }
  };

  const handleDelete = async (id: string) => {
    await supabase.from('user_roles').delete().eq('id', id);
    toast({ title: "Role removed" });
    fetchRoles();
  };

  if (loading) return <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>;

  return (
    <div>
      <h2 className="text-2xl font-heading font-bold mb-6">User Roles</h2>
      
      <div className="bg-card p-4 rounded-lg border mb-6">
        <h3 className="font-medium mb-4">Add New Role</h3>
        <div className="flex gap-2">
          <Input placeholder="User full name" value={newEmail} onChange={e => setNewEmail(e.target.value)} className="flex-1" />
          <Select value={newRole} onValueChange={(v) => setNewRole(v as AppRole)}>
            <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="super_admin">Super Admin</SelectItem>
              <SelectItem value="content_editor">Content Editor</SelectItem>
              <SelectItem value="news_editor">News Editor</SelectItem>
              <SelectItem value="developer">Developer</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleAdd}><Plus className="h-4 w-4 mr-1" /> Add</Button>
        </div>
      </div>

      <div className="space-y-2">
        {roles.map(r => (
          <div key={r.id} className="bg-card p-4 rounded-lg border flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium text-sm">{r.user_id.slice(0, 8)}...</p>
                <p className="text-sm text-muted-foreground capitalize">{r.role.replace('_', ' ')}</p>
              </div>
            </div>
            <Button size="sm" variant="ghost" className="text-destructive" onClick={() => handleDelete(r.id)}><Trash2 className="h-4 w-4" /></Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserRolesManager;
