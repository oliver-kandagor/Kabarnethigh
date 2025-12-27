import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Edit, Trash2, FileText, Clock, Star, Eye } from 'lucide-react';
import type { Database } from '@/integrations/supabase/types';

type Post = Database['public']['Tables']['posts']['Row'];

interface PostsListProps {
  posts: Post[];
  isLoading: boolean;
  onEdit: (post: Post) => void;
  onDelete: (id: string) => void;
}

const statusColors: Record<string, string> = {
  draft: 'bg-muted text-muted-foreground',
  published: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  scheduled: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  archived: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
};

const categoryColors: Record<string, string> = {
  news: 'bg-primary/10 text-primary',
  announcement: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
  event: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
  achievement: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  sports: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
  academics: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  general: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400',
};

const PostsList = ({ posts, isLoading, onEdit, onDelete }: PostsListProps) => {
  if (isLoading) {
    return (
      <div className="bg-card rounded-xl border border-border p-8">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="bg-card rounded-xl border border-border p-12 text-center">
        <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">No posts yet</h3>
        <p className="text-muted-foreground">
          Create your first post to get started
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[40%]">Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Views</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((post) => (
            <TableRow key={post.id}>
              <TableCell>
                <div className="flex items-start gap-2">
                  {post.is_featured && (
                    <Star className="h-4 w-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                  )}
                  <div>
                    <p className="font-medium line-clamp-1">{post.title}</p>
                    {post.excerpt && (
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {post.excerpt}
                      </p>
                    )}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="secondary" className={categoryColors[post.category] || categoryColors.general}>
                  {post.category}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant="secondary" className={statusColors[post.status] || statusColors.draft}>
                  {post.status}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Eye className="h-3 w-3" />
                  {post.view_count}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {format(new Date(post.created_at), 'MMM d, yyyy')}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(post)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="icon" className="text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Post</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete "{post.title}"? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => onDelete(post.id)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PostsList;
