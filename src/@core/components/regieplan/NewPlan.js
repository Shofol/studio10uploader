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

const NewPlan = ({ open, handleModal, data }) => {
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    defaultValues: {
      title: data ? data.title : "",
      round: data ? data.round : "",
      opponent: data ? data.opponent : "",
      startTime: data ? data.startTime : ""
    }
  });
  const onSubmit = (data) => { 
    console.log(errors)
    console.log(JSON.stringify(data));
    toast.success('New Schedule Created Successfully.')
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
        <h5 className="modal-title">Neuer Regieplan erstellen</h5>
      </ModalHeader>
      <ModalBody className="flex-grow-1">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col sm="12" className="mb-1">
              <Label className="form-label" for="title">
                Titel
              </Label>
              <Controller
                name="title"
                type="text"
                control={control}
                render={({ field }) => <Input {...field} placeholder="Titel"/>}
              />
            </Col>
            <Col sm="12" className="mb-1">
              <Label className="form-label" for="round">
                Runde
              </Label>
              <Controller
                name="round"
                control={control}
                render={({ field }) => (
                  <Input type="select" {...field}>
                    <option>Select a value</option>
                    <option>Runde 1</option>
                    <option>Runde 2</option>
                  </Input>
                )}
              />
            </Col>

            <Col sm="12" className="mb-1">
              <Label className="form-label" for="opponent">
                Gegner
              </Label>

              <Controller
                name="opponent"
                control={control}
                render={({ field }) => (
                  <Input type="select" {...field}>
                    <option>Select a value</option>
                    <option>FC Basel 1893</option>
                    <option>BSC Young Boys</option>
                    <option>Grasshopper Club Zürich</option>
                  </Input>
                )}
              />
            </Col>

            <Col sm="12" className="mb-1">
              <Label className="form-label" for="statTime">
                Uhrzeit
              </Label>
              <Controller
                name="startTime"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="time"
                    step={1}
                    className="h4"
                  />
                )}
              />
            </Col>

            <Col sm="12">
              <div className="d-flex justify-content-end mt-1">
                <Button
                  className="me-1"
                  color="primary"
                  type="submit"
                >
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
export default NewPlan;
