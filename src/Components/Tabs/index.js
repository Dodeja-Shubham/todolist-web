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
    switch (newValue) {
      case 0:
        props.setPanel("All");
        break;
      case 1:
        props.setPanel("Active");
        break;
      case 2:
        props.setPanel("Done");
        break;
      case 3:
        props.setPanel("Missed");
        break;
      default:
        break;
    }
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
        <Tab label="All" {...a11yProps(0)} />
        <Tab label="Active" {...a11yProps(1)} />
        <Tab label="Done" {...a11yProps(2)} />
        <Tab label="Missed" {...a11yProps(3)} />
      </Tabs>
    </Paper>
  );
};
