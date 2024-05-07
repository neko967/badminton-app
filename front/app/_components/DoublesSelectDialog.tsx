import React, { useState } from 'react';
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
import DoublesMakePareDialog from './DoublesMakePareDialog';

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

export default function DoublesSelectDialog({ members, doublesOpen, handleDoublesClose }: any) {
  const [players, setPlayers]: any = useState([]);
  const handleChange = (event: any) => {
    const {
      target: { value },
    } = event;
    setPlayers(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const [doublesMakePareDialogOpen, setDoublesMakePareDialogOpenOpen] = React.useState(false);
  const [playersWithStatus, setPlayersWithStatus]: any = useState([]);
  const handlePareOpen = () => {
    if (players.length < 4) {
      return;
    }
    const result = members.filter((item: Member) => players.includes(item.name));
    setPlayersWithStatus(result);
    setDoublesMakePareDialogOpenOpen(true);
  };
  const handleDoublesMakePareDialogClose = (event: any, reason: any) => {
    if (reason !== 'backdropClick') {
      setDoublesMakePareDialogOpenOpen(false);
    }
  };

  return (
    <div>
      <Dialog disableEscapeKeyDown open={doublesOpen} onClose={handleDoublesClose}>
        <DialogTitle>メンバーを選んでください</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="demo-multiple-checkbox-label">ダブルス</InputLabel>
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
          <Button onClick={() => {handleDoublesClose(); setPlayers([]);}}>Cancel</Button>
          <Button onClick={() => {handleDoublesClose(); handlePareOpen();}}>Ok</Button>
        </DialogActions>
      </Dialog>
      <DoublesMakePareDialog 
        doublesMakePareDialogOpen={doublesMakePareDialogOpen} 
        handleDoublesMakePareDialogClose={handleDoublesMakePareDialogClose} 
        playersWithStatus={playersWithStatus}
      />
    </div>
  );
}
