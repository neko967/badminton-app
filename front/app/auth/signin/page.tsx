"use client";

import { getSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

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
    <div>
      <h1>Sign In</h1>
      <button onClick={() => signIn('google', {}, { prompt: 'login' })}>
        Sign in with Google
      </button>
    </div>
  );
}
