import React, { useEffect } from "react";
import { format as formatTime, parse } from "date-fns";

import Hour from "./hour";
import Minute from "./minute";
import Second from "./second";
import Meridiem from "./meridiem";
import { timeFormat } from "../../utils";

import "./index.css";
export interface ReactTimePickerProps {
  disabled?: boolean;
  onChange?: (time?: Date) => void;
  value?: Date;
  withSeconds?: boolean;
  format?: "12" | "24";
  time?: Date;
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

const activeHandPickerStyle = {
  backgroundColor: "#0000EE",
  color: "#fff",
};

const ReactTimePicker = ({
  format = "12",
  withSeconds = false,
  time: dateTime,
  onChange,
}: ReactTimePickerProps) => {
  const [time, setTime] = React.useState<Time>({
    hour: "",
    minute: "",
    ...(withSeconds && { second: "" }),
    ...(format === "12" && { meridiem: "" }),
  });
  const [showTImeSelectArea, setShowTimeSelectArea] = React.useState(false);

  const minuteRef = React.useRef(null);
  const secondRef = React.useRef(null);
  const meridiemRef = React.useRef(null);

  React.useEffect(() => {
    if (!dateTime || !dateTime.getTime()) {
      return;
    }
    const formattedTime = formatTime(
      dateTime,
      timeFormat({ withSeconds, format })
    );
    const timeHands = formattedTime.split(/[:\s]+/);
    setTime((prevState) => ({
      ...prevState,
      hour: timeHands[0],
      minute: timeHands[1],
      ...(withSeconds && { second: timeHands[2] }),
      ...(format === "12" && { meridiem: timeHands[timeHands.length - 1] }),
    }));
  }, []);

  useEffect(() => {
    const hands = Object.values(time);
    if (onChange && hands.join("")) {
      let timeString = "";
      hands.forEach((hand, index) => {
        if (hand === "AM" || hand === "PM") {
          return (timeString = timeString.concat(` ${hand}`));
        }
        if (index === 0) {
          return (timeString = timeString.concat(`${hand}`));
        }
        timeString = timeString.concat(`:${hand}`);
      });

      const formattedDate = parse(
        timeString,
        timeFormat({ withSeconds, format }),
        dateTime!
      );
      onChange(formattedDate);
    }
  }, [time]);

  const handleTimeSelect = (
    hand: "hour" | "minute" | "second" | "meridiem",
    value: string
  ) => {
    if (hand === "hour") {
      return setTime((prevState) => ({
        ...prevState,
        hour: value,
      }));
    }
    if (hand === "minute") {
      return setTime((prevState) => ({
        ...prevState,
        minute: value,
      }));
    }
    if (hand === "second") {
      return setTime((prevState) => ({
        ...prevState,
        second: value,
      }));
    }
    if (hand === "meridiem") {
      return setTime((prevState) => ({
        ...prevState,
        meridiem: value,
      }));
    }
  };

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
        onClick={() => !showTImeSelectArea && setShowTimeSelectArea(true)}
        onBlur={(e) => {
          if (!e.relatedTarget) {
            setShowTimeSelectArea(false);
          }
        }}
      >
        <Hour
          format={format}
          hour={time.hour}
          setTime={setTime}
          minuteRef={minuteRef}
        />
        <div style={{ fontSize: "20px" }}>:</div>
        <Minute
          minute={time.minute}
          setTime={setTime}
          secondRef={secondRef}
          minuteRef={minuteRef}
        />
        {withSeconds && (
          <>
            <div style={{ fontSize: "20px" }}>:</div>
            <Second
              second={time.second}
              setTime={setTime}
              meridiemRef={meridiemRef}
              secondRef={secondRef}
            />
          </>
        )}
        &nbsp;
        {format === "12" && (
          <Meridiem
            meridiem={time.meridiem}
            setTime={setTime}
            meridiemRef={meridiemRef}
          />
        )}
      </div>
      {showTImeSelectArea && (
        <div
          className="react-time-picker__time-select-area"
          tabIndex={0}
          onBlur={(e) => {
            if (!e.relatedTarget) {
              setShowTimeSelectArea(false);
            }
          }}
        >
          <div className="react-time-picker__hours-minutes-seconds">
            <div className="react-time-picker__hours">
              {format === "12"
                ? hours12.map((hour) => (
                    <div
                      className="react-time-picker__hour"
                      style={{
                        ...(hour === time.hour && activeHandPickerStyle),
                      }}
                      onClick={() => handleTimeSelect("hour", hour)}
                    >
                      {hour}
                    </div>
                  ))
                : hours24.map((hour) => (
                    <div
                      className="react-time-picker__hour"
                      style={{
                        ...(hour === time.hour && activeHandPickerStyle),
                      }}
                      onClick={() => handleTimeSelect("hour", hour)}
                    >
                      {hour}
                    </div>
                  ))}
            </div>
            <div className="react-time-picker__minutes">
              {minutes.map((minute) => (
                <div
                  className="react-time-picker__minute"
                  style={{
                    ...(minute === time.minute && activeHandPickerStyle),
                  }}
                  onClick={() => handleTimeSelect("minute", minute)}
                >
                  {minute}
                </div>
              ))}
            </div>
            {withSeconds && (
              <div className="react-time-picker__seconds">
                {seconds.map((second) => (
                  <div
                    className="react-time-picker__second"
                    style={{
                      ...(second === time.second && activeHandPickerStyle),
                    }}
                    onClick={() => handleTimeSelect("second", second)}
                  >
                    {second}
                  </div>
                ))}
              </div>
            )}
            {format === "12" && (
              <div className="react-time-picker__meridiems">
                {meridiems.map((meridiem) => (
                  <div
                    className="react-time-picker__meridiem"
                    style={{
                      ...(meridiem === time.meridiem && activeHandPickerStyle),
                    }}
                    onClick={() => handleTimeSelect("meridiem", meridiem)}
                  >
                    {meridiem}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="react-time-picker__action-box">
            <div className="react-time-picker__cancel-btn">Cancel</div>
            {/* <button className="react-time-picker__ok-btn">Ok</button> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReactTimePicker;
