import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import history from './history';
import { makeStyles } from '@material-ui/core/styles';
import jwtDecode from 'jwt-decode';
// Redux
import { Provider } from 'react-redux';
import store from './store';
import { logout, getUserProfile } from './actions/user';
import { SET_AUTHENTICATED, SET_USER_ID } from './types';
// Components
import Snackbar from './components/snackbar/snackbar';
import Header from './components/header/header';
import Footer from './components/footer/footer';
// Pages
import Login from './components/userAuth/login';
import SignUp from './components/userAuth/signUp';
import HomePage from './components/home/home';
import Profile from './components/profile/profile';
import NotFound from './components/notFound/notFound';
import aboutUs from './components/aboutUs/aboutUs';
import SearchPage from './components/search/searchPage';
import Project from './components/project/projects';
import CreateProject from './components/project/createProject';
import EditProject from './components/project/editProject';
import ImagePage from './components/project/gallery/ImagesPage';
import Gallery from './components/project/gallery/Gallery';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  container: {
    flex: 1,
  },
}));

// Check if session has expired
const token = localStorage.getItem('jwt');
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logout());
  } else {
    store.dispatch({ type: SET_USER_ID, payload: decodedToken.id });
    store.dispatch({ type: SET_AUTHENTICATED });
    store.dispatch(getUserProfile());
  }
}

function App() {
  const classes = useStyles();
  return (
    <Provider store={store}>
      <Router history={history}>
        <div className={classes.root}>
          <Snackbar />
          <div className={classes.container}>
            <Header />
            <Switch>
              <Route exact path='/' component={HomePage} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/signup' component={SignUp} />
              <Route exact path='/search' component={SearchPage} />
              <Route exact path='/aboutUs' component={aboutUs} />
              <Route exact path='/:id' component={Profile} />
              <Route
                exact
                path='/:id/createProject'
                component={CreateProject}
              />
              <Route exact path='/:id/:projectid' component={Project} />
              <Route
                exact
                path='/:id/:projectid/edit'
                component={EditProject}
              />
              <Route exact path='/:id/:projectid/images' component={ImagePage} />
              <Route exact path='/:id/:projectid/gallery' component={Gallery} />
              <Route path='*' component={NotFound} />
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
