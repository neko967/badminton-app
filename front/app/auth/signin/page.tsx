"use client";

import { getSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from "next/link";

export default function SignInPage() {
  const router = useRouter();

  useEffect(() => {
    async function checkSession() {
      const session = await getSession();
      if (session) {
        router.push('/');
      }
    }
    checkSession();
  }, [router]);

  return (
    <div className="flex items-center justify-center w-full h-[calc(100vh-var(--header-height))] relative z-10 pt-36">
      <div className="grid gap-8 justify-center items-center p-10 w-11/12 border border-gray-600 rounded-lg bg-white md:max-w-lg">
        <h1 className="text-center text-black text-2xl font-bold">Sign In</h1>
        <div className="grid gap-5 justify-center items-center">
          <div>
            <button
              onClick={() => signIn('google', {}, { prompt: 'login' })}
              className="bg-white border border-gray-600 p-4 rounded-3xl h-11 w-50 flex items-center cursor-pointer hover:bg-gray-100"
            >
              <div className="flex-1 text-black text-sm font-medium text-center">
                Sign in with Google
              </div>
            </button>
          </div>
        </div>
        <div className="text-xs text-black md:text-sm">
          続けることにより、
          <Link href="https://www.kiyac.app/termsOfService/FcbIUNNQitS7bX6Q3G4M" className="underline">利用規約</Link>
          に同意し、
          <Link href="https://www.kiyac.app/privacypolicy/PjJVth4jmcgDBcCzoWIG" className="underline">プライバシーポリシー</Link>
          を理解したうえで、個人情報の取り扱いに同意したものとみなされます。
        </div>
      </div>
    </div>
  );
}
