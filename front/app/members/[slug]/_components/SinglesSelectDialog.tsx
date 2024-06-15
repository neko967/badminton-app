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
import Select, { SelectChangeEvent } from '@mui/material/Select';
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
      maxHeight: ITEM_HEIGHT * 9 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface SinglesSelectDialogProps {
  members: Member[];
  singlesOpen: boolean;
  handleSinglesClose: () => void;
  params: { slug: string };
}

export default function SinglesSelectDialog({
  members,
  singlesOpen,
  handleSinglesClose,
  params,
}: SinglesSelectDialogProps) {

  const [selectedMembersID, setSelectedMembersID] = useState<number[]>([]);
  const [selectedMembers, setSelectedMembers] = useState<Member[]>([]);
  const handleChange = (event: SelectChangeEvent<number[]>) => {
    const { target: { value }, } = event;
    setSelectedMembersID(value as number[]);
  };

  const [pareOpen, setPareOpen] = React.useState(false);
  
  const handlePareOpen = () => {
    if (selectedMembersID.length < 2) {
      return;
    }
    const result = members.filter((item: Member) => selectedMembersID.includes(item.id));
    setSelectedMembers(result);
    setPareOpen(true);
  };
  const handlePareClose = () => {
    setPareOpen(false);
  };

  const sortedMembers = [...members].sort((a, b) => a.name.localeCompare(b.name, 'ja'));

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
                value={selectedMembersID}
                onChange={handleChange}
                input={<OutlinedInput label="Tag" />}
                renderValue={(selected) => (selected as number[]).map(id => members.find(member => member.id === id)?.name).join(', ')}
                MenuProps={MenuProps}
              >
                {sortedMembers.map((member: Member) => (
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
          <Button onClick={() => {handleSinglesClose(); setSelectedMembersID([]);}}>Cancel</Button>
          <Button onClick={() => {handleSinglesClose(); handlePareOpen();}}>Ok</Button>
        </DialogActions>
      </Dialog>
      <SinglesMakePareDialog
        pareOpen={pareOpen}
        handlePareClose={handlePareClose}
        selectedMembers={selectedMembers}
        params={params}
      />
    </div>
  );
}
