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
import { createUser } from '../../actions/user';
import history from '../../history';
import logo from '../../images/logoOwl.png';

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
  agreement: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(3),
  },
  submit: {
    marginTop: theme.spacing(3),
    float: 'right',
  },
  login: {
    marginTop: theme.spacing(3),
    float: 'left',
  },
}));

function validateName(name) {
  return name.length >= 2 && name.length <= 50;
}

function validateEmail(email) {
  return (
    email !== '' && email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/)
  );
}

function validatePassword(password) {
  return password.length >= 8;
}

const SignUp = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isValid, setIsValid] = useState({
    firstname: true,
    lastname: true,
    email: true,
    password: true,
  });

  useEffect(() => {
    if (user.isAuth) {
      history.push(`/${user.id}`);
    }
  }, [user.isAuth, user.id]);

  const handleFirstnameChange = (e) => {
    setFirstname(e.target.value);
    setIsValid({ ...isValid, firstname: true });
  };

  const handleLastnameChange = (e) => {
    setLastname(e.target.value);
    setIsValid({ ...isValid, lastname: true });
  };

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
      firstname: validateName(firstname),
      lastname: validateName(lastname),
      email: validateEmail(email),
      password: validatePassword(password),
    });

    // Check for valid inputs before proceeding
    if (
      validateName(firstname) &&
      validateName(lastname) &&
      validateEmail(email) &&
      validatePassword(password)
    ) {
      dispatch(createUser({ email, firstname, lastname, password }));
    }
  };

  const classes = useStyles();
  return (
    <Container maxWidth='xs'>
      <Card variant='outlined' className={classes.root}>
        <CardContent>
          <div className={classes.root}>
            <img src={logo} alt='logoOwl' />
            <Typography variant='h5'>Create your Account!</Typography>
            <form className={classes.form} onKeyDown={onEnterPress} noValidate>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoFocus
                    error={!isValid.firstname}
                    fullWidth
                    helperText={
                      isValid.firstname ? '' : 'Must be between 2-50 characters'
                    }
                    inputProps={{ 'data-testid': 'firstname' }}
                    label='First Name'
                    name='firstname'
                    onChange={handleFirstnameChange}
                    required
                    type='text'
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    error={!isValid.lastname}
                    fullWidth
                    helperText={
                      isValid.lastname ? '' : 'Must be between 2-50 characters'
                    }
                    inputProps={{ 'data-testid': 'lastname' }}
                    label='Last Name'
                    name='lastname'
                    onChange={handleLastnameChange}
                    required
                    type='text'
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={!isValid.email}
                    fullWidth
                    helperText={
                      isValid.email ? '' : 'Please enter a valid email address'
                    }
                    inputProps={{ 'data-testid': 'email' }}
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
                      isValid.password ? '' : 'Must be longer than 8 characters'
                    }
                    inputProps={{ 'data-testid': 'password' }}
                    label='Password'
                    name='password'
                    onChange={handlePasswordChange}
                    required
                    type='password'
                  />
                </Grid>
              </Grid>
              <Typography variant='body2' className={classes.agreement}>
                By clicking Sign Up, you agree to use this website.
              </Typography>
              <Button className={classes.login} component={Link} to='/login'>
                Log In instead?
              </Button>
              <Button
                className={classes.submit}
                onClick={handleSubmit}
                type='submit'
                variant='contained'
                color='primary'
              >
                Sign Up
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </Container>
  );
};

export default SignUp;
