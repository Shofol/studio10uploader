import { add, format } from "date-fns";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from "react";
import { Box, File, Type } from "react-feather";
import toast from "react-hot-toast";
import { useReactToPrint } from "react-to-print";
import {
  Button,
  Card,
  CardBody,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane
} from "reactstrap";
import api from "../../api/api";
import FileForm from "./FileForm";
import GroupForm from "./GroupForm";
import PrintData from "./PrintData";
import ScheduleList from "./ScheduleList";
import TextForm from "./TextForm";

const Schedules = forwardRef(({ data }, ref) => {
  const [active, setActive] = useState(0);
  const [entryMethod, setEntryMethod] = useState(null);
  const [modal, setModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [printData, setPrintData] = useState(null);
  const printRef = useRef();
  const [scheduleTypes, setScheduleTypes] = useState([
    { label: "Vor Dem Spiel", value: 0, scheduleData: null, isReverse: true },
    { label: "1. Halbzeit", value: 1, scheduleData: null, isReverse: false },
    { label: "Pause", value: 2, scheduleData: null, isReverse: false },
    { label: "2. Halbzeit", value: 3, scheduleData: null, isReverse: false },
    { label: "Nach Dem Spiel", value: 4, scheduleData: null, isReverse: false }
  ]);

  const refs = useRef([]);

  const [fileList, setFileList] = useState([]);

  const fetchFiles = async () => {
    try {
      const result = await api.post("file");
      const tempData = result.data.data.map((item) => ({
        id: item.id,
        label: item.title,
        fileType: item.file_type
      }));
      setFileList(tempData);
      console.log(result.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (fileList.length === 0) {
      fetchFiles();
    }
  }, []);

  const toggle = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  const handleNewEntry = (entry) => {
    if (editIndex !== null && editIndex >= 0) {
      refs.current[active].handleEntry(entry, editIndex);
    } else {
      refs.current[active].handleEntry(entry);
    }
    setEditIndex(null);
  };

  const handleModal = () => {
    if (modal) {
      setTimeout(() => {
        setEditData(null);
      }, 100);
    }
    setModal(!modal);
  };

  const handleEdit = (entry, index) => {
    setEditData(entry);
    setEditIndex(index);
    setEntryMethod(entry.type);
    handleModal();
  };

  const calculateTime = (
    durationHours,
    durationMinutes,
    durationSeconds,
    startTime
  ) => {
    return format(
      add(new Date(`2024-01-01T${startTime}`), {
        hours: +durationHours,
        minutes: +durationMinutes,
        seconds: +durationSeconds
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

    const tempArray = [...scheduleTypes];
    tempArray[0].scheduleData = beforGameData;
    tempArray[1].scheduleData = firstHalfData;
    tempArray[2].scheduleData = pauseData;
    tempArray[3].scheduleData = secondHalfData;
    tempArray[4].scheduleData = afterGameData;
    setScheduleTypes(tempArray);
  };

  const prepareData = (tempData) => {
    refs.current.map((item, index) => {
      switch (index) {
        case 0:
          tempData.schedule.beforeGame = item.getData();
          break;
        case 1:
          tempData.schedule.firstHalf = item.getData();
          break;
        case 2:
          tempData.schedule.break = item.getData();
          break;
        case 3:
          tempData.schedule.secondHalf = item.getData();
          break;
        case 4:
          tempData.schedule.afterGame = item.getData();
          break;
        default:
          break;
      }
    });
    return tempData;
  };

  const handlePrint = () => {
    const tempPrintData = {};
    tempPrintData.title = data.title;
    tempPrintData.startTime = data.startTime;
    tempPrintData.schedule = {
      beforeGame: [],
      firstHalf: [],
      break: [],
      secondHalf: [],
      afterGame: []
    };

    setPrintData(prepareData(tempPrintData));
  };

  const createPlan = async () => {
    const plan = { ...data };
    plan.status = "open";
    try {
      const result = await api.post("event/store", prepareData(plan));
      toast.success("Event Created Successfully");
    } catch (error) {
      console.error(error);
    }
  };

  const updatePlan = async () => {};

  const submit = async (id) => {
    if (!id) {
      createPlan();
    } else {
      updatePlan();
    }
  };

  useImperativeHandle(ref, () => ({
    handlePrintData() {
      handlePrint();
    },
    handleSave(id) {
      submit(id);
    }
  }));

  useEffect(() => {
    mapData();
  }, [data]);

  const printContent = useReactToPrint({
    content: () => printRef.current
  });

  useEffect(() => {
    if (printData) {
      printContent();
    }
  }, [printData]);

  return (
    <>
      <Card id="section-to-hide">
        <CardBody>
          <div className="d-flex justify-content-between align-items-center pb-2">
            {data && (
              <div className="d-flex flex-column">
                <h4>
                  {data.title} (Uhrzeit: {data.startTime})
                </h4>
                <p>
                  Runde: {data.round} | Gegner:{" "}
                  {data.opponent
                    .toUpperCase()
                    .substring(1, data.opponent.length - 1)
                    .split("_")
                    .join(" ")}
                </p>
              </div>
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
          <div className="border p-2">
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
                    {item.scheduleData && (
                      <ScheduleList
                        handleEdit={(entry, index) => {
                          handleEdit(entry, index);
                        }}
                        fileList={fileList}
                        data={item.scheduleData}
                        isReverse={item.isReverse}
                        ref={(el) => (refs.current[idx] = el)}
                      />
                    )}
                  </TabPane>
                );
              })}
            </TabContent>
          </div>
          {entryMethod === "file" && (
            <FileForm
              fileList={fileList}
              open={modal}
              data={editData}
              handleModal={handleModal}
              onFormSubmit={handleNewEntry}
            />
          )}
          {entryMethod === "group" && (
            <GroupForm
              open={modal}
              data={editData}
              handleModal={handleModal}
              onFormSubmit={handleNewEntry}
            />
          )}
          {entryMethod === "text" && (
            <TextForm
              open={modal}
              data={editData}
              handleModal={handleModal}
              onFormSubmit={handleNewEntry}
            />
          )}
        </CardBody>
      </Card>
      {printData && <PrintData data={printData} ref={printRef} />}
    </>
  );
});

export default Schedules;
