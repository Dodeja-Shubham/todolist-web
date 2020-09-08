import React from "react";
import {
  Box,
  Card,
  Typography,
  CardContent,
  Checkbox,
  makeStyles,
} from "@material-ui/core";
import moment from "moment";

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
}));

export const Panels = (props) => {
  const classes = useStyles();

  return (
    <Box className={classes.taskList}>
      {props.tasks.map((task, index) => {
        if (
          (props.index === "Active" &&
            !task.completed &&
            moment(task.deadline).diff(moment().format()) >= 0) ||
          (props.index === "Done" && task.completed) ||
          (props.index === "Missed" &&
            moment(task.deadline).diff(moment().format()) < 0) ||
          (props.index === "All" &&
            (props.category === "All" || task.category === props.category))
        )
          return (
            <Card
              key={index}
              className={classes.cardContainer}
              elevation={3}
              style={{ borderColor: task.color }}
            >
              <CardContent className={classes.card}>
                <Checkbox
                  checked={task.completed}
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
                <Typography>{task.title}</Typography>
              </CardContent>
            </Card>
          );
        else return false;
      })}
    </Box>
  );
};
