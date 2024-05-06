"use client";

import React from 'react'
import Paper from '@mui/material/Paper';
import HomeIcon from '@mui/icons-material/Home';
import RestoreIcon from '@mui/icons-material/Restore';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { useRouter } from 'next/navigation';
import { useState } from "react";

export default function Menu() {
  const [value, setValue] = useState(0);
  const router = useRouter();

  return (
    <div>
      <Box sx={{ flexGrow: 1, display: { sm: 'none', xs: 'block' } }} className="mt-36">
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
          <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          >
            <BottomNavigationAction icon={<HomeIcon />} onClick={() => router.push('/')}/>
            <BottomNavigationAction icon={<RestoreIcon />} onClick={() => router.push('/records')}/>
          </BottomNavigation>
        </Paper> 
      </Box>
    </div>
  );
}
