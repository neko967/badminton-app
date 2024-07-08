// front/app/_components/_shared/Sidebar.tsx
import React from 'react'
import Link from 'next/link';
import HomeIcon from '@mui/icons-material/Home';
import RestoreIcon from '@mui/icons-material/Restore';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function Sidebar({ params, currentPage }: { params: { slug: string }, currentPage: string }) {
  const isLarge = useMediaQuery('(min-width:899px)');

  return (
    <>
      {isLarge ?
        <div className="bg-gray-100 p-4 min-h-screen">
          <nav>
            <ul>
              <li className={`mb-4 ${currentPage === 'members' ? 'font-bold' : ''}`}>
                <Link href={`/members/${params.slug}`} className="flex items-center">
                  <HomeIcon className="mr-2" />
                  メンバー
                </Link>
              </li>
              <li className={`mb-4 ${currentPage === 'records' ? 'font-bold' : ''}`}>
                <Link href={`/records/${params.slug}`} className="flex items-center">
                  <RestoreIcon className="mr-2" />
                  試合記録
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        :
        <div className="bg-gray-100 p-4 min-h-screen">
          <nav>
            <ul>
              <li className={`mb-4 ${currentPage === 'members' ? 'font-bold' : ''}`}>
                <Link href={`/members/${params.slug}`} className="flex items-center">
                  <HomeIcon className="mr-2" />
                </Link>
              </li>
              <li className={`mb-4 ${currentPage === 'records' ? 'font-bold' : ''}`}>
                <Link href={`/records/${params.slug}`} className="flex items-center">
                  <RestoreIcon className="mr-2" />
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      }
    </>
  );
}
