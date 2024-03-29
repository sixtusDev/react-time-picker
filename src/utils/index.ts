import { ReactTimePickerProps } from "../components/time-picker";

export const regex = /^[0-9\b]+$/;

interface TimeFormat
  extends Pick<ReactTimePickerProps, "withSeconds" | "format"> {}

export const timeFormat = ({ withSeconds, format }: TimeFormat) => {
  if (!withSeconds && format === "12") return "hh:mm a";
  if (!withSeconds && format === "24") return "hh:mm";
  if (withSeconds && format === "24") return "hh:mm:ss";
  return "hh:mm:ss a";
};

interface IsValidHour extends Pick<ReactTimePickerProps, "format"> {
  hour: string;
  value: string;
}

export const isValidHour = ({ hour, format, value }: IsValidHour) => {
  if (format === "12") {
    if (hour.length === 1 && Number(value) === 0) {
      return false;
    }
    if (Number(value) > Number(format)) {
      return false;
    }
    return true;
  }
  return Number(value) <= Number(format);
};

interface IsValidMinuteOrSecond {
  value: string;
}

export const isValidMinuteOrSecond = ({ value }: IsValidMinuteOrSecond) => {
  return Number(value) < 60;
};

interface IsValidMeridiem {
  value: string;
  meridiem?: string;
}

export const isValidMeridiem = ({ value, meridiem }: IsValidMeridiem) => {
  if (
    meridiem?.length === 1 &&
    (value.toUpperCase() === "AM" || value.toUpperCase() === "PM")
  ) {
    return true;
  }
  if (
    !meridiem?.length &&
    (value.toUpperCase() === "A" || value.toUpperCase() === "P")
  ) {
    return true;
  }
  if (
    meridiem &&
    meridiem.length &&
    (value.toUpperCase() === "A" || value.toUpperCase() === "P" || value === "")
  ) {
    return true;
  }
  return false;
};

export const canAddLeadingZero = (value: string) =>
  value.length === 1 && Number(value) < 10;
