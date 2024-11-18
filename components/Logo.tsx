import Image from "next/image";

export function Logo() {
  return (
    <div className="flex items-center gap-2 flex-col py-2">
      <Image src="/acp_group.png" alt="ACP Group Logo" width={200} height={64} className="object-contain" />
      <div className="flex items-baseline">
        <span className="text-xl font-bold text-accent">ACP DB</span>
      </div>
    </div>
  );
}
