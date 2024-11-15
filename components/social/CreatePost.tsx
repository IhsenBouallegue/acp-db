import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface CreatePostProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

export function CreatePost({ value, onChange, onSubmit }: CreatePostProps) {
  return (
    <div className="flex gap-4">
      <Input
        placeholder="What's on your mind?"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-grow"
      />
      <Button onClick={onSubmit}>Post</Button>
    </div>
  );
}
