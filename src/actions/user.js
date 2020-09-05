import { SIGNUP_SUCCESS, LOGIN_SUCCESS, SIGNUP_ERROR, LOGIN_ERROR } from '../types/user';
import { successSnackbar, errorSnackbar } from '../actions/snackbar';

const BASE_URL = "http://localhost:5000/api/";

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
        dispatch({ 
          type: SIGNUP_ERROR,
          payload: data.message
        });
        // Display success feedback to user
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
        dispatch({
          type: LOGIN_SUCCESS,
          token: data["auth-token"]
        });
        // Redirect to About page
      }
      else {
        dispatch({ 
          type: LOGIN_ERROR,
          payload: data.message
        });
        // Display error feedback to user
        dispatch(errorSnackbar(data.message));
      }
    }));
  };
};
