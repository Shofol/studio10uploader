import { useRef, useState } from "react";
import { File, Folder, Printer, Save } from "react-feather";
import { Button, Card, CardBody, CardHeader } from "reactstrap";
import NewPlan from "../@core/components/regieplan/NewPlan";
import Schedules from "../@core/components/regieplan/Schedules";
import ViewPlan from "../@core/components/regieplan/ViewPlan";

const Regieplan = () => {
  const [modal, setModal] = useState(false);
  const [newPlan, setNewPlan] = useState(false);
  const [currentSchedule, setCurrentSchedule] = useState(null);
  const [openPlan, setOpenPlan] = useState(false);
  const listRef = useRef(null);
  const [eventId, setEventId] = useState(null);

  const handleModal = () => {
    setModal(!modal);
  };

  const handleSave = () => {
    listRef.current.handleSave(eventId);
    setEventId(null);
  };

  return (
    <Card>
      <CardBody>
        <div className="d-flex justify-content-between align-items-center">
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
            <Button.Ripple
              size="sm"
              outline
              onClick={() => {
                setOpenPlan(true);
                handleModal();
              }}
            >
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
                if (listRef.current) {
                  listRef.current.handlePrintData();
                }
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

        {openPlan && (
          <ViewPlan
            open={modal}
            handleModal={handleModal}
            onSelect={(plan) => {
              setCurrentSchedule(plan);
              setEventId(plan.id);
              handleModal();
            }}
          />
        )}
      </CardBody>
    </Card>
  );
};

export default Regieplan;
