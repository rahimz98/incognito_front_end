import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './login';
import SignUp from './signUp';
import Snackbar from './snackbar';
import {Paper, Switch as SW} from "@material-ui/core";
import {ThemeProvider , createMuiTheme} from "@material-ui/core/styles";
import Header from './header.js';
import Footer2 from './new_footer.js';
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
    <Router>
      <div className="App">
      <Snackbar/>
      <ThemeProvider theme = {darkMode ? darkTheme : lightTheme}>  
      <Paper elevation = '0'>
        <Header/>
        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route exact path="/aboutme" component={AboutMe}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/signup" component={SignUp}/> 
         </Switch>
        <Footer2/>
        <SW checked={darkMode} onChange={() => setDarkmode(!darkMode)}/> 

      </Paper>
      </ThemeProvider>  
      </div>
    </Router>
  );
}

export default App;
