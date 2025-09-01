import { type Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { cn } from "~/lib/utils";
import HydrationSafeApp from "~/components/client/HydrationSafeApp";
import "~/styles/globals.css";

export const metadata: Metadata = {
  title: "Video Sentiment Analyzer",
  description: "AI-powered video sentiment analysis with real-time processing",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body suppressHydrationWarning={true}>
        <HydrationSafeApp>
          <div className={cn("min-h-screen bg-background font-sans antialiased")}>
            {children}
          </div>
        </HydrationSafeApp>
      </body>
    </html>
  );
}
