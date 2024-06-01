"use client";

import { useCallback, useEffect, useState, useMemo } from "react";
import { useSession } from 'next-auth/react';
import Members from './_components/Members';
import SpeedDialTooltipOpen from './_components/SpeedDialTooltipOpen';
import BottomNavigation from '@/app/_components/_shared/BottomNavigation';
import type { Member } from '@/app/types/index';

export default function Home({ params }: { params: { slug: string } }) {
  const { data: session, status } = useSession();
  const [members, setMembers] = useState([] as Member[]);
  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}`;
  const token = session?.user.accessToken;
  const headers = useMemo(() => {
    const baseHeaders = {
      'slug': `${params.slug}`,
      'Content-Type': 'application/json',
    };
    if (token) {
      return {
        ...baseHeaders,
        Authorization: `Bearer ${token}`,
      };
    }
    return baseHeaders;
  }, [token, params.slug]);
  console.log(session);
  console.log(token);
  console.log(headers);

  const fetchMemberData = useCallback(async () => {
    console.log("メンバーを取得");
    const response = await fetch(`${API_URL}/members`, {
      method: 'GET',
      headers: headers
    });
    const data = await response.json();
      setMembers(data);
  }, []);

  useEffect(() => {
    fetchMemberData();
  }, [fetchMemberData]);

  const handleDelete = async (id: number) => {
    console.log("メンバーを取得");
    const response = await fetch(`${API_URL}/`, {
      method: 'GET',
      headers: headers
    });
    const data = await response.json();
      setMembers(data);
  };

  const addGroupToUser = useCallback(async () => {
    console.log("グループをユーザーに追加");
    await fetch(`${API_URL}/user_groups`, {
      method: "POST",
      headers: headers,
    });
  }, [headers, API_URL]);

  useEffect(() => {
    if (status === 'authenticated') {
      addGroupToUser();
    }
  }, [status, addGroupToUser]);

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
