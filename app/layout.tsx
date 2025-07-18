import type { Metadata } from "next";
import {Playfair_Display } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Provider from "./provider";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "TrendTide - AI-Powered YouTube Analytics & Growth Platform",
  description: "Track, analyze & grow your YouTube channel with AI. Generate thumbnails, optimize content, discover trending keywords, and boost performance with intelligent insights.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${playfairDisplay.variable} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
            storageKey="trendtide-theme"
          >
            <Provider>{children}</Provider>
            <Toaster richColors />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
