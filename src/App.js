import React from "react";
import { Fab, makeStyles } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { Header } from "./Components/Header";
import { TabsContainer } from "./Components/Tabs";
import { Selector } from "./Components/Selectors";

const useStyles = makeStyles((theme) => ({
  fabBtn: {
    position: "absolute",
    bottom: "2rem",
    right: "2rem",
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

function App() {
  const classes = useStyles();
  return (
    <div className="App">
      <Header />
      <TabsContainer />
      <Selector />
      <Fab
        color="primary"
        aria-label="add"
        className={classes.fabBtn}
        variant={window.innerWidth <= 500 ? "round" : "extended"}
      >
        <Add /> {window.innerWidth > 500 && "Add Task"}
      </Fab>
    </div>
  );
}

export default App;
