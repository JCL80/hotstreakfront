import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../app/components/Header";
import { UserProvider } from "../contexts/UserContext";
import {GoogleAnalytics} from "@next/third-parties/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hot Streak | NBA Player Performance Tracker",
  description: "Track NBA players' hot and cold streaks with our custom Heat Index formula. Analyze recent performances and customize your own scoring system.",
  keywords: ["NBA", "basketball", "player stats", "hot streak", "performance tracking", "basketball analytics"],
  authors: [{ name: "Jorge Cambra" }],
  openGraph: {
    title: "Hot Streak | NBA Player Performance Tracker",
    description: "Track NBA players' hot and cold streaks with our custom Heat Index formula.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <UserProvider>
          <Header />
          {children}
          {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics
            gaId={process.env.NEXT_PUBLIC_GA_ID}
          />
        )}
        </UserProvider>
      </body>
    </html>
  );
}
