import React from 'react';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import PersonIcon from '@mui/icons-material/Person';
import PeopleIcon from '@mui/icons-material/People';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AddMemberDialog from './AddMemberDialog';
import type { Member } from '@/app/types/index';

type FetchDataType = () => Promise<void>;

interface SpeedDialTooltipOpenProps {
  members: Member[];
  fetchMemberData: FetchDataType;
  params: { slug: string };
  handleSinglesClickOpen: () => void;
  handleDoublesClickOpen: () => void;
}

export default function SpeedDialTooltipOpen({
  members,
  fetchMemberData,
  params,
  handleSinglesClickOpen,
  handleDoublesClickOpen,
}: SpeedDialTooltipOpenProps) {
  const [dialOpen, setDialOpen] = React.useState(false);
  const handleDialOpen = () => setDialOpen(true);
  const handleDialClose = () => setDialOpen(false);

  const [addMemberOpen, setAddMemberOpen] = React.useState(false);
  const handleAddMemberClickOpen = () => {
    setAddMemberOpen(true);
  };
  const handleAddMemberClose = () => {
    setAddMemberOpen(false);
  };

  const actions = [
    { icon: <PeopleIcon onClick={handleDoublesClickOpen} />, name: 'ダブルス' },
    { icon: <PersonIcon onClick={handleSinglesClickOpen}/>, name: 'シングルス' },
    { icon: <PersonAddIcon onClick={handleAddMemberClickOpen} />, name: 'メンバーを追加' },
  ];

  return (
    <div className="z-50 relative">
      <Box sx={{ position: 'fixed', bottom: 60, left: 0, right: {xs: 10, md:100 ,lg:276}}} >
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
      </Box>
      <AddMemberDialog
        members={members}
        addMemberOpen={addMemberOpen}
        handleAddMemberClose={handleAddMemberClose}
        fetchMemberData={fetchMemberData}
        params={params}
      />
    </div>
  );
}
