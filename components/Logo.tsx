import { cn } from "@/lib/utils";
import Image from "next/image";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("relative h-8 w-32", className)}>
      <Image
        src="/acp_group.png"
        alt="ACP Group Logo"
        fill
        priority
        className="object-contain"
        sizes="(max-width: 768px) 128px, 128px"
      />
    </div>
  );
}
