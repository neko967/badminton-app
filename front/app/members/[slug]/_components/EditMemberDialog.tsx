import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Autocomplete from '@mui/material/Autocomplete';
import { useEffect, useState } from "react";
import type { Member } from '@/app/types/index';

type FetchDataType = () => Promise<void>;

interface DialogSelectProps {
  members: Member[];
  editMemberOpen: boolean;
  handleEditMemberClose: () => void;
  fetchMemberData: FetchDataType;
  params: { slug: string }
  memberID: number;
}

export default function FormDialog({ members, editMemberOpen, handleEditMemberClose, fetchMemberData, params, memberID }: DialogSelectProps) {
  const [member, setMember] = useState({} as Member);
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState(false);
  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}`;

  useEffect(() => {
    if (editMemberOpen) {
      const currentMember = members.find(m => m.id === memberID);
      if (currentMember) {
        setMember(currentMember);
        setInputValue(currentMember.name);
      }
    }
  }, [editMemberOpen, memberID, members]);

  const handleMemberUpdate = async (id: number) => {
    if (members.some(m => m.name === member.name && m.id !== memberID)) {
      console.log("メンバー名が重複しています");
      return;
    }
    await fetch(`${API_URL}/members/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        'slug': `${params.slug}`,
      },
      body: JSON.stringify({
        name: member.name,
      }),
    }).then(() => {
      fetchMemberData();
    });
  };

  return (
    <React.Fragment>
      <Dialog
        open={editMemberOpen}
        onClose={handleEditMemberClose}
        PaperProps={{
          style: { minWidth: '320px' },
        }}
      >
        <DialogTitle>メンバー名を変更</DialogTitle>
        <DialogContent>
          <Autocomplete
            freeSolo
            options={[]}
            disableClearable
            inputValue={inputValue}
            onInputChange={(event, newValue) => {
              setInputValue(newValue);
              setMember({ ...member, name: newValue });
              if (members.some(m => m.name === newValue && m.id !== memberID)) {
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
          <Button onClick={() => {handleEditMemberClose(); setError(false);}}>キャンセル</Button>
          <Button onClick={() => {handleEditMemberClose(); handleMemberUpdate(memberID);}} disabled={error}>変更</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
