"use client";

import { useCallback, useEffect, useState } from "react";
import { useSession } from 'next-auth/react';

import Member from './_components/Member';
import SpeedDialTooltipOpen from './_components/SpeedDialTooltipOpen';

interface Member {
  id: number;
  name: string;
  singles_total_game: number;
  singles_win_game: number;
  singles_strength: number;
  doubles_total_game: number;
  doubles_win_game: number;
  doubles_strength: number;
  history: (SinglesRecord | DoublesRecord)[];
}

interface SinglesRecord {
  id: number;
  player_1: string;
  score_1: number;
  player_2: string;
  score_2: number;
  user_id: number;
  created_at: Date;
  updated_at: Date;
}

interface DoublesRecord {
  id: number;
  player_1: string;
  player_2: string;
  score_12: number;
  player_3: string;
  player_4: string;
  score_34: number;
  user_id: number;
  created_at: Date;
  updated_at: Date;
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
    {session ?
      <>
        <Member members={members} handleDelete={handleDelete}/>
        <SpeedDialTooltipOpen fetchData={fetchData}/>
      </>
    :
    <div className="text-start px-6 mt-6">
      <p>ログインをしてください</p>
    </div>
    }
    </>
  );
}
