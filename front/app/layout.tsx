import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GoogleTagManager, GoogleAnalytics } from '@next/third-parties/google'

import { getServerSession } from "next-auth/next";
import NextAuthProvider from '@/providers/NextAuth';

import Header from "@/app/_components/_shared/header";
import BottomNavigation from '@/app/_components/_shared/BottomNavigation';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "試合決めるくん",
  description: "バドミントンの試合を組むアプリ",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <Header />
          {children}
          <BottomNavigation />
        </NextAuthProvider>
      </body>
      <GoogleTagManager gtmId={`${process.env.NEXT_PUBLIC_GA_ID}`}/>
      <GoogleAnalytics gaId={`${process.env.NEXT_PUBLIC_GA_ID}`} />
    </html>
  );
}
