import React from "react";
import { storiesOf } from "@storybook/react";

import { ReactTimePicker } from "../../components";

const stories = storiesOf("React time picker", module);

stories.add("App", () => {
  return <ReactTimePicker />;
});
