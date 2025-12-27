import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Upload, Trash2, Copy, Loader2, Image as ImageIcon } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

type MediaItem = { id: string; name: string; file_url: string; file_type: string; created_at: string };

const MediaManager = () => {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchMedia = async () => {
    const { data } = await supabase.from('media').select('*').order('created_at', { ascending: false });
    setMedia((data as MediaItem[]) || []);
    setLoading(false);
  };

  useEffect(() => { fetchMedia(); }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fileName = `${Date.now()}-${file.name}`;
    const { error: uploadError } = await supabase.storage.from('schoolphotos').upload(fileName, file);
    if (uploadError) { toast({ title: "Upload failed", variant: "destructive" }); setUploading(false); return; }
    const { data: urlData } = supabase.storage.from('schoolphotos').getPublicUrl(fileName);
    await supabase.from('media').insert({ name: file.name, file_path: fileName, file_url: urlData.publicUrl, file_type: file.type, file_size: file.size, uploaded_by: user?.id });
    toast({ title: "Uploaded" });
    fetchMedia();
    setUploading(false);
  };

  const copyUrl = (url: string) => { navigator.clipboard.writeText(url); toast({ title: "URL copied" }); };

  const handleDelete = async (item: MediaItem) => {
    await supabase.from('media').delete().eq('id', item.id);
    toast({ title: "Deleted" });
    fetchMedia();
  };

  if (loading) return <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-heading font-bold">Media Library</h2>
        <label className="cursor-pointer">
          <Button disabled={uploading} className="gap-2">
            {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />} Upload
          </Button>
          <input type="file" className="hidden" accept="image/*,video/*,.pdf" onChange={handleUpload} />
        </label>
      </div>
      {media.length === 0 ? (
        <div className="text-center py-12 bg-card rounded-xl border"><ImageIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" /><p>No media files yet</p></div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {media.map(item => (
            <div key={item.id} className="bg-card rounded-lg border overflow-hidden group">
              <div className="aspect-square bg-muted flex items-center justify-center">
                {item.file_type.startsWith('image') ? <img src={item.file_url} alt={item.name} className="w-full h-full object-cover" /> : <ImageIcon className="h-8 w-8 text-muted-foreground" />}
              </div>
              <div className="p-2">
                <p className="text-xs truncate">{item.name}</p>
                <div className="flex gap-1 mt-1">
                  <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => copyUrl(item.file_url)}><Copy className="h-3 w-3" /></Button>
                  <Button size="icon" variant="ghost" className="h-6 w-6 text-destructive" onClick={() => handleDelete(item)}><Trash2 className="h-3 w-3" /></Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MediaManager;
