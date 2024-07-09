import React from 'react'
import Link from 'next/link';
import HomeIcon from '@mui/icons-material/Home';
import RestoreIcon from '@mui/icons-material/Restore';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function Sidebar({ params, currentPage }: { params: { slug: string }, currentPage: string }) {
  const isLarge = useMediaQuery('(min-width:899px)');

  return (
    <>
        <div className='bg-gray-200 text-gray-700 p-4 min-h-screen shadow-md'>
          <nav>
            <ul className="space-y-4">
              <li>
                <Link
                  href={`/members/${params.slug}`}
                  className={`flex items-center p-3 rounded-lg transition-all duration-300 hover:bg-gray-300 ${
                    currentPage === 'members' && 'font-bold'
                  }`}
                >
                  <HomeIcon className={isLarge ? 'mr-3' : 'mx-auto'} />
                  {isLarge && <span className="text-lg">メンバー</span>}
                </Link>
              </li>
              <li>
                <Link 
                  href={`/records/${params.slug}`} 
                  className={`flex items-center p-3 rounded-lg transition-all duration-300 hover:bg-gray-300 ${
                    currentPage === 'records' && 'font-bold'
                  }`}
                >
                  <RestoreIcon className={isLarge ? 'mr-3' : 'mx-auto'} />
                  {isLarge && <span className="text-lg">試合記録</span>}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
    </>
  );
}
