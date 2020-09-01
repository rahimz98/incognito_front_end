import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';
import Header from './header.js';

function App() {
  return (
    <Router>
      <div className="App">
      <Header/>
        <Switch>
          <Route path="/login">
            <Login/>
          </Route>
          <Route path="/signup">
            <SignUp/>
          </Route>
          <Route path="/">
            <h1>Incognito - ePortfoilo</h1>
            <Link to="/login">
              Log In
            </Link>
            <Link to="/signup">
              Sign Up
            </Link>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
