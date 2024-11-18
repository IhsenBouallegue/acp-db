import { mockPosts } from "@/data/mock-data";
import type { Comment, Post, User } from "@/types/social.types";
import { create } from "zustand";

interface SocialState {
  posts: Post[];
  currentUser: User;
  addPost: (content: string) => void;
  toggleLike: (postId: number) => void;
  toggleBookmark: (postId: number) => void;
  addComment: (postId: number, content: string) => void;
}

export const useSocialStore = create<SocialState>((set) => ({
  posts: mockPosts,
  currentUser: {
    id: 1,
    name: "Current User",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  addPost: (content) =>
    set((state) => ({
      posts: [
        {
          id: Date.now(),
          author: state.currentUser,
          content,
          timestamp: new Date().toISOString(),
          likes: 0,
          comments: [],
          attachments: [],
          mentions: [],
          bookmarked: false,
          liked: false,
        },
        ...state.posts,
      ],
    })),
  toggleLike: (postId) =>
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              liked: !post.liked,
              likes: post.liked ? post.likes - 1 : post.likes + 1,
            }
          : post,
      ),
    })),
  toggleBookmark: (postId) =>
    set((state) => ({
      posts: state.posts.map((post) => (post.id === postId ? { ...post, bookmarked: !post.bookmarked } : post)),
    })),
  addComment: (postId, content) =>
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: [
                ...post.comments,
                {
                  id: Date.now(),
                  author: state.currentUser,
                  content,
                  timestamp: new Date().toISOString(),
                },
              ],
            }
          : post,
      ),
    })),
}));
