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
import Button from '@mui/material/Button';
import PersonIcon from '@mui/icons-material/Person';
import PeopleIcon from '@mui/icons-material/People';
import SinglesSelectDialog from './_components/SinglesSelectDialog';
import DoublesSelectDialog from './_components/DoublesSelectDialog';

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

  const [singlesOpen, setSinglesOpen] = useState(false);
  const handleSinglesClickOpen = () => {
    setSinglesOpen(true);
  };
  const handleSinglesClose = () => {
    setSinglesOpen(false);
  };

  const [doublesOpen, setDoublesOpen] = useState(false);
  const handleDoublesClickOpen = () => {
    setDoublesOpen(true);
  };
  const handleDoublesClose = () => {
    setDoublesOpen(false);
  };

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
          <Members
            members={members}
            handleMemberDelete={handleMemberDelete}
            group={group}
            fetchMemberData={fetchMemberData}
            params={params}
          />
        }
      </Grid>
      {isDesktop && (
        <Grid item xs={isLarge ? 4 : 5}>
          <AddMemberPanel
            members={members}
            fetchMemberData={fetchMemberData}
            params={params}
          />
          <div className="flex flex-col space-y-4 mt-4 mx-4">
            <Button
              onClick={handleSinglesClickOpen}
              startIcon={<PersonIcon />}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md transition duration-300 ease-in-out"
            >
              シングルスを作成する
            </Button>
            <Button
              onClick={handleDoublesClickOpen}
              startIcon={<PeopleIcon />}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded shadow-md transition duration-300 ease-in-out"
            >
              ダブルスを作成する
            </Button>
          </div>
        </Grid>
      )}
      {!isDesktop && (
        <>
          <SpeedDialTooltipOpen
            members={members}
            fetchMemberData={fetchMemberData}
            params={params}
            handleSinglesClickOpen={handleSinglesClickOpen}
            handleDoublesClickOpen={handleDoublesClickOpen}
          />
          <BottomNavigation params={params} bottomValue={0}/>
        </>
      )}
      <SinglesSelectDialog
        members={members}
        singlesOpen={singlesOpen}
        handleSinglesClose={handleSinglesClose}
        params={params}
      />
      <DoublesSelectDialog
        members={members}
        doublesOpen={doublesOpen}
        handleDoublesClose={handleDoublesClose}
        params={params}
      />
    </Grid>
  );
}
