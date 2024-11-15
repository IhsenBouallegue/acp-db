import { dummyPosts } from "@/data/dummyData";
import { create } from "zustand";

type Post = (typeof dummyPosts)[0];

type PostStore = {
  posts: Post[];
  setPosts: (posts: Post[]) => void;
  addPost: (post: Post) => void;
  toggleLike: (id: number) => void;
  toggleBookmark: (id: number) => void;
};

export const usePostStore = create<PostStore>((set) => ({
  posts: dummyPosts,
  setPosts: (posts) => set({ posts }),
  addPost: (post) => set((state) => ({ posts: [post, ...state.posts] })),
  toggleLike: (id) =>
    set((state) => ({
      posts: state.posts.map((post) => (post.id === id ? { ...post, likes: post.likes + 1 } : post)),
    })),
  toggleBookmark: (id) =>
    set((state) => ({
      posts: state.posts.map((post) => (post.id === id ? { ...post, bookmarked: !post.bookmarked } : post)),
    })),
}));
