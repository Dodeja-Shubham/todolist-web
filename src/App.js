import React, { useState, useEffect } from "react";
import { Fab, makeStyles, Modal, Box } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { Header } from "./Components/Header";
import { TabsContainer } from "./Components/Tabs";
import { Selector } from "./Components/Selectors";
import { AddTaskForm } from "./Components/AddTaskForm";
import { Panels } from "./Components/Panels";
import { UserForm } from "./Components/Homepage";
import { addTask, getTasks } from "./API/task";

const useStyles = makeStyles((theme) => ({
  fabBtn: {
    position: "fixed",
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
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("xxkeyxx") !== null
  );
  const [open, setOpen] = useState(false);
  const [panel, setPanel] = useState("All");
  const [category, setCategory] = useState("All");
  const [formType, setFormType] = useState("Add");
  const [tasks, setTasks] = useState([]);

  const cb = (res, err) => {
    if (!err && res) {
      setTasks(res.data);
    }
  };

  useEffect(() => {
    getTasks(null, cb);
  }, []);

  const handleModal = () => {
    setFormType("All");
    setOpen(!open);
  };

  return (
    <div className="App">
      <Header />
      {loggedIn && (
        <Box>
          <TabsContainer setPanel={setPanel} />
          <Selector
            setCategory={setCategory}
            setFormType={(type) => {
              setFormType(type);
              setOpen(true);
            }}
          />
          <Modal open={open} onClose={handleModal} className={classes.modal}>
            <AddTaskForm
              addTasks={(data) => {
                addTask(data, () => {
                  setTasks([...tasks, data]);
                  setOpen(false);
                });
              }}
              type={formType}
            />
          </Modal>
          <Panels index={panel} category={category} tasks={tasks} cb={cb}/>
          <Fab
            color="primary"
            aria-label="add"
            className={classes.fabBtn}
            variant={window.innerWidth <= 500 ? "round" : "extended"}
            onClick={handleModal}
          >
            <Add /> {window.innerWidth > 500 && "Add Task"}
          </Fab>
        </Box>
      )}
      {!loggedIn && <UserForm setLoggedIn={setLoggedIn} />}
    </div>
  );
}

export default App;
