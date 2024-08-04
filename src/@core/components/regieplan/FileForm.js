// ** Reactstrap Imports
import { X } from "react-feather";
import {
  Button,
  Col,
  Form,
  Input,
  InputGroup,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row
} from "reactstrap";

// ** Utils
import { selectThemeColors } from "@utils";
import Cleave from "cleave.js/react";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Select from "react-select";
import colors from "../../../utility/data/colors.json";
import mediaTypes from "../../../utility/data/mediaTypes.json";
import { mapSelectValue } from "../../../utility/functions/mapSelectValue";

const FileForm = ({ open, handleModal, data, fileList, onFormSubmit }) => {
  const options = { time: true, timePattern: ["h", "m", "s"] };
  const [files, setFiles] = useState(fileList);
  const initialValues = {
    mediaType: data ? data.mediaType : "",
    media: data ? data.media : "",
    duration: data ? data.duration : "",
    comment: data ? data.comment : "",
    audio: data ? data.audio : "",
    color: data ? data.color : ""
  };
  const fileValueRef = useRef();
  const audioFileValueRef = useRef();

  const {
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: initialValues
  });

  useEffect(() => {
    if (data) {
      reset(data);
    }
  }, [data]);

  const filterData = (type) => {
    if (type === "all") {
      setFiles(fileList);
    } else {
      setFiles(fileList.filter((item) => item.fileType.includes(type)));
    }
  };

  const watchAudioValue = watch("mediaType");

  const onSubmit = (entry) => {
    entry.id = entry.media.id ?? entry.id;
    entry.name = entry.media.label ?? entry.name;
    entry.media = entry.media.fileType ?? entry.media;
    entry.type = "file";

    onFormSubmit(entry);
    if (!data.id) {
      toast.success("New Entry Added Successfully.");
    }
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
                <Controller
                  name="media"
                  rules={{
                    required: true
                  }}
                  control={control}
                  render={({ field }) => (
                    <Select
                      ref={fileValueRef}
                      classNamePrefix="select"
                      isClearable
                      isSearchable
                      defaultValue={
                        data
                          ? files.find(
                              (item) =>
                                item.id ===
                                (data.files_id ? data.files_id : data.id)
                            )
                          : null
                      }
                      className=" w-100"
                      options={files}
                      onChange={field.onChange}
                    />
                  )}
                />
                {/* <UncontrolledButtonDropdown>
                  <DropdownToggle color="secondary" caret outline>
                    <Filter size={15} />
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem
                      className="w-100"
                      onClick={() => {
                        filterData("image");
                      }}
                    >
                      <Image size={15} />
                      <span className="align-middle ms-50">Image</span>
                    </DropdownItem>
                    <DropdownItem
                      className="w-100"
                      onClick={() => {
                        filterData("video");
                      }}
                    >
                      <Video size={15} />
                      <span className="align-middle ms-50">Video</span>
                    </DropdownItem>
                    <DropdownItem
                      className="w-100"
                      onClick={() => {
                        filterData("audio");
                      }}
                    >
                      <Music size={15} />
                      <span className="align-middle ms-50">Audio</span>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledButtonDropdown> */}
              </InputGroup>
            </Col>
            {errors.media && <p className="text-danger">This is required.</p>}
            <div className="d-flex justify-content-between mb-2">
              <div className="form-check">
                <Input
                  type="radio"
                  id="fil-all"
                  name="ex1"
                  defaultChecked
                  onChange={() => {
                    filterData("all");
                  }}
                />
                <Label className="form-check-label" for="fil-all">
                  All
                </Label>
              </div>
              <div className="form-check">
                <Input
                  type="radio"
                  name="ex1"
                  id="fill-image"
                  onChange={() => {
                    filterData("image");
                  }}
                />
                <Label className="form-check-label" for="fill-image">
                  Image
                </Label>
              </div>
              <div className="form-check">
                <Input
                  type="radio"
                  name="ex1"
                  id="fill-video"
                  onChange={() => {
                    filterData("video");
                  }}
                />
                <Label className="form-check-label" for="fill-video">
                  Video
                </Label>
              </div>
              <div className="form-check">
                <Input
                  type="radio"
                  name="ex1"
                  id="fill-audio"
                  onChange={() => {
                    filterData("audio");
                  }}
                />
                <Label className="form-check-label" for="fill-audio">
                  Audio
                </Label>
              </div>
            </div>
            <Col sm="12" className="mb-1">
              <Label className="form-label" for="mediaType">
                Ton
              </Label>
              <Controller
                name="mediaType"
                type="text"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    isClearable={false}
                    value={mapSelectValue(mediaTypes, field)}
                    theme={selectThemeColors}
                    placeholder="Select a value"
                    options={mediaTypes}
                    className="react-select"
                    classNamePrefix="select"
                    onChange={(e) => {
                      field.onChange(e.value);
                    }}
                  />
                )}
              />
            </Col>
            {errors.mediaType && (
              <p className="text-danger">This is required.</p>
            )}

            {watchAudioValue === "audio" && (
              <>
                <Col sm="12" className="mb-1">
                  <Label className="form-label" for="audio">
                    Audio File
                  </Label>
                  <InputGroup className="justify-content-between flex-nowrap">
                    <Controller
                      name="audio"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Select
                          ref={audioFileValueRef}
                          {...field}
                          isClearable
                          isSearchable
                          className="react-select w-100"
                          options={fileList.filter((item) =>
                            item.fileType.includes("audio")
                          )}
                        />
                      )}
                    />
                  </InputGroup>
                </Col>
                {errors.audio && (
                  <p className="text-danger">This is required.</p>
                )}
              </>
            )}

            <Col sm="12" className="mb-1">
              <Label className="form-label" for="duration">
                Dauer
              </Label>
              <Controller
                name="duration"
                control={control}
                rules={{
                  required: true,
                  validate: (value) => value !== "00:00:00"
                }}
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
            {errors.duration && (
              <p className="text-danger">This is required.</p>
            )}

            <Col sm="12" className="mb-1">
              <Label className="form-label" for="comment">
                Komentar
              </Label>
              <Controller
                name="comment"
                type="text"
                rules={{ required: true }}
                control={control}
                render={({ field }) => (
                  <Input {...field} type="text" placeholder="Komentar" />
                )}
              />
            </Col>
            {errors.comment && <p className="text-danger">This is required.</p>}

            <Col sm="12" className="mb-1">
              <Label className="form-label" for="color">
                Color
              </Label>
              <Controller
                name="color"
                type="text"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    isClearable={false}
                    styles={{
                      option: (styles, { data }) => ({
                        ...styles,
                        backgroundColor: data.value,
                        color: "white"
                      })
                    }}
                    value={mapSelectValue(colors, field)}
                    theme={selectThemeColors}
                    defaultValue={null}
                    placeholder="Select a value"
                    options={colors}
                    className="react-select"
                    classNamePrefix="select"
                    onChange={(e) => {
                      field.onChange(e.value);
                    }}
                  />
                )}
              />
            </Col>

            <Col sm="12">
              <div className="d-flex justify-content-end mt-1">
                <Button className="me-1" color="primary" type="submit">
                  Hinzufügen
                </Button>
                <Button
                  outline
                  color="secondary"
                  onClick={() => {
                    fileValueRef.current.clearValue();
                    if (audioFileValueRef.current) {
                      audioFileValueRef.current.clearValue();
                    }
                    reset({
                      ...initialValues,
                      name: "",
                      color: "",
                      comment: "",
                      duration: "",
                      mediaType: "",
                      media: ""
                    });
                  }}
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
export default FileForm;
