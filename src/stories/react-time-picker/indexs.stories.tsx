import React from "react";
import { storiesOf } from "@storybook/react";

import { ReactTimePicker } from "../../components";

const stories = storiesOf("React time picker", module);

stories.add("App", () => {
  return (
    <ReactTimePicker
      // time={new Date("10/12/2021")}
      // format="24"
      // withSeconds={false}
      onChange={(value) => {
        console.log(value);
      }}
    />
  );
});
