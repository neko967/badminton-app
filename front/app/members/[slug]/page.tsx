"use client";

import { useCallback, useEffect, useState } from "react";
import { useSession } from 'next-auth/react';
import Members from './_components/Members';
import SpeedDialTooltipOpen from './_components/SpeedDialTooltipOpen';
import BottomNavigation from '@/app/_components/_shared/BottomNavigation';
import type { Member } from '@/app/types/index';

export default function Home({ params }: { params: { slug: string } }) {
  const { data: session, status } = useSession();
  const [members, setMembers] = useState([] as Member[]);
  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}`;

  const fetchMemberData = useCallback(async () => {
    const response = await fetch(`${API_URL}/members`, {
      method: 'GET',
      headers: {
        'slug': `${params.slug}`,
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    setMembers(data);
  }, [API_URL, params]);

  useEffect(() => {
    fetchMemberData();
  }, [fetchMemberData]);

  const handleDelete = async (id: number) => {
    const response = await fetch(`${API_URL}/`, {
      method: 'GET',
      headers: {
        'slug': `${params.slug}`,
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    setMembers(data);
  };

  useEffect(() => {
    if (status === 'authenticated') {
      const addGroupToUser = async () => {
        await fetch(`${API_URL}/user_groups`, {
          method: "POST",
          headers: {
            'slug': `${params.slug}`,
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.user.accessToken}`,
          },
        });
      };
      addGroupToUser();
    }
  }, [status, API_URL ,params, session]);

  return (
    <>
      {status === 'loading' ? 
        <div>Loading...</div>
      :
        <Members
          members={members}
          handleDelete={handleDelete}
        />
      }
      <SpeedDialTooltipOpen
        members={members}
        fetchMemberData={fetchMemberData}
        params={params}
      />
      <BottomNavigation params={params} bottomValue={0}/>
    </>
  );
}
