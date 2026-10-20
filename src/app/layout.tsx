import { Inter, Geist_Mono } from "next/font/google";
import type { Metadata } from "next";

import "./globals.css";
import { AgentationToolbar } from "@/components/agentation-toolbar";
import { cn } from "@/lib/utils";
import ThemeProvider from "@/components/providers/provider";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SkillNearMe",
  description: "Find local mentors, tutors, and teachers near you",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("font-sans", fontSans.variable, fontMono.variable)}
    >
      <body className="font-sans antialiased bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <AgentationToolbar />
        </ThemeProvider>
      </body>
    </html>
  );
}
