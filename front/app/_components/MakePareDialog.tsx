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
import Paper from '@mui/material/Paper';
import NativeSelect from '@mui/material/NativeSelect';

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

export default function MakePareDialog({ pareOpen, handlePareClose, players}: any) {

  const [firstPlayer, setFirstPlayer] = useState('');
  const handleFirstPlayerChange = (event: any) => {
    setFirstPlayer(String(event.target.value) || '');
  };

  function setPlayers (dividedPlayers: any) {
  }

  return (
    <div>
      <Dialog disableEscapeKeyDown open={pareOpen} onClose={handlePareClose}>
        <DialogTitle>ペアの組み方</DialogTitle>
        <DialogContent>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel variant="standard" htmlFor="uncontrolled-native">
                Age
              </InputLabel>
              <NativeSelect
                defaultValue={10}
                inputProps={{
                  name: 'howtopare',
                  id: 'uncontrolled-native',
                }}
              >
                <option value={10}>ランダム</option>
                <option value={20}>力が等しい</option>
                <option value={30}>力が少し離れている</option>
              </NativeSelect>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePareClose}>Cancel</Button>
          <Button onClick={() => {handlePareClose(); 
                                  setPlayers([firstPlayer]); }
                          }>Ok</Button>
        </DialogActions>

      </Dialog>
    </div>
  );
}
