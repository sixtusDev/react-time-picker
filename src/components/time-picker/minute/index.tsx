import React from "react";
import { ReactTimePickerProps, Time } from "..";
import {
  canAddLeadingZero,
  isValidMinuteOrSecond,
  regex,
} from "../../../utils";

interface MinuteProps extends Pick<ReactTimePickerProps, "format"> {
  minute: string;
  setTime: (cb: (value: Time) => Time) => void;
  secondRef: React.RefObject<HTMLInputElement>;
  minuteRef: React.RefObject<HTMLInputElement>;
}

const Minute = ({ minute, setTime, minuteRef, secondRef }: MinuteProps) => {
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

  const onBlurHandler = () => {
    if (canAddLeadingZero(minute)) {
      setTime((prevState) => ({
        ...prevState,
        minute: `0${prevState.minute}`,
      }));
    }
  };

  React.useEffect(() => {
    if (minute.length === 2) {
      secondRef.current?.focus();
    }
  }, [minute]);

  return (
    <input
      type="text"
      min={0}
      max={60}
      maxLength={2}
      value={minute}
      placeholder="--"
      onChange={onChangeHandler}
      onBlur={onBlurHandler}
      ref={minuteRef}
      onFocus={(e) => e.target.select()}
      style={{ width: "25%" }}
    />
  );
};

export default Minute;
