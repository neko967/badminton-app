// front/app/_components/_shared/Sidebar.tsx
import React from 'react'
import Link from 'next/link';
import HomeIcon from '@mui/icons-material/Home';
import RestoreIcon from '@mui/icons-material/Restore';

export default function Sidebar({ params, currentPage }: { params: { slug: string }, currentPage: string }) {
  return (
    <div className="w-80 bg-gray-100 left-0 top-0 p-4">
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
  );
}
