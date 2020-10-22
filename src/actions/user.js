import {
  SET_AUTHENTICATED,
  SET_USER_ID,
  SET_USER,
  SET_USER_IMAGE,
  SET_USER_RESUME,
  LOGOUT_SUCCESS,
} from '../types';
import { successSnackbar, errorSnackbar } from '../actions/snackbar';
import history from '../history';
import axios from 'axios';

export const deleteResume = () => (dispatch) => {
  const token = localStorage.getItem('jwt');
  const body = {};
  axios
    .post('https://memento-backend.herokuapp.com/about/deleteResume', body, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      if (res.data.deleteResume) {
        dispatch(getResume());
        // dispatch(successSnackbar('Successfully removed resume/CV'));
      }
    })
    .catch((err) => {
      console.log(err.response);
    });
};

export const uploadResume = (fileData) => (dispatch) => {
  const token = localStorage.getItem('jwt');
  axios
    .post('https://memento-backend.herokuapp.com/about/uploadResume', fileData, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      const validFileType = res.data.fileType;
      if (!validFileType) {
        dispatch(
          errorSnackbar('This file type is not supported, PDF files only.')
        );
      }
      dispatch(getResume());
    })
    .catch((err) => {
      console.log(err.response);
    });
};

export const editProfile = (userData) => (dispatch) => {
  const token = localStorage.getItem('jwt');
  axios
    .post('https://memento-backend.herokuapp.com/about/updateContact', userData, {
      headers: {
        Authorization: token,
      },
    })
    .then(() => {
      dispatch(getUserProfile());
    })
    .catch((err) => {
      console.log(err.response);
    });
};

export const uploadImage = (imageData) => (dispatch) => {
  const token = localStorage.getItem('jwt');
  axios
    .post('https://memento-backend.herokuapp.com/about/uploadImage', imageData, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      const validFileType = res.data.fileType;
      if (!validFileType) {
        dispatch(
          errorSnackbar(
            'This file type is not supported, JPEG or PNG files only.'
          )
        );
      }
      dispatch(getProfilePic());
    })
    .catch((err) => {
      console.log(err.response);
    });
};

export const getResume = () => (dispatch) => {
  const token = localStorage.getItem('jwt');
  axios
    .get('https://memento-backend.herokuapp.com/about/getResume', {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      dispatch({
        type: SET_USER_RESUME,
        payload: res.data.url,
      });
    })
    .catch((err) => {
      console.log(err.response);
    });
};

export const getUserProfile = () => (dispatch) => {
  const token = localStorage.getItem('jwt');
  axios
    .get('https://memento-backend.herokuapp.com/about/getContact', {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      dispatch({
        type: SET_USER,
        payload: res.data,
      });
      dispatch(getProfilePic());
      dispatch(getResume());
    })
    .catch((err) => {
      console.log(err.response);
    });
};

export const getProfilePic = () => (dispatch) => {
  const token = localStorage.getItem('jwt');
  axios
    .get('https://memento-backend.herokuapp.com/about/getProfilePic', {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      dispatch({
        type: SET_USER_IMAGE,
        payload: res.data.url,
      });
    })
    .catch((err) => {
      console.log(err.response);
    });
};

export const logout = () => (dispatch) => {
  const token = localStorage.getItem('jwt');
  const body = {};
  axios
    .post('https://memento-backend.herokuapp.com/api/users/logOutUser', body, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      localStorage.removeItem('jwt');
      delete axios.defaults.headers.common['Authorization'];
      dispatch({ type: LOGOUT_SUCCESS });
      dispatch(successSnackbar(res.data.msg));
      history.push('/');
    })
    .catch((err) => {
      console.log(err.response);
      dispatch(errorSnackbar(err.response.data.msg));
    });
};

export const createUser = (user) => (dispatch) => {
  axios
    .post('https://memento-backend.herokuapp.com/api/users/createUser', user)
    .then((res) => {
      dispatch(successSnackbar(res.data.message));
      history.push('/login');
    })
    .catch((err) => {
      dispatch(errorSnackbar(err.response.data.message));
    });
};

export const loginUser = (user) => (dispatch) => {
  axios
    .post('https://memento-backend.herokuapp.com/api/users/loginUser', user)
    .then((res) => {
      if (res.data.login) {
        localStorage.setItem('jwt', res.data['auth-token']);
        dispatch({ type: SET_USER_ID, payload: res.data.id });
        dispatch({ type: SET_AUTHENTICATED });
        dispatch(getUserProfile());
        history.push(`/${res.data.id}`);
      } else {
        dispatch(errorSnackbar(res.data.message));
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
