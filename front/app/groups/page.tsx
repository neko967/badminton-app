"use client";

import { useCallback, useEffect, useState } from "react";
import { useSession } from 'next-auth/react';
import Groups from './Groups';
import SpeedDialTooltipOpen from './SpeedDialTooltipOpen';
import type { Group } from '@/app/types/index';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

export default function Home() {
  const [groups, setGroups] = useState([] as Group[]);
  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}`;
  const { data: session, status } = useSession();

  const fetchGroupsData = useCallback(async () => {
    if (!session?.user.accessToken) {
      console.error("Access token is missing");
      return;
    }
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.user.accessToken}`,
    };
    const response = await fetch(`${API_URL}/groups`, {
      method: 'GET',
      headers: headers,
      next: { revalidate: 3600 },
    });
    if (response.ok) {
      const data = await response.json();
      setGroups(data);
    } else {
      console.error("Failed to fetch groups data");
      signIn("google", { callbackUrl: "/" })
    }
  }, [session, API_URL]);

  useEffect(() => {
    fetchGroupsData();
  }, [fetchGroupsData]);

  const handleGroupDelete = async (id: number) => {
    const name = prompt(`グループを削除すると、今までのメンバーと試合記録が失われます。グループを削除する場合は、下の記入欄に"${groups.find(group => group.id === id)?.name}"と入力してください。`);
    if (name == groups.find(group => group.id === id)?.name) {
      await fetch(`${API_URL}/groups/${id}`, {
        method: "DELETE",
      }).then(() => {
        fetchGroupsData();
      });
    }
  };

  if (status === 'loading') {
  	return <div>Loading...</div>;
  }

  return (
    <>
      <Groups
        groups={groups}
        handleGroupDelete={handleGroupDelete}
        fetchGroupsData={fetchGroupsData}
      />
      <SpeedDialTooltipOpen
        groups={groups}
        fetchGroupsData={fetchGroupsData}
      />
    </>
  );
}
