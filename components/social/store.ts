import { create } from "zustand";
import type { Comment, Notification, Post, User } from "./types";

interface SocialState {
  posts: Post[];
  notifications: Notification[];
  currentUser: User;
  addPost: (post: Post) => void;
  likePost: (postId: number) => void;
  addComment: (postId: number, comment: Comment) => void;
  bookmarkPost: (postId: number) => void;
  addNotification: (notification: Notification) => void;
  markNotificationAsRead: (notificationId: number) => void;
}

export const useSocialStore = create<SocialState>((set) => ({
  posts: [],
  notifications: [],
  currentUser: { id: 1, name: "Current User", avatar: "/placeholder.svg?height=40&width=40" },
  addPost: (post) => set((state) => ({ posts: [post, ...state.posts] })),
  likePost: (postId) =>
    set((state) => ({
      posts: state.posts.map((post) => (post.id === postId ? { ...post, likes: post.likes + 1 } : post)),
    })),
  addComment: (postId, comment) =>
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === postId ? { ...post, comments: [...post.comments, comment] } : post,
      ),
    })),
  bookmarkPost: (postId) =>
    set((state) => ({
      posts: state.posts.map((post) => (post.id === postId ? { ...post, bookmarked: !post.bookmarked } : post)),
    })),
  addNotification: (notification) =>
    set((state) => ({
      notifications: [notification, ...state.notifications],
    })),
  markNotificationAsRead: (notificationId) =>
    set((state) => ({
      notifications: state.notifications.map((notification) =>
        notification.id === notificationId ? { ...notification, read: true } : notification,
      ),
    })),
}));
