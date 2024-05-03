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
                                                 fetchData, singlesRecords, singlesRecord_id}: {
                                                 singlesRecordEditDialogOpen: any; 
                                                 handleSinglesRecordEditDialogClose: any;
                                                 fetchData: any, singlesRecords: any, singlesRecord_id: number}) {
  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}/singles_records`;
  const { data: session, status } = useSession();

  const [score_1, setScore_1] = useState<number | string>('');
  const handleScoreOneChange = (event: SelectChangeEvent<typeof score_1>) => {
    setScore_1(Number(event.target.value) || '');
  };

  const [score_2, setScore_2] = useState<number | string>('');
  const handleScoreTwoChange = (event: SelectChangeEvent<typeof score_2>) => {
    setScore_2(Number(event.target.value) || '');
  };

  const handleSinglesRecordUpdate = async (id: number) => {
    if (session) {
      await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          score_1: score_1,
          score_2: score_2,
        }),
      }).then(() => {
        fetchData();
      });
    }
  };

  const [player_1InDialog, setPlayer_1InDialog] = useState<string>('');
  const [player_2InDialog, setPlayer_2InDialog] = useState<string>('');
  useEffect(() => {
    if (singlesRecord_id) {
      setPlayer_1InDialog(singlesRecords.find( ({ id }: any) => id == singlesRecord_id ).player_1);
      setPlayer_2InDialog(singlesRecords.find( ({ id }: any) => id == singlesRecord_id ).player_2)
    }
  }, [singlesRecord_id]);

  return (
    <div>
      <Dialog disableEscapeKeyDown open={singlesRecordEditDialogOpen} onClose={handleSinglesRecordEditDialogClose}>
        <DialogTitle>ポイントを入力してください</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel htmlFor="demo-dialog-select-label-1">{player_1InDialog}</InputLabel>
              <Select
                labelId="demo-dialog-select-label-1"
                id="demo-dialog-select-1"
                value={score_1}
                onChange={handleScoreOneChange}
                input={<OutlinedInput label="Point" />}
              >
                <MenuItem value={0}>0</MenuItem>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={6}>6</MenuItem>
                <MenuItem value={7}>7</MenuItem>
                <MenuItem value={8}>8</MenuItem>
                <MenuItem value={9}>9</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={11}>11</MenuItem>
                <MenuItem value={12}>12</MenuItem>
                <MenuItem value={13}>13</MenuItem>
                <MenuItem value={14}>14</MenuItem>
                <MenuItem value={15}>15</MenuItem>
                <MenuItem value={16}>16</MenuItem>
                <MenuItem value={17}>17</MenuItem>
                <MenuItem value={18}>18</MenuItem>
                <MenuItem value={19}>19</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={21}>21</MenuItem>
                <MenuItem value={22}>22</MenuItem>
                <MenuItem value={23}>23</MenuItem>
                <MenuItem value={24}>24</MenuItem>
                <MenuItem value={25}>25</MenuItem>
                <MenuItem value={26}>26</MenuItem>
                <MenuItem value={27}>27</MenuItem>
                <MenuItem value={28}>28</MenuItem>
                <MenuItem value={29}>29</MenuItem>
                <MenuItem value={30}>30</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-dialog-select-label-2">{player_2InDialog}</InputLabel>
              <Select
                labelId="demo-dialog-select-label-2"
                id="demo-dialog-select-2"
                value={score_2}
                onChange={handleScoreTwoChange}
                input={<OutlinedInput label="Point" />}
              >
                <MenuItem value={0}>0</MenuItem>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={6}>6</MenuItem>
                <MenuItem value={7}>7</MenuItem>
                <MenuItem value={8}>8</MenuItem>
                <MenuItem value={9}>9</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={11}>11</MenuItem>
                <MenuItem value={12}>12</MenuItem>
                <MenuItem value={13}>13</MenuItem>
                <MenuItem value={14}>14</MenuItem>
                <MenuItem value={15}>15</MenuItem>
                <MenuItem value={16}>16</MenuItem>
                <MenuItem value={17}>17</MenuItem>
                <MenuItem value={18}>18</MenuItem>
                <MenuItem value={19}>19</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={21}>21</MenuItem>
                <MenuItem value={22}>22</MenuItem>
                <MenuItem value={23}>23</MenuItem>
                <MenuItem value={24}>24</MenuItem>
                <MenuItem value={25}>25</MenuItem>
                <MenuItem value={26}>26</MenuItem>
                <MenuItem value={27}>27</MenuItem>
                <MenuItem value={28}>28</MenuItem>
                <MenuItem value={29}>29</MenuItem>
                <MenuItem value={30}>30</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSinglesRecordEditDialogClose}>Cancel</Button>
          <Button onClick={() => {handleSinglesRecordEditDialogClose(); handleSinglesRecordUpdate(singlesRecord_id);}}>Ok</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
