import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { errorSnackbar } from './actions/snackbar';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const dispatch = useDispatch();
  const user = useSelector(store => store.user);

  // Check whether we were redirected and display message for user
  // Only do so when user is not authenticated
  useEffect(() => {
    if (!user.isAuthenticated && !user.logoutSuccess) {
      dispatch(errorSnackbar("Login is required to access this page"));
    }
  }, [user, dispatch]);

  return (
    <Route {...rest} render={(props) => (
      user.isAuthenticated 
        ? <Component {...props}/>
        : <Redirect to='/login'/>
    )}/>
  );
};

export default PrivateRoute;