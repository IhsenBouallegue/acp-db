import type { Comment, Post } from "./types";

export const fetchPosts = async (page: number): Promise<Post[]> => {
  // Simulating API call
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return [
    {
      id: 1,
      author: {
        id: 2,
        name: "John Doe",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      content: `This is a test post for page ${page}`,
      timestamp: new Date().toISOString(),
      likes: 5,
      comments: [],
      attachments: [],
      mentions: [],
      bookmarked: false,
      liked: false,
    },
    {
      id: 2,
      author: {
        id: 3,
        name: "Jane Smith",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      content: "Another test post with some content",
      timestamp: new Date().toISOString(),
      likes: 10,
      comments: [],
      attachments: [],
      mentions: [],
      bookmarked: false,
      liked: false,
    },
  ];
};

export const postComment = async (postId: number, comment: Comment): Promise<Comment> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return comment;
};

export const likePost = async (postId: number): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return;
};
