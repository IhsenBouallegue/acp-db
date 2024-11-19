import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Providers from "@/app/providers";
import { AppSidebar } from "@/components/app-sidebar";
import { TopBar } from "@/components/app-topbar";
import { Toaster } from "sonner";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Overview",
  description: "ACP DB",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <AppSidebar />
          <div className="flex flex-col flex-1">
            <TopBar />
            <main className="flex-1 p-8">{children}</main>
          </div>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
