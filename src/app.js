import React from 'react';
import './app.css';
import { Router, Switch, Route } from 'react-router-dom';
import history from './history';
import { Paper } from "@material-ui/core";
// Redux
import { Provider } from 'react-redux';
import jwtDecode from 'jwt-decode';
import store from './store';
import { logout } from './actions/user';
// Components
import Snackbar from './snackbar';
import Header from './header.js';
import Footer from './footer.js';
import PrivateRoute from './privateRoute';
// Pages
import Login from './login';
import SignUp from './signUp';
import HomePage from './home.js';

// testing page
import Profile from './profile';


const token = localStorage.getItem("jwt");
if (token) {
  const decodedToken = jwtDecode(token);
  console.log(new Date(decodedToken.exp * 1000))
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logout());
  }
  else {
    // TODO: set current user action
  }
}

function App() {
 

  return (
    <Provider store={store}>
      <Router history={history}>
        <div className="App">
        <Snackbar/>
        <Paper elevation = '0'>
          <Header/>
          <Switch>
            <Route exact path="/" component={HomePage}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/signup" component={SignUp}/> 
            {/* TODO: routing for user and other users */}
            {/* testing route */}
            <PrivateRoute exact path="/profile" component={Profile}/>
          </Switch>
          <Footer/>

        </Paper>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
