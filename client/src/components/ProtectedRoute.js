import React, {useEffect} from 'react';
import {Route} from 'react-router-dom';
import SignIn from './forms/SignIn';
import {useSelector, useDispatch} from 'react-redux';
import {verifyToken} from '../actions/userActions.js'

export const PrivateRoute = ({component: Component, ...rest}) => { 
  const dispatch = useDispatch();
  const isLogged = useSelector(state => state.userReducer.isLogged);


  useEffect(() => {
    dispatch(verifyToken());
  }, [dispatch]);

  return(
    <Route {...rest} render={
      (props) => (isLogged) ? <Component {...props} /> : <SignIn {...props} />
    } />
  );
};
