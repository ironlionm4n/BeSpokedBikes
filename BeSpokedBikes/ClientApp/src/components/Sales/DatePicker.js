import React from "react";

// Style object
const dateInputStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-evenly",
  gap: "12px",
  height: "2rem",
  margin: "12px",
  color: "#495057",
  fontSize: "1.2rem",
};

const DatePicker = ({ handleStartChanged, handleEndChanged }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        backgroundColor: "#f1f3f5",
        borderRadius: "4px",
      }}
    >
      <div style={dateInputStyle}>
        <span>
          <strong>Start Date</strong>
        </span>
        <input type="date" onChange={(e) => handleStartChanged(e)} />
      </div>
      <div style={dateInputStyle}>
        <span>
          <strong>End Date</strong>
        </span>
        <input type="date" onChange={(e) => handleEndChanged(e)} />
      </div>
    </div>
  );
};

export default DatePicker;
