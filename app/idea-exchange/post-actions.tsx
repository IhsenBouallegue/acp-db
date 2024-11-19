"use client";

import { Button } from "@/components/ui/button";
import { useSocialStore } from "@/store/social-store";
import type { PostWithRelations } from "@/types/social.types";
import { Bookmark, Heart, MessageCircle, Share2 } from "lucide-react";

interface PostActionsProps {
  post: PostWithRelations;
}

export function PostActions({ post }: PostActionsProps) {
  const { toggleLike, toggleBookmark } = useSocialStore();
  return (
    <div className="flex justify-between items-center w-full">
      <div className="flex gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => toggleLike(post.id)}
          className={post.liked ? "text-primary" : ""}
        >
          <Heart className={`w-4 h-4 mr-2 ${post.liked ? "fill-current text-red-500" : ""}`} />
          {post.likes}
        </Button>
        <Button variant="ghost" size="sm">
          <MessageCircle className="w-4 h-4 mr-2" />
          {post.comments.length}
        </Button>
      </div>
      <div className="flex gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => toggleBookmark(post.id)}
          className={post.bookmarked ? "text-primary" : ""}
        >
          <Bookmark className={`w-4 h-4 ${post.bookmarked ? "fill-current" : ""}`} />
        </Button>
        <Button variant="ghost" size="sm">
          <Share2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
