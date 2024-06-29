"use client";

import React from 'react'
import { useRouter } from 'next/navigation';

export default function Footer() {
  const router = useRouter();

  return (
    <footer className="bg-gray-100 text-gray-800 p-10 mt-auto w-full h-72">
      <nav className="flex justify-around">
        <div>
          <a className="block hover:underline mb-2" href="https://www.kiyac.app/termsOfService/FcbIUNNQitS7bX6Q3G4M">利用規約</a>
          <a className="block hover:underline mb-2" href="https://www.kiyac.app/privacypolicy/PjJVth4jmcgDBcCzoWIG">プライバシーポリシー</a>
          <a className="block hover:underline" href="https://forms.gle/tmB6rgzjFvqtunbh9">お問い合わせ</a>
        </div>
      </nav>
    </footer>
  );
}
