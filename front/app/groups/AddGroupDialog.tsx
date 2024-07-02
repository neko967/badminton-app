import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Autocomplete from '@mui/material/Autocomplete';
import { useState } from "react";
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
    <React.Fragment>
      <Dialog
        open={addGroupOpen}
        onClose={handleAddGroupClose}
        PaperProps={{
          style: { minWidth: '320px' },
        }}
      >
        <DialogTitle>グループを追加</DialogTitle>
        <DialogContent>
          <Autocomplete
            freeSolo
            options={[]}
            disableClearable
            onInputChange={(event, newValue) => {
              setGroup({ ...group, name: newValue });
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                autoFocus
                required
                margin="dense"
                id="name"
                label="グループ名"
                type="text"
                fullWidth
                variant="standard"
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {handleAddGroupClose();}}>キャンセル</Button>
          <Button onClick={() => {handleAddGroupClose(); handleOnSubmit();}}>追加</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
