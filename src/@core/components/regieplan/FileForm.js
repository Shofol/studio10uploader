// ** Reactstrap Imports
import { Filter, Image, Music, Search, Video, X } from "react-feather";
import AsyncSelect from "react-select/async";
import {
  Button,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  Input,
  InputGroup,
  InputGroupText,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  UncontrolledButtonDropdown
} from "reactstrap";

// ** Utils
import { selectThemeColors } from "@utils";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";

const FileForm = ({ open, handleModal, data, onFormSubmit }) => {
  const initialValues = {
    mediaType: data ? data.mediaType : "",
    media: data ? data.media : "",
    duration: data ? data.duration : "",
    comment: data ? data.comment : ""
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
    data.id = data.media.id;
    data.name = data.media.label;
    data.media = data.media.fileType;
    data.type = "file";
    onFormSubmit(data);
    toast.success("New Entry Added Successfully.");
    reset(initialValues);
    handleModal();
  };

  const colorOptions = [
    { id: 1, value: "file1", label: "File 1", fileType: "image" },
    { id: 2, value: "file2", label: "File 2", fileType: "image" },
    { id: 4, value: "file3", label: "File 3", fileType: "image" },
    { id: 3, value: "file4", label: "File 4", fileType: "image" },
    { id: 5, value: "file5", label: "File 5", fileType: "image" },
    { id: 6, value: "file6", label: "File 6", fileType: "image" }
  ];

  const filterColors1 = (inputValue) => {
    return colorOptions.filter((i) => i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const loadOptions = (inputValue, callback) => {
    setTimeout(() => {
      callback(filterColors1(inputValue));
    }, 2000);
  };
  const handleInputChange = (newValue) => {
    const val = newValue.replace(/\W/g, "");
    return val;
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
        <h5 className="modal-title">File Entry</h5>
      </ModalHeader>
      <ModalBody className="flex-grow-1">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col sm="12" className="mb-1">
              <Label className="form-label" for="media">
                Bild
              </Label>
              <InputGroup className="justify-content-between flex-nowrap">
                <InputGroupText>
                  <Search size={15} />
                </InputGroupText>
                <Controller
                  name="media"
                  control={control}
                  render={({ field }) => (
                    <AsyncSelect
                      {...field}
                      isClearable={false}
                      className="react-select w-100"
                      classNamePrefix="select"
                      name="callback-react-select"
                      loadOptions={loadOptions}
                      onInputChange={handleInputChange}
                      defaultOptions
                      theme={selectThemeColors}
                    />
                  )}
                />

                <UncontrolledButtonDropdown>
                  <DropdownToggle color="secondary" caret outline>
                    <Filter size={15} />
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem className="w-100">
                      <Image size={15} />
                      <span className="align-middle ms-50">Image</span>
                    </DropdownItem>
                    <DropdownItem className="w-100">
                      <Video size={15} />
                      <span className="align-middle ms-50">Video</span>
                    </DropdownItem>
                    <DropdownItem className="w-100">
                      <Music size={15} />
                      <span className="align-middle ms-50">Audio</span>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledButtonDropdown>
              </InputGroup>
            </Col>

            <Col sm="12" className="mb-1">
              <Label className="form-label" for="mediaType">
                Ton
              </Label>
              <Controller
                name="mediaType"
                type="text"
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
                  <Input
                    {...field}
                    type="time"
                    step={1}
                    placeholder="Dauer"
                    className="h4"
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
export default FileForm;
