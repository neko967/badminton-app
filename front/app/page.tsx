"use client";

import Member from './_components/Member';
import SpeedDialTooltipOpen from './_components/SpeedDialTooltipOpen';

export default function Home() {

  return (
    <main className="mx-auto w-full flex justify-start items-center flex-col mt-32">
      <Member />
      <SpeedDialTooltipOpen />
    </main>
  );
}
