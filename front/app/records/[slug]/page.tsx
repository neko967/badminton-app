"use client";

import { useSession } from 'next-auth/react';
import Records from './_components/Records';
import useMediaQuery from '@mui/material/useMediaQuery';
import Grid from '@mui/material/Grid';
import BottomNavigation from '@/app/_components/_shared/BottomNavigation';
import Sidebar from '@/app/_components/_shared/Sidebar';

export default function Home({ params }: { params: { slug: string } }) {
  const { data: session, status } = useSession();
  const isDesktop = useMediaQuery('(min-width:699px)');
  const isLarge = useMediaQuery('(min-width:899px)');

  return (
    <Grid container>
    {isDesktop && (
      <Grid item xs={isLarge ? 3 : 1}>
        <Sidebar params={params} currentPage="records" />
      </Grid>
    )}
    <Grid item xs={isDesktop ? isLarge ? 5 : 6 : 12}>
      {status === 'loading' ? 
        <div>Loading...</div>
      :
        <Records params={params}/>
      }
      {!isDesktop && <BottomNavigation params={params} bottomValue={1}/>}
    </Grid>
    {isDesktop && (
      <Grid item xs={isLarge ? 4 : 5}>
      </Grid>
    )}
  </Grid>
  );
}
