import React, { useState } from "react";
import {
  Box,
  Card,
  Typography,
  CardContent,
  Checkbox,
  makeStyles,
  Modal,
} from "@material-ui/core";
import moment from "moment";
import { updateTask, getTasks } from "../../API/task";
import {AddTaskForm} from "../AddTaskForm"

const useStyles = makeStyles((theme) => ({
  taskList: {
    maxHeight: window.innerWidth <= 500 ? "75vh" : "80vh",
    overflowY: "scroll",
  },
  cardContainer: {
    borderTop: "2px solid",
    margin: theme.spacing(2),
  },
  card: {
    display: "flex",
    alignItems: "center",
  },
  modal: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export const Panels = (props) => {
  const classes = useStyles();
  const [curr, setCurr] = useState(0);
  const [show,setShow] = useState(false)

  return (
    <Box className={classes.taskList}>
      {props.tasks.map((task, index) => {
        if (
          (props.index === "Active" &&
            !task.is_completed &&
            moment(task.deadline).diff(moment().format()) >= 0) ||
          (props.index === "Done" && task.is_completed) ||
          (props.index === "Missed" &&
            moment(task.due_date).diff(moment().format()) < 0) ||
          (props.index === "All" &&
            (props.category === "All" || task.category === props.category))
        )
          return (
            <Card
              key={index}
              className={classes.cardContainer}
              elevation={3}
              style={{ borderColor: task.colour }}
              onClick={()=>{
                setCurr(index);
                setShow(true);
              }}
            >
              <CardContent className={classes.card}>
                <Checkbox
                  checked={task.is_completed}
                  inputProps={{ "aria-label": "primary checkbox" }}
                  onClick={(e)=>e.stopPropagation()}
                  onChange={(e) => {
                    let temp = { id: task.id };
                    temp.is_completed = e.target.checked;
                    updateTask(temp, (res, err) => {
                      getTasks(null,props.cb)
                    });
                  }}
                />
                <Typography>{task.title}</Typography>
              </CardContent>
            </Card>
          );
        else return false;
      })}
      <Modal open={show} onClose={()=>setShow(false)} className={classes.modal}>
            <AddTaskForm
            currTask={props.tasks[curr]}
              addTasks={(data) => {
                data.id=props.tasks[curr].id;
                updateTask(data, () => {
                  getTasks(null,props.cb)
                  setShow(false);
                });
              }}
            />
          </Modal>
    </Box>
  );
};
