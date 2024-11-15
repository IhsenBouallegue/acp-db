import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Paperclip, Send, Smile } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useSocialStore } from "./store";
import type { Post } from "./types";

interface CommentSectionProps {
  post: Post;
  onComment: (postId: number, content: string) => void;
}

export function CommentSection({ post, onComment }: CommentSectionProps) {
  const [commentInput, setCommentInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { currentUser } = useSocialStore();

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [commentInput]);

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentInput.trim()) {
      onComment(post.id, commentInput);
      setCommentInput("");
    }
  };

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
              <p className="text-xs text-gray-500">{new Date(comment.timestamp).toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmitComment} className="flex gap-2 w-full">
        <Avatar className="h-8 w-8 flex-shrink-0">
          <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
          <AvatarFallback>{currentUser.name[0]}</AvatarFallback>
        </Avatar>
        <div className="relative flex-1">
          <Textarea
            ref={textareaRef}
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            placeholder="Write your comment"
            className="pr-20 min-h-[40px] max-h-[200px] resize-none overflow-hidden"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmitComment(e);
              }
            }}
          />
          <div className="absolute right-1 bottom-1 flex items-center gap-1">
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="h-8 w-8 text-muted-foreground hover:text-primary"
            >
              <Paperclip className="h-4 w-4" />
              <span className="sr-only">Add attachment</span>
            </Button>
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="h-8 w-8 text-muted-foreground hover:text-primary"
            >
              <Smile className="h-4 w-4" />
              <span className="sr-only">Add emoji</span>
            </Button>
            <Button
              type="submit"
              size="icon"
              variant="ghost"
              className="h-8 w-8 text-muted-foreground hover:text-primary"
            >
              <Send className="h-4 w-4" />
              <span className="sr-only">Send comment</span>
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}
