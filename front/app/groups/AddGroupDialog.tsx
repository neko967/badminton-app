import React, { useState, useEffect } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useSession } from 'next-auth/react';
import type { Group } from '@/app/types/index';

type FetchDataType = () => Promise<void>;

interface DialogSelectProps {
  addGroupOpen: boolean;
  handleAddGroupClose: () => void;
  fetchGroupsData: FetchDataType;
}

export default function DialogSelect({ addGroupOpen, handleAddGroupClose, fetchGroupsData }: DialogSelectProps) {
  const [group, setGroup] = useState({} as Group);
  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}`;
  const { data: session, status } = useSession();

  const handleOnSubmit = async () => {
    if (session) {
      await fetch(`${API_URL}/groups`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
        body: JSON.stringify({
          name: group.name,
        }),
        next: { revalidate: 3600 },
      }).then(() => {
        fetchGroupsData();
      });
    } else {
      console.log("セッションがありません。");
    }
  };

  return (
    <Dialog
    open={addGroupOpen}
    onClose={handleAddGroupClose}
    PaperProps={{
      style: { minWidth: '320px' },
    }}
  >
    <DialogTitle>グループを追加</DialogTitle>
    <DialogContent>
      <TextField
        autoFocus
        margin="dense"
        id="name"
        label="グループ名"
        type="text"
        fullWidth
        variant="outlined"
        onChange={(e) => setGroup({ ...group, name: e.target.value })}
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={handleAddGroupClose} color="primary">
        キャンセル
      </Button>
      <Button onClick={() => {handleOnSubmit(); handleAddGroupClose();}} color="primary" variant="contained">
        追加
      </Button>
    </DialogActions>
  </Dialog>
  );
}
