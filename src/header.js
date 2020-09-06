import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import NavLogo from './memento.png';
import { logout } from './actions/user';

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
  logo: {
    maxWidth: '100%',
    verticalAlign: 'middle'
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
  const dispatch = useDispatch();
  const user = useSelector(store => store.user);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

 const handleLogout = () => {
   dispatch(logout());
   
 }
  
  const authLinks = (
    <Button onClick={handleLogout} className={classes.button}>
        Logout
    </Button>
  );

  const vistorLinks = (
    <React.Fragment>
      <Button className={classes.button} component={Link} to='/signup'>
          Get Started
      </Button>
      <Button variant="contained" className={classes.signInButton} component={Link} to="/login">
          Sign In
      </Button>
    </React.Fragment>
  );
  
  return (
    <div className={classes.root}>

      <AppBar position="static"  elevation={0} >
        <Toolbar className={classes.root}>
          <div className={classes.title}> 
            <Link>
             <img src={NavLogo} alt='logo' className={classes.logo} component={Link} to='/'/>
            </Link>
          </div>
          { user.isAuthenticated ? authLinks : vistorLinks }
        </Toolbar>
      </AppBar>
    </div>
  );
}
