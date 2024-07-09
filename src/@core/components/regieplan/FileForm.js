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

const FileForm = ({ open, handleModal, data }) => {
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
        <Form>
          <Row>
            <Col sm="12" className="mb-1">
              <Label className="form-label" for="nameMulti">
                Bild
              </Label>
              <InputGroup className="justify-content-between flex-nowrap">
                <InputGroupText>
                  <Search size={15} />
                </InputGroupText>
                <AsyncSelect
                  isClearable={false}
                  className="react-select w-100"
                  classNamePrefix="select"
                  name="callback-react-select"
                  //   loadOptions={loadOptions}
                  defaultOptions
                  //   onInputChange={handleInputChange}
                  theme={selectThemeColors}
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
              <Label className="form-label" for="duration">
                Ton
              </Label>
              <Input type="select" name="select" id="select-basic">
                <option>Select a value</option>
                <option>Playlist</option>
                <option>Moderator</option>
                <option>Speaker</option>
                <option>Audio File</option>
              </Input>
            </Col>

            <Col sm="12" className="mb-1">
              <Label className="form-label" for="duration">
                Dauer
              </Label>
              <Input
                type="time"
                step={1}
                name="duration"
                id="duration"
                placeholder="duration"
                className="h4"
              />
            </Col>
            <Col sm="12" className="mb-1">
              <Label className="form-label" for="comment">
                Komentar
              </Label>
              <Input
                type="text"
                name="comment"
                id="comment"
                placeholder="Komentar"
              />
            </Col>
            <Col sm="12">
              <div className="d-flex justify-content-end mt-1">
                <Button
                  className="me-1"
                  color="primary"
                  type="submit"
                  onClick={(e) => e.preventDefault()}
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
export default FileForm;
