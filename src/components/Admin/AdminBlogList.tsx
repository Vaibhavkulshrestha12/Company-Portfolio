import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { getPosts, deletePost, subscribeToBlogs } from '@/lib/blog';
import { PostEditor } from './PostEditor';
import { PostList } from './PostList';
import { Button } from '../ui/Button';
import type { Post } from '@/types/blog';

export function AdminBlogList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post>();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const unsubscribe = subscribeToBlogs((updatedPosts) => {
      if (mounted) {
        setPosts(updatedPosts);
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, []);

  async function handleDelete(post: Post) {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePost(post.id);
        toast.success('Post deleted successfully');
      } catch (error) {
        toast.error('Failed to delete post');
      }
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent mx-auto"></div>
          <p className="text-gray-600">Loading posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-white p-6 shadow-lg">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Blog Posts</h2>
        <Button onClick={() => setIsEditing(true)} size="sm">
          New Post
        </Button>
      </div>

      {isEditing ? (
        <div className="rounded-lg border border-gray-200 p-6">
          <PostEditor
            post={selectedPost}
            onSave={() => {
              setIsEditing(false);
              setSelectedPost(undefined);
            }}
            onCancel={() => {
              setIsEditing(false);
              setSelectedPost(undefined);
            }}
          />
        </div>
      ) : (
        <PostList
          posts={posts}
          onEdit={(post) => {
            setSelectedPost(post);
            setIsEditing(true);
          }}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}