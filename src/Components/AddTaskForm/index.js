import React, { useState } from "react";
import {
  Paper,
  Typography,
  TextField,
  makeStyles,
  Button,
} from "@material-ui/core";
import { Selector } from "../Selectors";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  formContainer: {
    padding: theme.spacing(1),
    width: "80%",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: window.innerWidth <= 500 ? "90%" : "60%",
    margin: theme.spacing(1),
  },
  input: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
}));

export const AddTaskForm = (props) => {
  const classes = useStyles();
  const [form, setForm] = useState({});

  const handleChange = (e) => {
    let temp = { ...form };
    if (e.target.name === "due_date")
      temp[e.target.name] = moment(e.target.value)
        .format("YYYY-MM-DD")
        .toString();
    else temp[e.target.name] = e.target.value;
    setForm({ ...temp });
  };

  const handleCategory = (cat) => {
    let temp = { ...form };
    temp.category = cat;
    setForm({ ...temp });
  };

  return (
    <Paper className={classes.formContainer}>
      <Typography variant="h5">Add Task</Typography>
      <form className={classes.form}>
        <div className={classes.form}>
          <TextField
            required
            id="standard-required"
            label="Title"
            placeholder="Task Title"
            onChange={handleChange}
            name="title"
            helperText={props.currTask&&props.currTask.title}
          />
          <TextField
            required
            multiline
            rows={4}
            id="standard-required"
            label="Description"
            placeholder="Task Description"
            onChange={handleChange}
            name="desc"
            helperText={props.currTask&&props.currTask.desc}
          />
          <div className={classes.input}>
            <Selector elevation={0} setCategory={handleCategory} form />
          </div>
          <TextField
            id="date"
            label="Deadline"
            type="datetime-local"
            InputLabelProps={{
              shrink: true,
            }}
            className={classes.input}
            onChange={handleChange}
            name="due_date"
            helperText={props.currTask&&props.currTask.due_date}
          />
          <TextField
            id="color"
            label="Color"
            type="color"
            className={classes.input}
            onChange={handleChange}
            name="colour"
            defaultValue={props.currTask&&props.currTask.colour}
          />{" "}
        </div>
        <Button
          variant="contained"
          color="primary"
          className={classes.input}
          onClick={() => props.addTasks(form)}
        >
          Submit
        </Button>
      </form>
    </Paper>
  );
};