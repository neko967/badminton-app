"use client";

import { useCallback, useEffect, useState } from "react";
import Members from './_components/Members';
import SpeedDialTooltipOpen from './_components/SpeedDialTooltipOpen';
import BottomNavigation from '@/app/_components/_shared/BottomNavigation';
import type { Member } from '@/app/types/index';

export default function Home({ params }: { params: { slug: string } }) {
  const [members, setMembers] = useState([] as Member[]);
  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}/members`;

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
  }, []);

  useEffect(() => {
    fetchMemberData();
  }, [fetchMemberData]);
  
  const handleDelete = async (id: number) => {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    }).then(() => {
      fetchMemberData();
    });
  };

  return (
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
  );
}
