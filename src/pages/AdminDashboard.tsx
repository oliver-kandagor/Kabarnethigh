import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  LayoutDashboard,
  FileText,
  Plus,
  LogOut,
  Menu,
  X,
  Eye,
  User,
  Image,
  Users,
  Settings,
  Newspaper,
  Building2,
  Layers,
} from 'lucide-react';
import PostEditor from '@/components/admin/PostEditor';
import PostsList from '@/components/admin/PostsList';
import ContentManager from '@/components/admin/ContentManager';
import MediaManager from '@/components/admin/MediaManager';
import LeadershipManager from '@/components/admin/LeadershipManager';
import DepartmentsManager from '@/components/admin/DepartmentsManager';
import UserRolesManager from '@/components/admin/UserRolesManager';
import DashboardOverview from '@/components/admin/DashboardOverview';
import PagesManager from '@/components/admin/PagesManager';
import type { Database } from '@/integrations/supabase/types';

type Post = Database['public']['Tables']['posts']['Row'];

type ViewType = 'dashboard' | 'pages' | 'posts' | 'create-post' | 'edit-post' | 'content' | 'media' | 'leadership' | 'departments' | 'users';

const AdminDashboard = () => {
  const [view, setView] = useState<ViewType>('dashboard');
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const { user, hasAnyRole, isSuperAdmin, isNewsEditor, isContentEditor, loading, signOut, roles } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [rolesChecked, setRolesChecked] = useState(false);

  // Wait for both auth and roles to be checked before redirecting
  useEffect(() => {
    if (!loading) {
      // Give roles a moment to load after auth completes
      const timer = setTimeout(() => {
        setRolesChecked(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  useEffect(() => {
    if (rolesChecked && (!user || !hasAnyRole)) {
      navigate('/admin/login');
    }
  }, [rolesChecked, user, hasAnyRole, navigate]);

  useEffect(() => {
    if (user && hasAnyRole) {
      fetchPosts();
    }
  }, [user, hasAnyRole]);

  const fetchPosts = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch posts",
        variant: "destructive",
      });
    } else {
      setPosts(data || []);
    }
    setIsLoading(false);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  const handleEditPost = (post: Post) => {
    setSelectedPost(post);
    setView('edit-post');
  };

  const handleDeletePost = async (id: string) => {
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete post",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Post deleted successfully",
      });
      fetchPosts();
    }
  };

  const handleSavePost = async () => {
    setView('posts');
    setSelectedPost(null);
    fetchPosts();
  };

  if (loading || !rolesChecked || !user || !hasAnyRole) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, show: true },
    { id: 'pages', label: 'Page Builder', icon: Layers, show: isContentEditor },
    { id: 'posts', label: 'News & Posts', icon: Newspaper, show: isNewsEditor },
    { id: 'content', label: 'Site Content', icon: FileText, show: isContentEditor },
    { id: 'media', label: 'Media Library', icon: Image, show: hasAnyRole },
    { id: 'leadership', label: 'Leadership', icon: Users, show: isContentEditor },
    { id: 'departments', label: 'Departments', icon: Building2, show: isContentEditor },
    { id: 'users', label: 'User Roles', icon: Settings, show: isSuperAdmin },
  ];

  const getRoleBadge = () => {
    if (isSuperAdmin) return 'Super Admin';
    if (roles.includes('content_editor')) return 'Content Editor';
    if (roles.includes('news_editor')) return 'News Editor';
    if (roles.includes('developer')) return 'Developer';
    return 'Staff';
  };

  return (
    <div className="min-h-screen bg-muted/30 flex">
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed lg:relative w-64 h-screen bg-card border-r border-border z-50 flex flex-col"
          >
            <div className="p-6 border-b border-border">
              <h1 className="font-heading text-xl font-bold text-primary">KHS CMS</h1>
              <p className="text-sm text-muted-foreground">Content Management</p>
            </div>

            <nav className="flex-1 p-4 space-y-1 overflow-auto">
              {navItems.filter(item => item.show).map((item) => (
                <Button
                  key={item.id}
                  variant={view === item.id || (item.id === 'posts' && (view === 'create-post' || view === 'edit-post')) ? 'secondary' : 'ghost'}
                  className="w-full justify-start gap-3"
                  onClick={() => { setView(item.id as ViewType); setSelectedPost(null); }}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Button>
              ))}
            </nav>

            <div className="p-4 border-t border-border space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-start gap-3"
                onClick={() => window.open('/', '_blank')}
              >
                <Eye className="h-4 w-4" />
                View Website
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 text-destructive hover:text-destructive"
                onClick={handleSignOut}
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-4 lg:px-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium">{user?.email}</p>
              <p className="text-xs text-muted-foreground">{getRoleBadge()}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-5 w-5 text-primary" />
            </div>
          </div>
        </header>

        {/* Content area */}
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          <AnimatePresence mode="wait">
            {view === 'dashboard' && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <DashboardOverview />
              </motion.div>
            )}

            {view === 'pages' && (
              <motion.div
                key="pages"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <PagesManager />
              </motion.div>
            )}

            {view === 'posts' && (
              <motion.div
                key="posts"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-heading font-bold">News & Posts</h2>
                    <p className="text-muted-foreground">Manage news, announcements, and events</p>
                  </div>
                  <Button onClick={() => setView('create-post')} className="gap-2">
                    <Plus className="h-4 w-4" />
                    New Post
                  </Button>
                </div>
                <PostsList
                  posts={posts}
                  isLoading={isLoading}
                  onEdit={handleEditPost}
                  onDelete={handleDeletePost}
                />
              </motion.div>
            )}

            {(view === 'create-post' || view === 'edit-post') && (
              <motion.div
                key="editor"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <PostEditor
                  post={selectedPost}
                  onSave={handleSavePost}
                  onCancel={() => { setView('posts'); setSelectedPost(null); }}
                />
              </motion.div>
            )}

            {view === 'content' && (
              <motion.div
                key="content"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <ContentManager />
              </motion.div>
            )}

            {view === 'media' && (
              <motion.div
                key="media"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <MediaManager />
              </motion.div>
            )}

            {view === 'leadership' && (
              <motion.div
                key="leadership"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <LeadershipManager />
              </motion.div>
            )}

            {view === 'departments' && (
              <motion.div
                key="departments"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <DepartmentsManager />
              </motion.div>
            )}

            {view === 'users' && (
              <motion.div
                key="users"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <UserRolesManager />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
