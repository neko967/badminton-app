import React from 'react';
import Dialog from '@mui/material/Dialog';
import { useState } from "react";
import { useSession } from 'next-auth/react';

type FetchDataType = () => Promise<void>;

interface Group {
  id: number;
  name: string;
  slug: string;
  admin_uid: string;
}

interface DialogSelectProps {
  addGroupOpen: boolean;
  handleAddGroupClose: () => void;
  fetchGroupsData: FetchDataType;
}

export default function DialogSelect({ addGroupOpen, handleAddGroupClose, fetchGroupsData }: DialogSelectProps) {
  const [group, setGroup] = useState({} as Group);
  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}/groups`;
  const { data: session, status } = useSession();

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (session) {
      await fetch(API_URL, {
        method: "POST",
        headers: {
          'uid': `${session?.user?.id}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: group.name,
        }),
      }).then(() => {
        fetchGroupsData();
      });
    }
  };

  return (
    <div>
      <Dialog disableEscapeKeyDown open={addGroupOpen} onClose={handleAddGroupClose}>
        <main className="mx-auto w-full flex justify-start items-center flex-col">
          <section className="w-80 border-2 p-4">
            <h2 className="text-lg mb-4 text-center">新しいグループを追加</h2>
            <form className="flex flex-col gap-2" onSubmit={handleOnSubmit}>
              <div className="flex justify-between">
                <label htmlFor="name">グループ名</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="bg-slate-200"
                  onChange={(e) => setGroup({ ...group, name: e.target.value })}
                />
              </div>
              <div className="w-full m-auto mt-4 text-center">
                <button className="w-full border-2 p-2 hover:bg-slate-400 transition-all" type="submit"
                        onClick={() => {handleAddGroupClose();}}>
                  追加
                </button>
              </div>
            </form>
            <button className="w-full border-2 p-2 hover:bg-slate-400 transition-all"
                    onClick={handleAddGroupClose}>
              キャンセル
            </button>
          </section>
        </main>
      </Dialog>
    </div>
  );
}
