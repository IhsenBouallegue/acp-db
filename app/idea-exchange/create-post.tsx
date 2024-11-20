"use client";

import { ContentInput } from "@/app/idea-exchange/content-input";
import { useSocialStore } from "@/store/social-store";
import type { UploadingAttachment } from "@/types/social.types";

export function CreatePost() {
  const addPost = useSocialStore((state) => state.addPost);
  const currentUser = useSocialStore((state) => state.currentUser);

  const handleSubmit = (content: string, attachments: UploadingAttachment[]) => {
    addPost(content, attachments);
  };

  return (
    <ContentInput
      onSubmitAction={handleSubmit}
      placeholder="What's on your mind?"
      avatarSrc={currentUser?.avatar}
      avatarFallback={currentUser?.name?.[0]}
      initialHeight={120}
    />
  );
}
