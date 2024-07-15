// ** React Imports

// ** Third Party Components
import { Clock, Database, File, Image, X } from "react-feather";
import { Controller, useForm } from "react-hook-form";

// ** Reactstrap Imports
import {
  Button,
  Input,
  InputGroup,
  InputGroupText,
  Label,
  Modal,
  ModalBody,
  ModalHeader
} from "reactstrap";

// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss";
import Cleave from "cleave.js/react";
import toast from "react-hot-toast";
import api from "../../api/api";

const EditDaten = ({ open, handleModal, data }) => {
  const options = { time: true, timePattern: ["h", "m", "s"] };

  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues
  } = useForm({
    defaultValues: {
      id: data ? data.id : "",
      file_name: data ? data.file_name : "",
      file_duration: data ? data.file_duration : "",
      file_size: data ? data.file_size : "",
      file_type: data ? data.file_type : ""
    }
  });
  const onSubmit = async (data) => {
    try {
      const result = await api.put(`file/${data.id}`, getValues());
      toast.success("File(s) updated successfully.", { className: "py-2" });
      handleModal();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const CloseBtn = (
    <X className="cursor-pointer ms-auto" size={15} onClick={handleModal} />
  );

  return (
    <Modal
      isOpen={open}
      toggle={handleModal}
      className="sidebar-sm"
      modalClassName="modal-slide-in"
      contentClassName="pt-0"
    >
      <ModalHeader
        className="mb-1"
        toggle={handleModal}
        close={CloseBtn}
        tag="div"
      >
        <h5 className="modal-title">Edit Daten</h5>
      </ModalHeader>
      <ModalBody className="flex-grow-1">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-1">
            <Label className="form-label" for="file_name">
              File Name
            </Label>
            <InputGroup>
              <InputGroupText>
                <File size={15} />
              </InputGroupText>
              <Controller
                name="file_name"
                control={control}
                render={({ field }) => <Input {...field} />}
              />
            </InputGroup>
          </div>
          <div className="mb-1">
            <Label className="form-label" for="file_duration">
              Dauer
            </Label>
            <InputGroup>
              <InputGroupText>
                <Clock size={15} />
              </InputGroupText>
              <Controller
                name="file_duration"
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
            </InputGroup>
          </div>
          <div className="mb-1">
            <Label className="form-label" for="file_type">
              File Type
            </Label>
            <InputGroup>
              <InputGroupText>
                <Image size={15} />
              </InputGroupText>
              <Controller
                name="file_type"
                disabled
                control={control}
                render={({ field }) => <Input {...field} />}
              />
            </InputGroup>
          </div>
          <div className="mb-1">
            <Label className="form-label" for="file_size">
              File Size
            </Label>
            <InputGroup>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
              <Controller
                name="file_size"
                disabled
                control={control}
                render={({ field }) => <Input {...field} />}
              />
            </InputGroup>
          </div>

          <div className="mt-2 d-flex justify-content-end">
            <Button className="me-1" color="primary" type="submit">
              Submit
            </Button>
            <Button color="secondary" onClick={handleModal} outline>
              Cancel
            </Button>
          </div>
        </form>
      </ModalBody>
    </Modal>
  );
};

export default EditDaten;
