import React from "react";
import { ReactTimePickerProps, Time } from "..";
import { canAddLeadingZero, regex, validateHour } from "../../../utils";

import "./index.css";

interface HourProps extends Pick<ReactTimePickerProps, "format"> {
  hour: string;
  setTime: (cb: (time: Time) => Time) => void;
}

const Hour = ({ format, hour, setTime }: HourProps) => {
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value === "") {
      return setTime((prevState) => ({
        ...prevState,
        hour: value,
      }));
    }
    if (regex.test(value) && validateHour({ hour, format, value })) {
      setTime((prevState) => ({
        ...prevState,
        hour: value,
      }));
    }
  };

  const onBlurHandler = () => {
    if (canAddLeadingZero(hour)) {
      setTime((prevState) => ({
        ...prevState,
        hour: `0${prevState.hour}`,
      }));
    }
  };

  return (
    <input
      type="text"
      className=""
      min={format === "12" ? 1 : 0}
      max={format === "12" ? 12 : 24}
      maxLength={2}
      value={hour}
      placeholder="--"
      onChange={onChangeHandler}
      onBlur={onBlurHandler}
      onFocus={(e) => e.target.select()}
      style={{ width: "25%" }}
    />
  );
};

export default Hour;
