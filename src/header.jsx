import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import SwitchUI from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { CustomThemeContext } from './themes/CustomThemeProvider';
import Search from './search';
import history from './history';
import { logout } from './actions/user';
import logoName from './logoName.png';
import Button from '@material-ui/core/Button';
import logInPic from './images/logInPic.png';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import HomeIcon from '@material-ui/icons/Home';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.primary,
  },
  left: {
    float: 'left',
    display: 'flex',
  },
  center: {
    margin: '0 auto',
  },
  rightExpanded: {
    float: 'right',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  rightReduced: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      float: 'right',
      marginLeft: theme.spacing(2),
    },
  },
  vertIcon: {
    fill: '#FFFFFF',
  },
  grow: {
    flexGrow: 1,
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    // padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  signInButton: {
    backgroundColor: '#2D3E50',
    color: '#FFFFFF',
  },
  icon: {
    verticalAlign: 'middle',
    marginRight: theme.spacing(1),
  },
  switch: {
    marginLeft: theme.spacing(2),
  },
  button: {
    textTransform: 'none',
    color: '#FFFFFF',
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(2),
    [theme.breakpoints.between(0, 650)]: {
      display: 'none',
    },
  },
  logInPic: {
    height: '200px',
    marginTop: theme.spacing(1),
  },
  logoutButton: {
    backgroundColor: theme.palette.primary.button,
    color: '#FFFFFF',
  },
  creatProjectButton: {
    marginRight: theme.spacing(2),
  },
  fab: {
    marginRight: theme.spacing(2),
  },
}));

