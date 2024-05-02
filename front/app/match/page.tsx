"use client";

import SinglesRecord from '@/app/match/_component/SinglesRecord';

interface Member {
  id: number;
  name: string;
  total_game: number;
  win_game: number;
  strength: number;
}

export default function Home() {

  return (
    <>
      <SinglesRecord />
    </>
  );
}
