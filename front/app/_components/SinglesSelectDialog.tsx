import React from 'react';
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
import Select from '@mui/material/Select';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import SinglesMakePareDialog from './SinglesMakePareDialog';
import { useState } from "react";

interface Member {
  id: number;
  name: string;
  singles_total_game: number;
  singles_win_game: number;
  singles_strength: number;
  doubles_total_game: number;
  doubles_win_game: number;
  doubles_strength: number;
  history: (SinglesRecord | DoublesRecord)[];
}

interface SinglesRecord {
  id: number;
  player_1: string;
  score_1: number;
  player_2: string;
  score_2: number;
  user_id: number;
  created_at: Date;
  updated_at: Date;
}

interface DoublesRecord {
  id: number;
  player_1: string;
  player_2: string;
  score_12: number;
  player_3: string;
  player_4: string;
  score_34: number;
  user_id: number;
  created_at: Date;
  updated_at: Date;
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

export default function SinglesSelectDialog({ members, singlesOpen, handleSinglesClose }: any) {
  const [players, setPlayers]: any = useState([]);
  const handleChange = (event: any) => {
    const {
      target: { value },
    } = event;
    setPlayers(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const [pareOpen, setPareOpen] = React.useState(false);
  const [playersWithStatus, setPlayersWithStatus]: any = useState([]);
  const handlePareOpen = () => {
    if (players.length < 2) {
      return;
    }
    const result = members.filter((item: Member) => players.includes(item.name));
    setPlayersWithStatus(result);
    setPareOpen(true);
  };
  const handlePareClose = (event: any, reason: any) => {
    if (reason !== 'backdropClick') {
      setPareOpen(false);
    }
  };

  return (
    <div>
      <Dialog disableEscapeKeyDown open={singlesOpen} onClose={handleSinglesClose}>
        <DialogTitle>メンバーを選んでください</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="demo-multiple-checkbox-label">シングルス</InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={players}
                onChange={handleChange}
                input={<OutlinedInput label="Tag" />}
                renderValue={(selected) => selected.join(', ')}
                MenuProps={MenuProps}
              >
                {members.map((member: Member) => (
                  <MenuItem key={member.name} value={member.name}>
                    <Checkbox checked={players.indexOf(member.name) > -1} />
                    <ListItemText primary={member.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {handleSinglesClose(); setPlayers([]);}}>Cancel</Button>
          <Button onClick={() => {handleSinglesClose(); handlePareOpen();}}>Ok</Button>
        </DialogActions>
      </Dialog>
      <SinglesMakePareDialog 
        pareOpen={pareOpen} 
        handlePareClose={handlePareClose} 
        playersWithStatus={playersWithStatus}
      />
    </div>
  );
}
