import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import logoimg from '../assets/images/logo.png';

const useStyles = makeStyles((theme) => ({
 logo: {
  height: '60px',
},

}));

export default function Logo() {
  const classes = useStyles()
  let logo1 = localStorage.getItem("org_logo")

  return (
<img
      alt="Logo"
      src={logo1}
      className={classes.logo}
    />
  );
}