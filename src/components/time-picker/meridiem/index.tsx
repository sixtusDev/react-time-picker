import React from "react";
import { Time } from "..";
import { isValidMeridiem } from "../../../utils";

interface MeridiemProps {
  meridiem?: string;
  setTime: (cb: (time: Time) => Time) => void;
  meridiemRef: React.RefObject<HTMLInputElement>;
}

const Meridiem = ({ meridiem, setTime, meridiemRef }: MeridiemProps) => {
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value === "" || isValidMeridiem({ value, meridiem })) {
      setTime((prevState) => ({
        ...prevState,
        meridiem: value.toUpperCase(),
      }));
    }
  };

  return (
    <input
      type="text"
      placeholder="--"
      value={meridiem}
      onChange={onChangeHandler}
      onFocus={(e) => e.target.select()}
      ref={meridiemRef}
      style={{ width: "25%" }}
    />
  );
};

export default Meridiem;
