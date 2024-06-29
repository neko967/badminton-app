import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GoogleTagManager, GoogleAnalytics } from '@next/third-parties/google'
import { getServerSession } from "next-auth/next";
import NextAuthProvider from '@/providers/NextAuth';
import Header from "@/app/_components/_shared/header";
import Footer from "@/app/_components/_shared/Footer";

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
  const provider = 'google';

  return (
    <html lang="en">
      <head>
        <title>試合決めるくん</title>
        <meta name="description" content="バドミントンの試合を組むアプリ" />
        <link rel="icon" href="/favicon.ico" />

        {/*セキュリティの確認*/}
        <meta name="google-site-verification" content="petThx0QzEMbItpCzT_5-l-4mArZyRgX6k9ssRHYMbY" />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="試合決めるくん" />
        <meta property="og:description" content="バドミントンの試合を組むアプリ" />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_FRONT_URL}/og-image.jpg`} />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_FRONT_URL}`} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="試合決めるくん" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="試合決めるくん" />
        <meta name="twitter:description" content="バドミントンの試合を組むアプリ" />
        <meta name="twitter:image" content={`${process.env.NEXT_PUBLIC_FRONT_URL}/og-image.jpg`} />
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <NextAuthProvider>
          <Header provider={provider} />
          <main className="flex-grow">{children}</main>
          <Footer />
        </NextAuthProvider>
      </body>
      <GoogleTagManager gtmId={`${process.env.NEXT_PUBLIC_GA_ID}`}/>
      <GoogleAnalytics gaId={`${process.env.NEXT_PUBLIC_GA_ID}`} />
    </html>
  );
}
