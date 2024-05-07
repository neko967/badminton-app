"use client";

import { useCallback, useEffect, useState } from "react";
import { useSession } from 'next-auth/react';
import Members from './_components/Members';
import SpeedDialTooltipOpen from './_components/SpeedDialTooltipOpen';
import type { Member } from '@/app/types/index';

export default function Home() {
  const [members, setMembers] = useState([] as Member[]);
  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}/members`;
  const { data: session, status } = useSession();

  const fetchData = useCallback(async () => {
    const headers = {
      'uid': `${session?.user?.id}`,
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
          <Members
            members={members}
            handleDelete={handleDelete}
          />
          <SpeedDialTooltipOpen
            members={members}
            fetchData={fetchData}
          />
        </>
      :
        <div className="text-start px-6 mt-6">
          <p>ログインをしてください</p>
        </div>
      }
    </>
  );
}