const PersistentDrawerLeft = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [dropdownAnchorE1, setDropdownAnchorE1] = useState(null);
  const isDropdownOpen = Boolean(dropdownAnchorE1);

  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const { currentTheme, setTheme } = useContext(CustomThemeContext);
  const isDark = Boolean(currentTheme === 'dark');
  const [projectList, setProjectList] = useState({});

  const handleThemeChange = (event) => {
    const { checked } = event.target;
    if (checked) {
      setTheme('dark');
    } else {
      setTheme('normal');
    }
  };

  const handleLogout = () => {
    handleDropdownClose();
    dispatch(logout());
  };

  const handleDrawerOpen = () => {
    setOpen(true);
    console.log('getting the list of projects');
    //useEffect(() => {
    const token = localStorage.getItem('jwt');
    axios
      .get(`https://memento-backend.herokuapp.com/api/project/get-project-list`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log(res);
        console.log('Hello world');
        setProjectList(res.data);
      });
    //})
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleDropdown = (e) => {
    setDropdownAnchorE1(e.currentTarget);
  };

  const handleDropdownClose = () => {
    setDropdownAnchorE1(null);
  };

  const handleLogin = () => {
    handleDropdownClose();
    history.push('/login');
  };

  const handleRegister = () => {
    handleDropdownClose();
    history.push('/signup');
  };

  const userLinks = (
    <Button onClick={handleLogout} className={classes.signInButton}>
      Logout
    </Button>
  );

  const vistorLinks = (
    <React.Fragment>
      <Button className={classes.button} component={Link} to='/signup'>
        Get Started
      </Button>
      <Button
        variant='contained'
        className={classes.signInButton}
        component={Link}
        to='/login'
      >
        Log In
      </Button>
    </React.Fragment>
  );

  const renderMobileDropdown = user.isAuth ? (
    <Menu
      anchorEl={dropdownAnchorE1}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isDropdownOpen}
      onClose={handleDropdownClose}
    >
      <MenuItem onClick={handleLogout}>
        <ExitToAppIcon className={classes.icon} fontSize='small' />
        <Typography variant='body2'>Sign out</Typography>
      </MenuItem>
      <Divider />
      <MenuItem>
        <Brightness4Icon className={classes.icon} fontSize='small' />
        <Typography variant='body2'>Dark theme</Typography>
        <FormControlLabel
          control={
            <SwitchUI
              checked={isDark}
              onChange={handleThemeChange}
              className={classes.switch}
            />
          }
        />
      </MenuItem>
    </Menu>
  ) : (
    <Menu
      anchorEl={dropdownAnchorE1}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isDropdownOpen}
      onClose={handleDropdownClose}
    >
      <MenuItem onClick={handleLogin}>
        <ExitToAppIcon className={classes.icon} fontSize='small' />
        <Typography variant='body2'>Login</Typography>
      </MenuItem>
      <MenuItem onClick={handleRegister}>
        <AddCircleOutlineIcon className={classes.icon} fontSize='small' />
        <Typography variant='body2'>Register</Typography>
      </MenuItem>
      <Divider />
      <MenuItem>
        <Brightness4Icon className={classes.icon} fontSize='small' />
        <Typography variant='body2'>Dark theme</Typography>
        <FormControlLabel
          control={
            <SwitchUI
              checked={isDark}
              onChange={handleThemeChange}
              className={classes.switch}
            />
          }
        />
      </MenuItem>
    </Menu>
  );

  const vistorDrawer = (
    <Drawer
      className={classes.drawer}
      variant='persistent'
      anchor='left'
      open={open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'ltr' ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </div>
      <Divider />
      <img src={logInPic} className={classes.logInPic} />
      <Typography variant='body2' align='center'>
        Log in to view your projects ^_^
      </Typography>
    </Drawer>
  );

  const authDrawer = (
    <Drawer
      className={classes.drawer}
      variant='persistent'
      anchor='left'
      open={open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'ltr' ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </div>
      <Divider />
      <List>
        <ListItem>
          <Tooltip
            title='Home'
            aria-label='add'
            onClick={() => {
              history.push(`/${user.id}`);
            }}
          >
            <Fab color='primary' className={classes.fab}>
              <HomeIcon className={classes.HomeIcon} />
            </Fab>
          </Tooltip>
          <h3>Home</h3>
        </ListItem>
      </List>
      <Divider />
      <List>
        {Object.entries(projectList).map(([key, index]) =>
          key != 'null' ? (
            <ListItem
              button
              key={index}
              onClick={() => {
                history.push(`/${user.id}/${key}`);
              }}
            >
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={index} />
            </ListItem>
          ) : (
            <Divider />
          )
        )}
      </List>

      <List>
        <ListItem>
          <Tooltip
            title='Create project'
            className={classes.creatProjectButton}
            aria-label='add'
            onClick={() => {
              history.push(`/${user.id}/createProject`);
            }}
          >
            <Fab color='primary'>
              <AddIcon />
            </Fab>
          </Tooltip>
          <h3>Create Project</h3>
        </ListItem>
      </List>
    </Drawer>
  );

  return (
    <div className={classes.grow}>
      <CssBaseline />
      <AppBar
        position='fixed'
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
        elevation={0}
      >
        <Toolbar className={classes.root}>
          <div className={classes.left}>
            <IconButton
              data-testid='drawer'
              color='inherit'
              aria-label='open drawer'
              onClick={handleDrawerOpen}
              edge='start'
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Link to='/' className={classes.title}>
              <img src={logoName} alt='logoName.png' />
            </Link>
          </div>
          <div className={classes.center}>
            <Search />
            <div className={classes.grow}></div>
          </div>
          <div className={classes.rightExpanded}>
            <Brightness4Icon className={classes.icon} />
            <FormControlLabel
              data-testid='darkModeSwitch'
              control={
                <SwitchUI checked={isDark} onChange={handleThemeChange} />
              }
            />
            {user.isAuth ? userLinks : vistorLinks}
          </div>
          <div className={classes.rightReduced}>
            <IconButton onClick={handleDropdown}>
              <MoreVertIcon className={classes.vertIcon} />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileDropdown}
      {user.isAuth ? authDrawer : vistorDrawer}

      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
      </main>
    </div>
  );
};

export default PersistentDrawerLeft;
