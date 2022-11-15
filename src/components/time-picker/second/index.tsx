import React from "react";
import { ReactTimePickerProps, Time } from "..";
import {
  canAddLeadingZero,
  isValidMinuteOrSecond,
  regex,
} from "../../../utils";

interface MinuteProps extends Pick<ReactTimePickerProps, "format"> {
  second?: string;
  setTime: (cb: (value: Time) => Time) => void;
  meridiemRef: React.RefObject<HTMLInputElement>;
  secondRef: React.RefObject<HTMLInputElement>;
}

const Second = ({ second, setTime, secondRef, meridiemRef }: MinuteProps) => {
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (
      (value === "" || regex.test(value)) &&
      isValidMinuteOrSecond({ value })
    ) {
      setTime((prevState: Time) => ({
        ...prevState,
        second: value,
      }));
    }
  };

  const onBlurHandler = () => {
    if (canAddLeadingZero(second!)) {
      setTime((prevState) => ({
        ...prevState,
        second: `0${prevState.second}`,
      }));
    }
  };

  React.useEffect(() => {
    if (second?.length === 2) {
      meridiemRef.current?.focus();
    }
  }, [second]);

  return (
    <input
      type="text"
      min={0}
      max={60}
      maxLength={2}
      value={second}
      placeholder="--"
      onChange={onChangeHandler}
      onBlur={onBlurHandler}
      onFocus={(e) => e.target.select()}
      ref={secondRef}
      style={{ width: "25%" }}
    />
  );
};

export default Second;
