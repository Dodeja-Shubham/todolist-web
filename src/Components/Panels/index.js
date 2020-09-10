import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  Typography,
  CardContent,
  Checkbox,
  makeStyles,
  Modal,
  CardActionArea,
  CardMedia,
} from "@material-ui/core";
import moment from "moment";
import { updateTask, getTasks } from "../../API/task";
import { AddTaskForm } from "../AddTaskForm";
import { motion, useAnimation } from "framer-motion";

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
  empty: {
    margin: theme.spacing(2),
  },
  media: {
    height: window.innerWidth <= 500 ? 300 : 500,
  },
}));

export const Panels = (props) => {
  const classes = useStyles();
  const controls = useAnimation();
  const [curr, setCurr] = useState(0);
  const [show, setShow] = useState(false);
  const [empty, setEmpty] = useState(true);

  useEffect(() => {
    setEmpty(true);
  }, [props.index, setEmpty]);

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
        ) {
          if (empty) setEmpty(false);
          return (
            <motion.div
              style={{ width: "100%" }}
              onDragEnd={() => {
                let temp = { id: task.id };
                temp.is_completed = !task.is_completed;
                updateTask(temp, (res, err) => {
                  getTasks(null, props.cb);
                });
              }}
              key={index}
              drag="x"
              dragDirectionLock
              animate={controls}
            >
              <Card
                className={classes.cardContainer}
                elevation={3}
                style={{ borderColor: task.colour }}
                onClick={() => {
                  setCurr(index);
                  setShow(true);
                }}
              >
                <CardContent className={classes.card}>
                  <Checkbox
                    checked={task.is_completed}
                    inputProps={{ "aria-label": "primary checkbox" }}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => {
                      let temp = { id: task.id };
                      temp.is_completed = e.target.checked;
                      updateTask(temp, (res, err) => {
                        getTasks(null, props.cb);
                      });
                    }}
                  />
                  <Typography>{task.title}</Typography>
                </CardContent>
              </Card>
            </motion.div>
          );
        } else return false;
      })}
      {empty && (
        <Card className={classes.empty} elevation={3}>
          <CardActionArea>
            <CardMedia
              image="https://images.unsplash.com/photo-1578852612716-854e527abf2e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
              title="ToDo"
              className={classes.media}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                You are free!
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Add a task from the + icon at the bottom.
                <br />
                <br />
              </Typography>
              <Typography variant="body2" color="secondary" component="p">
                PS. You can swipe left or right on a task and see what happens!
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      )}
      <Modal
        open={show}
        onClose={() => setShow(false)}
        className={classes.modal}
      >
        <AddTaskForm
          currTask={props.tasks[curr]}
          addTasks={(data) => {
            data.id = props.tasks[curr].id;
            updateTask(data, () => {
              getTasks(null, props.cb);
              setShow(false);
            });
          }}
        />
      </Modal>
    </Box>
  );
};
