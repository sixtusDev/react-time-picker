import React from "react";
import Hour from "./hour";

import "./index.css";
import Minute from "./minute";

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
  withSeconds,
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
    </div>
  );
};

export default ReactTimePicker;
