"use client";

import { useCallback, useEffect, useState } from "react";
import { useSession } from 'next-auth/react';
import Members from './_components/Members';
import SpeedDialTooltipOpen from './_components/SpeedDialTooltipOpen';
import BottomNavigation from '@/app/_components/_shared/BottomNavigation';
import type { Member } from '@/app/types/index';
import type { Group } from '@/app/types/index';

export default function Home({ params }: { params: { slug: string } }) {
  const { data: session, status } = useSession();
  const [members, setMembers] = useState([] as Member[]);
  const [group, setGroup] = useState<Group | undefined>();
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
    setMembers(data.members);
    setGroup(data.group);
  }, [API_URL, params]);

  useEffect(() => {
    fetchMemberData();
  }, [fetchMemberData]);

  const handleMemberDelete = async (id: number) => {
    const name = prompt(`このメンバーを削除する場合は、下の記入欄に"${members.find(member => member.id === id)?.name}"と入力してください。`);
    if (name == members.find(member => member.id === id)?.name) {
      await fetch(`${API_URL}/members/${id}`, {
        method: 'DELETE',
        headers: {
          'slug': `${params.slug}`,
          'Content-Type': 'application/json',
        },
      }).then(() => {
        fetchMemberData();
      });
    }
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

  function isFullWidth(char: string) {
    return char.match(/[^\x00-\xff]/);
  }
  
  function truncateString(str: string, maxLength: number) {
    let length = 0;
    let truncated = '';
  
    for (let i = 0; i < str.length; i++) {
      const char = str[i];
      length += isFullWidth(char) ? 2 : 1;
      if (length > maxLength) {
        truncated += '...';
        break;
      }
      truncated += char;
    }
  
    return truncated;
  }

  return (
    <>
      {status === 'loading' ? 
        <div>Loading...</div>
      :
        <Members
          members={members}
          handleMemberDelete={handleMemberDelete}
          group={group}
          truncateString={truncateString}
          fetchMemberData={fetchMemberData}
          params={params}
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
