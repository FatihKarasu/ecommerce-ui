import React from "react";
import { Button, Modal } from "react-bootstrap";
export default function ConfirmationModal({ show, onHide, title, f }) {

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="button-container">
          <Button variant="primary" type="button" onClick={() => f()}>
            Yes
          </Button>
          <Button variant="danger" type="button" onClick={() => onHide()}>
            Cancel
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
