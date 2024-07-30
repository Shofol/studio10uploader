// ** React Imports
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from "react";
import { Copy, Edit, File, Trash } from "react-feather";

// ** Reactstrap Imports
import { hoursToSeconds, minutesToSeconds } from "date-fns";
import { Button, Card, CardHeader, Table } from "reactstrap";
import { formatSeconds } from "../../../utility/functions/formatTime";
import { updateReverseStartTime } from "../../../utility/functions/updateReverseStartTime";
import { updateStartTime } from "../../../utility/functions/updateStartTime";

import FileForm from "./FileForm";

const ScheduleList = forwardRef(({ data, isReverse, handleEdit }, ref) => {
  const [listArr, setListArr] = useState([]);
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);
  const [modal, setModal] = useState(false);
  const [selectedGroupIndex, setSelectedGroupIndex] = useState(null);

  const handleModal = () => {
    setModal(!modal);
  };

  useEffect(() => {
    setListArr(data.schedule);
  }, [data]);

  const handleNewEntry = (entry, index) => {
    const tempArray = [...listArr];
    if (index !== undefined && index >= 0) {
      tempArray[index] = entry;
    } else {
      tempArray.push(entry);
    }
    setListArr(
      isReverse
        ? updateReverseStartTime(tempArray, data.startTime)
        : updateStartTime(tempArray, data.startTime)
    );
  };

  const updateDuration = (list) => {
    let seconds = 0;
    list.map((item) => {
      const [itemHours, itemMinutes, itemSeconds] = item.duration.split(":");
      const hoursInSeconds = hoursToSeconds(itemHours);
      const minutesInseconds = minutesToSeconds(itemMinutes);
      seconds = seconds + +hoursInSeconds + +minutesInseconds + +itemSeconds;
    });
    return formatSeconds(seconds);
  };

  const handleChildEntry = (entry, index) => {
    const parentIndex = index ? index : selectedGroupIndex;
    const tempArray = [...listArr];
    tempArray[parentIndex].children.push(entry);
    tempArray[parentIndex].duration = updateDuration(
      tempArray[parentIndex].children
    );
    setListArr(
      isReverse
        ? updateReverseStartTime(tempArray, data.startTime)
        : updateStartTime(tempArray, data.startTime)
    );
  };

  const handleCopy = (entry) => {
    entry.startTime = null;
    handleNewEntry(entry);
  };

  const handleChildCopy = (entry, index) => {
    entry.startTime = null;
    handleChildEntry(entry, index);
  };

  const handleDelete = (index) => {
    const tempArray = [...listArr];
    tempArray.splice(index, 1);
    setListArr(
      isReverse
        ? updateReverseStartTime(tempArray, data.startTime)
        : updateStartTime(tempArray, data.startTime)
    );
  };

  const handleChildDelete = (index, childIndex) => {
    const tempArray = [...listArr];
    tempArray[index].children.splice(childIndex, 1);
    tempArray[index].duration = updateDuration(tempArray[index].children);
    setListArr(
      isReverse
        ? updateReverseStartTime(tempArray, data.startTime)
        : updateStartTime(tempArray, data.startTime)
    );
  };

  const submit = () => {
    const plan = { ...data };
    plan.schedule = listArr;
  };

  useImperativeHandle(ref, () => ({
    handleEntry(entry, index) {
      handleNewEntry(entry, index);
    },
    handleSave() {
      submit();
    },
    getData() {
      return listArr;
    }
  }));

  const swap = (array) => {
    const tempArray = [...array];
    const temp = tempArray[dragItem.current];
    tempArray[dragItem.current] = tempArray[dragOverItem.current];
    tempArray[dragOverItem.current] = temp;
    return tempArray;
  };

  const handleSort = () => {
    setListArr(
      isReverse
        ? updateReverseStartTime(swap(listArr), data.startTime)
        : updateStartTime(swap(listArr), data.startTime)
    );
  };

  const handleChildSort = (parentIndex, childArray) => {
    const swappedChildArray = isReverse
      ? updateReverseStartTime(swap(childArray), listArr[parentIndex].startTime)
      : updateStartTime(swap(childArray), listArr[parentIndex].startTime);
    const tempArray = [...listArr];
    tempArray[parentIndex].children = swappedChildArray;
    setListArr(tempArray);
  };

  return (
    <>
      {listArr.length <= 0 && (
        <Card className="d-flex">
          <CardHeader className="border my-2">
            <h4 className="mx-auto py-2">
              Make a new schedule for {data.title}
            </h4>
          </CardHeader>
        </Card>
      )}
      {listArr.length > 0 && (
        <Table responsive>
          <thead>
            <tr>
              <th style={{ width: "100px", borderLeft: `10px solid #f3f2f7` }}>
                Pos
              </th>
              <th style={{ width: "100px" }}>Bild</th>
              <th style={{ width: "100px" }}>Ton</th>
              <th style={{ width: "300px" }}>Uhrzeit</th>
              <th style={{ width: "100px" }}>Dauer</th>
              <th style={{ width: "300px" }}>File-Name</th>
              <th style={{ width: "300px" }}>Kommentar</th>
              <th style={{ width: "300px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {listArr.map((item, index) => {
              return (
                <>
                  <tr
                    key={item.name}
                    draggable
                    onDragStart={() => (dragItem.current = index)}
                    onDragEnter={() => (dragOverItem.current = index)}
                    onDragEnd={handleSort}
                    onDragOver={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <td
                      style={{
                        width: "100px",
                        borderLeft: `10px solid ${
                          item.color ? item.color : "#f6f6f6"
                        }`
                      }}
                      className="bg-light"
                    >
                      {index + 1}
                    </td>
                    <td style={{ width: "100px" }} className="bg-light">
                      {item.mediaType}
                    </td>
                    <td style={{ width: "100px" }} className="bg-light">
                      {item.media}
                    </td>
                    <td style={{ width: "300px" }} className="bg-light">
                      {item.startTime}
                    </td>
                    <td style={{ width: "100px" }} className="bg-light">
                      {item.duration}
                    </td>
                    <td style={{ width: "400px" }} className="bg-light">
                      {item.name}
                    </td>
                    <td style={{ width: "300px" }} className="bg-light">
                      {item.comment}
                    </td>

                    <td className="bg-light">
                      <div className="d-flex gap-1">
                        {item.type === "group" && (
                          <Button.Ripple
                            className="btn-icon"
                            size="sm"
                            outline
                            color="primary"
                            onClick={() => {
                              setSelectedGroupIndex(index);
                              handleModal(!modal);
                            }}
                          >
                            <File size={10} />
                          </Button.Ripple>
                        )}
                        <Button.Ripple
                          className="btn-icon"
                          size="sm"
                          outline
                          color="primary"
                          onClick={() => {
                            handleCopy({ ...item });
                          }}
                        >
                          <Copy size={10} />
                        </Button.Ripple>
                        <Button.Ripple
                          className="btn-icon"
                          size="sm"
                          outline
                          color="primary"
                          onClick={() => {
                            handleEdit({ ...item }, index);
                          }}
                        >
                          <Edit size={10} />
                        </Button.Ripple>
                        <Button.Ripple
                          className="btn-icon"
                          size="sm"
                          outline
                          color="primary"
                          onClick={() => handleDelete(index)}
                        >
                          <Trash size={10} />
                        </Button.Ripple>
                      </div>
                    </td>
                  </tr>
                  {item.children &&
                    item.children.length > 0 &&
                    item.children.map((child, childIndex) => {
                      return (
                        <tr
                          key={childIndex + 1}
                          draggable
                          onDragStart={() => (dragItem.current = childIndex)}
                          onDragEnter={() =>
                            (dragOverItem.current = childIndex)
                          }
                          onDragEnd={() =>
                            handleChildSort(index, item.children)
                          }
                          onDragOver={(e) => {
                            e.preventDefault();
                          }}
                        >
                          <td
                            style={{
                              width: "100px",
                              paddingLeft: "36px",
                              borderLeft: `10px solid ${
                                child.color ? child.color : "#f6f6f6"
                              }`
                            }}
                          >
                            {index + 1}.{childIndex + 1}
                          </td>
                          <td style={{ width: "100px" }}>{child.mediaType}</td>
                          <td style={{ width: "100px" }}>{child.media}</td>
                          <td style={{ width: "100px" }}>{child.startTime}</td>
                          <td style={{ width: "100px" }}>{child.duration}</td>
                          <td style={{ width: "300px" }}>{child.name}</td>
                          <td style={{ width: "300px" }}>{child.comment}</td>
                          <td>
                            <div className="d-flex gap-1">
                              <Button.Ripple
                                className="btn-icon"
                                size="sm"
                                outline
                                color="primary"
                                onClick={() => {
                                  handleChildCopy({ ...child }, index);
                                }}
                              >
                                <Copy size={10} />
                              </Button.Ripple>
                              <Button.Ripple
                                className="btn-icon"
                                size="sm"
                                outline
                                color="primary"
                              >
                                <Edit size={10} />
                              </Button.Ripple>
                              <Button.Ripple
                                className="btn-icon"
                                size="sm"
                                outline
                                color="primary"
                                onClick={() =>
                                  handleChildDelete(index, childIndex)
                                }
                              >
                                <Trash size={10} />
                              </Button.Ripple>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                </>
              );
            })}
          </tbody>
        </Table>
      )}
      <FileForm
        open={modal}
        handleModal={handleModal}
        onFormSubmit={(data) => {
          handleChildEntry(data);
          handleModal();
        }}
      />
    </>
  );
});

export default ScheduleList;
