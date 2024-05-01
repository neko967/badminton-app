"use client";

import { useCallback, useEffect, useState } from "react";
import { useSession } from 'next-auth/react';

import Member from './_components/Member';
import SpeedDialTooltipOpen from './_components/SpeedDialTooltipOpen';

interface Member {
  id: number;
  name: string;
  singles_total_game: number;
  singles_twin_game: number;
  singles_tstrength: number;
  doubles_total_game: number;
  doubles_twin_game: number;
  doubles_tstrength: number;
}

export default function Home() {
  const [members, setMembers] = useState([] as Member[]);
  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}/members`;
  const { data: session, status } = useSession();

  const fetchData = useCallback(async () => {
    if (session) {
      const query = session.user?.email;
      const response = await fetch (`${API_URL}?email=${query}`);
      const data = await response.json();
      setMembers(data);
    }
  }, [session]);

  useEffect(() => {
    if (session) {
      fetchData();
    }
  }, [session, fetchData]);

  const handleDelete = async (id: number) => {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    }).then(() => {
      fetchData();
    });
  };

  return (
    <>
      <Member members={members} handleDelete={handleDelete}/>
      <SpeedDialTooltipOpen fetchData={fetchData}/>
    </>
  );
}
