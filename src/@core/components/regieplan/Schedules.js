import { add, format } from "date-fns";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from "react";
import { Box, Edit, File, Type } from "react-feather";
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
import ScheduleTypes from "../../../utility/data/scheduleTypes.json";
import api from "../../api/api";
import FileForm from "./FileForm";
import GroupForm from "./GroupForm";
import PrintData from "./PrintData";
import ScheduleList from "./ScheduleList";
import TextForm from "./TextForm";

const Schedules = forwardRef(
  ({ data, handlePlanEdit, onSaveSuccess, viewMode }, ref) => {
    const [active, setActive] = useState(0);
    const [entryMethod, setEntryMethod] = useState(null);
    const [modal, setModal] = useState(false);
    const [editData, setEditData] = useState(null);
    const [editIndex, setEditIndex] = useState(null);
    const [printData, setPrintData] = useState(null);
    const printRef = useRef();
    const [scheduleTypes, setScheduleTypes] = useState(ScheduleTypes);
    const fileFormRef = useRef();
    const textFormRef = useRef();
    const refs = useRef([]);

    const [fileList, setFileList] = useState([]);

    const fetchFiles = async () => {
      try {
        const result = await api.post("file");
        const tempData = result.data.data.map((item) => ({
          id: item.id,
          label: item.title,
          fileType: item.file_type,
          duration: item.file_duration
        }));
        setFileList(tempData);
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

    const handleModal = () => {
      if (modal) {
        setTimeout(() => {
          setEditData(null);
        }, 100);
      }
      setModal(!modal);
    };

    const checkTimeLimit = (entry) => {
      return refs.current[active].canEntryAdded(entry);
    };

    const handleEntry = (entry) => {
      if (editIndex !== null && editIndex >= 0) {
        refs.current[active].handleEntry(entry, editIndex);
      } else {
        refs.current[active].handleEntry(entry);
      }
    };

    const handleNewEntry = (entry) => {
      if (entryMethod === "file" || entryMethod === "text") {
        const canBeAdded = checkTimeLimit(entry);
        if (canBeAdded) {
          handleEntry(entry);
          if (entryMethod === "file") {
            fileFormRef.current.reset();
          } else {
            textFormRef.current.reset();
          }
          handleModal();
        } else {
          toast.error("Dauer can not exceed time limit");
        }
      } else {
        handleEntry(entry);
      }

      setEditIndex(null);
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
      const beforGameData = {
        ...tempData,
        schedule: tempData.schedule.beforeGame
      };

      const firstHalfData = {
        ...tempData,
        schedule: tempData.schedule.firstHalf,
        duration: 2700
      };

      const pauseData = {
        ...tempData,
        startTime: calculateTime(0, 45, 0, tempData.startTime),
        schedule: tempData.schedule.break,
        duration: 900
      };

      const secondHalfData = {
        ...tempData,
        startTime: calculateTime(0, 60, 0, tempData.startTime),
        schedule: tempData.schedule.secondHalf,
        duration: 2700
      };

      const afterGameData = {
        ...tempData,
        startTime: calculateTime(0, 105, 0, tempData.startTime),
        schedule: tempData.schedule.afterGame
      };

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
        onSaveSuccess();
      } catch (error) {
        console.error(error);
      }
    };

    const submit = async (id) => {
      if (!id) {
        createPlan();
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
                  <div className="d-flex align-items-center">
                    <h4>
                      {data.title} (Uhrzeit: {data.startTime})
                    </h4>
                    {!viewMode && (
                      <Button.Ripple
                        className="btn-icon"
                        style={{ marginTop: "-8px" }}
                        color="flat-primary"
                        onClick={() => {
                          handlePlanEdit();
                        }}
                      >
                        <Edit size={16} />
                      </Button.Ripple>
                    )}
                  </div>
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
              {data && !viewMode && (
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
                          section={item.section}
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
                ref={fileFormRef}
              />
            )}
            {entryMethod === "group" && (
              <GroupForm
                fileList={fileList}
                open={modal}
                data={editData}
                handleModal={handleModal}
                onFormSubmit={handleNewEntry}
              />
            )}
            {entryMethod === "text" && (
              <TextForm
                ref={textFormRef}
                fileList={fileList}
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
  }
);

export default Schedules;
