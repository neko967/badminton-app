"use client";

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signOut, signIn } from 'next-auth/react';
import Image from "next/image";
import Link from "next/link";
import error from "next/error";
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import LinkIcon from '@mui/icons-material/Link';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import ArticleIcon from '@mui/icons-material/Article';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import CloseIcon from '@mui/icons-material/Close';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

type Anchor = 'right';

interface State extends SnackbarOrigin {
  open: boolean;
}

interface HeaderProps {
  provider: string;
}

const Header: React.FC<HeaderProps> = ({ provider }) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
      <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <CloseIcon />
            </ListItemIcon>
            <ListItemText primary={'閉じる'} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding onClick={() => signOut()}>
          <ListItemButton>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary={'ログアウト'} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding onClick={() => {urlCopyHandler(location.href); handleCopyLinkClick();}}>
          <ListItemButton>
            <ListItemIcon>
              <LinkIcon />
            </ListItemIcon>
            <ListItemText primary={'リンクをコピー'} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem disablePadding onClick={() => router.push(`https://www.kiyac.app/termsOfService/FcbIUNNQitS7bX6Q3G4M`)}>
          <ListItemButton>
            <ListItemIcon>
              <ArticleIcon />
            </ListItemIcon>
            <ListItemText primary={'利用規約'} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding onClick={() => router.push(`https://www.kiyac.app/privacypolicy/PjJVth4jmcgDBcCzoWIG`)}>
          <ListItemButton>
            <ListItemIcon>
              <PrivacyTipIcon />
            </ListItemIcon>
            <ListItemText primary={'プライバシーポリシー'} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding onClick={() => router.push(`https://forms.gle/tmB6rgzjFvqtunbh9`)}>
          <ListItemButton>
            <ListItemIcon>
              <ContactSupportIcon />
            </ListItemIcon>
            <ListItemText primary={'お問い合わせ'} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const before_login_list = (anchor: Anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
      <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <CloseIcon />
            </ListItemIcon>
            <ListItemText primary={'閉じる'} />
          </ListItemButton>
        </ListItem>
        <ListItem 
          disablePadding
          onClick={() => { signIn(provider, { callbackUrl: "/" }).catch(() => {
              console.error(error);
            });
          }}>
          <ListItemButton>
            <ListItemIcon>
              <LoginIcon />
            </ListItemIcon>
            <ListItemText primary={'ログイン'} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding onClick={() => {urlCopyHandler(location.href); handleCopyLinkClick();}}>
          <ListItemButton>
            <ListItemIcon>
              <LinkIcon />
            </ListItemIcon>
            <ListItemText primary={'リンクをコピー'} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem disablePadding onClick={() => router.push(`https://www.kiyac.app/termsOfService/FcbIUNNQitS7bX6Q3G4M`)}>
          <ListItemButton>
            <ListItemIcon>
              <ArticleIcon />
            </ListItemIcon>
            <ListItemText primary={'利用規約'} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding onClick={() => router.push(`https://www.kiyac.app/privacypolicy/PjJVth4jmcgDBcCzoWIG`)}>
          <ListItemButton>
            <ListItemIcon>
              <PrivacyTipIcon />
            </ListItemIcon>
            <ListItemText primary={'プライバシーポリシー'} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding onClick={() => router.push(`https://forms.gle/tmB6rgzjFvqtunbh9`)}>
          <ListItemButton>
            <ListItemIcon>
              <ContactSupportIcon />
            </ListItemIcon>
            <ListItemText primary={'お問い合わせ'} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const isBrowser = typeof window !== 'undefined';

  const urlCopyHandler = async (url: string) => {
    if (!isBrowser) return;

    try {
      await navigator.clipboard.writeText(url);
      console.log('URLのコピーに成功しました');
    } catch {
      console.error('URLのコピーに失敗しました');
    }
  };

  const [snackbarState, setSnackbarState] = React.useState<State>({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal, open } = snackbarState;

  const handleCopyLinkClick = () => {
    setSnackbarState({ vertical: 'top', horizontal: 'center', open: true });
  };

  const handleClose = () => {
    setSnackbarState({ ...snackbarState, open: false });
  };

  return (
    <header className="flex items-center justify-between bg-white p-4 shadow-md">
      <div className="flex items-center">
        <Link href="/" className="text-xl font-bold">
          試合決めるくん
        </Link>
      </div>
      <ul className="flex items-center space-x-4">
        <>
          {status === 'loading' && 
            <div>Loading...</div>
          }
          {status === 'unauthenticated' &&
            <li>
              <React.Fragment>
                <AccountCircleIcon 
                  sx={{ fontSize: 35 }}
                  className="rounded-full"
                  onClick={toggleDrawer('right', true)}
                />
                <SwipeableDrawer
                  anchor={'right'}
                  open={state['right']}
                  onClose={toggleDrawer('right', false)}
                  onOpen={toggleDrawer('right', true)}
                >
                  {before_login_list('right')}
                </SwipeableDrawer>
              </React.Fragment>
            </li>
          }
          {status === 'authenticated' &&
            <li>
              <React.Fragment>
                <Image
                  src={session.user?.picture ?? ""}
                  alt={session.user?.name ?? ""}
                  width={35}
                  height={35}
                  className="rounded-full"
                  onClick={toggleDrawer('right', true)}
                />
                <SwipeableDrawer
                  anchor={'right'}
                  open={state['right']}
                  onClose={toggleDrawer('right', false)}
                  onOpen={toggleDrawer('right', true)}
                >
                  {list('right')}
                </SwipeableDrawer>
              </React.Fragment>
            </li>
          }
        </>
      </ul>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message="リンクをコピーしました！"
        key={vertical + horizontal}
        autoHideDuration={1000}
      />
    </header>
  );
};

export default Header;
