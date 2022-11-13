import React from "react";
import Hour from "./hour";

import Minute from "./minute";
import Second from "./second";

import "./index.css";
export interface ReactTimePickerProps {
  disabled?: boolean;
  onChange?: (time?: Date) => void;
  value?: Date;
  withSeconds?: boolean;
  format?: "12" | "24";
}

export interface Time {
  hour: string;
  minute: string;
  second?: string;
}

const ReactTimePicker = ({
  format = "12",
  withSeconds = true,
}: ReactTimePickerProps) => {
  const [time, setTime] = React.useState<Time>({
    hour: "",
    minute: "",
    ...(withSeconds && { second: "" }),
  });

  return (
    <div className="react-time-picker__wrapper">
      <Hour format={format} />
      <div style={{ fontSize: "30px" }}>:</div>
      <Minute minute={time.minute} setTime={setTime} />
      {withSeconds && (
        <>
          <div style={{ fontSize: "30px" }}>:</div>
          <Second second={time.second} setTime={setTime} />
        </>
      )}
    </div>
  );
};

export default ReactTimePicker;
