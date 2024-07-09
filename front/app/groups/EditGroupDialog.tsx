import React, { useState, useEffect } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useSession } from 'next-auth/react';
import type { Group } from '@/app/types/index';

interface GroupEditDialogProps {
  editGroupDialogOpen: boolean;
  handleEditGroupDialogClose: () => void;
  fetchGroupsData: () => void;
  groups: Group[];
  groupID: number;
}

export default function GroupEditDialog({
  editGroupDialogOpen,
  handleEditGroupDialogClose,
  fetchGroupsData,
  groups,
  groupID,
}: GroupEditDialogProps) {
  const [group, setGroup] = useState({} as Group);
  const [inputValue, setInputValue] = useState('');
  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}`;
  const { data: session, status } = useSession();

  useEffect(() => {
    if (editGroupDialogOpen) {
      const currentGroup = groups.find(g => g.id === groupID);
      if (currentGroup) {
        setGroup(currentGroup);
        setInputValue(currentGroup.name);
      }
    }
  }, [editGroupDialogOpen, groupID, groups]);

  const handleGroupUpdate = async (id: number) => {
    if ( group.name === '') {
      return;
    }

    if (session) {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user.accessToken}`,
      };
      await fetch(`${API_URL}/groups/${id}`, {
        method: "PATCH",
        headers: headers,
        body: JSON.stringify({
          name: group.name,
        }),
        next: { revalidate: 3600 },
      }).then(() => {
        fetchGroupsData();
      });
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    setGroup({ ...group, name: newValue });
  };

  return (
    <Dialog
      open={editGroupDialogOpen}
      onClose={handleEditGroupDialogClose}
      PaperProps={{
        style: { minWidth: '320px' },
      }}
    >
      <DialogTitle>グループ名を変更</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="グループ名"
          type="text"
          fullWidth
          variant="outlined"
          value={inputValue}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleEditGroupDialogClose} color="primary">
          キャンセル
        </Button>
        <Button onClick={() => {handleEditGroupDialogClose(); handleGroupUpdate(groupID);}} color="primary" variant="contained">
          更新
        </Button>
      </DialogActions>
    </Dialog>
  );
}
