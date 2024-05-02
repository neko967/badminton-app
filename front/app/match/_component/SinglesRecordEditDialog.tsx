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
                                                 fetchData, singlesRecord_id}: {
                                                 singlesRecordEditDialogOpen: any; 
                                                 handleSinglesRecordEditDialogClose: any;
                                                 fetchData: any, singlesRecord_id: number}) {
  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}/singles_records`;
  const { data: session, status } = useSession();
  console.log('singlesRecord_id', singlesRecord_id);

  const [score_1, setScore_1] = useState<number | string>(11);
  const handleScoreOneChange = (event: SelectChangeEvent<typeof score_1>) => {
    setScore_1(Number(event.target.value) || '');
  };

  const [score_2, setScore_2] = useState<number | string>(11);
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

  return (
    <div>
      <Dialog disableEscapeKeyDown open={singlesRecordEditDialogOpen} onClose={handleSinglesRecordEditDialogClose}>
        <DialogTitle>Fill the form</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel htmlFor="demo-dialog-native">ポイント1</InputLabel>
              <Select
                native
                value={score_1}
                onChange={handleScoreOneChange}
                input={<OutlinedInput label="Age" id="demo-dialog-native" />}
              >
                <option aria-label="None" value="" />
                <option value={0}>0</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
                <option value={7}>7</option>
                <option value={8}>8</option>
                <option value={9}>9</option>
                <option value={10}>10</option>
                <option value={11}>11</option>
                <option value={12}>12</option>
                <option value={13}>13</option>
                <option value={14}>14</option>
                <option value={15}>15</option>
                <option value={16}>16</option>
                <option value={17}>17</option>
                <option value={18}>18</option>
                <option value={19}>19</option>
                <option value={20}>20</option>
                <option value={21}>21</option>
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-dialog-select-label">ポイント2</InputLabel>
              <Select
                labelId="demo-dialog-select-label"
                id="demo-dialog-select"
                value={score_2}
                onChange={handleScoreTwoChange}
                input={<OutlinedInput label="Age" />}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
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
