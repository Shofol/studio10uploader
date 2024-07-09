import React from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const DeleteDaten = ({ open, handleModal }) => {
  return (
    <Modal
      isOpen={open}
      toggle={handleModal}
      className="modal-dialog-centered"
      modalClassName="modal-danger"
    >
      <ModalHeader toggle={handleModal}>Delete Daten</ModalHeader>
      <ModalBody>Are you sure you want to delete this daten?</ModalBody>
      <ModalFooter>
        <Button color="danger" onClick={handleModal}>
          Delete
        </Button>
        <Button color="secondary" onClick={handleModal} outline>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default DeleteDaten;
