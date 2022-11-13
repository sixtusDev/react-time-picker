import React from "react";
import { ReactTimePickerProps, Time } from "..";
import { isValidMinute, regex } from "../../../utils";

interface MinuteProps extends Pick<ReactTimePickerProps, "format"> {
  minute: string;
  setTime: (cb: (value: Time) => Time) => void;
}

const Minute = ({ minute, setTime }: MinuteProps) => {
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if ((value === "" || regex.test(value)) && isValidMinute({ value })) {
      setTime((prevState: Time) => ({
        ...prevState,
        minute: value,
      }));
    }
  };

  return (
    <input
      type="text"
      className="react-time-picker__hour"
      min={0}
      max={60}
      maxLength={2}
      value={minute}
      placeholder="--"
      onChange={onChangeHandler}
    />
  );
};

export default Minute;
