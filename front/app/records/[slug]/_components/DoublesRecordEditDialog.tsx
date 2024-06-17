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
import type { DoublesRecord } from '@/app/types/index';

interface DoublesRecordEditDialogProps {
  doublesRecordEditDialogOpen: boolean;
  handleDoublesRecordEditDialogClose: () => void;
  fetchDoublesRecordData: () => void;
  doublesRecord: DoublesRecord | undefined;
  params: { slug: string };
}

export default function DoublesRecordEditDialog({
  doublesRecordEditDialogOpen,
  handleDoublesRecordEditDialogClose,
  fetchDoublesRecordData,
  doublesRecord,
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

  const handleDoublesRecordUpdate = async (id: number | undefined) => {
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
        player_1_id: player_1?.id,
        player_2_id: player_2?.id,
        score_12: score_12,
        player_3_id: player_3?.id,
        player_4_id: player_4?.id,
        score_34: score_34,
      }),
    }).then(() => {
      fetchDoublesRecordData();
    });
  };

  const handleScoreReset = () => {
    setScore_12_plus_100_with_none(''); 
    setScore_34_plus_100_with_none('');
  };

  const [player_1, setPlayer_1] = useState<Member>();
  const [player_2, setPlayer_2] = useState<Member>();
  const [player_3, setPlayer_3] = useState<Member>();
  const [player_4, setPlayer_4] = useState<Member>();

  useEffect(() => {
    if (doublesRecord && doublesRecordEditDialogOpen) {
      setPlayer_1(doublesRecord.doubles_recorded_players[0]);
      setPlayer_2(doublesRecord.doubles_recorded_players[1]);
      setPlayer_3(doublesRecord.doubles_recorded_players[2]);
      setPlayer_4(doublesRecord.doubles_recorded_players[3]);
    }
  }, [doublesRecord, doublesRecordEditDialogOpen]);

  return (
    <div>
      <Dialog disableEscapeKeyDown open={doublesRecordEditDialogOpen} onClose={handleDoublesRecordEditDialogClose}>
        <DialogTitle>ポイントを入力してください</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <FormControl sx={{ m: 0.5, minWidth: 240 }}>
              <InputLabel htmlFor="demo-dialog-select-label-1">{player_1?.name} {player_2?.name}</InputLabel>
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
            <FormControl sx={{ m: 0.5, minWidth: 240 }}>
              <InputLabel id="demo-dialog-select-label-2">{player_3?.name} {player_4?.name}</InputLabel>
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
          <Button onClick={() => {handleDoublesRecordEditDialogClose(); handleScoreReset(); handleDoublesRecordUpdate(doublesRecord?.id);}}>Ok</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
