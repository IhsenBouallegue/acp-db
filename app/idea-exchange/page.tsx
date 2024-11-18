"use client";

import { CreatePost } from "@/app/idea-exchange/create-post";
import { PostCard } from "@/app/idea-exchange/post-card";
import { SearchAndFilter } from "@/app/idea-exchange/search-and-filter";
import { fetchPosts } from "@/components/social/api";
import { useSocialMutations } from "@/components/social/hooks/useSocialMutations";
import { useSocialStore } from "@/components/social/store";
import { useDebounce } from "@/hooks/useDebounce";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useRef, useState } from "react";

export default function SocialMediaTimeline() {
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
    <>
      <h1 className="text-3xl font-bold mb-6">Idea Exchange Platform</h1>
      <div className="flex pt-6 flex-col gap-4 max-w-3xl mx-auto">
        <CreatePost value={newPost} onChange={setNewPost} onSubmit={handleCreatePost} />
        <SearchAndFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />
        {filteredAndSortedPosts?.map((post) => (
          <PostCard key={post.id} post={post} onLike={handleLike} onComment={handleComment} onBookmark={bookmarkPost} />
        ))}
      </div>
    </>
  );
}
