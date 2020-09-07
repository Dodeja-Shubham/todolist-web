import React from "react";
import {
  Paper,
  Typography,
  TextField,
  makeStyles,
  Button,
} from "@material-ui/core";
import { Selector } from "../Selectors";

const useStyles = makeStyles((theme) => ({
  formContainer: {
    padding: theme.spacing(1),
    width: "60%",
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

export const AddTaskForm = () => {
  const classes = useStyles();
  return (
    <Paper className={classes.formContainer}>
      <Typography variant="h5">Add Task</Typography>
      <form className={classes.form}>
        <TextField
          required
          id="standard-required"
          label="Title"
          placeholder="Task Title"
        />
        <TextField
          required
          multiline
          rows={4}
          id="standard-required"
          label="Description"
          placeholder="Task Description"
        />
        <div className={classes.input}>
          <Selector elevation={0} />
        </div>
        <TextField
          id="date"
          label="Deadline"
          type="date"
          defaultValue="2017-05-24"
          // className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          className={classes.input}
        />
        <Button variant="contained" color="primary" className={classes.input}>
          Submit
        </Button>
      </form>
    </Paper>
  );
};
