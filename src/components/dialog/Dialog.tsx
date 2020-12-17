import React, { FC, useEffect } from 'react';
import { Modal } from 'react-bootstrap';

import './Dialog.scss';

export interface DialogProps {
  shown: boolean;
  onClose: () => void;
  title: string;
  className?: string;
}

export const Dialog: FC<DialogProps> = ({ shown, onClose, title, children, className }) => {
  useEffect(() => {
    const handleClick = () => {
      onClose();
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
    <Modal className={className} show={shown} onClose={onClose}>
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
};
