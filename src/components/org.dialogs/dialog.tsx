import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Strings } from '../../resources';
import Button from 'react-bootstrap/Button';

interface DialogProps {
  show: boolean;
  title: string;
  message: string;
  btnCancelLbl?: string;
  btnConfirmLbl: string;
  onCancelClick?: () => void;
  onConfirmClick: () => void;
  onHideClick: () => void;
}

export const Dialog = (props: DialogProps) => {
  return (
    <Modal show={props.show} onHide={props.onHideClick}>
      <Modal.Header closeButton>
      <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.message}</Modal.Body>
      <Modal.Footer>
        {!!props.onCancelClick &&
          <Button variant="secondary" onClick={props.onCancelClick}>{props.btnCancelLbl}</Button>
        }
        <Button variant="primary" onClick={props.onConfirmClick}>{props.btnConfirmLbl}</Button>
      </Modal.Footer>
    </Modal>
  );
};
