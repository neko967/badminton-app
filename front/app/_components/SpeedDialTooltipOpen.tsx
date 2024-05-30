import React from 'react';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AddGroupDialog from './AddGroupDialog';

type FetchDataType = () => Promise<void>;

interface Group {
  id: number;
  name: string;
  slug: string;
  admin_uid: string;
  number_of_people: number;
  created_at: Date;
  updated_at: Date;
}

interface SpeedDialTooltipOpenProps {
  groups: Group[];
  fetchGroupsData: FetchDataType;
}

export default function SpeedDialTooltipOpen({groups, fetchGroupsData}: SpeedDialTooltipOpenProps) {
  const [dialOpen, setDialOpen] = React.useState(false);
  const handleDialOpen = () => setDialOpen(true);
  const handleDialClose = () => setDialOpen(false);

  const [addGroupOpen, setAddGroupOpen] = React.useState(false);
  const handleAddGroupClickOpen = () => {
    setAddGroupOpen(true);
  };
  const handleAddGroupClose = () => {
    setAddGroupOpen(false);
  };

  const actions = [
    { icon: <PersonAddIcon onClick={handleAddGroupClickOpen} />, name: 'グループを追加' },
  ];

  return (
    <>
      <Box sx={{ position: 'fixed', bottom: 60, left: 0, right: {xs: 10, md:100 ,lg:276}}}>
        <Backdrop open={dialOpen} />
        <SpeedDial
          ariaLabel="SpeedDial tooltip example"
          sx={{ position: 'absolute', bottom: 16, right: 16 }}
          icon={<SpeedDialIcon />}
          onClose={handleDialClose}
          onOpen={handleDialOpen}
          open={dialOpen}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              tooltipOpen
              onClick={handleDialClose}
            />
          ))}
        </SpeedDial>
        <AddGroupDialog
          addGroupOpen={addGroupOpen}
          handleAddGroupClose={handleAddGroupClose}
          fetchGroupsData={fetchGroupsData}
        />
      </Box>
    </>
  );
}
