import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from "react";
import type { SinglesRecord } from '@/app/types/index';

interface SinglesRecordDeleteDialogProps {
  singlesRecordDeleteDialogOpen: boolean;
  handleSinglesRecordDeleteDialogClose: () => void;
  fetchSinglesRecordData: () => void;
  singlesRecords: SinglesRecord[];
  singlesRecordID: number;
  params: { slug: string };
}

export default function SinglesRecordDeleteDialog({
  singlesRecordDeleteDialogOpen,
  handleSinglesRecordDeleteDialogClose,
  fetchSinglesRecordData,
  singlesRecords,
  singlesRecordID,
  params,
}: SinglesRecordDeleteDialogProps) {

  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}`;
  const handleSinglesRecordDelete = async (id: number) => {
    await fetch(`${API_URL}/singles_records/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'slug': `${params.slug}`,
      },
    }).then(() => {
      fetchSinglesRecordData();
    });
  };

  function isFullWidth(char: string) {
    return char.match(/[^\x00-\xff]/);
  }
  
  function truncateString(str: string, maxLength: number) {
    let length = 0;
    let truncated = '';
  
    for (let i = 0; i < str.length; i++) {
      const char = str[i];
      length += isFullWidth(char) ? 2 : 1;
      if (length > maxLength) {
        truncated += '...';
        break;
      }
      truncated += char;
    }
  
    return truncated;
  }

  const [singlesRecord, setSinglesRecord] = useState<SinglesRecord>();
  useEffect(() => {
    if (singlesRecordID && singlesRecordDeleteDialogOpen) {
      setSinglesRecord(singlesRecords.find(item => item.id === singlesRecordID));
    }
  }, [singlesRecordID, singlesRecordDeleteDialogOpen, singlesRecords]);

  return (
    <div>
      <Dialog disableEscapeKeyDown open={singlesRecordDeleteDialogOpen} onClose={handleSinglesRecordDeleteDialogClose}>
        <DialogTitle>この試合記録を削除しますか？</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <div className="w-full flex items-center">
              <div className="w-2/5 flex justify-start">
                <div className="w-full">
                  <div className="flex justify-start">
                  <p>{truncateString(singlesRecord?.player_1 ?? '', 12)}</p>
                  </div>
                </div>
              </div>
              <div className="w-1/5 flex justify-center">
                <p>{singlesRecord?.score_1} - {singlesRecord?.score_2}</p>
              </div>
              <div className="w-2/5 flex justify-end">
                <div className="w-full">
                  <div className="flex justify-end">
                  <p>{truncateString(singlesRecord?.player_2 ?? '', 12)}</p>
                  </div>
                </div>
              </div>
            </div>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {handleSinglesRecordDeleteDialogClose();}}>Cancel</Button>
          <Button onClick={() => {handleSinglesRecordDeleteDialogClose(); handleSinglesRecordDelete(singlesRecordID);}}>Ok</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
