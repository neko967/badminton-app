"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signOut, signIn } from 'next-auth/react';
import Image from "next/image";
import Link from "next/link";
import { Box, List, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, Snackbar } from '@mui/material';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import LinkIcon from '@mui/icons-material/Link';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import GroupsIcon from '@mui/icons-material/Groups';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import ArticleIcon from '@mui/icons-material/Article';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import CloseIcon from '@mui/icons-material/Close';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

interface HeaderProps {
  provider: string;
}

const Header: React.FC<HeaderProps> = ({ provider }) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const isDesktop = useMediaQuery('(min-width:699px)');
  const isBrowser = typeof window !== 'undefined';

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const copyToClipboard = async (url: string) => {
    if (isBrowser) {
      try {
        await navigator.clipboard.writeText(url);
        setSnackbarOpen(true);
      } catch (error) {
        console.error('Failed to copy URL', error);
      }
    }
  };

  const menuItems = [
    { text: '利用規約', icon: <ArticleIcon />, onClick: () => router.push('/terms') },
    { text: 'プライバシーポリシー', icon: <PrivacyTipIcon />, onClick: () => router.push('/privacy') },
    { text: 'お問い合わせ', icon: <ContactSupportIcon />, onClick: () => router.push('https://forms.gle/tmB6rgzjFvqtunbh9') },
  ];

  const authenticatedItems = [
    { text: '閉じる', icon: <CloseIcon />, onClick: toggleDrawer(false) },
    { text: 'ログアウト', icon: <LogoutIcon />, onClick: () => signOut() },
    { text: 'グループ一覧', icon: <GroupsIcon />, onClick: () => router.push('/groups') },
    { text: 'リンクをコピー', icon: <LinkIcon />, onClick: () => copyToClipboard(location.href) },
  ];

  const unauthenticatedItems = [
    { text: '閉じる', icon: <CloseIcon />, onClick: toggleDrawer(false) },
    { text: 'ログイン', icon: <LoginIcon />, onClick: () => signIn(provider, { callbackUrl: '/' }).catch(console.error) },
    { text: 'リンクをコピー', icon: <LinkIcon />, onClick: () => copyToClipboard(location.href) },
  ];

  const renderList = (items: any[]) => (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
      <List>
        {items.map((item, index) => (
          <ListItem key={index} disablePadding onClick={item.onClick}>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {menuItems.map((item, index) => (
          <ListItem key={index} disablePadding onClick={item.onClick}>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <header className="flex items-center justify-between bg-white px-6 py-4 shadow-md">
      <div className="flex items-center space-x-6">
        <Link href="/" className="text-2xl font-bold">試合決めるくん</Link>
        {session && isDesktop && (
          <Link href="/groups" className="text-lg font-medium text-gray-600 hover:text-indigo-600 transition-colors duration-200 border-b-2 border-transparent hover:border-indigo-600">
            グループ
          </Link>
        )}
      </div>
      <ul className="flex items-center space-x-4">
        {status === 'loading' && <div>Loading...</div>}
        {status === 'unauthenticated' && (
          <li>
            <AccountCircleIcon sx={{ fontSize: 35 }} className="rounded-full" onClick={toggleDrawer(true)} />
            <SwipeableDrawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)} onOpen={toggleDrawer(true)}>
              {renderList(unauthenticatedItems)}
            </SwipeableDrawer>
          </li>
        )}
        {status === 'authenticated' && (
          <li>
            <Image
              src={session.user?.picture ?? ""}
              alt={session.user?.name ?? ""}
              width={35}
              height={35}
              className="rounded-full"
              onClick={toggleDrawer(true)}
            />
            <SwipeableDrawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)} onOpen={toggleDrawer(true)}>
              {renderList(authenticatedItems)}
            </SwipeableDrawer>
          </li>
        )}
      </ul>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        message="リンクをコピーしました！"
        key="topcenter"
        autoHideDuration={1000}
      />
    </header>
  );
};

export default Header;
