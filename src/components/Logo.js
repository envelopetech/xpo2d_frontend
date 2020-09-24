import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import logoimg from '../assets/images/logo-lg.png';

const useStyles = makeStyles((theme) => ({
  logo: {
    height: '220px',
  },

}));

export default function Logo(page) {
  const classes = useStyles()

  // let logo1 = localStorage.getItem("org_logo")

  // if(page === "inner")
  // {
  //   logo1 = localStorage.getItem("org_other_logo")
  // }

  return (
    <img
      alt="Logo"
      src={logoimg}
      className={classes.logo}
    />
  );
}