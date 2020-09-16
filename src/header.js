import React, {useContext} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import logoName from './logoName.png';      
import { Link } from 'react-router-dom';
import { logout } from './actions/user';
import { CustomThemeContext } from './themes/CustomThemeProvider';
import FormControlLabel from '@material-ui/core/FormControlLabel'
import SwitchUI from '@material-ui/core/Switch'
import Brightness4Icon from '@material-ui/icons/Brightness4';


const useStyles = makeStyles((theme) => ({
  
  root: {
    flexGrow: 1,
    backgroundColor : '#6D7993',
  },
 
  title: {
    flexGrow: 1,
    marginRight : theme.spacing(2),
  },
  logo: {
    maxWidth: '100%',
    verticalAlign: 'middle'
  },
  button: {
      textTransform : 'none',
      color: '#FFFFFF',
     
  },
  signInButton: {
    backgroundColor : '#192231',
    color : '#FFFFFF',
  },
  icon: {
    marginRight: theme.spacing(2),
  },
}));

export default function MenuAppBar() {
  const dispatch = useDispatch();
  const user = useSelector(store => store.user);
  const classes = useStyles();
  const { currentTheme, setTheme } = useContext(CustomThemeContext);
  const isDark = Boolean(currentTheme === 'dark')

  const handleThemeChange = (event) => {
    const { checked } = event.target
    if (checked) {
      setTheme('dark')
    } else {
      setTheme('normal')
    }
  }


  

 const handleLogout = () => {
   dispatch(logout());
   
 }
  
  const authLinks = (
    <Button onClick={handleLogout} className={classes.signInButton}>
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

      <AppBar position="static"   elevation={0}>
        <Toolbar className={classes.root}>
          <Link to = '/' className = {classes.title}>
              <img src = {logoName} alt = "logoName.png" />
          </Link>
          <Brightness4Icon className = {classes.icon}/>
          <FormControlLabel
            control={<SwitchUI checked={isDark} onChange={handleThemeChange} />}
          />
          { user.isAuth ? authLinks : vistorLinks }
        </Toolbar>
      </AppBar>
    </div>
  );
}
