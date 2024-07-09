// ** Reactstrap Imports
import { X } from "react-feather";
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

const TextForm = ({ open, handleModal, data }) => {
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
        <Form>
          <Row>
            <Col sm="12" className="mb-1">
              <Label className="form-label" for="duration">
                Bild
              </Label>
              <Input type="select" name="select" id="select-basic">
                <option>Select a value</option>
                <option>Willkommens Screen</option>
                <option>Kameras/Live</option>
                <option>TV</option>
              </Input>
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
export default TextForm;
