import React from "react";
import Hour from "./hour";

import "./index.css";

export interface ReactTimePickerProps {
  disabled?: boolean;
  onChange?: (time?: Date) => void;
  value?: Date;
  withSeconds?: boolean;
  format?: "12" | "24";
}

const ReactTimePicker = ({ format = "12" }: ReactTimePickerProps) => {
  return (
    <div className="react-time-picker__wrapper">
      <Hour format={format} />
      <div style={{ fontSize: "30px" }}>:</div>
    </div>
  );
};

export default ReactTimePicker;
