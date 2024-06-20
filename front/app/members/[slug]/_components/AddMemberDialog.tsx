import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Autocomplete from '@mui/material/Autocomplete';
import { useState } from "react";
import type { Member } from '@/app/types/index';

type FetchDataType = () => Promise<void>;

interface DialogSelectProps {
  members: Member[];
  addMemberOpen: boolean;
  handleAddMemberClose: () => void;
  fetchMemberData: FetchDataType;
  params: { slug: string }
}

export default function FormDialog({
  members,
  addMemberOpen,
  handleAddMemberClose,
  fetchMemberData,
  params,
}: DialogSelectProps) {
  const [member, setMember] = useState({} as Member);
  const [error, setError] = useState(false);
  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}`;

  const handleOnSubmit = async () => {
    if (members.some(m => m.name === member.name)) {
      console.log("メンバー名が重複しています");
      return;
    }
    await fetch(`${API_URL}/members`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'slug': `${params.slug}`,
      },
      body: JSON.stringify({
        name: member.name,
      }),
      next: { revalidate: 3600 },
    }).then(() => {
      fetchMemberData();
    });
  };

  return (
    <React.Fragment>
      <Dialog
        open={addMemberOpen}
        onClose={handleAddMemberClose}
        PaperProps={{
          style: { minWidth: '320px' },
        }}
      >
        <DialogTitle>メンバーを追加</DialogTitle>
        <DialogContent>
          <Autocomplete
            freeSolo
            options={[]}
            disableClearable
            onInputChange={(event, newValue) => {
              setMember({ ...member, name: newValue });
              if (members.some(m => m.name === newValue)) {
                setError(true);
              } else {
                setError(false);
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                autoFocus
                required
                margin="dense"
                id="name"
                label="メンバー名"
                type="text"
                fullWidth
                variant="standard"
                error={error}
                helperText={error ? "メンバー名がすでに存在します" : ""}
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {handleAddMemberClose(); setError(false);}}>キャンセル</Button>
          <Button onClick={() => {handleAddMemberClose(); handleOnSubmit();}} disabled={error}>追加</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
