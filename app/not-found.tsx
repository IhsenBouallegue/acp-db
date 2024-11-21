import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ConstructionIcon, HardHat } from "lucide-react";
import Link from "next/link";

// Extracted variables for easy manipulation
const backgroundEffect = {
  lineAngle: 45, // in degrees
  lineWidth: 3, // in pixels
  lineSpacing: 30, // in pixels
  lineOpacity: 0.09,
  lineColor: "var(--primary)", // CSS variable for color
  vignetteStart: 40, // percentage where the vignette starts
  vignetteEnd: 80, // percentage where the vignette ends
};

export default function NotFound() {
  return (
    <div className="h-full flex items-start justify-center bg-background relative overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              ${backgroundEffect.lineAngle}deg,
              transparent,
              transparent ${backgroundEffect.lineSpacing}px,
              hsl(${backgroundEffect.lineColor} / ${backgroundEffect.lineOpacity}) ${backgroundEffect.lineSpacing}px,
              hsl(${backgroundEffect.lineColor} / ${backgroundEffect.lineOpacity}) ${backgroundEffect.lineSpacing + backgroundEffect.lineWidth}px
            )`,
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 z-10"
        style={{
          background: `radial-gradient(circle, transparent ${backgroundEffect.vignetteStart}%, hsl(var(--background)) ${backgroundEffect.vignetteEnd}%)`,
        }}
        aria-hidden="true"
      />
      <Card className="w-full max-w-md shadow-lg relative z-20 bg-card/95 backdrop-blur-sm mt-[10vh]">
        <CardHeader>
          <CardTitle className="text-4xl font-bold text-center text-primary">404</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center space-x-4">
            <HardHat className="h-12 w-12 text-muted-foreground" />
            <ConstructionIcon className="h-12 w-12 text-muted-foreground" />
          </div>
          <p className="text-center text-xl font-semibold text-card-foreground">Under Construction</p>
          <p className="text-center text-muted-foreground">
            We're still working on this page. Our team is building new features to enhance your experience.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center space-x-4">
          <Button asChild variant="outline">
            <Link href="/">Go to Dashboard</Link>
          </Button>
          <Button asChild>
            <Link href="/master-data">Explore Metalstrips & Tools</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
