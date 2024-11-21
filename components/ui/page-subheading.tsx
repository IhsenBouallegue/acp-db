import { cn } from "@/lib/utils";
import * as React from "react";

const PageSubheading = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, children, ...props }, ref) => (
    <h2
      ref={ref}
      className={cn("text-lg text-center text-muted-foreground mb-6 md:text-left md:text-xl", className)}
      {...props}
    >
      {children}
    </h2>
  ),
);
PageSubheading.displayName = "PageSubheading";

export { PageSubheading };
