import * as React from 'react';
import { useState } from "react";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import EditGroupDialog from './EditGroupDialog';
import Grid from '@mui/material/Grid';
import type { Group } from '@/app/types/index';

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${month}/${day}`;
};

export default function Members({groups, handleGroupDelete, fetchGroupsData}: 
                                {groups: Group[]; handleGroupDelete: (id: number) => void; fetchGroupsData: () => void; }) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [groupID, setGroupID] = useState<number>(0);
  const [editGroupDialogOpen, setEditGroupDialogOpen] = useState(false);
  const handleEditGroupDialogOpen = (id: number) => {
    setGroupID(id);
    setEditGroupDialogOpen(true);
  };
  const handleEditGroupDialogClose = () => {
    setEditGroupDialogOpen(false);
  };

  return (
    <>
      <div className="mx-auto w-full flex justify-start items-center">
          {groups.length === 0 ? (
            <p className="text-start w-96 px-6 mt-6">グループがありません</p>
          ) : (
            <Grid container spacing={2}>
              <Grid item xs={12} md={6} lg={4}>
                <dl className="flex flex-col w-full">
                  {groups.map((group) => (
                    <div key={group.id}>
                      <Card sx={{ minWidth: 275 }} variant="outlined">
                        <CardContent onClick={() => router.push(`/members/${group.slug}`)}>
                          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            {`最終更新日: ${formatDate(group.updated_at.toString())}`}
                          </Typography>
                          <Typography variant="h5" component="div">
                            <button>
                              <p>{`${group.name} (${group.number_of_people})`}</p>
                            </button>
                          </Typography>
                        </CardContent>
                        {group.admin_uid == session?.user?.uid ?
                          <div className="flex justify-end">
                            <CardActions>
                              <Button size="small" onClick={() => handleEditGroupDialogOpen(group.id)}>グループ名を変更</Button>
                              <Button size="small" onClick={() => handleGroupDelete(group.id)}>グループを削除</Button>
                            </CardActions>
                          </div>
                        :
                          undefined
                        }
                      </Card>
                    </div>
                  ))}
                </dl>
              </Grid>
            </Grid>
          )}
      </div>
      <EditGroupDialog 
        editGroupDialogOpen={editGroupDialogOpen} 
        handleEditGroupDialogClose={handleEditGroupDialogClose}
        fetchGroupsData={fetchGroupsData}
        groups={groups}
        groupID={groupID}
      />
    </>
  );
}
