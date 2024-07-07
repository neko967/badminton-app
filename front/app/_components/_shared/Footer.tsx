"use client";

import React from 'react'
import Link from 'next/link';

export default function Footer() {

  return (
    <footer className="bg-gray-400 text-white grid grid-rows-[3fr_2fr_2fr] grid-cols-2 lg:grid-rows-[10fr_1fr] lg:grid-cols-3 lg:h-64 z-10 pb-12 lg:pb-0 pt-8 lg:pt-0">
      {/* Logo */}
      <div className="flex justify-center items-center col-span-2 lg:col-span-1 row-start-2 lg:row-start-1">
        <div className="relative w-42 h-42 bg-gray-400 rounded-full flex justify-center items-center">
          {/* ロゴの SVG または画像をここに配置 */}
          {/*<div className="text-white text-2xl font-bold">LOGO</div>*/}
        </div>
      </div>

      {/* Links */}
      <div className="flex justify-center items-center lg:col-span-1 row-start-1 col-start-2 lg:col-start-3">
        <ul className="grid gap-4">
          <li><Link href="/privacy" className="hover:border-b border-white/50">プライバシーポリシー</Link></li>
          <li><Link href="/terms" className="hover:border-b border-white/50">利用規約</Link></li>
          <li><Link href="https://forms.gle/tmB6rgzjFvqtunbh9" className="hover:border-b border-white/50">お問い合わせ</Link></li>
        </ul>
      </div>

      {/* Copyright */}
      <div className="flex justify-center items-center col-span-2 lg:col-span-3 row-start-3 lg:row-start-2">
        <small>©2024 試合決めるくん</small>
      </div>
    </footer>
  );
}
