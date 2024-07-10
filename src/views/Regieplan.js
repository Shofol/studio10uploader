import { format, sub } from "date-fns";
import { useState } from "react";
import { Box, File, Folder, Printer, Save, Type } from "react-feather";
import { Button, Card, CardBody, CardHeader } from "reactstrap";
import FileForm from "../@core/components/regieplan/FileForm";
import GroupForm from "../@core/components/regieplan/GroupForm";
import NewPlan from "../@core/components/regieplan/NewPlan";
import ScheduleList from "../@core/components/regieplan/ScheduleList";
import TextForm from "../@core/components/regieplan/TextForm";
import Schedules from "../utility/data/schedules.json";

const Regieplan = () => {
  const [entryMethod, setEntryMethod] = useState("text");
  const [modal, setModal] = useState(false);
  const [newPlan, setNewPlan] = useState(false);
  const [schedules, setSchedules] = useState(Schedules);
  const [currentSchedule, setCurrentSchedule] = useState(null);

  const handleModal = () => {
    setModal(!modal);
  };


  const updateStartTime = () => {
    let currentStartTime = currentSchedule.startTime;
    const tempArray = [...currentSchedule.schedule];
    for (let i = tempArray.length - 1; i >= 0; i--) {
      const [durationHours, durationMinutes, durationSeconds] =
        tempArray[i].duration.split(":");
      const entryStartTime = format(
        sub(new Date(`12-01-2024 ${currentStartTime}`), {
          hours: +durationHours,
          minutes: +durationMinutes,
          seconds: +durationSeconds
        }),
        "hh:mm:ss a"
      );

      // const entryEndTime = format(
      //   add(new Date(`12-01-2024 ${currentStartTime}`), {
      //     hours: +durationHours,
      //     minutes: +durationMinutes,
      //     seconds: +durationSeconds
      //   }),
      //   "HH:mm:ss"
      // );

      tempArray[i].startTime = entryStartTime;
      currentStartTime = entryStartTime;
    }
    setSchedules(tempArray)
  };

  const handleNewEntry = (entry) => {
    currentSchedule.schedule.push(entry);
    updateStartTime();
  };

  return (
    <Card>
      <CardHeader>{/* <CardTitle>🙌</CardTitle> */}</CardHeader>
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
            <Button.Ripple size="sm" outline>
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
        {currentSchedule && currentSchedule.schedule.length > 0 && (
          <>
            <ScheduleList
              data={schedules}
            />
          </>
        )}
        {(!currentSchedule || currentSchedule.schedule.length <= 0) && (
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
