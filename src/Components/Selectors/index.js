import React, { useState } from "react";
import {
  Paper,
  Select,
  MenuItem,
  InputLabel,
  makeStyles,
  FormControl,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    alignContent: "center",
    padding: theme.spacing(1),
  },
  formControl: {
    display: "flex",
    width: "100%",
    margin: theme.spacing(1),
    justifyContent: "space-between",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export const Selector = (props) => {
  const classes = useStyles();
  const [category, setCategory] = useState("All");
  const [categoryList] = useState(["Shopping", "Studies", "Project", "Garden"]);

  const handleChange = (event) => {
    setCategory(event.target.value);
    props.setCategory(event.target.value);
  };

  return (
    <Paper
      square
      elevation={props.elevation}
      className={classes.paper}
      style={{
        display: "flex",
      }}
    >
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={category}
          onChange={handleChange}
        >
          <MenuItem value="All">All</MenuItem>
          {categoryList.map((cat, index) => (
            <MenuItem value={cat} key={index}>
              {cat}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Paper>
  );
};
