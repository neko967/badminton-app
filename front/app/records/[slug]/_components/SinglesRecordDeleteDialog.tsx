import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import type { SinglesRecord } from '@/app/types/index';
import { truncateString } from '@/app/utils';

interface SinglesRecordDeleteDialogProps {
  singlesRecordDeleteDialogOpen: boolean;
  handleSinglesRecordDeleteDialogClose: () => void;
  fetchSinglesRecordData: () => void;
  singlesRecord: SinglesRecord | undefined;
  params: { slug: string };
}

export default function SinglesRecordDeleteDialog({
  singlesRecordDeleteDialogOpen,
  handleSinglesRecordDeleteDialogClose,
  fetchSinglesRecordData,
  singlesRecord,
  params,
}: SinglesRecordDeleteDialogProps) {

  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}`;
  const handleSinglesRecordDelete = async (id: number | undefined) => {
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
          <Button onClick={() => {handleSinglesRecordDeleteDialogClose(); handleSinglesRecordDelete(singlesRecord?.id);}}>Ok</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
