import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSocialStore } from "@/store/social-store";
import { useState } from "react";

export function CreatePost() {
  const [value, setValue] = useState("");
  const addPost = useSocialStore((state) => state.addPost);

  const handleSubmit = () => {
    if (!value.trim()) return;

    addPost(value);
    setValue("");
  };

  return (
    <div className="flex gap-4">
      <Input
        placeholder="What's on your mind?"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="flex-grow"
      />
      <Button onClick={handleSubmit}>Post</Button>
    </div>
  );
}
