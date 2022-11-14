import React from "react";
import Hour from "./hour";

import Minute from "./minute";
import Second from "./second";

import "./index.css";
import Meridiem from "./meridiem";
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
  meridiem?: string;
}

const hours12 = Array.from({ length: 12 }, (_, i) =>
  i > 8 ? String(i + 1) : `0${i + 1}`
);

const hours24 = Array.from({ length: 24 }, (_, i) =>
  i > 8 ? String(i + 1) : `0${i + 1}`
);

const minutes = Array.from({ length: 60 }, (_, i) =>
  i > 9 ? String(i) : `0${i}`
);

const seconds = Array.from({ length: 60 }, (_, i) =>
  i > 9 ? String(i) : `0${i}`
);

const meridiems = ["AM", "PM"];

const ReactTimePicker = ({
  format = "12",
  withSeconds = true,
}: ReactTimePickerProps) => {
  const [time, setTime] = React.useState<Time>({
    hour: "",
    minute: "",
    ...(withSeconds && { second: "" }),
    ...(format === "12" && { meridiem: "" }),
  });

  return (
    <div className="react-time-picker__wrapper">
      <div
        style={{
          width: "150px",
          display: "flex",
          backgroundColor: "#fff",
          border: "2px solid #000",
          borderRadius: "3px",
          padding: "3px",
        }}
      >
        <Hour format={format} hour={time.hour} setTime={setTime} />
        <div style={{ fontSize: "20px" }}>:</div>
        <Minute minute={time.minute} setTime={setTime} />
        {withSeconds && (
          <>
            <div style={{ fontSize: "20px" }}>:</div>
            <Second second={time.second} setTime={setTime} />
          </>
        )}
        &nbsp;
        {format === "12" && (
          <Meridiem meridiem={time.meridiem} setTime={setTime} />
        )}
      </div>
      <div className="react-time-picker__time-select-area">
        <div className="react-time-picker__hours-minutes-seconds">
          <div className="react-time-picker__hours">
            {format === "12"
              ? hours12.map((hour) => (
                  <div className="react-time-picker__hour">{hour}</div>
                ))
              : hours24.map((hour) => (
                  <div className="react-time-picker__hour">{hour}</div>
                ))}
          </div>
          <div className="react-time-picker__minutes">
            {minutes.map((minute) => (
              <div className="react-time-picker__minute">{minute}</div>
            ))}
          </div>
          {withSeconds && (
            <div className="react-time-picker__seconds">
              {seconds.map((second) => (
                <div className="react-time-picker__second">{second}</div>
              ))}
            </div>
          )}
          {format === "12" && (
            <div className="react-time-picker__meridiems">
              {meridiems.map((meridiem) => (
                <div className="react-time-picker__meridiem">{meridiem}</div>
              ))}
            </div>
          )}
        </div>
        <div className="react-time-picker__actio-box">
          <button>Cancel</button>
          <button>Ok</button>
        </div>
      </div>
    </div>
  );
};

export default ReactTimePicker;
