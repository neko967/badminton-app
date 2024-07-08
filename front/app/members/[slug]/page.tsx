"use client";

import { useCallback, useEffect, useState } from "react";
import { useSession } from 'next-auth/react';
import useMediaQuery from '@mui/material/useMediaQuery';
import Grid from '@mui/material/Grid';
import Members from './_components/Members';
import SpeedDialTooltipOpen from './_components/SpeedDialTooltipOpen';
import BottomNavigation from '@/app/_components/_shared/BottomNavigation';
import Sidebar from '@/app/_components/_shared/Sidebar';
import AddMemberPanel from './_components/AddMemberPanel';
import type { Member } from '@/app/types/index';
import type { Group } from '@/app/types/index';

export default function Home({ params }: { params: { slug: string } }) {
  const { data: session, status } = useSession();
  const [members, setMembers] = useState([] as Member[]);
  const [group, setGroup] = useState<Group | undefined>();
  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}`;
  const isDesktop = useMediaQuery('(min-width:699px)');
  const isLarge = useMediaQuery('(min-width:899px)');

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

  return (
    <Grid container>
      {isDesktop && (
        <Grid item xs={isLarge ? 3 : 1}>
          <Sidebar params={params} currentPage="members" />
        </Grid>
      )}
      <Grid item xs={isDesktop ? isLarge ? 5 : 6 : 12}>
        {status === 'loading' ? 
          <div>Loading...</div>
        :
        <>
          <Members
            members={members}
            handleMemberDelete={handleMemberDelete}
            group={group}
            fetchMemberData={fetchMemberData}
            params={params}
          />
        </>
        }
        <SpeedDialTooltipOpen
          members={members}
          fetchMemberData={fetchMemberData}
          params={params}
        />
        {!isDesktop && <BottomNavigation params={params} bottomValue={0}/>}
      </Grid>
      {isDesktop && (
        <Grid item xs={isLarge ? 4 : 5}>
          <AddMemberPanel
            members={members}
            fetchMemberData={fetchMemberData}
            params={params}
          />
        </Grid>
      )}
    </Grid>
  );
}
