import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { errorSnackbar } from '../../actions/snackbar';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const dispatch = useDispatch();
  const user = useSelector(store => store.user);

  // Display message if user is not authenticated
  useEffect(() => {
    if (!user.isAuth && !user.logoutSuccess) {
      dispatch(errorSnackbar("Login is required to access this page"));
    }
  }, [user, dispatch]);

  return (
    <Route {...rest} render={(props) => (
      user.isAuth 
        ? <Component {...props}/>
        : <Redirect to='/login'/>
    )}/>
  );
};

export default PrivateRoute;