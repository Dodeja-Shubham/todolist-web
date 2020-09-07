import React, { useState } from "react";
import { Fab, makeStyles, Modal } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { Header } from "./Components/Header";
import { TabsContainer } from "./Components/Tabs";
import { Selector } from "./Components/Selectors";
import { AddTaskForm } from "./Components/AddTaskForm";
import { Panels } from "./Components/Panels";

const useStyles = makeStyles((theme) => ({
  fabBtn: {
    position: "absolute",
    bottom: "2rem",
    right: "2rem",
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  modal: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

function App() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [panel, setPanel] = useState("upcoming");
  const [category, setCategory] = useState("All");

  const handleModal = () => {
    setOpen(!open);
  };

  return (
    <div className="App">
      <Header />
      <TabsContainer setPanel={setPanel} />
      <Selector setCategory={setCategory} />
      <Modal open={open} onClose={handleModal} className={classes.modal}>
        <AddTaskForm />
      </Modal>
      <Panels index={panel} category={category} />
      <Fab
        color="primary"
        aria-label="add"
        className={classes.fabBtn}
        variant={window.innerWidth <= 500 ? "round" : "extended"}
        onClick={handleModal}
      >
        <Add /> {window.innerWidth > 500 && "Add Task"}
      </Fab>
    </div>
  );
}

export default App;
