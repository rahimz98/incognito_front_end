import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
  
  root: {
    flexGrow: 1,
    backgroundColor : '#6D7993',
    boxShadow : 'none',
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
      
      <AppBar position="static"  elevation={0} >
        <Toolbar className={classes.root}>
          
          <Typography variant="h6" className={classes.title} href = '/'>
            Incognito
          </Typography>
        
          <Button className  = {classes.button} href = '/signup'>
              Get Started
          </Button>
          <Button variant = "contained"  className  = {classes.signInButton} href  = '/login'>
              Sign In
          </Button>
            
       
        </Toolbar>
      </AppBar>
    </div>
  );
}
