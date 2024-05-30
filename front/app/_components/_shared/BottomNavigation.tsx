"use client";

import React from 'react'
import Paper from '@mui/material/Paper';
import HomeIcon from '@mui/icons-material/Home';
import RestoreIcon from '@mui/icons-material/Restore';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { useRouter } from 'next/navigation';

export default function Menu({ params, bottomValue }: { params: { slug: string }, bottomValue: number }) {
  const router = useRouter();

  return (
    <div>
      <Box sx={{ flexGrow: 1 }} className="mt-36">
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
          <BottomNavigation
            showLabels
            value={bottomValue}
          >
            <BottomNavigationAction label="メンバー" icon={<HomeIcon />} onClick={() => router.push(`/members/${params.slug}`)}/>
            <BottomNavigationAction label="試合記録" icon={<RestoreIcon />} onClick={() => router.push(`/records/${params.slug}`)}/>
          </BottomNavigation>
        </Paper>
      </Box>
    </div>
  );
}
