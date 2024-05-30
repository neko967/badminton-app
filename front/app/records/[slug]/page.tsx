"use client";

import Records from './_components/Records';
import { useSession } from 'next-auth/react';
import BottomNavigation from '@/app/_components/_shared/BottomNavigation';

export default function Home({ params }: { params: { slug: string } }) {
  const { data: session, status } = useSession();

  return (
    <>
      {session ?
        <>
          <Records params={params}/>
          <BottomNavigation params={params} bottomValue={1}/>
        </>
      :
        <div className="text-start px-6 mt-6">
          <p>ログインをしてください</p>
        </div>
      } 
    </>
  );
}
