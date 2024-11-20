import Providers from "@/app/providers";
import { TopBar } from "@/components/app-topbar";
import { SidebarInset } from "@/components/ui/sidebar";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Toaster } from "sonner";
import "./globals.css";
import { AppSidebar } from "@/components/app-sidebar";
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
  title: "ACP DB Dashboard",
  description: "ACP DB",
};

export default function RootLayout({
  breadcrumb,
  children,
}: Readonly<{
  breadcrumb: React.ReactNode;
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <AppSidebar />
          <SidebarInset>
            <TopBar breadcrumb={breadcrumb} />
            <main className="flex-1 h-[calc(100vh-4rem)]">{children}</main>
            <Toaster />
          </SidebarInset>
        </Providers>
      </body>
    </html>
  );
}
