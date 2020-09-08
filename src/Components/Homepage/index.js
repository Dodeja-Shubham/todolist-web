import React, { useState } from "react";
import {
  Box,
  Paper,
  TextField,
  Button,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { signUpAPI, logInAPI } from "../../API/user";

const useStyles = makeStyles((theme) => ({
  userFormContainer: {
    height: "90vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  formBody: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(2),
    border: "2px solid #3F51B5",
    width: "70%",
  },
  txtField: {
    marginTop: theme.spacing(1),
  },
}));

export const UserForm = (props) => {
  const [login, setLogin] = useState(false);
  const [data, setData] = useState({});
  const classes = useStyles();

  const collapse = {
    minWidth: "100%",
    maxHeight: login ? "0px" : "200px",
    transition: "max-height 0.4s",
  };

  const handleChange = (e) => {
    let temp = data;
    temp[e.target.name] = e.target.value;
    setData({ ...temp });
    console.log(temp);
  };

  const handleSubmit = () => {
    if (login) {
      logInAPI(data, (res, err) => {
        if (!err && res) {
          console.log(res);
          props.setLoggedIn(true);
        }
      });
    } else
      signUpAPI(data, (res, err) => {
        if (!err && res) {
          console.log(res);
          props.setLoggedIn(true);
        }
      });
  };

  return (
    <Box className={classes.userFormContainer}>
      <Paper className={classes.formBody} elevation={3}>
        <Typography variant="h6">{login ? "Log In" : "Sign Up"}</Typography>
        <TextField
          required
          id="standard-required"
          label="username"
          placeholder="Add Username"
          onChange={handleChange}
          name="username"
          className={classes.txtField}
        />
        <TextField
          id="standard-required"
          label="Email"
          placeholder="Add Email"
          onChange={handleChange}
          name="email"
          className={classes.txtField}
        />
        <TextField
          type="password"
          id="standard-required"
          label="Password"
          placeholder="Password"
          onChange={handleChange}
          name={login ? "password" : "password1"}
          className={classes.txtField}
        />
        <TextField
          id="standard-required"
          label="Confirm Password"
          placeholder="Confirm Password"
          onChange={handleChange}
          name="password2"
          className={classes.txtField}
          style={collapse}
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.txtField}
          onClick={handleSubmit}
        >
          {login ? "Login" : "Sign up"}
        </Button>
        <Button color="secondary" onClick={() => setLogin(!login)}>
          {!login ? "Already" : "Don't"} have an account?
        </Button>
      </Paper>
    </Box>
  );
};