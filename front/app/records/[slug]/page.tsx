"use client";

import Records from './_components/Records';
import BottomNavigation from '@/app/_components/_shared/BottomNavigation';

export default function Home({ params }: { params: { slug: string } }) {

  return (
    <>
      <Records params={params}/>
      <BottomNavigation params={params} bottomValue={1}/>
    </>
  );
}
