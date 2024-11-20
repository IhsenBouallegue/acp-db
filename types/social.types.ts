import type { User } from "@/types/user.types";

export type Attachment = {
  id: number;
  type: "image" | "video" | "document";
  url: string;
  fileName: string;
};

export type Comment = {
  id: number;
  postId: number;
  authorId: number;
  content: string;
  timestamp: string;
  attachments: Attachment[];
};

export type Post = {
  id: number;
  authorId: number;
  content: string;
  timestamp: string;
  likes: number;
  commentIds: number[];
  attachments: Attachment[];
  mentionIds: number[];
  bookmarked: boolean;
  liked: boolean;
};

export type PostWithRelations = {
  id: number;
  author: User;
  content: string;
  timestamp: string;
  likes: number;
  comments: (Comment & { author: User })[];
  attachments: Attachment[];
  mentions: User[];
  bookmarked: boolean;
  liked: boolean;
};

export type Notification = {
  id: number;
  type: "like" | "comment" | "mention";
  userId: number;
  postId: number;
  timestamp: string;
  read: boolean;
};

export type AttachmentType = {
  id: string;
  type: "image" | "video" | "document";
  url: string;
  fileName: string;
  fileSize: number;
  createdAt: string;
};

export type UploadingAttachment = {
  file: File;
  previewUrl: string;
  id: string;
  type: "image" | "video" | "document";
};
