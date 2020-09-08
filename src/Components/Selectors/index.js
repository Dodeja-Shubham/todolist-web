import React, { useState } from "react";
import {
  Paper,
  Select,
  MenuItem,
  InputLabel,
  makeStyles,
  FormControl,
  Button,
  Box,
} from "@material-ui/core";
import { Add } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  paper: {
    alignContent: "center",
    padding: theme.spacing(1),
  },
  formControl: {
    display: "flex",
    margin: theme.spacing(1),
    justifyContent: "space-between",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  btnContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  btn: {
    height: "40px",
    width: "30px",
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
        display: props.form ? "block" : "grid",
        gridTemplateColumns: props.form ? "1fr" : "3fr 1fr",
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
      {!props.form && (
        <Box className={classes.btnContainer}>
          <Button
            variant="contained"
            color="primary"
            className={classes.btn}
            onClick={() => props.setFormType("cat")}
          >
            <Add />
          </Button>
        </Box>
      )}
    </Paper>
  );
};
