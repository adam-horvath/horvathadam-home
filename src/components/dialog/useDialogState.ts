import { useState } from 'react';

export type UseDialogState = (initialOpen?: boolean) => [string, (name: string) => void, () => void];

export const useDialogState: UseDialogState = () => {
  const [dialogOpen, setDialogOpen] = useState<string>('');

  const setOpen = (name: string) => {
    setDialogOpen(name);
  };

  const setClose = () => {
    setDialogOpen('');
  };

  return [dialogOpen, setOpen, setClose];
};
