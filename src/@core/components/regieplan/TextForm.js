// ** Reactstrap Imports
import Cleave from 'cleave.js/react';
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

const TextForm = ({ open, handleModal, data, onFormSubmit }) => {
  const options = { time: true, timePattern: ["h", "m", "s"] };

  const initialValues = {
    id: data ? data.id : "",
    type: "text",
    mediaType: data ? data.mediaType : "",
    media: data ? data.media : "",
    duration: data ? data.duration : "",
    comment: data ? data.comment : "",
    startTime: data ? data.startTime : "",
    name: data ? data.name : "",
    audio: data ? data.audio : ""
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
    console.log(errors);
    console.log(JSON.stringify(data));
    onFormSubmit(data);
    toast.success("New Entry Created Successfully.");
    handleModal();
    reset(initialValues);
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
        <h5 className="modal-title">Textposition Entry</h5>
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
              <Label className="form-label" for="duration">
                Bild
              </Label>
              <Controller
                name="media"
                control={control}
                render={({ field }) => (
                  <Input {...field} type="select">
                    <option>Select a value</option>
                    <option>Willkommens Screen</option>
                    <option>Kameras/Live</option>
                    <option>TV</option>
                  </Input>
                )}
              />
            </Col>

            <Col sm="12" className="mb-1">
              <Label className="form-label" for="duration">
                Ton
              </Label>
              <Controller
                name="mediaType"
                control={control}
                render={({ field }) => (
                  <Input {...field} type="select">
                    <option>Select a value</option>
                    <option>Playlist</option>
                    <option>Moderator</option>
                    <option>Speaker</option>
                    <option>Audio File</option>
                  </Input>
                )}
              />
            </Col>

            <Col sm="12" className="mb-1">
              <Label className="form-label" for="duration">
                Dauer
              </Label>
              <Controller
                name="duration"
                control={control}
                render={({ field }) => (
                  <Cleave
                    {...field}
                    className="form-control"
                    placeholder="12:00:00"
                    options={options}
                    id="time"
                  />
                )}
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
                  <Input {...field} type="text" placeholder="Komentar" />
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
export default TextForm;
