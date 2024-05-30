"use client";

import { useCallback, useEffect, useState } from "react";
import { useSession } from 'next-auth/react';
import Members from './_components/Members';
import SpeedDialTooltipOpen from './_components/SpeedDialTooltipOpen';
import BottomNavigation from '@/app/_components/_shared/BottomNavigation';
import type { Member } from '@/app/types/index';

export default function Home({ params }: { params: { slug: string } }) {
  const [members, setMembers] = useState([] as Member[]);
  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}/members`;
  const { data: session, status } = useSession();

  const fetchMemberData = useCallback(async () => {
    const headers = {
      'slug': `${params.slug}`,
      'Content-Type': 'application/json',
    };
    const response = await fetch(`${API_URL}`, {
      method: 'GET',
      headers: headers,
    });
    const data = await response.json();
      setMembers(data);
  }, [session]);

  useEffect(() => {
    if (session) {
      fetchMemberData();
    }
  }, [session, fetchMemberData]);
  
  const handleDelete = async (id: number) => {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    }).then(() => {
      fetchMemberData();
    });
  };

  return (
    <>
      {session ?
        <>
          <Members
            members={members}
            handleDelete={handleDelete}
          />
          <SpeedDialTooltipOpen
            members={members}
            fetchMemberData={fetchMemberData}
            params={params}
          />
          <BottomNavigation params={params} bottomValue={0}/>
        </>
      :
        <div className="text-start px-6 mt-6">
          <p>ログインをしてください</p>
        </div>
      }
    </>
  );
}
