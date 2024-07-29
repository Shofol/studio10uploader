import { useRef, useState } from "react";
import { File, Folder, Printer, Save } from "react-feather";
import { Button, Card, CardBody, CardHeader } from "reactstrap";
import NewPlan from "../@core/components/regieplan/NewPlan";
import Schedules from "../@core/components/regieplan/Schedules";

const Regieplan = () => {
  const [modal, setModal] = useState(false);
  const [newPlan, setNewPlan] = useState(false);
  const [currentSchedule, setCurrentSchedule] = useState(null);
  const listRef = useRef(null);

  const handleModal = () => {
    setModal(!modal);
  };

  const handleSave = () => {
    listRef.current.handleSave();
  };

  return (
    <Card>
      <CardBody>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <CardHeader className="h2">Regieplan</CardHeader>
          <div className="d-flex gap-1 flex-1">
            <Button.Ripple
              size="sm"
              outline
              onClick={() => {
                handleModal();
                setNewPlan(true);
              }}
            >
              <File size={14} />
              <span className="align-middle ms-25">New</span>
            </Button.Ripple>
            <Button.Ripple size="sm" outline>
              <Folder size={14} />
              <span className="align-middle ms-25">Open</span>
            </Button.Ripple>
            <Button.Ripple
              size="sm"
              outline
              onClick={() => {
                handleSave();
              }}
            >
              <Save size={14} />
              <span className="align-middle ms-25">Save</span>
            </Button.Ripple>
            <Button.Ripple
              size="sm"
              outline
              onClick={() => {
                window.print();
              }}
            >
              <Printer size={14} />
              <span className="align-middle ms-25">Print</span>
            </Button.Ripple>
          </div>
        </div>

        {currentSchedule && (
          <>
            <Schedules ref={listRef} data={currentSchedule} />
          </>
        )}
        {!currentSchedule && (
          <Card className="d-flex">
            <CardHeader className="border my-2">
              <h4 className="mx-auto py-2">Create some magic today! 🙌</h4>
            </CardHeader>
          </Card>
        )}

        {newPlan && (
          <NewPlan
            open={modal}
            handleModal={handleModal}
            onFormSubmit={(plan) => {
              setCurrentSchedule(plan);
              setNewPlan(false);
            }}
          />
        )}
      </CardBody>
    </Card>
  );
};

export default Regieplan;
