import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import { spacing } from '@material-ui/system';
import { Box } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  
  root: {
    flexGrow: 1,
    backgroundColor : '#6D7993',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  button: {
      textTransform : 'none',
      color: '#FFFFFF'
     
  },
  signInButton: {
    backgroundColor : '#96858F',
    color : '#FFFFFF',
  },
}));


export default function MenuAppBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);


  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      
      <AppBar position="static" >
        <Toolbar className={classes.root}>
          
          <Typography variant="h6" className={classes.title}>
            Incognito
          </Typography>
        
          <Button className  = {classes.button}>
              Get Started
          </Button>
          <Button variant = "contained"  className  = {classes.signInButton}>
              Sign In
          </Button>
            
       
        </Toolbar>
      </AppBar>
    </div>
  );
}
