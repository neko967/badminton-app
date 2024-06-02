import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useEffect, useState } from "react";
import type { Member } from '@/app/types/index';

interface SinglesRecordEditDialogProps {
  singlesRecordEditDialogOpen: boolean;
  handleSinglesRecordEditDialogClose: () => void;
  fetchSinglesData: () => void;
  singlesRecords: any[];
  singlesRecord_id: number;
  members: Member[];
  params: { slug: string };
}

export default function SinglesRecordEditDialog({
  singlesRecordEditDialogOpen,
  handleSinglesRecordEditDialogClose,
  fetchSinglesData,
  singlesRecords,
  singlesRecord_id,
  members,
  params,
}: SinglesRecordEditDialogProps) {

  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}`;

  const [score_1_plus_100_with_none, setScore_1_plus_100_with_none] = useState<number | string>('');
  const handleScoreOneChange = (event: SelectChangeEvent<number | string>) => {
    setScore_1_plus_100_with_none(Number(event.target.value) || '');
  };

  const [score_2_plus_100_with_none, setScore_2_plus_100_with_none] = useState<number | string>('');
  const handleScoreTwoChange = (event: SelectChangeEvent<number | string>) => {
    setScore_2_plus_100_with_none(Number(event.target.value) || '');
  };

  const handleSinglesRecordUpdate = async (id: number) => {
    if ( score_1_plus_100_with_none === '' || score_2_plus_100_with_none === '') {
      return;
    }

    const score_1 = Number(score_1_plus_100_with_none) - 100;
    const score_2 = Number(score_2_plus_100_with_none) - 100;

    await fetch(`${API_URL}/singles_records/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        'slug': `${params.slug}`,
      },
      body: JSON.stringify({
        player_1_id: player_1_id,
        score_1: score_1,
        player_2_id: player_2_id,
        score_2: score_2,
      }),
    }).then(() => {
      fetchSinglesData();
    });
  };

  const handleScoreReset = () => {
    setScore_1_plus_100_with_none(''); 
    setScore_2_plus_100_with_none('');
  };

  const [player_1NameInDialog, setPlayer_1NameInDialog] = useState<string>('');
  const [player_2NameInDialog, setPlayer_2NameInDialog] = useState<string>('');
  useEffect(() => {
    if (singlesRecord_id) {
      setPlayer_1NameInDialog(singlesRecords.find( ({ id }) => id == singlesRecord_id ).player_1);
      setPlayer_2NameInDialog(singlesRecords.find( ({ id }) => id == singlesRecord_id ).player_2)
    }
  }, [singlesRecord_id, singlesRecords]);

  const [player_1_id, setPlayer_1_id] = useState<number>();
  const [player_2_id, setPlayer_2_id] = useState<number>();
  useEffect(() => {
    if (player_1NameInDialog && player_2NameInDialog) {
      const player1 = members.find(member => member.name === player_1NameInDialog);
      const player2 = members.find(member => member.name === player_2NameInDialog);
      
      setPlayer_1_id(player1 ? player1.id : undefined);
      setPlayer_2_id(player2 ? player2.id : undefined);
    }
  }, [singlesRecord_id, player_1NameInDialog, player_2NameInDialog, members]);

  return (
    <div>
      <Dialog disableEscapeKeyDown open={singlesRecordEditDialogOpen} onClose={handleSinglesRecordEditDialogClose}>
        <DialogTitle>ポイントを入力してください</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel htmlFor="demo-dialog-select-label-1">{player_1NameInDialog}</InputLabel>
              <Select
                labelId="demo-dialog-select-label-1"
                id="demo-dialog-select-1"
                value={score_1_plus_100_with_none}
                onChange={handleScoreOneChange}
                input={<OutlinedInput label="Point" />}
              >
                {Array.from({ length: 31 }, (_, i) => (
                  <MenuItem key={i} value={100 + i}>{i}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-dialog-select-label-2">{player_2NameInDialog}</InputLabel>
              <Select
                labelId="demo-dialog-select-label-2"
                id="demo-dialog-select-2"
                value={score_2_plus_100_with_none}
                onChange={handleScoreTwoChange}
                input={<OutlinedInput label="Point" />}
              >
                {Array.from({ length: 31 }, (_, i) => (
                  <MenuItem key={i} value={100 + i}>{i}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {handleSinglesRecordEditDialogClose(); handleScoreReset();}}>Cancel</Button>
          <Button onClick={() => {handleSinglesRecordEditDialogClose(); handleScoreReset(); handleSinglesRecordUpdate(singlesRecord_id);}}>Ok</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
