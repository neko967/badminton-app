"use client";

import Image from "next/image";
import Link from "next/link";
import { useSession } from 'next-auth/react';
import Login from './login';
import Logout from './logout';

const Header = () => {
  const { data: session, status } = useSession();

  return (
    <header className="flex items-center justify-between bg-white p-4 shadow-md">
      <div className="flex items-center">
        <Link href="/" className="text-xl font-bold">
          試合決めるくん
        </Link>
      </div>
      <ul className="flex items-center space-x-4">
        {session ? (
          <>
            <li>
              <Image
                src={session.user?.image ?? ""}
                alt={session.user?.name ?? ""}
                width={40}
                height={40}
                className="rounded-full"
              />
            </li>
            <li>
              <Logout />
            </li>
          </>
        ) : (
          <Login />
        )}
      </ul>
    </header>
  );
};

export default Header;
