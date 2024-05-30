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
import GroupEditDialog from './GroupEditDialog';
import Grid from '@mui/material/Grid';

interface Group {
  id: number;
  name: string;
  slug: string;
  admin_uid: string;
}
const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function Members({groups, handleGroupDelete, fetchGroupsData}: 
                                {groups: Group[]; handleGroupDelete: (id: number) => void; fetchGroupsData: () => void; }) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [group_id, setGroup_id] = useState<number>(0);
  const [groupEditDialogOpen, setGroupEditDialogOpen] = useState(false);
  const handleGroupEditDialogOpen = (id: number) => {
    setGroup_id(id);
    setGroupEditDialogOpen(true);
  };
  const handleGroupEditDialogClose = () => {
    setGroupEditDialogOpen(false);
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
                            Word of the Day
                          </Typography>
                          <Typography variant="h5" component="div">
                            <button >
                              <p>{group.name}</p>
                            </button>
                          </Typography>
                          <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            メンバー数：{'"a benevolent smile"'}
                          </Typography>
                        </CardContent>
                        {group.admin_uid == session?.user?.id ?
                          <CardActions>
                            <Button size="small" onClick={() => handleGroupEditDialogOpen(group.id)}>グループ名を変更</Button>
                            <Button size="small" onClick={() => handleGroupDelete(group.id)}>グループを削除</Button>
                          </CardActions>
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
      <GroupEditDialog 
        groupEditDialogOpen={groupEditDialogOpen} 
        handleGroupEditDialogClose={handleGroupEditDialogClose}
        fetchGroupsData={fetchGroupsData}
        groups={groups}
        group_id={group_id}
      />
    </>
  );
}
