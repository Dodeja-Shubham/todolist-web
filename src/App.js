import React from "react";
import { Header } from "./Components/Header";
import { Paper, Tabs, Tab } from "@material-ui/core";

function App() {
  return (
    <div className="App">
      <Header />
      <Paper square>
        <Tabs
          // value={value}
          indicatorColor="primary"
          textColor="primary"
          // onChange={handleChange}
          aria-label="disabled tabs example"
        >
          <Tab label="Upcoming" />
          <Tab label="Completed" />
        </Tabs>
      </Paper>
    </div>
  );
}

export default App;
