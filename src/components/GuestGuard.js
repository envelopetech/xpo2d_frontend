import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import useAuth from '../hooks/useAuth';

const GuestGuard = ({ children }) => {    
  const { isAuthenticated} = useAuth();  
  debugger;
  
  if (isAuthenticated) {
    debugger;
    return <Redirect to="/app/lobby" />;
  }
  return (
    <>
      {children}
    </>
  );
};

GuestGuard.propTypes = {
  children: PropTypes.node
};
export default GuestGuard;
