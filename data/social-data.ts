import { users } from "@/data/users-data";
import type { Comment, Post } from "@/types/social.types";

export const socialComments: Comment[] = [
  {
    id: 1,
    postId: 1,
    authorId: 2,
    content: "Me too!",
    timestamp: new Date().toISOString(),
  },
];

export const mockPosts: Post[] = [
  {
    id: 1,
    authorId: 1,
    content: "Excited about React Server Components!",
    timestamp: new Date().toISOString(),
    likes: 42,
    commentIds: [1],
    attachments: [],
    mentionIds: [],
    bookmarked: false,
    liked: false,
  },
  {
    id: 2,
    authorId: 3,
    content: "Just built my first Next.js app!",
    timestamp: new Date().toISOString(),
    likes: 24,
    commentIds: [],
    attachments: [],
    mentionIds: [],
    bookmarked: false,
    liked: false,
  },
];

// Helper function to get full post data with related entities
export const getFullPost = (post: Post) => {
  const author = users.find((user) => user.id === post.authorId);
  const comments = post.commentIds
    .map((commentId) => {
      const comment = socialComments.find((c) => c.id === commentId);
      const commentAuthor = comment ? users.find((user) => user.id === comment.authorId) : null;
      return comment && commentAuthor
        ? {
            ...comment,
            author: commentAuthor,
          }
        : null;
    })
    .filter(Boolean);

  const mentions = post.mentionIds.map((userId) => users.find((user) => user.id === userId)).filter(Boolean);

  return {
    ...post,
    author,
    comments,
    mentions,
  };
};
