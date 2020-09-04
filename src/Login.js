import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Grid, makeStyles, Typography, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { loginUser } from './actions/user';


const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(12),
  },
  form: {
    marginTop: theme.spacing(3),
  },
  submit: {
    marginTop: theme.spacing(3),
    float: "right",
  },
  signup: {
    marginTop: theme.spacing(3),
    float: "left",
  },
}))

function validateEmail(email) {
  return (
    email.length > 0
  );
};

function validatePassword(password) {
  return (
    password.length > 0
  );
};

const mapState = ({user}) => ({
  loginSuccess: user.loginSuccess,
  loginError: user.loginError
});

const Login = () => {
  const dispatch = useDispatch();
  const { loginSuccess, loginError } = useSelector(mapState);
  const[email, setEmail] = useState("")
  const[password, setPassword] = useState("")

  const[isValid, setIsValid] = useState({
    email: true,
    password: true
  })

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setIsValid({...isValid, email: true});
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setIsValid({...isValid, password: true});
  }

  const onEnterPress = (e) => {
    if(e.key === "Enter") {
      handleSubmit(e);
    }
  }

  useEffect(() => {
    if (loginSuccess) {
      console.log(loginSuccess);
      console.log("Successful logged in! Redirect me!");
      // Feedback and redirect
    }
  }, [loginSuccess]);

  useEffect(() => {
    if (loginError !== "") {
      console.log(loginError);
      console.log("Display feedback for user!");
      // Feedback
    }
  }, [loginError]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsValid({
      email: validateEmail(email),
      password: validatePassword(password)
    })
    if (validateEmail(email) && validatePassword(password)) {
      dispatch(loginUser({email, password}));
    }
  };

  const classes = useStyles();
  return (
    <Container maxWidth="xs">
      <div className={classes.root}>
        <Typography variant="h5">
          Welcome
        </Typography>
        <form 
          className={classes.form}
          onKeyDown={onEnterPress}
          noValidate
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
              autoFocus
              error={!isValid.email}
              fullWidth
              helperText={isValid.email ? "" : "This field can't be empty"}
              label="Email"
              name="email"
              onChange={handleEmailChange}
              required
              type="text"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
              error={!isValid.password}
              fullWidth
              helperText={isValid.password ? "" : "This field can't be empty"}
              label="Password"
              name="password"
              onChange={handlePasswordChange}
              required
              type="password"
              />
            </Grid>
          </Grid>
          <Button
            className={classes.signup}
            color="primary"
            component={Link} 
            to="/signup"
          >
            Sign Up?
          </Button>
          <Button 
            className={classes.submit}
            color="primary"
            onClick={handleSubmit}
            type="submit"
            variant="contained" 
          >
            Log In
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default Login;
