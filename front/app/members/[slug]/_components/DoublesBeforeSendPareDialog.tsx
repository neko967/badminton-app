import * as React from 'react';
import { useRouter } from 'next/navigation';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import type { Member } from '@/app/types/index';
import { truncateString } from '@/app/utils';

interface DoublesBeforeSendPareDialogProps {
  beforeSendPareDialogOpen: boolean;
  handleBeforeSendPareDialogClose: () => void;
  makedPare: Member[][];
  handleMakePare: () => void;
  params: { slug: string };
}

export default function DoublesBeforeSendPareDialog({
  beforeSendPareDialogOpen,
  handleBeforeSendPareDialogClose,
  makedPare,
  handleMakePare,
  params,
}: DoublesBeforeSendPareDialogProps) {
  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}`;
  const router = useRouter();

  const handlePareSubmit = async () => {
    const makedPareID = makedPare.map(pare => [pare[0].id, pare[1].id, pare[2].id, pare[3].id]);

    await fetch(`${API_URL}/doubles_records`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'slug': `${params.slug}`,
      },
      body: JSON.stringify({
        maked_pare_id: makedPareID,
      }),
    })
    router.push(`/records/${params.slug}?set_value=1`);
  };

  return (
    <Dialog
      open={beforeSendPareDialogOpen}
      onClose={handleBeforeSendPareDialogClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"このペアで対戦を組みますか？"}
      </DialogTitle>
      <DialogContent  id="alert-dialog-description">
        <div>
          {makedPare.length === 0 ? (
            <p>ペアがありません</p>
          ) : (
            <div className="flex flex-col w-full">
              {makedPare.map((pare, index) => (
                <div key={index} className="w-full flex items-center border-b border-slate-500 border-opacity-45">
                  <div className="w-5/12 flex justify-start">
                    <div className="w-full">
                      <div className="flex justify-start">
                        <p>{truncateString(pare[0].name, 12)}</p>
                      </div>
                      <div className="flex justify-start">
                        <p>{truncateString(pare[1].name, 12)}</p>
                      </div>
                    </div>
                  </div>
                  <div className="w-1/6 flex justify-center">
                    <p>-</p>
                  </div>
                  <div className="w-5/12 flex justify-end">
                    <div className="w-full">
                      <div className="flex justify-end">
                        <p>{truncateString(pare[2].name, 12)}</p>
                      </div>
                      <div className="flex justify-end">
                        <p>{truncateString(pare[3].name, 12)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleBeforeSendPareDialogClose}>キャンセル</Button>
        <Button onClick={() => {handleMakePare();}}>組み直す</Button>
        <Button onClick={() => {handleBeforeSendPareDialogClose(); handlePareSubmit();}} autoFocus>登録する</Button>
      </DialogActions>
    </Dialog>
  );
}
