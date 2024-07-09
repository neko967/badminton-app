import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Button, useMediaQuery } from '@mui/material';
import AddGroupDialog from './AddGroupDialog';

type FetchDataType = () => Promise<void>;

interface SpeedDialTooltipOpenProps {
  fetchGroupsData: FetchDataType;
}

export default function SpeedDialTooltipOpen({fetchGroupsData}: SpeedDialTooltipOpenProps) {
  const isDesctop = useMediaQuery('(min-width:699px)');
  const [addGroupOpen, setAddGroupOpen] = React.useState(false);
  const handleAddGroupClickOpen = () => {
    setAddGroupOpen(true);
  };
  const handleAddGroupClose = () => {
    setAddGroupOpen(false);
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleAddGroupClickOpen}
        sx={{
          position: 'relative',
        }}
      >
        {isDesctop && ("グループを追加")}
      </Button>
      <AddGroupDialog
        addGroupOpen={addGroupOpen}
        handleAddGroupClose={handleAddGroupClose}
        fetchGroupsData={fetchGroupsData}
      />
    </>
  );
}
