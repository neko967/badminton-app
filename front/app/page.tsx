"use client";

import { useCallback, useEffect, useState } from "react";
import { useSession } from 'next-auth/react';
import Groups from './_components/Groups';
import SpeedDialTooltipOpen from './_components/SpeedDialTooltipOpen';
import Image from 'next/image';
import TopSmall from '../public/top-small.jpg';
import TopLarge from '../public/top-large.jpg';
import top1Gif from '../public/top1.gif';
import top2Gif from '../public/top2.gif';
import top3Gif from '../public/top3.gif';
import top4Gif from '../public/top4.gif';
import top5Gif from '../public/top5.gif';
import top6Gif from '../public/top6.gif';
import type { Group } from '@/app/types/index';
import { useMediaQuery, Grid } from '@mui/material';

export default function Home() {
  const [groups, setGroups] = useState([] as Group[]);
  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}`;
  const { data: session, status } = useSession();
  const isMdDown = useMediaQuery('(max-width: 899px)');

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
    if (!response.ok) {
      console.error("Failed to fetch groups data");
      return;
    }
    const data = await response.json();
    setGroups(data);
  }, [session, API_URL]);

  useEffect(() => {
    if (session) {
      fetchGroupsData();
    }
  }, [session, fetchGroupsData]);

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
        <>
          {isMdDown ? <Image src={TopSmall} alt="TopSmall" /> : <Image src={TopLarge} alt="TopLarge" />}
          <Grid container spacing={3} className="text-start px-6 mt-6">
            <Grid item xs={12} sm={6} md={4}>
              <p className="text-lg md:text-xl lg:text-xl">①ログイン状態でグループを作成します。</p>
              <Image src={top1Gif} alt="Example GIF" className="w-full max-w-xs md:max-w-none" />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <p className="text-lg md:text-xl lg:text-xl">②グループをクリックして、メンバーを追加します。</p>
              <Image src={top2Gif} alt="Example GIF" className="w-full max-w-xs md:max-w-none" />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <p className="text-lg md:text-xl lg:text-xl">③メンバーの画面で右上のアイコンをクリックして開くサイドバーからコピーできるリンクを使うと、他の人も同じデータにアクセスできます。</p>
              <Image src={top3Gif} alt="Example GIF" className="w-full max-w-xs md:max-w-none" />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <p className="text-lg md:text-xl lg:text-xl">④シングルスの試合作成の様子。プレイヤーと組み方を選びます。</p>
              <Image src={top4Gif} alt="Example GIF" className="w-full max-w-xs md:max-w-none" />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <p className="text-lg md:text-xl lg:text-xl">⑤ダブルスの試合作成の様子。プレイヤーと組み方を選びます。</p>
              <Image src={top5Gif} alt="Example GIF" className="w-full max-w-xs md:max-w-none" />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <p className="text-lg md:text-xl lg:text-xl">⑥シングルス・ダブルスの試合に点数を記録すると、プレイヤーの試合履歴と試合結果に応じた個人のパワーが更新されます。</p>
              <Image src={top6Gif} alt="Example GIF" className="w-full max-w-xs md:max-w-none" />
            </Grid>
          </Grid>
        </>
      }
    </>
  );
}
