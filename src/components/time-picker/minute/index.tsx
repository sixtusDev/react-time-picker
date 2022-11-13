import React from "react";
import { ReactTimePickerProps, Time } from "..";
import { isValidMinuteOrSecond, regex } from "../../../utils";

interface MinuteProps extends Pick<ReactTimePickerProps, "format"> {
  minute: string;
  setTime: (cb: (value: Time) => Time) => void;
}

const Minute = ({ minute, setTime }: MinuteProps) => {
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (
      (value === "" || regex.test(value)) &&
      isValidMinuteOrSecond({ value })
    ) {
      setTime((prevState: Time) => ({
        ...prevState,
        minute: value,
      }));
    }
  };

  return (
    <input
      type="text"
      min={0}
      max={60}
      maxLength={2}
      value={minute}
      placeholder="--"
      onChange={onChangeHandler}
      style={{ width: "25%" }}
    />
  );
};

export default Minute;
