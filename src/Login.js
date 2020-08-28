import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, Grid, makeStyles, Typography, TextField } from '@material-ui/core'
import Button from '@material-ui/core/Button'

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

const Login = () => {
  const[email, setEmail] = useState("")
  const[password, setPassword] = useState("")

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const onEnterPress = (e) => {
    if(e.key === "Enter") {
      handleSubmit(e)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    console.log(`Email: ${email} Password: ${password}`)
    // Do other things
  }

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
              fullWidth
              label="Email"
              name="email"
              onChange={handleEmailChange}
              required
              type="text"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
              fullWidth
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
  )
}

export default Login
