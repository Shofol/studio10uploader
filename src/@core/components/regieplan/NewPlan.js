// ** Reactstrap Imports
import { selectThemeColors } from "@utils";
import { X } from "react-feather";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Select from "react-select";
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
import Rounds from "../../../utility/data/rounds.json";
import Teams from "../../../utility/data/teams.json";
import { mapSelectValue } from "../../../utility/functions/mapSelectValue";

// ** Utils

const NewPlan = ({ open, handleModal, data, onFormSubmit }) => {
  const initialValues = {
    id: data ? data.id : "",
    title: data ? data.title : "",
    round: data ? data.round : "",
    opponent: data ? data.opponent : "",
    startTime: data ? data.startTime : "",
    status: data ? data.status : "open",
    schedule: data
      ? data.schedule
      : {
          beforeGame: [],
          break: [],
          afterGame: [],
          firstHalf: [],
          secondHalf: []
        }
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
    if (!data.id) {
      toast.success("New Schedule Created Successfully.");
    }
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
                rules={{ required: true }}
                control={control}
                render={({ field }) => <Input {...field} placeholder="Titel" />}
              />
            </Col>
            {errors.title && <p className="text-danger">This is required.</p>}

            <Col sm="12" className="mb-1">
              <Label className="form-label" for="round">
                Runde
              </Label>
              <Controller
                name="round"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    isClearable={false}
                    value={mapSelectValue(Rounds, field)}
                    theme={selectThemeColors}
                    defaultValue={null}
                    placeholder="Select a value"
                    options={Rounds}
                    className="react-select"
                    classNamePrefix="select"
                    onChange={(e) => {
                      field.onChange(e.value);
                    }}
                  />
                )}
              />
            </Col>
            {errors.round && <p className="text-danger">This is required.</p>}

            <Col sm="12" className="mb-1">
              <Label className="form-label" for="opponent">
                Gegner
              </Label>

              <Controller
                name="opponent"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    isClearable={false}
                    value={mapSelectValue(Teams, field)}
                    theme={selectThemeColors}
                    defaultValue={null}
                    placeholder="Select a value"
                    options={Teams}
                    className="react-select"
                    classNamePrefix="select"
                    onChange={(e) => {
                      field.onChange(e.value);
                    }}
                  />
                )}
              />
            </Col>
            {errors.opponent && (
              <p className="text-danger">This is required.</p>
            )}

            <Col sm="12" className="mb-1">
              <Label className="form-label" for="statTime">
                Uhrzeit
              </Label>
              <Controller
                name="startTime"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Input
                    // disabled={data?.id >= 0}
                    {...field}
                    type="time"
                    step={1}
                    className="h4"
                  />
                )}
              />
            </Col>
            {errors.startTime && (
              <p className="text-danger">This is required.</p>
            )}

            <Col sm="12">
              <div className="d-flex justify-content-end mt-1">
                <Button className="me-1" color="primary" type="submit">
                  Hinzufügen
                </Button>
                <Button
                  outline
                  color="secondary"
                  onClick={() =>
                    reset({
                      ...initialValues,
                      title: "",
                      round: "",
                      opponent: "",
                      startTime: ""
                    })
                  }
                >
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
