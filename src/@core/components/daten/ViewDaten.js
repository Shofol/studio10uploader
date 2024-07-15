import React from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const ViewDaten = ({ open, handleModal, data }) => {
  return (
    <Modal
      isOpen={open}
      toggle={handleModal}
      className="modal-dialog-centered"
      modalClassName="modal-primary modal-lg modal-centered"
    >
      <ModalHeader toggle={handleModal}>View Daten</ModalHeader>
      <ModalBody className="d-flex justify-content-center">
        {data.file_type.includes("image") && (
          <img
            src="https://placehold.co/600x400/EEE/31343C"
            style={{ width: "50vw" }}
          />
        )}
        {data.file_type.includes("video") && (
          <video
            controls
            autoPlay
            src="https://youtu.be/ScMzIvxBSi4"
            style={{ width: "50vw" }}
          />
        )}
        {data.file_type.includes("audio") && (
          <audio controls>
            <source src="horse.ogg" />
          </audio>
        )}
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleModal} outline>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ViewDaten;
