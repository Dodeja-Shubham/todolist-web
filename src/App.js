import React, { useState } from "react";
import { Fab, makeStyles, Modal, Box } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { Header } from "./Components/Header";
import { TabsContainer } from "./Components/Tabs";
import { Selector } from "./Components/Selectors";
import { AddTaskForm } from "./Components/AddTaskForm";
import { Panels } from "./Components/Panels";
import { UserForm } from "./Components/Homepage";

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
  const [loggedIn, setLoggedIn] = useState(false);
  const [open, setOpen] = useState(false);
  const [panel, setPanel] = useState("All");
  const [category, setCategory] = useState("All");
  const [formType, setFormType] = useState("Add");
  const [tasks, setTasks] = useState([
    {
      title: "Expired",
      desc: "Do the complete maths homework",
      deadline: "2020-09-06T04:15",
      category: "Studies",
      completed: false,
      color: "#4287f5",
    },
    {
      title: "Do homework",
      desc: "Do the complete maths homework",
      deadline: "2020-09-20T04:15",
      category: "Studies",
      completed: false,
      color: "#f30aff",
    },
    {
      title: "Link APIs",
      desc: "Connect APIs",
      deadline: "2020-09-10T04:15",
      category: "Project",
      completed: false,
      color: "#570202",
    },
    {
      title: "Connect add task feature",
      desc: "Link add task feature",
      deadline: "2020-09-10T04:15",
      category: "Project",
      completed: false,
      color: "#4d5702",
    },
    {
      title: "Expired",
      desc: "Do the complete maths homework",
      deadline: "2020-09-06T04:15",
      category: "Studies",
      completed: true,
      color: "#57022b",
    },
    {
      title: "Repair Phone",
      desc: "Repair screen and lag",
      deadline: "2020-09-18T04:15",
      category: "Shopping",
      completed: false,
      color: "#fff70a",
    },
    {
      title: "Get pumpkin seeds",
      desc: "Get good quality pumpkin seeds",
      deadline: "2020-09-05T04:15",
      category: "Garden",
      completed: false,
      color: "#57022b",
    },
    {
      title: "Do homework",
      desc: "Do the complete maths homework",
      deadline: "2020-09-22T04:15",
      category: "Studies",
      completed: false,
      color: "#57022b",
    },
  ]);

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
                if (formType !== "cat") setTasks([...tasks, data]);
                else setFormType(data.category);
                setOpen(false);
              }}
              type={formType}
            />
          </Modal>
          <Panels index={panel} category={category} tasks={tasks} />
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
