import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from "react";
import type { DoublesRecord } from '@/app/types/index';

interface DoublesRecordDeleteDialogProps {
  doublesRecordDeleteDialogOpen: boolean;
  handleDoublesRecordDeleteDialogClose: () => void;
  fetchDoublesRecordData: () => void;
  doublesRecords: DoublesRecord[];
  doublesRecordID: number;
  params: { slug: string };
}

export default function DoublesRecordDeleteDialog({
  doublesRecordDeleteDialogOpen,
  handleDoublesRecordDeleteDialogClose,
  fetchDoublesRecordData,
  doublesRecords,
  doublesRecordID,
  params,
}: DoublesRecordDeleteDialogProps) {

  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}`;
  const handleDoublesRecordDelete = async (id: number) => {
    await fetch(`${API_URL}/doubles_records/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'slug': `${params.slug}`,
      },
    }).then(() => {
      fetchDoublesRecordData();
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

  const [doublesRecord, setDoublesRecord] = useState<DoublesRecord>();
  useEffect(() => {
    if (doublesRecordID) {
      setDoublesRecord(doublesRecords.find(item => item.id === doublesRecordID));
    }
  }, [doublesRecordID, doublesRecords]);

  return (
    <div>
      <Dialog disableEscapeKeyDown open={doublesRecordDeleteDialogOpen} onClose={handleDoublesRecordDeleteDialogClose}>
        <DialogTitle>この試合記録を削除しますか？</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <div className="w-full flex items-center">
              <div className="w-2/5 flex justify-start">
                <div className="w-full">
                  <div className="flex justify-start">
                    <p>{truncateString(doublesRecord?.player_1 ?? '', 12)}</p>
                  </div>
                  <div className="flex justify-start">
                    <p>{truncateString(doublesRecord?.player_2 ?? '', 12)}</p>
                  </div>
                </div>
              </div>
              <div className="w-1/5 flex justify-center">
                <p>{doublesRecord?.score_12} - {doublesRecord?.score_34}</p>
              </div>
              <div className="w-2/5 flex justify-end">
                <div className="w-full">
                  <div className="flex justify-end">
                    <p>{truncateString(doublesRecord?.player_3 ?? '', 12)}</p>
                  </div>
                  <div className="flex justify-end">
                    <p>{truncateString(doublesRecord?.player_4 ?? '', 12)}</p>
                  </div>
                </div>
              </div>
            </div>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {handleDoublesRecordDeleteDialogClose();}}>Cancel</Button>
          <Button onClick={() => {handleDoublesRecordDeleteDialogClose(); handleDoublesRecordDelete(doublesRecordID);}}>Ok</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
