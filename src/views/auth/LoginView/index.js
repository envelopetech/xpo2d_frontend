import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,  
  Container,  
  Typography,
  makeStyles,
  Divider,
  
} from '@material-ui/core';
import Page from 'src/components/Page';
import Logo from 'src/components/Logo';
//import useAuth from 'src/hooks/useAuth';
import logoimg from 'src/assets/images/logo-lg.png';
import JWTLogin from './JWTLogin';



//import './App.css'
import Button from '@material-ui/core/Button';

import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { SocialIcon } from 'react-social-icons';
import Carousel from 'react-material-ui-carousel'

// const methodIcons = {
//   'Auth0': '/static/images/auth0.svg',
//   'FirebaseAuth': '/static/images/firebase.svg',
//   'JWT': '/static/images/jwt.svg'
// };

function Example(props)
{
    var items = [
        {
            name: "Random Name #1",
            src:'https://cdn.logo.com/hotlink-ok/logo-social.png'
        },
        {
            name: "Random Name #2",
            src:'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/minimal-watercolor-youtube-channel-art-banner-design-template-6b4603eb075eea7e65af2ee226d3d317_screen.jpg?ts=1561444958'
        }
    ]
 
    return (
        <Carousel>
            {
                items.map( (item, i) => <Item key={i} item={item} /> )
            }
        </Carousel>
    )
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
   
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  btns: {
    marginLeft:'20px'
  },
  h4: {
 
    width: '100%', 
    textAlign: 'center', 
    borderBottom: '1px solid #000', 
    lineHeight: '0.1em',
    margin: '40px 0px 0px 0px' , 
  },
  
  span: { 
     
     background:'#fff', 
     padding:'0 10px', 
  }
 
 
}));

function Item(props)
{
    return (
        <Paper>
            <h2>{props.item.name}</h2>
            <img styles={{height:'100vh'}} src={props.item.src}></img>
 
            
        </Paper>
    )
}


const LoginView = () => {
  const classes = useStyles();
  //const { method } = useAuth();

  return (
    <Grid container component="main" className={classes.root}>
      
      <Grid item xs={false} sm={4} md={8} ><Example/></Grid>
      <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          
          <Typography component="h1" variant="h4">
            Login
          </Typography>
          <JWTLogin/>
          <Grid container>
            <Grid item xs>
            
            <div >
            <p className={classes.h4}><span className={classes.span}>OR</span></p>
            <SocialIcon style={{marginLeft:'90px'}} className={classes.paper} url="http://facebook.com/jaketrent" />
            <SocialIcon className={classes.paper} url="http://twitter.com/jaketrent" />
            <SocialIcon className={classes.paper} url="http://google.com/jaketrent" />
            </div>
            </Grid>
          </Grid>
        </div>
      </Grid>
    </Grid>
  );
}
export default LoginView