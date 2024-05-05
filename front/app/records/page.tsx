"use client";

import Records from '@/app/records/_component/Records';

interface Member {
  id: number;
  name: string;
  singles_total_game: number;
  singles_win_game: number;
  singles_strength: number;
  doubles_total_game: number;
  doubles_win_game: number;
  doubles_strength: number;
  history: [
    { player_1: string, score_1: number, player_2: string, score_2: number }
  ]
}

export default function Home() {

  return (
    <>
      <Records />
    </>
  );
}
