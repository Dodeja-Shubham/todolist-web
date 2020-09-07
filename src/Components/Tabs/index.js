import React, { useState } from "react";
import { Paper, Tabs, Tab } from "@material-ui/core";

export const TabsContainer = (props) => {
  const [value, setValue] = useState(0);

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
    props.setPanel(
      newValue === 0 ? "upcoming" : newValue === 1 ? "completed" : "missed"
    );
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
        <Tab label="Missed" {...a11yProps(2)} />
      </Tabs>
    </Paper>
  );
};
