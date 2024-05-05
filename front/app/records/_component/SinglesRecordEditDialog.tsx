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

export default function SinglesRecordEditDialog({singlesRecordEditDialogOpen, 
                                                 handleSinglesRecordEditDialogClose, 
                                                 fetchSinglesData, singlesRecords, singlesRecord_id}: {
                                                 singlesRecordEditDialogOpen: any; 
                                                 handleSinglesRecordEditDialogClose: any;
                                                 fetchSinglesData: any, singlesRecords: any, singlesRecord_id: number}) {
  const API_URL_SINGLESRECORD = `${process.env.NEXT_PUBLIC_API_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}/singles_records`;
  const { data: session, status } = useSession();

  const [score_1_plus_100_with_none, setScore_1_plus_100_with_none] = useState<number | string>('');
  const handleScoreOneChange = (event: SelectChangeEvent<typeof score_1_plus_100_with_none>) => {
    setScore_1_plus_100_with_none(Number(event.target.value) || '');
  };

  const [score_2_plus_100_with_none, setScore_2_plus_100_with_none] = useState<number | string>('');
  const handleScoreTwoChange = (event: SelectChangeEvent<typeof score_2_plus_100_with_none>) => {
    setScore_2_plus_100_with_none(Number(event.target.value) || '');
  };

  const handleSinglesRecordUpdate = async (id: number) => {
    if ( score_1_plus_100_with_none === '' || score_2_plus_100_with_none === '') {
      return;
    }

    const score_1 = Number(score_1_plus_100_with_none) - 100;
    const score_2 = Number(score_2_plus_100_with_none) - 100;

    if (session) {
      await fetch(`${API_URL_SINGLESRECORD}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          player_1: player_1NameInDialog,
          score_1: score_1,
          player_2: player_2NameInDialog,
          score_2: score_2,
        }),
      }).then(() => {
        fetchSinglesData();
      });
    }
  };

  const handleScoreReset = () => {
    setScore_1_plus_100_with_none(''); 
    setScore_2_plus_100_with_none('');
  };

  const [player_1NameInDialog, setPlayer_1NameInDialog] = useState<string>('');
  const [player_2NameInDialog, setPlayer_2NameInDialog] = useState<string>('');
  useEffect(() => {
    if (singlesRecord_id) {
      setPlayer_1NameInDialog(singlesRecords.find( ({ id }: any) => id == singlesRecord_id ).player_1);
      setPlayer_2NameInDialog(singlesRecords.find( ({ id }: any) => id == singlesRecord_id ).player_2)
    }
  }, [singlesRecord_id]);

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
              <InputLabel id="demo-dialog-select-label-2">{player_2NameInDialog}</InputLabel>
              <Select
                labelId="demo-dialog-select-label-2"
                id="demo-dialog-select-2"
                value={score_2_plus_100_with_none}
                onChange={handleScoreTwoChange}
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
          <Button onClick={() => {handleSinglesRecordEditDialogClose(); handleScoreReset();}}>Cancel</Button>
          <Button onClick={() => {handleSinglesRecordEditDialogClose(); handleScoreReset(); handleSinglesRecordUpdate(singlesRecord_id);}}>Ok</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}