import * as React from 'react';
import { useState } from "react";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardActions, Button, Typography, Grid, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditGroupDialog from './EditGroupDialog';
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
      {groups.length === 0 ? (
        <Typography variant="body1" sx={{ mt: 2 }}>No groups available</Typography>
      ) : (
        <Grid container spacing={3}>
          {groups.map((group) => (
            <Grid item xs={12} sm={6} md={4} key={group.id}>
              <Card 
                elevation={3} 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  border: '1px solid',
                  borderColor: 'primary.main',
                  background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(33, 150, 243, 0.1) 100%)',
                  position: 'relative',
                  overflow: 'hidden',
                  '&:hover': {
                    borderColor: 'secondary.main',
                  }
                }}
              >
                <CardContent
                  sx={{
                    flexGrow: 1,
                    cursor: 'pointer',
                    '&:hover': {
                      background: 'rgba(76, 175, 80, 0.1)',
                    },
                  }}
                  onClick={() => router.push(`/members/${group.slug}`)}
                >
                  <Typography variant="overline" color="primary.main">
                    最終更新日: {formatDate(group.updated_at.toString())}
                  </Typography>
                  <Typography variant="h6" component="div" gutterBottom sx={{ color: 'text.primary' }}>
                    {group.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    メンバー数: {group.number_of_people}
                  </Typography>
                </CardContent>
                {group.admin_uid === session?.user?.uid && (
                  <CardActions sx={{ justifyContent: 'flex-end' }}>
                    <IconButton
                      size="small"
                      onClick={() => handleEditGroupDialogOpen(group.id)}
                      sx={{
                        color: 'primary.main',
                        '&:hover': {
                          color: 'secondary.main',
                        },
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton 
                      size="small" 
                      onClick={() => handleGroupDelete(group.id)}
                      sx={{ 
                        color: 'primary.main',
                        '&:hover': {
                          color: 'secondary.main',
                        },
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </CardActions>
                )}
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
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
