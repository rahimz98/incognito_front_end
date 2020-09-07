import React, { useState } from 'react';
import './app.css';
import { Router, Switch, Route } from 'react-router-dom';
import history from './history';
import {Paper, Switch as SW} from "@material-ui/core";
import {ThemeProvider , createMuiTheme} from "@material-ui/core/styles";
import Snackbar from './snackbar';
import Header from './header.js';
import Footer from './footer.js';
import PrivateRoute from './privateRoute';
// Pages
import Login from './login';
import SignUp from './signUp';
import HomePage from './home.js';
import AboutMe from './aboutMe';

function App() {
  const [darkMode, setDarkmode] = useState(false);

  const darkTheme = createMuiTheme ({
    palette : {
      type:"dark",
    }
  });

  const lightTheme = createMuiTheme ({});
  return (
    <Router history={history}>
      <div className="App">
      <Snackbar/>
      <ThemeProvider theme = {darkMode ? darkTheme : lightTheme}>  
      <Paper elevation = '0'>
        <Header/>
        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/signup" component={SignUp}/> 
          <PrivateRoute exact path="/aboutme" component={AboutMe}/>
         </Switch>
        <Footer/>
        <SW checked={darkMode} onChange={() => setDarkmode(!darkMode)}/> 

      </Paper>
      </ThemeProvider>  
      </div>
    </Router>
  );
}

export default App;
