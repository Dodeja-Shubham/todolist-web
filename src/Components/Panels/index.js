import React, { useState } from "react";
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
  cardContainer: {
    margin: theme.spacing(2),
  },
  card: {
    display: "flex",
    alignItems: "center",
  },
}));

export const Panels = (props) => {
  const classes = useStyles();
  const [tasks] = useState([
    {
      title: "Expired",
      desc: "Do the complete maths homework",
      deadline: "2020-09-06T04:15",
      category: "Studies",
      completed: false,
    },
    {
      title: "Do homework",
      desc: "Do the complete maths homework",
      deadline: "2020-09-20T04:15",
      category: "Studies",
      completed: false,
    },
    {
      title: "Expired",
      desc: "Do the complete maths homework",
      deadline: "2020-09-06T04:15",
      category: "Studies",
      completed: true,
    },
    {
      title: "Repair Phone",
      desc: "Do the complete maths homework",
      deadline: "2020-09-18T04:15",
      category: "Shopping",
      completed: false,
    },
    {
      title: "Do homework",
      desc: "Do the complete maths homework",
      deadline: "2020-09-22T04:15",
      category: "Studies",
      completed: false,
    },
  ]);

  return (
    <Box>
      {tasks.map((task, index) => {
        if (
          ((props.index === "upcoming" &&
            !task.completed &&
            moment(task.deadline).diff(moment().format()) >= 0) ||
            (props.index === "completed" && task.completed) ||
            (props.index === "missed" &&
              moment(task.deadline).diff(moment().format()) < 0)) &&
          (props.category === "All" || task.category === props.category)
        )
          return (
            <Card key={index} className={classes.cardContainer} elevation={3}>
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
