import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { likePost as likePostApi, postComment } from "../api";
import { useSocialStore } from "../store";
import type { Comment, Post } from "../types";

export function useSocialMutations(page: number) {
  const queryClient = useQueryClient();
  const { addPost, addComment, addNotification, currentUser, likePost: storeLikePost } = useSocialStore();

  const { mutate: commentMutate } = useMutation({
    mutationFn: ({ postId, comment }: { postId: number; comment: Comment }) => postComment(postId, comment),
    onSuccess: (newComment, { postId }) => {
      queryClient.setQueryData(["posts", page], (oldData: Post[] | undefined) => {
        if (!oldData) return [];
        return oldData.map((post) =>
          post.id === postId ? { ...post, comments: [...post.comments, newComment] } : post,
        );
      });

      addComment(postId, newComment);
      const posts = queryClient.getQueryData<Post[]>(["posts", page]);
      addNotification({
        id: Date.now(),
        type: "comment",
        user: currentUser,
        post: posts?.find((p) => p.id === postId) as Post,
        timestamp: new Date().toISOString(),
        read: false,
      });

      toast.success("Comment added successfully");
    },
    onError: () => {
      toast.error("Failed to add comment. Please try again.");
    },
  });

  const { mutate: likeMutate } = useMutation({
    mutationFn: (postId: number) => likePostApi(postId),
    onSuccess: (_, postId) => {
      queryClient.setQueryData(["posts", page], (oldData: Post[] | undefined) => {
        if (!oldData) return [];
        return oldData.map((post) =>
          post.id === postId
            ? {
                ...post,
                likes: post.liked ? post.likes - 1 : post.likes + 1,
                liked: !post.liked,
              }
            : post,
        );
      });

      storeLikePost(postId);

      const posts = queryClient.getQueryData<Post[]>(["posts", page]);
      const post = posts?.find((p) => p.id === postId);
      if (post?.liked) {
        addNotification({
          id: Date.now(),
          type: "like",
          user: currentUser,
          post: post,
          timestamp: new Date().toISOString(),
          read: false,
        });
      }

      toast.success(post?.liked ? "Post liked successfully" : "Post unliked successfully");
    },
    onError: () => {
      toast.error("Failed to update like. Please try again.");
    },
  });

  const handleComment = (postId: number, content: string) => {
    if (!content.trim()) return;

    const comment: Comment = {
      id: Date.now(),
      author: currentUser,
      content: content.trim(),
      timestamp: new Date().toISOString(),
    };

    commentMutate({ postId, comment });
  };

  const handleNewPost = (content: string) => {
    if (!content.trim()) return;

    const post: Post = {
      id: Date.now(),
      author: currentUser,
      content: content.trim(),
      timestamp: new Date().toISOString(),
      likes: 0,
      comments: [],
      attachments: [],
      mentions: [],
      bookmarked: false,
      liked: false,
    };

    queryClient.setQueryData(["posts", page], (oldData: Post[] | undefined) => {
      if (!oldData) return [post];
      return [post, ...oldData];
    });

    addPost(post);
    toast.success("Post created successfully");
    return post;
  };

  const handleLike = (postId: number) => {
    likeMutate(postId);
  };

  return { handleComment, handleNewPost, handleLike };
}
