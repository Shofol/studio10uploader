// ** Reactstrap Imports
import { X } from "react-feather";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  Button,
  Col,
  Form,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row
} from "reactstrap";

// ** Utils

const GroupForm = ({ open, handleModal, data, onFormSubmit }) => {
  const initialValues = {
    id: data ? data.id : "",
    type: "group",
    name: data ? data.name : "",
    media: data ? data.media : "",
    duration: data ? data.duration : "00:00:00",
    comment: data ? data.comment : "",
    startTime: data ? data.startTime : "",
    children: data ? data.children : []
  };
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: initialValues
  });

  const onSubmit = (data) => {
    onFormSubmit(data);
    toast.success("New Entry Added Successfully.");
    reset(initialValues);
    handleModal();
  };

  const CloseBtn = (
    <X className="cursor-pointer ms-auto" size={15} onClick={handleModal} />
  );
  return (
    <Modal
      isOpen={open}
      toggle={handleModal}
      className="sidebar-lg"
      modalClassName="modal-slide-in"
      contentClassName="pt-0"
    >
      <ModalHeader
        className="mb-1"
        toggle={handleModal}
        close={CloseBtn}
        tag="div"
      >
        <h5 className="modal-title">Sammelposition Entry</h5>
      </ModalHeader>
      <ModalBody className="flex-grow-1">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col sm="12" className="mb-1">
              <Label className="form-label" for="name">
                Titel
              </Label>
              <Controller
                name="name"
                type="text"
                control={control}
                render={({ field }) => <Input {...field} placeholder="Titel" />}
              />
            </Col>
            <Col sm="12" className="mb-1">
              <Label className="form-label" for="comment">
                Komentar
              </Label>
              <Controller
                name="comment"
                type="text"
                control={control}
                render={({ field }) => (
                  <Input {...field} placeholder="Komentar" />
                )}
              />
            </Col>
            <Col sm="12">
              <div className="d-flex justify-content-end mt-1">
                <Button className="me-1" color="primary" type="submit">
                  Hinzufügen
                </Button>
                <Button outline color="secondary" type="reset">
                  Abbrechen
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </ModalBody>
    </Modal>
  );
};
export default GroupForm;
