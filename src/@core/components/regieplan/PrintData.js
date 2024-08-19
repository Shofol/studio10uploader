import React, { forwardRef } from "react";

const generateTable = (schedule, parentIndex, isChildren = false) => {
  return (
    <div className="d-flex flex-column">
      {!isChildren && (
        <div
          className="d-flex "
          style={{
            textAlign: "center",
            background: "#f3f2f7"
          }}
        >
          <div
            className="row"
            style={{
              width: "50px"
            }}
          >
            Pos
          </div>
          <div className="row" style={{ width: "100px" }}>
            Ton
          </div>
          <div className="row" style={{ width: "100px" }}>
            Bild
          </div>
          <div className="row" style={{ width: "100px" }}>
            Uhrzeit
          </div>
          <div className="row" style={{ width: "100px" }}>
            Dauer
          </div>
          <div className="row" style={{ width: "150px" }}>
            File-Name
          </div>
          <div className="row" style={{ width: "150px" }}>
            Kommentar
          </div>
        </div>
      )}
      {schedule.map((item, index) => {
        return (
          <>
            <div
              className="d-flex "
              style={{
                textAlign: "center",
                background: `${item.color ? item.color : "#f6f6f6"}`,
                color: `${item.color ? "white" : "black"}`
              }}
            >
              <div
                className="row"
                style={{
                  width: "50px"
                }}
              >
                {isChildren ? `${parentIndex + 1}.` : ""}
                {index + 1}
              </div>
              <div className="row" style={{ width: "100px" }}>
                {item.mediaType}
              </div>
              <div className="row" style={{ width: "100px" }}>
                {item.media}
              </div>
              <div className="row" style={{ width: "100px" }}>
                {item.startTime}
              </div>
              <div className="row" style={{ width: "100px" }}>
                {item.duration}
              </div>
              <div className="row" style={{ width: "150px" }}>
                {item.name}
              </div>
              <div className="row" style={{ width: "150px" }}>
                {item.comment}
              </div>
            </div>
            {item.children && generateTable(item.children, index, true)}
          </>
        );
      })}
    </div>
  );
};

const PrintData = forwardRef(({ data }, ref) => {
  return (
    <div ref={ref} className="print-section">
      <div className="d-flex justify-content-between">
        <h4 className="pb-2">
          {data.title} (Uhrzeit: {data.startTime})
        </h4>
      </div>

      {data.schedule.beforeGame.length > 0 && (
        <>
          <p className="py-1 font-weight-bold">Vor Dem Spiel</p>
          {generateTable(data.schedule.beforeGame)}
        </>
      )}

      {data.schedule.firstHalf.length > 0 && (
        <>
          <p className="py-1 font-weight-bold">1. Halbzeit</p>
          {generateTable(data.schedule.firstHalf)}
        </>
      )}

      {data.schedule.break.length > 0 && (
        <>
          <p className="py-1 font-weight-bold">Pause</p>
          {generateTable(data.schedule.break)}
        </>
      )}

      {data.schedule.secondHalf.length > 0 && (
        <>
          <p className="py-1 font-weight-bold">2. Halbzeit</p>
          {generateTable(data.schedule.secondHalf)}
        </>
      )}

      {data.schedule.afterGame.length > 0 && (
        <>
          <p className="py-1 font-weight-bold">Nach Dem Spiel</p>
          {generateTable(data.schedule.afterGame)}
        </>
      )}
    </div>
  );
});

export default PrintData;
