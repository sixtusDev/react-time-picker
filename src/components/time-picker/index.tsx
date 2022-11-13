import React from "react";

interface ReactTimePickerProps {
  disabled?: boolean;
  onChange?: (time?: Date) => void;
  value?: Date;
  withSeconds?: boolean;
  meridiem?: "AM" | "PM";
}

const ReactTimePicker = ({}: ReactTimePickerProps) => {
  return <button>Click me</button>;
};

export default ReactTimePicker;
