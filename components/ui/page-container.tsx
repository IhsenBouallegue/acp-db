import { cn } from "@/lib/utils";
import * as React from "react";

const PageContainer = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <main ref={ref} className={cn("flex flex-1 flex-col gap-4 p-4 pt-4 md:pt-6 md:gap-4 md:p-8", className)} {...props}>
      {children}
    </main>
  ),
);
PageContainer.displayName = "PageContainer";

export { PageContainer };
