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

interface DoublesRecordEditDialogProps {
  doublesRecordEditDialogOpen: boolean;
  handleDoublesRecordEditDialogClose: () => void;
  fetchDoublesData: () => void;
  doublesRecords: any[];
  doublesRecord_id: number;
  members: Member[];
  params: { slug: string };
}

export default function DoublesRecordEditDialog({
  doublesRecordEditDialogOpen,
  handleDoublesRecordEditDialogClose,
  fetchDoublesData,
  doublesRecords,
  doublesRecord_id,
  members,
  params,
}: DoublesRecordEditDialogProps) {

  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}`;

  const [score_12_plus_100_with_none, setScore_12_plus_100_with_none] = useState<number | string>('');
  const handleScoreOneTwoChange = (event: SelectChangeEvent<number | string>) => {
    setScore_12_plus_100_with_none(Number(event.target.value) || '');
  };

  const [score_34_plus_100_with_none, setScore_34_plus_100_with_none] = useState<number | string>('');
  const handleScoreThreeFourChange = (event: SelectChangeEvent<number | string>) => {
    setScore_34_plus_100_with_none(Number(event.target.value) || '');
  };

  const handleDoublesRecordUpdate = async (id: number) => {
    if ( score_12_plus_100_with_none === '' || score_34_plus_100_with_none === '') {
      return;
    }

    const score_12 = Number(score_12_plus_100_with_none) - 100;
    const score_34 = Number(score_34_plus_100_with_none) - 100;

    await fetch(`${API_URL}/doubles_records/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        'slug': `${params.slug}`,
      },
      body: JSON.stringify({
        player_1_id: player_1_id,
        player_2_id: player_2_id,
        score_12: score_12,
        player_3_id: player_3_id,
        player_4_id: player_4_id,
        score_34: score_34,
      }),
    }).then(() => {
      fetchDoublesData();
    });
  };

  const handleScoreReset = () => {
    setScore_12_plus_100_with_none(''); 
    setScore_34_plus_100_with_none('');
  };

  const [player_1NameInDialog, setPlayer_1NameInDialog] = useState<string>('');
  const [player_2NameInDialog, setPlayer_2NameInDialog] = useState<string>('');
  const [player_3NameInDialog, setPlayer_3NameInDialog] = useState<string>('');
  const [player_4NameInDialog, setPlayer_4NameInDialog] = useState<string>('');
  useEffect(() => {
    if (doublesRecord_id) {
      setPlayer_1NameInDialog(doublesRecords.find( ({ id }) => id == doublesRecord_id ).player_1);
      setPlayer_2NameInDialog(doublesRecords.find( ({ id }) => id == doublesRecord_id ).player_2);
      setPlayer_3NameInDialog(doublesRecords.find( ({ id }) => id == doublesRecord_id ).player_3);
      setPlayer_4NameInDialog(doublesRecords.find( ({ id }) => id == doublesRecord_id ).player_4);
    }
  }, [doublesRecord_id, doublesRecords]);

  const [player_1_id, setPlayer_1_id] = useState<number>();
  const [player_2_id, setPlayer_2_id] = useState<number>();
  const [player_3_id, setPlayer_3_id] = useState<number>();
  const [player_4_id, setPlayer_4_id] = useState<number>();
  useEffect(() => {
    if (player_1NameInDialog && player_2NameInDialog) {
      const player1 = members.find(member => member.name === player_1NameInDialog);
      const player2 = members.find(member => member.name === player_2NameInDialog);
      const player3 = members.find(member => member.name === player_3NameInDialog);
      const player4 = members.find(member => member.name === player_4NameInDialog);
      
      setPlayer_1_id(player1 ? player1.id : undefined);
      setPlayer_2_id(player2 ? player2.id : undefined);
      setPlayer_3_id(player3 ? player3.id : undefined);
      setPlayer_4_id(player4 ? player4.id : undefined);
    }
  }, [doublesRecord_id, player_1NameInDialog, player_2NameInDialog, player_3NameInDialog, player_4NameInDialog, members]);

  return (
    <div>
      <Dialog disableEscapeKeyDown open={doublesRecordEditDialogOpen} onClose={handleDoublesRecordEditDialogClose}>
        <DialogTitle>ポイントを入力してください</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel htmlFor="demo-dialog-select-label-1">{player_1NameInDialog} {player_2NameInDialog}</InputLabel>
              <Select
                labelId="demo-dialog-select-label-1"
                id="demo-dialog-select-1"
                value={score_12_plus_100_with_none}
                onChange={handleScoreOneTwoChange}
                input={<OutlinedInput label="Point" />}
              >
                {Array.from({ length: 31 }, (_, i) => (
                  <MenuItem key={i} value={100 + i}>{i}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-dialog-select-label-2">{player_3NameInDialog} {player_4NameInDialog}</InputLabel>
              <Select
                labelId="demo-dialog-select-label-2"
                id="demo-dialog-select-2"
                value={score_34_plus_100_with_none}
                onChange={handleScoreThreeFourChange}
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
          <Button onClick={() => {handleDoublesRecordEditDialogClose(); handleScoreReset();}}>Cancel</Button>
          <Button onClick={() => {handleDoublesRecordEditDialogClose(); handleScoreReset(); handleDoublesRecordUpdate(doublesRecord_id);}}>Ok</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
