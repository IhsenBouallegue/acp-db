"use client";

import { PageContainer } from "@/components/ui/page-container";
import { PageHeading } from "@/components/ui/page-heading";
import { PageSubheading } from "@/components/ui/page-subheading";
import { useSocialStore } from "@/store/social-store";
import { useState } from "react";
import { CreatePost } from "./create-post";
import { PostCard } from "./post-card";
import { SearchAndFilter } from "./search-and-filter";

export default function SocialMediaTimeline() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const { posts, getPostWithRelations } = useSocialStore();

  const filteredAndSortedPosts = posts
    .filter((post) => post.content.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "recent") {
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      }
      return b.likes - a.likes;
    })
    .map((post) => getPostWithRelations(post));

  return (
    <PageContainer>
      <PageHeading className="text-center">Idea Exchange</PageHeading>
      <PageSubheading>Share and discuss ideas with your team members</PageSubheading>
      <div className="w-full flex justify-center">
        <div className="flex pt-6 flex-col gap-6 max-w-3xl w-full">
          <SearchAndFilter
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />
          <CreatePost />
          {filteredAndSortedPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </PageContainer>
  );
}
