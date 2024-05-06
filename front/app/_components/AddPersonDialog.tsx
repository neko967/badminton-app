import React from 'react';
import Dialog from '@mui/material/Dialog';
import { useState } from "react";
import { useSession } from 'next-auth/react';

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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function DialogSelect({ addPersonOpen, handleAddPersonClose, fetchData }: any) {
  const [member, setMember] = useState({} as Member);
  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}/members`;
  const { data: session, status } = useSession();

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (session) {
      await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: member.name,
          email: session.user?.email,
        }),
      }).then(() => {
        fetchData();
      });
    }
  };

  return (
    <div>
      <Dialog disableEscapeKeyDown open={addPersonOpen} onClose={handleAddPersonClose}>
        <main className="mx-auto w-full flex justify-start items-center flex-col">
          <section className="w-96 border-2 p-4">
            <h2 className="text-lg mb-4 text-center">新しいメンバーを追加</h2>
            <form className="flex flex-col gap-2" onSubmit={handleOnSubmit}>
              <div className="flex justify-between">
                <label htmlFor="name">メンバー名</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="bg-slate-200"
                  onChange={(e) => setMember({ ...member, name: e.target.value })}
                />
              </div>
              <div className="w-full m-auto mt-4 text-center">
                <button className="w-full border-2 p-2 hover:bg-slate-400 transition-all"
                        onClick={() => {handleAddPersonClose();}}>
                  追加
                </button>
              </div>
            </form>
            <button className="w-full border-2 p-2 hover:bg-slate-400 transition-all"
                    onClick={() => {handleAddPersonClose();}}>
              キャンセル
            </button>
          </section>
        </main>
      </Dialog>
    </div>
  );
}
