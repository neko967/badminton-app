"use client";

import Records from '@/app/records/_component/Records';
import { useSession } from 'next-auth/react';

export default function Home() {
  const { data: session, status } = useSession();

  return (
    <>
      {session ?
        <Records />
      :
        <div className="text-start px-6 mt-6">
          <p>ログインをしてください</p>
        </div>
      } 
    </>
  );
}
