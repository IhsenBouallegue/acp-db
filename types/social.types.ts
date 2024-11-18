export type Attachment = {
  id: number;
  type: "image" | "video" | "document";
  url: string;
};

export type Comment = {
  id: number;
  author: User;
  content: string;
  timestamp: string;
};

export type User = {
  id: number;
  name: string;
  avatar: string;
};

export type Post = {
  id: number;
  author: User;
  content: string;
  timestamp: string;
  likes: number;
  comments: Comment[];
  attachments: Attachment[];
  mentions: User[];
  bookmarked: boolean;
  liked: boolean;
};

export type Notification = {
  id: number;
  type: "like" | "comment" | "mention";
  user: User;
  post: Post;
  timestamp: string;
  read: boolean;
};
