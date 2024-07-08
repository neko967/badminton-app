import * as React from 'react';
import { useState } from "react";
import type { Member } from '@/app/types/index';
import useMediaQuery from '@mui/material/useMediaQuery';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

type FetchDataType = () => Promise<void>;

interface AddMemberPanelProps {
  members: Member[];
  fetchMemberData: FetchDataType;
  params: { slug: string };
}

export default function AddMemberPanel({
  members,
  fetchMemberData,
  params,
}: AddMemberPanelProps) {
  const [member, setMember] = useState<Partial<Member>>({
    name: '',
  });
  const [error, setError] = useState(false);
  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}`;
  const isDesktop = useMediaQuery('(min-width:699px)');

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
        setMember({ name: '' });
        setError(false);
    });
  };

  return (
    <>
      {isDesktop && (
        <div className="min-w-52 h-52 overflow-auto bg-white p-5 m-4 shadow-lg">
          <h2 className="text-lg font-semibold mb-4">メンバーを追加</h2>
          <Autocomplete
            freeSolo
            options={[]}
            disableClearable
            inputValue={member.name}
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
          <Button 
            onClick={handleOnSubmit}
            disabled={error}
            className="mt-4"
            variant="contained"
          >
            追加
          </Button>
        </div>
      )}
    </>
  );
}
