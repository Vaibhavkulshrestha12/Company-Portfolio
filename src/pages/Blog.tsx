import { useState, useEffect } from 'react';
import { getPosts, getCategories } from '@/lib/blog';
import type { Post, Category } from '@/types/blog';
import { BlogPost } from '@/components/Blog/BlogPost';
import { BlogSidebar } from '@/components/Blog/BlogSidebar';
import { Pagination } from '@/components/Blog/Pagination';
import { SearchInput } from '@/components/Blog/SearchInput';
import { samplePosts } from '@/lib/sample-posts';

export function BlogPage() {
  const [posts, setPosts] = useState<Post[]>(samplePosts);
  const [categories, setCategories] = useState<Category[]>([
    { id: '1', name: 'Web Development', slug: 'web-development' },
    { id: '2', name: 'Digital Marketing', slug: 'digital-marketing' },
    { id: '3', name: 'Design', slug: 'design' }
  ]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(samplePosts.length);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const perPage = 6;

  useEffect(() => {
    
    const filtered = samplePosts.filter(post => {
      const matchesSearch = search === '' || 
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.content.toLowerCase().includes(search.toLowerCase());
      
      const matchesCategory = !selectedCategory ||
        post.categories?.some(cat => cat.slug === selectedCategory);

      return matchesSearch && matchesCategory;
    });

    setPosts(filtered);
    setTotal(filtered.length);
  }, [search, selectedCategory]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-4">
        <div className="lg:col-span-3">
          <div className="mb-8">
            <SearchInput value={search} onChange={setSearch} />
          </div>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <BlogPost key={post.id} post={post} />
                ))}
              </div>
              <Pagination
                className="mt-8"
                page={page}
                total={total}
                perPage={perPage}
                onChange={setPage}
              />
            </>
          )}
        </div>
        <BlogSidebar
          categories={categories}
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
        />
      </div>
    </div>
  );
}