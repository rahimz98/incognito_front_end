import { SET_AUTHENTICATED, SET_USER_ID, SET_USER, SET_USER_IMAGE, LOGOUT_SUCCESS } from '../types';
import { successSnackbar, errorSnackbar } from '../actions/snackbar';
import history from '../history';
import axios from 'axios';

const token = localStorage.getItem("jwt");

export const editProfile = (userData) => (dispatch) => {
  axios
    .post('http://localhost:5000/about/updateContact', userData, {
      headers: {
        'Authorization': token
      }
    })
    .then(() => {
      dispatch(getUserProfile());
    })
    .catch((err) => {
      console.log(err.response);
    });
}

export const uploadImage = (imageData) => (dispatch) => {
  axios
    .post('http://localhost:5000/about/uploadImage', imageData, {
      headers: {
        'Authorization': token
      }
    })
    .then(() => {
      dispatch(getProfilePic());
    })
    .catch((err) => {
      console.log(err.response);
    });
}

export const getUserProfile = () => (dispatch) => {
  axios
    .get('http://localhost:5000/about/getContact', {
      headers: {
        'Authorization': token
      }
    })
    .then(res => {
      dispatch({
        type: SET_USER,
        payload: res.data
      })
      // dispatch(getProfilePic());
    })
    .catch((err) => {
      console.log(err.response);
    });
}

export const getProfilePic = () => (dispatch) => {
  axios
    .get('http://localhost:5000/about/getProfilePic', {
      headers: {
        'Authorization': token
      }
    })
    .then(res => {
      console.log(res)
      dispatch({
        type: SET_USER_IMAGE,
        payload: res.data.url
      })
    })
    .catch((err) => {
      console.log(err.response);
    });
};

export const logout = () => (dispatch) => {
  // const token = localStorage.getItem("jwt");
  const body = {};
  axios
    .post('http://localhost:5000/api/users/logOutUser', body, {
      headers: {
        'Authorization': token
      }
    })
    .then((res) => {
      console.log(res);
      localStorage.removeItem('jwt');
      delete axios.defaults.headers.common['Authorization'];
      dispatch({ type: LOGOUT_SUCCESS });
      dispatch(successSnackbar(res.data.msg));
      history.push('/login');
    })
    .catch((err) => {
      // console.log(err.response)
      // dispatch(errorSnackbar(err.response.data.msg));
    });
};
/*
export const logout = () => {
  const token = localStorage.getItem("jwt");
  const endpoint = BASE_URL + 'users/logOutUser';
  return dispatch => {
    fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `${token}`
      }
    })
    .then(res => res.json()
    .then(data => {
      if (res.status === 200) {
        dispatch({ type: LOGOUT_SUCCESS });
        // Remove token from local storage
        localStorage.removeItem('jwt');
        // Redirect to log out page
        history.push('/login');
      }
      else {
        dispatch(errorSnackbar(data.msg));
      }
    }));
    
  }
}
*/
export const createUser = (user) => (dispatch) => {
  axios
    .post('http://localhost:5000/api/users/createUser', user)
    .then((res) => {
      dispatch(successSnackbar(res.data.message));
      history.push('/login');
    })
    .catch((err) => {
      dispatch(errorSnackbar(err.response.data.message));
    });
};
/*
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
        history.push('/login');
      }
      else {
        dispatch(errorSnackbar(data.message));
      }
    }));
  };
};
*/

export const loginUser = (user) => (dispatch) => {
  axios
    .post('http://localhost:5000/api/users/loginUser', user)
    .then((res) => {
      console.log(res);
      if (res.data.login) {
        const token = res.data['auth-token'];
        localStorage.setItem('jwt', token);
        dispatch({type: SET_AUTHENTICATED});
        dispatch({type: SET_USER_ID, payload: res.data.id});
        dispatch(getUserProfile());
        history.push(`/users/${res.data.id}`);
      }
      else {
        dispatch(errorSnackbar(res.data.message));
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
/*
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
        dispatch({
          type: SET_CURRENT_USER,
          user: jwt.decode(token)
        });
        // Redirect to About page
        history.push('/profile');
      }
      else {
        dispatch(errorSnackbar(data.message));
      }
    }));
  };
};
*/

