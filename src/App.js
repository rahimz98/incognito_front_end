import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import {Paper, Switch as SW} from "@material-ui/core";
import {ThemeProvider , createMuiTheme} from "@material-ui/core/styles";
import Login from './Login';
import SignUp from './SignUp';
import Header from './header.js';
import Footer2 from './new_footer.js';
import HomePage from './home.js';



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
      <ThemeProvider theme = {darkMode ? darkTheme : lightTheme}>  
      <Paper elevation = '0'>
        <Header/>
        <Switch>
          <Route path="/login">
            <Login/>
          </Route>
          <Route path="/signup">
            <SignUp/>
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
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
