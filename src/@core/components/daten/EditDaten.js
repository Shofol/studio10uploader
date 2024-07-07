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

const EditDaten = ({ open, handleModal, data }) => {
  // const [Picker, setPicker] = useState(new Date());

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    defaultValues: {
      fileName: data ? data.fileName : "",
      duration: data ? data.duration : "",
      fileSize: data ? data.fileSize : "",
      fileType: data ? data.fileType : ""
    }
  });
  const onSubmit = (data) => console.log(data);

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
            <Label className="form-label" for="fileName">
              File Name
            </Label>
            <InputGroup>
              <InputGroupText>
                <File size={15} />
              </InputGroupText>
              <Controller
                name="fileName"
                control={control}
                render={({ field }) => <Input {...field} />}
              />
            </InputGroup>
          </div>
          <div className="mb-1">
            <Label className="form-label" for="duration">
              Dauer
            </Label>
            <InputGroup>
              <InputGroupText>
                <Clock size={15} />
              </InputGroupText>
              <Controller
                name="duration"
                control={control}
                render={({ field }) => <Input {...field} />}
              />
            </InputGroup>
          </div>
          <div className="mb-1">
            <Label className="form-label" for="fileType">
              File Type
            </Label>
            <InputGroup>
              <InputGroupText>
                <Image size={15} />
              </InputGroupText>
              <Controller
                name="fileType"
                disabled
                control={control}
                render={({ field }) => <Input {...field} />}
              />
            </InputGroup>
          </div>
          <div className="mb-1">
            <Label className="form-label" for="fileSize">
              File Size
            </Label>
            <InputGroup>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
              <Controller
                name="fileSize"
                disabled
                control={control}
                render={({ field }) => <Input {...field} />}
              />

              {/* <Flatpickr className='form-control' id="fileSize" value={Picker} onChange={date => setPicker(date)} /> */}
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
