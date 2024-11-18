import { CommentSection } from "@/app/idea-exchange/comment-section";
import { PostActions } from "@/app/idea-exchange/post-actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import type { Post } from "@/types/social.types";

interface PostCardProps {
  post: Post;
  onLike: (postId: number) => void;
  onBookmark: (postId: number) => void;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Card className="mb-4">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar>
          <AvatarImage src={post.author.avatar} alt={post.author.name} />
          <AvatarFallback>{post.author.name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <p className="font-semibold">{post.author.name}</p>
          <p className="text-sm text-gray-500">{new Date(post.timestamp).toLocaleString()}</p>
        </div>
      </CardHeader>

      <CardContent>
        <p className="whitespace-pre-wrap">{post.content}</p>
        {post.attachments.length > 0 && (
          <div className="mt-4 grid grid-cols-2 gap-2">
            {post.attachments.map((attachment) => (
              <div key={attachment.id} className="relative aspect-square">
                {/* Add attachment rendering logic here */}
              </div>
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
