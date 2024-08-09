// ** Reactstrap Imports
import { selectThemeColors } from "@utils";
import Cleave from "cleave.js/react";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { X } from "react-feather";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
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
import colors from "../../../utility/data/colors.json";
import media from "../../../utility/data/media.json";
import mediaTypes from "../../../utility/data/mediaTypes.json";
import { mapSelectValue } from "../../../utility/functions/mapSelectValue";

const TextForm = forwardRef(
  ({ open, handleModal, data, onFormSubmit, fileList }, ref) => {
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
      audio: data ? data.audio : "",
      color: data ? data.color : ""
    };
    const {
      handleSubmit,
      control,
      reset,
      watch,
      setValue,
      formState: { errors }
    } = useForm({
      defaultValues: initialValues
    });

    const watchAudioValue = watch("mediaType");
    const audioFileValueRef = useRef();

    useEffect(() => {
      if (data) {
        reset(data);
        if (data.audio) {
          setValue(
            "audio",
            fileList.find((item) => item.id === data.audio)
          );
        }
      }
    }, [data]);

    useImperativeHandle(ref, () => ({
      reset() {
        reset(initialValues);
      }
    }));

    const onSubmit = (data) => {
      if (watchAudioValue === "audio") {
        data.audio = data.audio.id;
      }
      onFormSubmit(data);
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
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Input {...field} placeholder="Titel" />
                  )}
                />
              </Col>
              {errors.name && <p className="text-danger">This is required.</p>}

              <Col sm="12" className="mb-1">
                <Label className="form-label" for="media">
                  Bild
                </Label>
                <Controller
                  name="media"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      isClearable={false}
                      value={mapSelectValue(media, field)}
                      theme={selectThemeColors}
                      defaultValue={null}
                      placeholder="Select a value"
                      options={media}
                      className="react-select"
                      classNamePrefix="select"
                      onChange={(e) => {
                        field.onChange(e.value);
                      }}
                    />
                  )}
                />
              </Col>
              {errors.media && <p className="text-danger">This is required.</p>}

              <Col sm="12" className="mb-1">
                <Label className="form-label">Ton</Label>
                <Controller
                  name="mediaType"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      isClearable={false}
                      value={mapSelectValue(mediaTypes, field)}
                      theme={selectThemeColors}
                      defaultValue={null}
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
                            // isSearchable
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
                  control={control}
                  render={({ field }) => (
                    <Input {...field} type="text" placeholder="Komentar" />
                  )}
                />
              </Col>
              {/* {errors.comment && (
                <p className="text-danger">This is required.</p>
              )} */}

              <Col sm="12" className="mb-1">
                <Label className="form-label" for="color">
                  Color
                </Label>
                <Controller
                  name="color"
                  type="text"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      isClearable={false}
                      value={mapSelectValue(colors, field)}
                      styles={{
                        option: (styles, { data }) => ({
                          ...styles,
                          backgroundColor: data.value,
                          color: "white"
                        })
                      }}
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
  }
);
export default TextForm;
