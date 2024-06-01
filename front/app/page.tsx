"use client";

import { useCallback, useEffect, useState } from "react";
import { useSession } from 'next-auth/react';
import Groups from './_components/Groups';
import SpeedDialTooltipOpen from './_components/SpeedDialTooltipOpen';
import Image from 'next/image';
import top1Gif from '../public/top1.gif';
import top2Gif from '../public/top2.gif';
import top3Gif from '../public/top3.gif';
import top4Gif from '../public/top4.gif';
import top5Gif from '../public/top5.gif';
import top6Gif from '../public/top6.gif';

interface Group {
  id: number;
  name: string;
  slug: string;
  admin_uid: string;
  number_of_people: number;
  created_at: Date;
  updated_at: Date;
}

export default function Home() {
  const [groups, setGroups] = useState([] as Group[]);
  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}/groups`;
  const { data: session, status } = useSession();

  const fetchGroupsData = useCallback(async () => {
    console.log("グループを取得");
    if (!session?.user.accessToken) {
      console.error("Access token is missing");
      return;
    }
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.user.accessToken}`,
    };
    const response = await fetch(`${API_URL}`, {
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
  }, [session]);

  useEffect(() => {
    if (session) {
      fetchGroupsData();
    }
  }, [session, fetchGroupsData]);

  const handleGroupDelete = async (id: number) => {
    const name = prompt(`グループを削除すると、今までのメンバーと試合記録が失われます。グループを削除する場合は、下の記入欄に"${groups.find(group => group.id === id)?.name}"と入力してください。`);
    if (name == groups.find(group => group.id === id)?.name) {
      await fetch(`${API_URL}/${id}`, {
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
          <div className="text-start px-6 mt-6">
            <p>①ログイン状態でグループを作成します。</p>
            <Image src={top1Gif} alt="Example GIF" width={250} height={200} />
          </div>
          <div className="text-start px-6 mt-6">
            <p>②グループをクリックして、メンバーを追加します。</p>
            <Image src={top2Gif} alt="Example GIF" width={250} height={200} />
          </div>
          <div className="text-start px-6 mt-6">
            <p>③メンバーの画面で右上のアイコンをクリックして開くサイドバーからコピーできるリンクを使うと、他の人も同じデータにアクセスできます。</p>
            <Image src={top3Gif} alt="Example GIF" width={250} height={200} />
          </div>
          <div className="text-start px-6 mt-6">
            <p>④シングルスの試合作成の様子。プレイヤーと組み方を選びます。</p>
            <Image src={top4Gif} alt="Example GIF" width={250} height={200} />
          </div>
          <div className="text-start px-6 mt-6">
            <p>⑤ダブルスの試合作成の様子。プレイヤーと組み方を選びます。</p>
            <Image src={top5Gif} alt="Example GIF" width={250} height={200} />
          </div>
          <div className="text-start px-6 mt-6">
            <p>⑥シングルス・ダブルスの試合に点数を記録すると、プレイヤーの試合履歴と試合結果に応じた個人のパワーが更新されます。</p>
            <Image src={top6Gif} alt="Example GIF" width={250} height={200} />
          </div>
        </>
      }
    </>
  );
}
