import { Button } from "@/components/ui/button";
import type { dummyPosts } from "@/data/dummyData";
import React from "react";
import { toast } from "sonner";
import { usePostStore } from "../store/postStore";

export default function PostItem({ post }: { post: (typeof dummyPosts)[0] }) {
  const { toggleLike, toggleBookmark } = usePostStore();

  return (
    <div className="border p-4 rounded mb-4">
      <div className="flex items-center gap-4">
        <img src={post.author.avatar} alt={post.author.name} className="w-10 h-10 rounded-full" />
        <div>
          <h3 className="font-bold">{post.author.name}</h3>
          <p className="text-sm text-gray-500">{post.timestamp}</p>
        </div>
      </div>
      <p className="mt-4">{post.content}</p>
      <div className="flex justify-between items-center mt-4">
        <Button
          className="text-red-500"
          onClick={() => {
            toggleLike(post.id);
            toast.success("You liked the post!");
          }}
        >
          ❤️ {post.likes}
        </Button>
        <Button
          className="text-blue-500"
          onClick={() => {
            toggleBookmark(post.id);
            toast.success("Post bookmarked!");
          }}
        >
          {post.bookmarked ? "🔖 Bookmarked" : "Bookmark"}
        </Button>
      </div>
    </div>
  );
}
