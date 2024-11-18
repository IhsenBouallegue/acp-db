import { Button } from "@/components/ui/button";
import { Bookmark, Heart, MessageCircle, Share2 } from "lucide-react";
import type { Post } from "../../components/social/types";

interface PostActionsProps {
  post: Post;
  onLike: (postId: number) => void;
  onBookmark: (postId: number) => void;
}

export function PostActions({ post, onLike, onBookmark }: PostActionsProps) {
  return (
    <div className="flex justify-between items-center w-full">
      <div className="flex gap-4">
        <Button variant="ghost" size="sm" onClick={() => onLike(post.id)}>
          <Heart className={`w-4 h-4 mr-2 ${post.liked ? "fill-current text-red-500" : ""}`} />
          {post.likes}
        </Button>
        <Button variant="ghost" size="sm">
          <MessageCircle className="w-4 h-4 mr-2" />
          {post.comments.length}
        </Button>
      </div>
      <div className="flex gap-4">
        <Button variant="ghost" size="sm" onClick={() => onBookmark(post.id)}>
          <Bookmark className={`w-4 h-4 ${post.bookmarked ? "fill-current" : ""}`} />
        </Button>
        <Button variant="ghost" size="sm">
          <Share2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
