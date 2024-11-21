import { cn } from "@/lib/utils";
import * as React from "react";

const PageHeading = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, children, ...props }, ref) => (
    <h1
      ref={ref}
      className={cn("text-2xl text-center font-bold md:text-left md:text-3xl md:mb-2", className)}
      {...props}
    >
      {children}
    </h1>
  ),
);
PageHeading.displayName = "PageHeading";

export { PageHeading };
