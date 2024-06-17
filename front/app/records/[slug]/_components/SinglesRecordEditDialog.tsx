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
import type { SinglesRecord } from '@/app/types/index';

interface SinglesRecordEditDialogProps {
  singlesRecordEditDialogOpen: boolean;
  handleSinglesRecordEditDialogClose: () => void;
  fetchSinglesRecordData: () => void;
  singlesRecord: SinglesRecord | undefined;
  params: { slug: string };
}

export default function SinglesRecordEditDialog({
  singlesRecordEditDialogOpen,
  handleSinglesRecordEditDialogClose,
  fetchSinglesRecordData,
  singlesRecord,
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

  const handleSinglesRecordUpdate = async (id: number | undefined) => {
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
        player_1_id: player_1?.id,
        score_1: score_1,
        player_2_id: player_2?.id,
        score_2: score_2,
      }),
    }).then(() => {
      fetchSinglesRecordData();
    });
  };

  const handleScoreReset = () => {
    setScore_1_plus_100_with_none(''); 
    setScore_2_plus_100_with_none('');
  };
  const [player_1, setPlayer_1] = useState<Member>();
  const [player_2, setPlayer_2] = useState<Member>();
  useEffect(() => {
    if (singlesRecord && singlesRecordEditDialogOpen) {
      setPlayer_1(singlesRecord.singles_recorded_players[0]);
      setPlayer_2(singlesRecord.singles_recorded_players[1]);
    }
  }, [singlesRecord, singlesRecordEditDialogOpen]);

  return (
    <div>
      <Dialog disableEscapeKeyDown open={singlesRecordEditDialogOpen} onClose={handleSinglesRecordEditDialogClose}>
        <DialogTitle>ポイントを入力してください</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <FormControl sx={{ m: 0.5, minWidth: 240 }}>
              <InputLabel htmlFor="demo-dialog-select-label-1">{player_1?.name}</InputLabel>
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
            <FormControl sx={{ m: 0.5, minWidth: 240 }}>
              <InputLabel id="demo-dialog-select-label-2">{player_2?.name}</InputLabel>
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
          <Button onClick={() => {handleSinglesRecordEditDialogClose(); handleScoreReset(); handleSinglesRecordUpdate(singlesRecord?.id);}}>Ok</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
