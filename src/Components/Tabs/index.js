import React, { useState } from "react";
import { Paper, Tabs, Tab } from "@material-ui/core";

export const TabsContainer = () => {
  const [value, setValue] = useState(0);

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper square>
      <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
        onChange={handleChange}
        aria-label="disabled tabs example"
      >
        <Tab label="Upcoming" {...a11yProps(0)} />
        <Tab label="Completed" {...a11yProps(1)} />
      </Tabs>
    </Paper>
  );
};
