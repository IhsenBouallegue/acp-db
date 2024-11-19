import { getFullPost, mockPosts, socialComments } from "@/data/social-data";
import type { Post, PostWithRelations } from "@/types/social.types";
import type { User } from "@/types/user.types";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface SocialState {
  posts: Post[];
  currentUser: User;
  addPost: (content: string) => void;
  toggleLike: (postId: number) => void;
  toggleBookmark: (postId: number) => void;
  addComment: (postId: number, content: string) => void;
  getPostWithRelations: (post: Post) => PostWithRelations;
}

export const useSocialStore = create(
  immer<SocialState>((set, get) => ({
    posts: mockPosts,
    currentUser: {
      id: 1,
      name: "Current User",
      email: "current.user@acp-global.net",
      role: "User",
      status: "registered",
      isOnline: true,
      avatar: "/placeholder.svg?height=40&width=40",
      lastActive: new Date(),
    },
    getPostWithRelations: (post) => {
      const fullPost = getFullPost(post);
      if (!fullPost.author) {
        throw new Error(`Post ${post.id} has no author`);
      }
      return fullPost as PostWithRelations;
    },
    addPost: (content) =>
      set((state) => ({
        posts: [
          {
            id: Date.now(),
            authorId: state.currentUser.id,
            content,
            timestamp: new Date().toISOString(),
            likes: 0,
            commentIds: [],
            attachments: [],
            mentionIds: [],
            bookmarked: false,
            liked: false,
          },
          ...state.posts,
        ],
      })),
    toggleLike: (postId) =>
      set((state) => {
        const post = state.posts.find((p) => p.id === postId);
        if (post) {
          post.liked = !post.liked;
          post.likes += !post.liked ? -1 : 1;
        }
      }),
    toggleBookmark: (postId) =>
      set((state) => {
        const updatedPosts = state.posts.map((post) =>
          post.id === postId ? { ...post, bookmarked: !post.bookmarked } : post,
        );
        return { posts: updatedPosts };
      }),
    addComment: (postId, content) =>
      set((state) => {
        const newCommentId = Date.now();
        const newComment = {
          id: newCommentId,
          postId,
          authorId: state.currentUser.id,
          content,
          timestamp: new Date().toISOString(),
        };
        socialComments.push(newComment);

        return {
          posts: state.posts.map((post) =>
            post.id === postId
              ? {
                  ...post,
                  commentIds: [...post.commentIds, newCommentId],
                }
              : post,
          ),
        };
      }),
  })),
);
