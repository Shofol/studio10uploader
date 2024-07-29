import React, { forwardRef, useState } from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import ScheduleList from "./ScheduleList";

const Schedules = forwardRef(({ data }, ref) => {
  const [active, setActive] = useState(0);
  const [entryMethod, setEntryMethod] = useState();
  const [modal, setModal] = useState(false);
  const [scheduleTypes, setScheduleTypes] = useState([
    { label: "Vor Dem Spiel", value: 0, scheduleData: {}, isReverse: true },
    { label: "1. Halbzeit", value: 1, scheduleData: {}, isReverse: false },
    { label: "Pause", value: 2, scheduleData: {}, isReverse: false },
    { label: "2. Halbzeit", value: 3, scheduleData: {}, isReverse: false },
    { label: "Nach Dem Spiel", value: 4, scheduleData: {}, isReverse: false },
  ]);

  const refs = useRef([]);

  const toggle = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  const handleNewEntry = (entry) => {
    refs.current[active].handleEntry(entry);
  };

  const handleModal = () => {
    setModal(!modal);
  };

  const calculateTime = (
    durationHours,
    durationMinutes,
    durationSeconds,
    startTime
  ) => {
    return format(
      add(new Date(`12-01-2024 ${startTime}`), {
        hours: +durationHours,
        minutes: +durationMinutes,
        seconds: +durationSeconds,
      }),
      "HH:mm:ss"
    );
  };

  const mapData = () => {
    const tempData = { ...data };
    // update before game data
    const beforGameData = {};
    beforGameData.title = tempData.title;
    beforGameData.startTime = tempData.startTime;
    beforGameData.schedule = tempData.schedule.beforeGame;

    // update first half game data
    const firstHalfData = {};
    firstHalfData.title = tempData.title;
    firstHalfData.startTime = tempData.startTime;
    firstHalfData.schedule = tempData.schedule.firstHalf;

    // update game break data
    const pauseData = {};
    pauseData.title = tempData.title;
    pauseData.startTime = calculateTime(0, 45, 0, tempData.startTime);
    pauseData.schedule = tempData.schedule.break;

    // update first half game data
    const secondHalfData = {};
    secondHalfData.title = tempData.title;
    secondHalfData.startTime = calculateTime(0, 60, 0, tempData.startTime);
    secondHalfData.schedule = tempData.schedule.secondHalf;

    // update first half game data
    const afterGameData = {};
    afterGameData.title = tempData.title;
    afterGameData.startTime = calculateTime(0, 105, 0, tempData.startTime);
    afterGameData.schedule = tempData.schedule.afterGame;
  };

  useEffect(() => {
    mapData();
  }, [data]);

  return (
    <div>
      <div className="d-flex justify-content-between">
        {data && (
          <h4>
            {data.title} (Uhrzeit: {data.startTime})
          </h4>
        )}
        {data && (
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
      </div>
      <Nav tabs>
        {scheduleTypes.map((item) => {
          return (
            <NavItem key={item.value}>
              <NavLink
                active={active === item.value}
                onClick={() => {
                  toggle(item.value);
                }}
              >
                {item.label}
              </NavLink>
            </NavItem>
          );
        })}
      </Nav>
      <TabContent className="py-50" activeTab={active}>
        {scheduleTypes.map((item, idx) => {
          return (
            <TabPane tabId={item.value} key={item.value}>
              <ScheduleList ref={(el) => (refs.current[idx] = el)} />
            </TabPane>
          );
        })}
      </TabContent>

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
    </div>
  );
});

export default Schedules;
