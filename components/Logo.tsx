import Image from "next/image";

export function Logo() {
  return (
    <div className="relative h-8 w-32">
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
