import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useCallback, useEffect, useState } from "react";
import { useSession } from 'next-auth/react';

interface Member {
  id: number;
  name: string;
  total_game: number;
  win_game: number;
  strength: number;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function DialogSelect({ addPersonOpen, handleAddPersonClose }: any) {
  const [members, setMembers] = useState([] as Member[]);
  const [member, setMember] = useState({} as Member);
  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}/members`;
  const { data: session, status } = useSession();

  const fetchData = useCallback(async () => {
    if (session) {
      const query = session.user?.email;
      const response = await fetch (`${API_URL}?email=${query}`);
      const data = await response.json();
      setMembers(data);
    }
  }, [session]);

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (session) {
      await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: member.name,
          email: session.user?.email,
        }),
      }).then(() => {
        fetchData();
      });
    }
  };

  return (
    <div>
      <Dialog disableEscapeKeyDown open={addPersonOpen} onClose={handleAddPersonClose}>
        <DialogTitle>新しいメンバーを追加</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField id="outlined-basic" 
                       label="メンバー名" 
                       variant="outlined" 
                       name="name"
                       type="text"
                       required
                       className="bg-slate-200"
                       onChange={(e) => setMember({ ...member, name: e.target.value })}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddPersonClose}>キャンセル</Button>
          <Button onClick={() => {handleAddPersonClose(); handleOnSubmit}}>追加</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
