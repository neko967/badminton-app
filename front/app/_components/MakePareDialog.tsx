import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
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

interface Member {
  id: number;
  name: string;
  singles_total_game: number;
  singles_twin_game: number;
  strength: number;
  doubles_total_game: number;
  doubles_twin_game: number;
  doubles_tstrength: number;
}

export default function MakePareDialog({ pareOpen, handlePareClose, playersWithStatus}: any) {
  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}/singles_records`;
  const { data: session, status } = useSession();
  const [howToPare, setHowToPare] = useState('');

  const handleMakePare = () => {
    const makedPare = [];
    console.log(playersWithStatus);
    playersWithStatus.sort((a: any, b: any) => b.strength - a.strength);
    let i = playersWithStatus.length;
    
    for (let i = 0; i < playersWithStatus.length; i += 2) {
      makedPare.push([playersWithStatus[i].name, playersWithStatus[i + 1].name]);
    }
    console.log(makedPare);
  };

  return (
    <div>
      <Dialog disableEscapeKeyDown open={pareOpen} onClose={handlePareClose}>
        <DialogTitle>ペアの組み方</DialogTitle>
        <DialogContent>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <NativeSelect
                defaultValue={10}
                inputProps={{
                  name: 'makepare',
                  id: 'uncontrolled-native',
                }}
              >
                <option value={10} onClick={() => setHowToPare('random')}>ランダム</option>
                <option value={20} onClick={() => setHowToPare('even')}>力が等しい</option>
                <option value={30} onClick={() => setHowToPare('little_diff')}>力が少し離れている</option>
              </NativeSelect>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePareClose}>Cancel</Button>
          <Button onClick={() => {handlePareClose(); 
                                  handleMakePare; }
                          }>Ok</Button>
        </DialogActions>

      </Dialog>
    </div>
  );
}
