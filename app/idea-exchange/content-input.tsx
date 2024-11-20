"use client";

import { AttachmentPreview } from "@/app/idea-exchange/attachement-preview";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import type { UploadingAttachment } from "@/types/social.types";
import { PaperclipIcon, SmileIcon, X } from "lucide-react";
import Image from "next/image";
import { type ChangeEvent, useEffect, useRef, useState } from "react";

interface ContentInputProps {
  onSubmitAction: (content: string, attachments: UploadingAttachment[]) => void;
  placeholder?: string;
  avatarSrc?: string;
  avatarFallback?: string;
  initialHeight?: number;
  maxLength?: number;
  className?: string;
  maxRows?: number;
}

export function ContentInput({
  onSubmitAction,
  placeholder = "Write your content...",
  avatarSrc,
  avatarFallback,
  initialHeight = 80,
  maxLength = 280,
  className,
  maxRows = 5,
}: ContentInputProps) {
  const [value, setValue] = useState("");
  const [attachments, setAttachments] = useState<UploadingAttachment[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const maxHeight = maxRows * 40;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;

    onSubmitAction(value, attachments);
    setValue("");
    setAttachments([]);
    if (textareaRef.current) {
      textareaRef.current.style.height = `${initialHeight}px`;
    }
  };

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);

    const textarea = e.target;
    textarea.style.height = `${initialHeight}px`;
    const scrollHeight = textarea.scrollHeight;
    textarea.style.height = `${Math.min(scrollHeight, maxHeight)}px`;
  };

  const handleFileChange = (files: FileList | null) => {
    if (!files) return;

    const newAttachments: UploadingAttachment[] = [];

    for (const file of Array.from(files)) {
      const previewUrl = URL.createObjectURL(file);
      const fileType = file.type.split("/")[0];
      let type: "image" | "video" | "document";

      if (fileType === "image") {
        type = "image";
      } else if (fileType === "video") {
        type = "video";
      } else {
        type = "document";
      }

      newAttachments.push({
        file,
        previewUrl,
        id: crypto.randomUUID(),
        type,
      });
    }

    setAttachments((prev) => [...prev, ...newAttachments]);
  };

  const removeAttachment = (id: string) => {
    setAttachments((prev) => {
      const attachment = prev.find((a) => a.id === id);
      if (attachment) {
        URL.revokeObjectURL(attachment.previewUrl);
      }
      return prev.filter((a) => a.id !== id);
    });
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = `${initialHeight}px`;
    }
  }, [initialHeight]);

  const remainingCharacters = maxLength - value.length;

  const handleDownload = (url: string, fileName: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-2 w-full", className)}>
      <div className="flex gap-2 w-full items-start">
        <Avatar>
          <AvatarImage src={avatarSrc} alt={avatarFallback} />
          <AvatarFallback>
            {avatarFallback
              ?.split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div className="relative flex-1">
          <div className="relative bg-background rounded-md">
            <Textarea
              ref={textareaRef}
              value={value}
              onChange={handleInput}
              placeholder={placeholder}
              maxLength={maxLength}
              className={cn(
                "min-h-[80px]",
                `max-h-[${maxHeight}px]`,
                "resize-none pb-12 overflow-y-auto",
                "[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]",
              )}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
            <div className="absolute bottom-2 right-3 flex items-center gap-1">
              <Button
                type="button"
                size="icon"
                variant="ghost"
                className="h-8 w-8 text-muted-foreground hover:text-primary bg-background"
                onClick={() => fileInputRef.current?.click()}
              >
                <PaperclipIcon className="h-4 w-4" />
                <span className="sr-only">Add attachment</span>
              </Button>
              <Button
                type="button"
                size="icon"
                variant="ghost"
                className="h-8 w-8 text-muted-foreground hover:text-primary bg-background"
              >
                <SmileIcon className="h-4 w-4" />
                <span className="sr-only">Add emoji</span>
              </Button>
            </div>
          </div>
          <div className="mt-1 text-right">
            <span className="text-xs text-muted-foreground">{remainingCharacters} characters left</span>
          </div>
        </div>
      </div>

      {attachments.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 pl-10">
          {attachments.map((attachment) => (
            <AttachmentPreview
              key={attachment.id}
              attachment={{
                id: Number.parseInt(attachment.id),
                type: "image",
                url: attachment.previewUrl,
                fileName: attachment.file.name,
              }}
              onDownload={handleDownload}
              onDelete={() => removeAttachment(attachment.id)}
            />
          ))}
        </div>
      )}

      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => handleFileChange(e.target.files)}
        accept="image/*,video/*,application/pdf"
        multiple
        className="hidden"
      />
    </form>
  );
}
