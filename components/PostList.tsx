// src/components/PostList.tsx
import React, { useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { usePostStore } from "../store/postStore";
import PostItem from "./PostItem";

export default function PostList() {
  const { posts } = usePostStore();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);

  const filteredPosts = posts.filter((post) => post.content.toLowerCase().includes(debouncedSearch.toLowerCase()));

  return (
    <div>
      <input
        type="text"
        placeholder="Search posts"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border rounded p-2 w-full mb-4"
      />
      <div>
        {filteredPosts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
