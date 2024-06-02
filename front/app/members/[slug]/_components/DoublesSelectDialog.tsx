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
import Select, { SelectChangeEvent } from '@mui/material/Select';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import DoublesMakePareDialog from './DoublesMakePareDialog';
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

interface DoublesSelectDialogProps {
  members: Member[];
  doublesOpen: boolean;
  handleDoublesClose: () => void;
  params: { slug: string };
}

export default function DoublesSelectDialog({ members, doublesOpen, handleDoublesClose, params }: DoublesSelectDialogProps) {
  const [selectedMembersID, setSelectedMembersID] = useState<number[]>([]);
  const [selectedMembers, setSelectedMembers] = useState<Member[]>([]);
  const handleChange = (event: SelectChangeEvent<number[]>) => {
    const { target: { value } } = event;
    setSelectedMembersID(value as number[]);
  };

  const [doublesMakePareDialogOpen, setDoublesMakePareDialogOpen] = useState(false);
  const handlePareOpen = () => {
    if (selectedMembersID.length < 4) {
      return;
    }
    const result = members.filter((item: Member) => selectedMembersID.includes(item.id));
    setSelectedMembers(result);
    setDoublesMakePareDialogOpen(true);
  };
  const handleDoublesMakePareDialogClose = () => {
    setDoublesMakePareDialogOpen(false);
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
                value={selectedMembersID}
                onChange={handleChange}
                input={<OutlinedInput label="Tag" />}
                renderValue={(selected) => (selected as number[]).map(id => members.find(member => member.id === id)?.name).join(', ')}
                MenuProps={MenuProps}
              >
                {members.map((member: Member) => (
                  <MenuItem key={member.id} value={member.id}>
                    <Checkbox checked={selectedMembersID.indexOf(member.id) > -1} />
                    <ListItemText primary={member.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl> 
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {handleDoublesClose(); setSelectedMembersID([]);}}>Cancel</Button>
          <Button onClick={() => {handleDoublesClose(); handlePareOpen();}}>Ok</Button>
        </DialogActions>
      </Dialog>
      <DoublesMakePareDialog 
        doublesMakePareDialogOpen={doublesMakePareDialogOpen} 
        handleDoublesMakePareDialogClose={handleDoublesMakePareDialogClose} 
        selectedMembers={selectedMembers}
        params={params}
      />
    </div>
  );
}
