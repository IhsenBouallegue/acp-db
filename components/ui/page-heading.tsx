import { cn } from "@/lib/utils";
import * as React from "react";

const PageHeading = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, children, ...props }, ref) => (
    <h1 ref={ref} className={cn("text-2xl font-bold mb-2 md:text-3xl md:mb-6", className)} {...props}>
      {children}
    </h1>
  ),
);
PageHeading.displayName = "PageHeading";

export { PageHeading };
