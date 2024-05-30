"use client";

import { useCallback, useEffect, useState } from "react";
import { useSession } from 'next-auth/react';
import Groups from './_components/Groups';
import SpeedDialTooltipOpen from './_components/SpeedDialTooltipOpen';

interface Group {
  id: number;
  name: string;
  slug: string;
  admin_uid: string;
}

export default function Home() {
  const [groups, setGroups] = useState([] as Group[]);
  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}/groups`;
  const { data: session, status } = useSession();

  const fetchGroupsData = useCallback(async () => {
    const headers = {
      'uid': `${session?.user?.id}`,
      'Content-Type': 'application/json',
    };
    const response = await fetch(`${API_URL}`, {
      method: 'GET',
      headers: headers,
    });
    const data = await response.json();
    setGroups(data);
  }, [session]);

  useEffect(() => {
    if (session) {
      fetchGroupsData();
    }
  }, [session, fetchGroupsData]);
  
  const handleGroupDelete = async (id: number) => {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    }).then(() => {
      fetchGroupsData();
    });
  };

  return (
    <>
      {session ?
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
      :
        <div className="text-start px-6 mt-6">
          <p>ログインをしてください</p>
        </div>
      }
    </>
  );
}
