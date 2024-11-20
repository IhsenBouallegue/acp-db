import { AttachmentPreview } from "@/app/idea-exchange/attachement-preview";
import { CommentSection } from "@/app/idea-exchange/comment-section";
import { PostActions } from "@/app/idea-exchange/post-actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import type { PostWithRelations } from "@/types/social.types";

interface PostCardProps {
  post: PostWithRelations;
}

export function PostCard({ post }: PostCardProps) {
  const handleDownload = (url: string, fileName: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className="p-4 rounded-sm">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar>
          <AvatarImage src={post.author.avatar} alt={post.author.name} />
          <AvatarFallback>{post.author.name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <p className="font-semibold">{post.author.name}</p>
          <p className="text-sm text-gray-500" suppressHydrationWarning>
            {new Date(post.timestamp).toLocaleString()}
          </p>
        </div>
      </CardHeader>

      <CardContent>
        <p className="mt-2">{post.content}</p>

        {post.attachments && post.attachments.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
            {post.attachments.map((attachment) => (
              <AttachmentPreview
                key={attachment.id}
                attachment={{
                  id: attachment.id,
                  type: attachment.type,
                  url: attachment.url,
                  fileName: attachment.fileName,
                }}
                onDownload={handleDownload}
              />
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter className="flex flex-col gap-4">
        <PostActions post={post} />
        <CommentSection post={post} />
      </CardFooter>
    </Card>
  );
}
