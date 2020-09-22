import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Container,
  Grid,
  makeStyles,
  Typography,
  TextField,
  Card,
  CardContent,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { loginUser } from './actions/user';
import history from './history';
import logo from './logoOwl.png';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(6),
    minWidth: 275,
  },
  form: {
    marginTop: theme.spacing(3),
  },
  submit: {
    marginTop: theme.spacing(3),
    float: 'right',
    backgroundColor: '#192231',
    color: '#FFFFFF',
  },
  signup: {
    marginTop: theme.spacing(3),
    float: 'left',
  },
}));

function validateEmail(email) {
  return email.length > 0;
}

function validatePassword(password) {
  return password.length > 0;
}

const Login = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isValid, setIsValid] = useState({
    email: true,
    password: true,
  });

  useEffect(() => {
    if (user.isAuth) {
      history.push(`/${user.id}`);
    }
  }, [user.isAuth, user.id]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setIsValid({ ...isValid, email: true });
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setIsValid({ ...isValid, password: true });
  };

  const onEnterPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsValid({
      email: validateEmail(email),
      password: validatePassword(password),
    });

    if (validateEmail(email) && validatePassword(password)) {
      dispatch(loginUser({ email, password }));
    }
  };

  const classes = useStyles();
  return (
    <Container maxWidth='xs'>
      <Card variant='outlined' className={classes.root}>
        <CardContent>
          <div className={classes.root}>
            <img src={logo} alt='logoOwl' />
            <Typography variant='h5'>Welcome</Typography>
            <form className={classes.form} onKeyDown={onEnterPress} noValidate>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    autoFocus
                    error={!isValid.email}
                    fullWidth
                    helperText={
                      isValid.email ? '' : 'Please enter a valid email address'
                    }
                    label='Email'
                    name='email'
                    onChange={handleEmailChange}
                    required
                    type='text'
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={!isValid.password}
                    fullWidth
                    helperText={
                      isValid.password ? '' : 'Please enter your password'
                    }
                    label='Password'
                    name='password'
                    onChange={handlePasswordChange}
                    required
                    type='password'
                  />
                </Grid>
              </Grid>
              <Button className={classes.signup} component={Link} to='/signup'>
                Sign Up?
              </Button>
              <Button
                className={classes.submit}
                onClick={handleSubmit}
                type='submit'
                variant='contained'
              >
                Log In
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Login;
