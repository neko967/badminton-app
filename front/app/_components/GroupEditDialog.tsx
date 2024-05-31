import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import { useState } from "react";
import { useSession } from 'next-auth/react';

interface Group {
  id: number;
  name: string;
  slug: string;
  admin_uid: string;
  number_of_people: number;
  created_at: Date;
  updated_at: Date;
}

interface GroupEditDialogProps {
  groupEditDialogOpen: boolean;
  handleGroupEditDialogClose: () => void;
  fetchGroupsData: () => void;
  groups: Group[];
  group_id: number;
}

export default function GroupEditDialog({
  groupEditDialogOpen,
  handleGroupEditDialogClose,
  fetchGroupsData,
  groups,
  group_id,
}: GroupEditDialogProps) {
  const [group, setGroup] = useState({} as Group);
  const API_URL_GROUP = `${process.env.NEXT_PUBLIC_API_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}/groups`;
  const { data: session, status } = useSession();

  const handleGroupUpdate = async (id: number) => {
    if ( group.name === '') {
      return;
    }

    if (session) {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.accessToken}`,
      };
      await fetch(`${API_URL_GROUP}/${id}`, {
        method: "PATCH",
        headers: headers,
        body: JSON.stringify({
          group_id : group_id,
          name: group.name,
        }),
      }).then(() => {
        fetchGroupsData();
      });
    }
  };
  /*
  useEffect(() => {
    if (group_id) {
      setGroup(groups.find( ({ id }) => id == group_id ).name);
    }
  }, [group_id, groups]);
  */

  return (
    <div>
      <Dialog disableEscapeKeyDown open={groupEditDialogOpen} onClose={handleGroupEditDialogClose}>
        <main className="mx-auto w-full flex justify-start items-center flex-col">
          <section className="w-80 border-2 p-4">
            <h2 className="text-lg mb-4 text-center">グループ名を変更する</h2>
            <div className="flex flex-col gap-2">
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
                        onClick={() => {handleGroupUpdate(group_id); handleGroupEditDialogClose();}}>
                  更新
                </button>
              </div>
            </div>
            <button className="w-full border-2 p-2 hover:bg-slate-400 transition-all"
                    onClick={handleGroupEditDialogClose}>
              キャンセル
            </button>
          </section>
        </main>
      </Dialog>
    </div>
  );
}
