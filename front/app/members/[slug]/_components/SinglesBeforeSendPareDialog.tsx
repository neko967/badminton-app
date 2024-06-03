import * as React from 'react';
import { useRouter } from 'next/navigation';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import type { Member } from '@/app/types/index';

interface SinglesBeforeSendPareDialogProps {
  beforeSendPareDialogOpen: boolean;
  handleBeforeSendPareDialogClose: () => void;
  makedPare: Member[][];
  handleMakePare: () => void;
  selectedMembers: Member[];
  params: { slug: string };
}

export default function SinglesBeforeSendPareDialog({
  beforeSendPareDialogOpen,
  handleBeforeSendPareDialogClose,
  makedPare,
  handleMakePare,
  selectedMembers,
  params,
}: SinglesBeforeSendPareDialogProps) {
  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}`;
  const router = useRouter();

  const handlePareSubmit = async () => {
    for (let i = 0; i < makedPare.length; i ++) {
      const member1 = makedPare[i][0];
      const member2 = makedPare[i][1];

      await fetch(`${API_URL}/singles_records`, {
        method: "POST",
        headers: {
          'slug': `${params.slug}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          member_1_id: member1.id,
          member_2_id: member2.id,
        }),
      })
    }
    router.push(`/records/${params.slug}?set_value=0`);
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
                <div key={index} className="w-full flex items-center border-b border-slate-500 border-opacity-45 py-1">
                  <div className="w-5/12 flex justify-start">
                    <p>{truncateString(pare[0].name, 12)}</p>
                  </div>
                  <div className="w-1/6 flex justify-center">
                    <p>-</p>
                  </div>
                  <div className="w-5/12 flex justify-end">
                    <p>{truncateString(pare[1].name, 12)}</p>
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
