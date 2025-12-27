import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Newspaper, Users, Image, TrendingUp } from 'lucide-react';

const DashboardOverview = () => {
  const [stats, setStats] = useState({ posts: 0, published: 0, drafts: 0, media: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      const [postsRes, publishedRes, mediaRes] = await Promise.all([
        supabase.from('posts').select('id', { count: 'exact', head: true }),
        supabase.from('posts').select('id', { count: 'exact', head: true }).eq('status', 'published'),
        supabase.from('media').select('id', { count: 'exact', head: true }),
      ]);
      setStats({
        posts: postsRes.count || 0,
        published: publishedRes.count || 0,
        drafts: (postsRes.count || 0) - (publishedRes.count || 0),
        media: mediaRes.count || 0,
      });
    };
    fetchStats();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-heading font-bold mb-6">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
            <Newspaper className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.posts}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Published</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.published}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Drafts</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.drafts}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Media Files</CardTitle>
            <Image className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.media}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardOverview;
