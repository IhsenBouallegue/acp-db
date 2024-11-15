"use client";

import { useSocialMutations } from "@/components/social/hooks/useSocialMutations";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useDebounce } from "@/hooks/useDebounce";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { CreatePost } from "./CreatePost";
import { PostCard } from "./PostCard";
import { SearchAndFilter } from "./SearchAndFilter";
import { fetchPosts } from "./api";
import { useSocialStore } from "./store";
import type { Post } from "./types";

export function SocialMediaTimeline() {
  const queryClient = useQueryClient();
  const [newPost, setNewPost] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [page, setPage] = useState(1);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const {
    data: posts,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["posts", page],
    queryFn: () => fetchPosts(page),
  });

  const { likePost, bookmarkPost } = useSocialStore();
  const { handleComment, handleNewPost, handleLike } = useSocialMutations(page);

  const handleCreatePost = useCallback(() => {
    if (newPost.trim()) {
      if (handleNewPost(newPost)) {
        setNewPost("");
      }
    }
  }, [newPost, handleNewPost]);

  const handleScroll = useCallback(() => {
    if (scrollAreaRef.current) {
      setShowScrollTop(scrollAreaRef.current.scrollTop > 200);
    }
  }, []);

  const filteredAndSortedPosts = posts
    ?.filter((post) => post.content.toLowerCase().includes(debouncedSearchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "recent") {
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      }
      return b.likes - a.likes;
    });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading posts</div>;

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="text-2xl font-bold">Social Media Timeline</CardHeader>
      <CardContent className="space-y-4">
        <CreatePost value={newPost} onChange={setNewPost} onSubmit={handleCreatePost} />
        <SearchAndFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />
        <ScrollArea className="h-[600px] relative" onScroll={handleScroll} ref={scrollAreaRef}>
          {filteredAndSortedPosts?.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onLike={handleLike}
              onComment={handleComment}
              onBookmark={bookmarkPost}
            />
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
