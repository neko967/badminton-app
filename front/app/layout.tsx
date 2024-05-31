import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GoogleTagManager, GoogleAnalytics } from '@next/third-parties/google'
import { getServerSession } from "next-auth/next";
import NextAuthProvider from '@/providers/NextAuth';
import Header from "@/app/_components/_shared/header";

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
      <head>
        <title>試合決めるくん</title>
        <meta name="description" content="バドミントンの試合を組むアプリ" />
        <meta property="og:title" content="試合決めるくん" />
        <meta property="og:description" content="バドミントンの試合を組むアプリ" />
        <meta property="og:image" content="/og-image.jpg" />
        <meta property="og:url" content="https://badminton-app-six.vercel.app" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="試合決めるくん" />
      </head>
      <body className={inter.className}>
        <NextAuthProvider>
          <Header />
          {children}
        </NextAuthProvider>
      </body>
      <GoogleTagManager gtmId={`${process.env.NEXT_PUBLIC_GA_ID}`}/>
      <GoogleAnalytics gaId={`${process.env.NEXT_PUBLIC_GA_ID}`} />
    </html>
  );
}
