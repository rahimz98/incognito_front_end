import React, {useContext, useState, useEffect} from "react";
import axios from 'axios';
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import Brightness4Icon from '@material-ui/icons/Brightness4';
import SwitchUI from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { CustomThemeContext } from './themes/CustomThemeProvider';
import { getUserProfile, logout } from './actions/user';
import { Link, useParams, withRouter } from 'react-router-dom';
import logoName from './logoName.png'; 
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import logInPic from './images/logInPic.png';
import { ButtonGroup, useScrollTrigger } from "@material-ui/core";
import HomeIcon from '@material-ui/icons/Home';
import history from './history';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    //backgroundColor : '#6D7993',
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    // padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },
  signInButton: {
    backgroundColor : '#2D3E50',
    color : '#FFFFFF',
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  button: {
    textTransform : 'none',
    color: '#FFFFFF',
   
},
title: {
  flexGrow: 1,
  marginRight : theme.spacing(2),
},
logInPic : {
  height: "200px",
  marginTop : theme.spacing(1),
},
logoutButton: {
  backgroundColor : theme.palette.primary.button,
  color : '#FFFFFF',
},
creatProjectButton : {
  //marginLeft : theme.spacing(2),
}

}));

const PersistentDrawerLeft = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  //const {history} = props;
  const dispatch = useDispatch();
  const user = useSelector(store => store.user);
  const { currentTheme, setTheme } = useContext(CustomThemeContext);
  const isDark = Boolean(currentTheme === 'dark')
  const [projectList, setProjectList] = useState({});

  

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

  const handleDrawerOpen = () => {
    setOpen(true);
    console.log("getting the list of projects");
    //useEffect(() => {
      const token = localStorage.getItem("jwt");
      axios
        .get(`http://localhost:5000/api/project/get-project-list`,{
          headers: {
            'Authorization': token
          }
        })
        .then(res => {
          console.log(res);
          console.log("Hello world");
          setProjectList(res.data);
        })
    //})
    

    
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };



  const authLinks = (
    <Button onClick={handleLogout} className={classes.signInButton}  >
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

  const vistorDrawer = (
    <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <img src = {logInPic} className = {classes.logInPic}/>
        <Typography variant = 'body' align = 'center'>
          Log in to view your projects ^_^
        </Typography>
    </Drawer>
  );

  const authDrawer = (
    <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {Object.entries(projectList).map(([key, index]) => ( key != 'null' ? (
            <ListItem button key={index} onClick = {() => {history.push(`/${user.id}/${key}`)}}  >
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={index} />
            </ListItem>
          ) : <Divider />))}
        </List>
        
        
        <List>
            <ListItem >
              <ButtonGroup variant = "text" aria-label = "text primary button group"> 
                <HomeIcon fontSize = "large" onClick = {() => {history.push(`/${user.id}`)}} />
                <Button className ={classes.creatProjectButton} size = "large" onClick = {() => {history.push(`/${user.id}/createProject`)}}>Create Project</Button>
              </ButtonGroup>
            </ListItem>
        </List> 
    </Drawer>
  );


  return (
    <div >
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
        elevation = {0}
      >
        <Toolbar className={classes.root}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
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
      {user.isAuth ? authDrawer : vistorDrawer }
      
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open
        })}
      >
        <div className={classes.drawerHeader} />
      </main>
    </div>
  );
}

export default PersistentDrawerLeft;