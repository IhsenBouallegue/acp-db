"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogClose, DialogContent } from "@/components/ui/dialog";
import { Download, Expand, FileText, Film, ImageIcon, Trash2, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

type Attachment = {
  id: number;
  type: "image" | "video" | "document";
  url: string;
  fileName: string;
};

interface AttachmentPreviewProps {
  attachment: Attachment;
  onDownload(url: string, fileName: string): void;
  onDelete?(id: number): void;
}

export function AttachmentPreview({ attachment, onDownload, onDelete }: AttachmentPreviewProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpand = () => setIsExpanded(true);
  const handleClose = () => setIsExpanded(false);

  return (
    <>
      <Card className="overflow-hidden group">
        <CardContent className="p-0 relative">
          {attachment.type === "image" && (
            <div className="relative aspect-video">
              <Image src={attachment.url} alt={attachment.fileName} fill className="object-cover" />
            </div>
          )}
          {attachment.type === "video" && (
            <div className="relative aspect-video">
              <video src={attachment.url} controls className="w-full h-full object-cover">
                <track kind="captions" />
                Your browser does not support the video tag.
              </video>
            </div>
          )}
          {attachment.type === "document" && (
            <div className="relative aspect-video">
              <iframe src={attachment.url} title={attachment.fileName} className="w-full h-full">
                This browser does not support PDFs. Please download the PDF to view it.
              </iframe>
            </div>
          )}
          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
            <div className="flex justify-end space-x-2">
              <Button
                size="icon"
                variant="ghost"
                className="text-white hover:text-white hover:bg-white/20"
                onClick={() => onDownload(attachment.url, attachment.fileName)}
              >
                <Download className="h-4 w-4" />
                <span className="sr-only">Download {attachment.fileName}</span>
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="text-white hover:text-white hover:bg-white/20"
                onClick={handleExpand}
              >
                <Expand className="h-4 w-4" />
                <span className="sr-only">Expand {attachment.fileName}</span>
              </Button>
              {onDelete && (
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-white hover:text-white hover:bg-white/20"
                  onClick={() => onDelete(attachment.id)}
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Delete {attachment.fileName}</span>
                </Button>
              )}
            </div>
            <div className="flex items-center gap-2 text-white">
              {attachment.type === "image" && <ImageIcon className="h-4 w-4" />}
              {attachment.type === "video" && <Film className="h-4 w-4" />}
              {attachment.type === "document" && <FileText className="h-4 w-4" />}
              <span className="text-sm font-medium">{attachment.fileName}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isExpanded} onOpenChange={handleClose}>
        <DialogContent className="max-w-4xl w-full p-0 bg-transparent border-none rounded-lg overflow-hidden">
          <div className="relative w-full h-full">
            <DialogClose className="absolute top-2 right-2 z-50">
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 rounded-full bg-black/50 text-white hover:bg-black/75 hover:text-white"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
            </DialogClose>
            {attachment.type === "image" && (
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src={attachment.url}
                  alt={attachment.fileName}
                  style={{ maxWidth: "100%", maxHeight: "100%", width: "auto", height: "auto" }}
                  width={800}
                  height={600}
                  className="object-contain rounded-lg"
                />
              </div>
            )}
            {attachment.type === "video" && (
              <div className="relative w-full h-full flex items-center justify-center">
                <video
                  src={attachment.url}
                  controls
                  className="max-w-full max-h-full w-auto h-auto object-contain rounded-lg"
                >
                  <track kind="captions" />
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
            {attachment.type === "document" && (
              <div className="relative w-full h-full flex items-center justify-center">
                <iframe
                  src={attachment.url}
                  title={attachment.fileName}
                  className="w-full h-full max-w-4xl max-h-[80vh] rounded-lg"
                >
                  This browser does not support PDFs. Please download the PDF to view it.
                </iframe>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
