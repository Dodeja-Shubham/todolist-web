import React, { useState, useEffect } from "react";
import {
  Fab,
  makeStyles,
  Modal,
  Box,
  MuiThemeProvider,
  CircularProgress,
  Snackbar,
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { Header } from "./Components/Header";
import { TabsContainer } from "./Components/Tabs";
import { Selector } from "./Components/Selectors";
import { AddTaskForm } from "./Components/AddTaskForm";
import { Panels } from "./Components/Panels";
import { UserForm } from "./Components/Homepage";
import { addTask, getTasks } from "./API/task";
import MuiAlert from "@material-ui/lab/Alert";
import themes from "./themes";

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
  const [show, setShow] = useState(false);
  const [panel, setPanel] = useState("All");
  const [category, setCategory] = useState("All");
  const [formType, setFormType] = useState("Add");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const cb = (res, err) => {
    if (!err && res) {
      setTasks(res.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    getTasks(null, cb);
  }, []);

  const handleModal = () => {
    setFormType("All");
    setOpen(!open);
  };

  const logout = () => {
    setLoggedIn(false);
    localStorage.removeItem("xxkeyxx");
  };

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const addTaskCB = (data) => {
    const { title, desc, due_date, colour, category } = data;
    if (
      !(
        title &&
        title.trim() !== "" &&
        desc &&
        desc.trim() !== "" &&
        due_date &&
        due_date.trim() !== "" &&
        colour &&
        colour.trim() !== "" &&
        category &&
        category.trim() !== ""
      )
    )
      return setShow(true);
    setTasks([...tasks, data]);
    setOpen(false);
  };

  return (
    <MuiThemeProvider theme={themes}>
      <div className="App">
        <Header logout={logout} loggedIn={loggedIn} />
        {loggedIn && (
          <Box>
            <Snackbar
              open={show}
              autoHideDuration={3000}
              onClose={() => {
                setShow(false);
              }}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <Alert severity="info" color="warning">
                Please fill the field marked with *
              </Alert>
            </Snackbar>
            <TabsContainer setPanel={setPanel} />
            <Selector
              setCategory={setCategory}
              setFormType={(type) => {
                setFormType(type);
                setOpen(true);
              }}
            />
            <Modal
              open={open || loading}
              onClose={handleModal}
              className={classes.modal}
            >
              {!loading ? (
                <AddTaskForm
                  addTasks={(data) => {
                    setShow(true);
                    addTask(data, () => addTaskCB(data));
                  }}
                  type={formType}
                />
              ) : (
                <CircularProgress color="secondary" />
              )}
            </Modal>
            <Panels index={panel} category={category} tasks={tasks} cb={cb} />
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
    </MuiThemeProvider>
  );
}

export default App;
