interface TimeFormat {
  withSeconds?: boolean;
  format?: "12" | "24";
}

export const timeFormat = ({ withSeconds, format = "12" }: TimeFormat) => {
  if (!withSeconds && format === "12") return "hh:mm a";
  if (!withSeconds && format === "24") return "hh:mm";
  if (withSeconds && format === "12") return "hh:mm:ss a";
  if (withSeconds && format === "24") return "hh:mm:ss";
};
