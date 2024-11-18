"use client";

import { useSocialStore } from "@/store/social-store";
import { useState } from "react";
import { CreatePost } from "./create-post";
import { PostCard } from "./post-card";
import { SearchAndFilter } from "./search-and-filter";

export default function SocialMediaTimeline() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const { posts, addPost, likePost, bookmarkPost, addComment } = useSocialStore();

  const filteredAndSortedPosts = posts
    .filter((post) => post.content.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "recent") {
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      }
      return b.likes - a.likes;
    });

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Idea Exchange Platform</h1>
      <div className="flex pt-6 flex-col gap-4 max-w-3xl mx-auto">
        <CreatePost />
        <SearchAndFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />
        {filteredAndSortedPosts.map((post) => (
          <PostCard key={post.id} post={post} onLike={likePost} onComment={addComment} onBookmark={bookmarkPost} />
        ))}
      </div>
    </>
  );
}
