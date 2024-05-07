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
import type { Member } from '@/app/types/index';

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
