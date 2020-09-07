import React, { useState } from "react";
import {
  Box,
  Card,
  Typography,
  CardContent,
  Checkbox,
  makeStyles,
} from "@material-ui/core";

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
      title: "Do homework",
      desc: "Do the complete maths homework",
      deadline: "2020-9-19",
      category: "Studies",
      completed: false,
    },
    {
      title: "Do homework",
      desc: "Do the complete maths homework",
      deadline: "2020-9-11",
      category: "Studies",
      completed: false,
    },
    {
      title: "Do homework",
      desc: "Do the complete maths homework",
      deadline: "2020-9-17",
      category: "Studies",
      completed: true,
    },
    {
      title: "Do homework",
      desc: "Do the complete maths homework",
      deadline: "2020-9-10",
      category: "Studies",
      completed: true,
    },
    {
      title: "Do homework",
      desc: "Do the complete maths homework",
      deadline: "2020-9-22",
      category: "Studies",
      completed: false,
    },
  ]);

  return (
    <Box>
      {tasks.map((task, index) => {
        if (!(props.index === "upcoming") === task.completed)
          return (
            <Card key={index} className={classes.cardContainer}>
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
