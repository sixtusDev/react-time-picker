import { ReactTimePickerProps } from "../components/time-picker";

export const regex = /^[0-9\b]+$/;

interface TimeFormat
  extends Pick<ReactTimePickerProps, "withSeconds" | "format"> {}

export const timeFormat = ({ withSeconds, format = "12" }: TimeFormat) => {
  if (!withSeconds && format === "12") return "hh:mm a";
  if (!withSeconds && format === "24") return "hh:mm";
  if (withSeconds && format === "12") return "hh:mm:ss a";
  if (withSeconds && format === "24") return "hh:mm:ss";
};

interface ValidateHour extends Pick<ReactTimePickerProps, "format"> {
  hour: string;
  value: string;
}

export const validateHour = ({ hour, format, value }: ValidateHour) => {
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

interface IsValideMinute {
  value: string;
}

export const isValidMinute = ({ value }: IsValideMinute) => {
  return Number(value) < 60;
};
