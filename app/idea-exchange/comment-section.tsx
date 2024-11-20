"use client";

import { ContentInput } from "@/app/idea-exchange/content-input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSocialStore } from "@/store/social-store";
import type { PostWithRelations } from "@/types/social.types";

interface CommentSectionProps {
  post: PostWithRelations;
}

export function CommentSection({ post }: CommentSectionProps) {
  const { currentUser, addComment } = useSocialStore();

  const handleSubmitComment = (content: string) => {
    if (content.trim()) {
      addComment(post.id, content);
    }
  };
  const CommentInput = (
    <ContentInput
      onSubmitAction={handleSubmitComment}
      placeholder="Write your comment"
      avatarSrc={currentUser.avatar}
      avatarFallback={currentUser.name}
      maxLength={280}
      maxRows={5}
      className="mt-4"
    />
  );

  if (!post.comments.length) return CommentInput;

  return (
    <>
      <div className="mt-4 space-y-2 w-full">
        {post.comments.map((comment) => (
          <div key={comment.id} className="flex items-start gap-2 bg-gray-50 p-2 rounded">
            <Avatar className="w-6 h-6">
              <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
              <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-grow">
              <p className="text-sm font-semibold">{comment.author.name}</p>
              <p className="text-sm">{comment.content}</p>
              <p className="text-xs text-gray-500" suppressHydrationWarning>
                {new Date(comment.timestamp).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
      {CommentInput}
    </>
  );
}
