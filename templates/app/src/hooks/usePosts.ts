import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const API_BASE = 'https://jsonplaceholder.typicode.com';

async function fetchPosts(limit = 10): Promise<Post[]> {
  const response = await fetch(`${API_BASE}/posts?_limit=${limit}`);
  if (!response.ok) throw new Error('Failed to fetch posts');
  return response.json();
}

async function fetchPostsPage(page: number, limit: number): Promise<Post[]> {
  const response = await fetch(`${API_BASE}/posts?_page=${page}&_limit=${limit}`);
  if (!response.ok) throw new Error('Failed to fetch posts');
  return response.json();
}

export function usePosts(limit = 10) {
  return useQuery({
    queryKey: ['posts', { limit }],
    queryFn: () => fetchPosts(limit),
  });
}

export function useInfinitePosts(pageSize = 10) {
  return useInfiniteQuery({
    queryKey: ['posts', 'infinite', { pageSize }],
    queryFn: ({ pageParam = 1 }) => fetchPostsPage(pageParam, pageSize),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length < pageSize ? undefined : allPages.length + 1,
  });
}
