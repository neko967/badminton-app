"use client";

import { useSession } from 'next-auth/react';
import Records from './_components/Records';
import useMediaQuery from '@mui/material/useMediaQuery';
import BottomNavigation from '@/app/_components/_shared/BottomNavigation';
import Sidebar from '@/app/_components/_shared/Sidebar';

export default function Home({ params }: { params: { slug: string } }) {
  const { data: session, status } = useSession();
  const isDesktop = useMediaQuery('(min-width:699px)');

  return (
    <div className={`${isDesktop ? 'flex' : ''}`}>
      {isDesktop && <Sidebar params={params} currentPage="records" />}
      <div className="flex-grow">
        {status === 'loading' ? 
          <div>Loading...</div>
        :
          <Records params={params}/>
        }
        {!isDesktop && <BottomNavigation params={params} bottomValue={1}/>}
      </div>
    </div>
  );
}
