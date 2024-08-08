import { useRef, useState } from "react";
import { File, Folder, Printer, Save } from "react-feather";
import toast from "react-hot-toast";
import { Button, Card, CardBody, CardHeader } from "reactstrap";
import api from "../@core/api/api";
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
    if (modal) {
      setNewPlan(false);
      setOpenPlan(false);
    }
    setModal(!modal);
  };

  const handleSave = () => {
    listRef.current.handleSave(eventId);
    setEventId(null);
  };

  const handleEdit = () => {
    setNewPlan(true);
    handleModal();
  };

  const updateEvent = async (plan) => {
    try {
      const result = await api.post("event/action", {
        section: "event",
        action: "edit",
        type: "parent",
        data: {
          id: plan.id,
          title: plan.title,
          round: plan.round,
          opponent: plan.opponent,
          status: plan.status,
          startTime: plan.startTime,
        },
      });
      toast.success("Event Updated Successfully");
    } catch (error) {
      console.error(error);
    }
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
                setCurrentSchedule(null);
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
            {currentSchedule && !currentSchedule.id && (
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
            )}
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
            <Schedules
              ref={listRef}
              data={currentSchedule}
              handlePlanEdit={() => handleEdit()}
              onSaveSuccess={() => {
                setCurrentSchedule(null);
              }}
            />
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
            data={currentSchedule}
            open={modal}
            handleModal={handleModal}
            onFormSubmit={(plan) => {
              if (eventId) {
                updateEvent(plan);
              }
              setCurrentSchedule({ ...plan });
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
              setOpenPlan(false);
            }}
          />
        )}
      </CardBody>
    </Card>
  );
};

export default Regieplan;
