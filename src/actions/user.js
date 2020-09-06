import { SET_CURRENT_USER, SIGNUP_SUCCESS, LOGIN_SUCCESS, LOGOUT_SUCCESS } from '../types/user';
import { successSnackbar, errorSnackbar } from '../actions/snackbar';
import jwt from 'jsonwebtoken';

const BASE_URL = "http://localhost:5000/api/";

export const logout = () => {
  const token = localStorage.getItem("jwt");
  console.log("Token: " + token)
  const endpoint = BASE_URL + 'users/logOutUser';
  return dispatch => {
    
    
    fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => res.json()
    .then(data => {
      if (res.status === 200) {
        dispatch({ type: LOGOUT_SUCCESS });
        // Remove token from local storage
        localStorage.removeItem('jwt');
        console.log("Logged out!");
        // Redirect to log out page

      }
      else {
        dispatch(errorSnackbar(data.message));
      }
    }));
    
  }
}

export const createUser = (user) => {
  const { email, firstname, lastname, password } = user;
  const endpoint = BASE_URL + 'users/createUser';

  return dispatch => {
    fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email, 
        firstname, 
        lastname, 
        password
      })
    })
    .then(res => res.json()
    .then(data => {
      if (res.status === 200) {
        dispatch({ type: SIGNUP_SUCCESS });
        // Display success feedback to user
        dispatch(successSnackbar(data.message));
        // Redirect to login page

      }
      else {
        dispatch(errorSnackbar(data.message));
      }
    }));
  };
};

export const loginUser = (user) => {
  const { email, password } = user;
  const endpoint = BASE_URL + 'users/loginUser';

  return dispatch => {
    fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    })
    .then(res => res.json()
    .then(data => {
      if (data.login) {
        const token = data["auth-token"];
        dispatch({
          type: LOGIN_SUCCESS,
          token: token
        });
        // Save to local storage
        localStorage.setItem('jwt', token);
        // setAuthToken(token); //
        dispatch({
          type: SET_CURRENT_USER,
          user: jwt.decode(token)
        });
        // Redirect to About page
      }
      else {
        dispatch(errorSnackbar(data.message));
      }
    }));
  };
};
