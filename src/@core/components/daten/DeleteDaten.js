import React from "react";
import toast from "react-hot-toast";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import api from "../../api/api";

const DeleteDaten = ({ open, handleModal, onDelete, data }) => {
  const onSubmit = async () => {
    try {
      const result = await api.delete(`file/${data.id}`);
      toast.success("File(s) deleted successfully.", { className: "py-2" });
      onDelete();
    } catch (error) {
      console.log(error);
    }
  };
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
        <Button
          color="danger"
          onClick={() => {
            onSubmit();
          }}
        >
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
