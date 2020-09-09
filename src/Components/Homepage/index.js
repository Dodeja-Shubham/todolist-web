import React, { useState } from "react";
import {
  Box,
  Paper,
  TextField,
  Button,
  makeStyles,
  Typography,
  Snackbar,
  CircularProgress,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
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
    border: `2px solid ${theme.palette.primary.light}`,
    width: "70%",
  },
  txtField: {
    marginTop: theme.spacing(1),
  },
  btn: {
    position: "relative",
    marginTop: theme.spacing(1),
  },
  loader: {
    position: "absolute",
    right: "10px",
  },
}));

export const UserForm = (props) => {
  const [login, setLogin] = useState(false);
  const [data, setData] = useState({});
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const classes = useStyles();

  const collapse = {
    minWidth: "100%",
    maxHeight: login ? "0px" : "200px",
    transform: `scaleY(${login ? 0 : 1})`,
    transition: "max-height 0.4s",
  };

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleChange = (e) => {
    let temp = data;
    temp[e.target.name] = e.target.value;
    setData({ ...temp });
  };

  const handleSubmit = () => {
    setLoading(true);
    if (login) {
      logInAPI(data, (res, err) => {
        setLoading(false);
        if (!err && res.data.key) {
          localStorage.setItem("xxkeyxx", res.data.key);
          props.setLoggedIn(true);
        } else {
          setShow(true);
        }
      });
    } else
      signUpAPI(data, (res, err) => {
        setLoading(false);
        if (!err && res.data.token) {
          localStorage.setItem("xxkeyxx", res.data.token);
          props.setLoggedIn(true);
        } else {
          setShow(true);
        }
      });
  };

  return (
    <Box className={classes.userFormContainer}>
      <Snackbar
        open={show}
        autoHideDuration={3000}
        onClose={() => {
          setShow(false);
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="info" color="warning">
          Please fill the field marked with *
        </Alert>
      </Snackbar>
      <Paper className={classes.formBody} elevation={3}>
        <Typography variant="h6">{login ? "Log In" : "Sign Up"}</Typography>
        <TextField
          required
          label="username"
          placeholder="Add Username"
          onChange={handleChange}
          name="username"
          className={classes.txtField}
        />
        <TextField
          label="Email"
          placeholder="Add Email"
          onChange={handleChange}
          name="email"
          disabled={login}
          className={classes.txtField}
          style={collapse}
        />
        <TextField
          required
          type="password"
          label="Password"
          placeholder="Password"
          onChange={handleChange}
          name="password"
          className={classes.txtField}
        />
        <TextField
          required
          label="Confirm Password"
          placeholder="Confirm Password"
          onChange={handleChange}
          name="password2"
          className={classes.txtField}
          disabled={login}
          style={collapse}
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.btn}
          onClick={handleSubmit}
        >
          {login ? "Login" : "Sign up"}
          {loading && (
            <CircularProgress
              color="secondary"
              size="1.5rem"
              className={classes.loader}
            />
          )}
        </Button>
        <Button color="secondary" onClick={() => setLogin(!login)}>
          {!login ? "Already" : "Don't"} have an account?
        </Button>
      </Paper>
    </Box>
  );
};
