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
import { useCallback, useEffect, useState } from "react";
import { useSession } from 'next-auth/react';

export default function DoublesRecordEditDialog({doublesRecordEditDialogOpen, 
                                                 handleDoublesRecordEditDialogClose, 
                                                 fetchDoublesData, doublesRecords, doublesRecord_id}: {
                                                 doublesRecordEditDialogOpen: any; 
                                                 handleDoublesRecordEditDialogClose: any;
                                                 fetchDoublesData: any, doublesRecords: any, doublesRecord_id: number}) {
  const API_URL_DOUBLES_RECORD = `${process.env.NEXT_PUBLIC_API_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}/doubles_records`;
  const { data: session, status } = useSession();

  const [score_12_plus_100_with_none, setScore_12_plus_100_with_none] = useState<number | string>('');
  const handleScoreOneTwoChange = (event: SelectChangeEvent<typeof score_12_plus_100_with_none>) => {
    setScore_12_plus_100_with_none(Number(event.target.value) || '');
  };

  const [score_34_plus_100_with_none, setScore_34_plus_100_with_none] = useState<number | string>('');
  const handleScoreThreeFourChange = (event: SelectChangeEvent<typeof score_34_plus_100_with_none>) => {
    setScore_34_plus_100_with_none(Number(event.target.value) || '');
  };

  const handleDoublesRecordUpdate = async (id: number) => {
    if ( score_12_plus_100_with_none === '' || score_34_plus_100_with_none === '') {
      return;
    }

    const score_12 = Number(score_12_plus_100_with_none) - 100;
    const score_34 = Number(score_34_plus_100_with_none) - 100;

    if (session) {
      await fetch(`${API_URL_DOUBLES_RECORD}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          player_1: player_1NameInDialog,
          player_2: player_2NameInDialog,
          score_12: score_12,
          player_3: player_3NameInDialog,
          player_4: player_4NameInDialog,
          score_34: score_34,
        }),
      }).then(() => {
        fetchDoublesData();
      });
    }
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
      setPlayer_1NameInDialog(doublesRecords.find( ({ id }: any) => id == doublesRecord_id ).player_1);
      setPlayer_2NameInDialog(doublesRecords.find( ({ id }: any) => id == doublesRecord_id ).player_2);
      setPlayer_3NameInDialog(doublesRecords.find( ({ id }: any) => id == doublesRecord_id ).player_3);
      setPlayer_4NameInDialog(doublesRecords.find( ({ id }: any) => id == doublesRecord_id ).player_4);
    }
  }, [doublesRecord_id]);

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
                <MenuItem value={100}>0</MenuItem>
                <MenuItem value={101}>1</MenuItem>
                <MenuItem value={102}>2</MenuItem>
                <MenuItem value={103}>3</MenuItem>
                <MenuItem value={104}>4</MenuItem>
                <MenuItem value={105}>5</MenuItem>
                <MenuItem value={106}>6</MenuItem>
                <MenuItem value={107}>7</MenuItem>
                <MenuItem value={108}>8</MenuItem>
                <MenuItem value={109}>9</MenuItem>
                <MenuItem value={110}>10</MenuItem>
                <MenuItem value={111}>11</MenuItem>
                <MenuItem value={112}>12</MenuItem>
                <MenuItem value={113}>13</MenuItem>
                <MenuItem value={114}>14</MenuItem>
                <MenuItem value={115}>15</MenuItem>
                <MenuItem value={116}>16</MenuItem>
                <MenuItem value={117}>17</MenuItem>
                <MenuItem value={118}>18</MenuItem>
                <MenuItem value={119}>19</MenuItem>
                <MenuItem value={120}>20</MenuItem>
                <MenuItem value={121}>21</MenuItem>
                <MenuItem value={122}>22</MenuItem>
                <MenuItem value={123}>23</MenuItem>
                <MenuItem value={124}>24</MenuItem>
                <MenuItem value={125}>25</MenuItem>
                <MenuItem value={126}>26</MenuItem>
                <MenuItem value={127}>27</MenuItem>
                <MenuItem value={128}>28</MenuItem>
                <MenuItem value={129}>29</MenuItem>
                <MenuItem value={130}>30</MenuItem>
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
                <MenuItem value={100}>0</MenuItem>
                <MenuItem value={101}>1</MenuItem>
                <MenuItem value={102}>2</MenuItem>
                <MenuItem value={103}>3</MenuItem>
                <MenuItem value={104}>4</MenuItem>
                <MenuItem value={105}>5</MenuItem>
                <MenuItem value={106}>6</MenuItem>
                <MenuItem value={107}>7</MenuItem>
                <MenuItem value={108}>8</MenuItem>
                <MenuItem value={109}>9</MenuItem>
                <MenuItem value={110}>10</MenuItem>
                <MenuItem value={111}>11</MenuItem>
                <MenuItem value={112}>12</MenuItem>
                <MenuItem value={113}>13</MenuItem>
                <MenuItem value={114}>14</MenuItem>
                <MenuItem value={115}>15</MenuItem>
                <MenuItem value={116}>16</MenuItem>
                <MenuItem value={117}>17</MenuItem>
                <MenuItem value={118}>18</MenuItem>
                <MenuItem value={119}>19</MenuItem>
                <MenuItem value={120}>20</MenuItem>
                <MenuItem value={121}>21</MenuItem>
                <MenuItem value={122}>22</MenuItem>
                <MenuItem value={123}>23</MenuItem>
                <MenuItem value={124}>24</MenuItem>
                <MenuItem value={125}>25</MenuItem>
                <MenuItem value={126}>26</MenuItem>
                <MenuItem value={127}>27</MenuItem>
                <MenuItem value={128}>28</MenuItem>
                <MenuItem value={129}>29</MenuItem>
                <MenuItem value={130}>30</MenuItem>
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
