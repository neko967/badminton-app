"use client";

import { useSession } from 'next-auth/react';
import Records from './_components/Records';
import BottomNavigation from '@/app/_components/_shared/BottomNavigation';

export default function Home({ params }: { params: { slug: string } }) {
  const { data: session, status } = useSession();

  return (
    <>
      {status === 'loading' ? 
        <div>Loading...</div>
      :
        <Records params={params}/>
      }
      <BottomNavigation params={params} bottomValue={1}/>
    </>
  );
}
