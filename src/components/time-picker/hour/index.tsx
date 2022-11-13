import React from "react";
import { ReactTimePickerProps } from "..";
import { regex, validateHour } from "../../../utils";

import "./index.css";

interface HourProps extends Pick<ReactTimePickerProps, "format"> {}

const Hour = ({ format }: HourProps) => {
  const [hour, setHour] = React.useState<string>("");

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value === "") {
      return setHour(value);
    }
    if (regex.test(value) && validateHour({ hour, format, value })) {
      setHour(value);
    }
  };

  return (
    <input
      type="text"
      className="react-time-picker__hour"
      min={format === "12" ? 1 : 0}
      max={format === "12" ? 12 : 24}
      maxLength={2}
      value={hour}
      placeholder="--"
      onChange={onChangeHandler}
    />
  );
};

export default Hour;
