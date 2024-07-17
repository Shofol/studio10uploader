import { format } from "date-fns";
import { useRef, useState } from "react";
import { Box, File, Folder, Printer, Save, Type } from "react-feather";
import { Button, Card, CardBody, CardHeader } from "reactstrap";
import FileForm from "../@core/components/regieplan/FileForm";
import GroupForm from "../@core/components/regieplan/GroupForm";
import NewPlan from "../@core/components/regieplan/NewPlan";
import ScheduleList from "../@core/components/regieplan/ScheduleList";
import TextForm from "../@core/components/regieplan/TextForm";

const Regieplan = () => {
  const [entryMethod, setEntryMethod] = useState();
  const [modal, setModal] = useState(false);
  const [newPlan, setNewPlan] = useState(false);
  const [currentSchedule, setCurrentSchedule] = useState(null);
  const listRef = useRef(null);

  const handleModal = () => {
    if (entryMethod && modal) {
      setEntryMethod(null);
    }
    setModal(!modal);
  };

  const handleNewEntry = (entry) => {
    listRef.current.handleEntry(entry);
  };

  const handleSave = () => {
    listRef.current.handleSave();
  };

  return (
    <Card>
      <CardBody>
        <div className="d-flex justify-content-between mb-2">
          {currentSchedule && (
            <div className="d-flex gap-1">
              <Button.Ripple
                onClick={() => {
                  handleModal();
                  setEntryMethod("file");
                }}
                size="sm"
                color="primary"
                outline
              >
                <File size={14} />
                <span className="align-middle ms-25">File</span>
              </Button.Ripple>
              <Button.Ripple
                onClick={() => {
                  handleModal();
                  setEntryMethod("group");
                }}
                size="sm"
                color="primary"
                outline
              >
                <Box size={14} />
                <span className="align-middle ms-25">Sammelposition</span>
              </Button.Ripple>
              <Button.Ripple
                onClick={() => {
                  handleModal();
                  setEntryMethod("text");
                }}
                size="sm"
                color="primary"
                outline
              >
                <Type size={14} />
                <span className="align-middle ms-25">Textposition</span>
              </Button.Ripple>
            </div>
          )}
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
          <h4>
            {currentSchedule.title} (Uhrzeit:{" "}
            {format(
              new Date(`12-01-2024 ${currentSchedule.startTime}`),
              "hh:mm:ss a"
            )}
            )
          </h4>
        )}
        {currentSchedule && (
          <>
            <ScheduleList ref={listRef} data={currentSchedule} />
          </>
        )}
        {!currentSchedule && (
          <Card className="d-flex">
            <CardHeader className="border my-2">
              <h4 className="mx-auto py-2">Create some magic today! 🙌</h4>
            </CardHeader>
          </Card>
        )}
        {entryMethod === "file" && (
          <FileForm
            open={modal}
            handleModal={handleModal}
            onFormSubmit={handleNewEntry}
          />
        )}
        {entryMethod === "group" && (
          <GroupForm
            open={modal}
            handleModal={handleModal}
            onFormSubmit={handleNewEntry}
          />
        )}
        {entryMethod === "text" && (
          <TextForm
            open={modal}
            handleModal={handleModal}
            onFormSubmit={handleNewEntry}
          />
        )}
        {newPlan && !entryMethod && (
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
