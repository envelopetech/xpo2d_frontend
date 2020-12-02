import React, {useEffect} from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useParams } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,  
  Container,  
  Typography,
  makeStyles,
  FormHelperText,
  Divider,
  Button,
  TextField,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { getorganizer } from 'src/slices/organizer';
import {getuser} from 'src/slices/generalsettings'
import useAuth from 'src/hooks/useAuth';
import { Formik } from 'formik';
import * as Yup from 'yup';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import Page from 'src/components/Page';
import Logo from 'src/components/Logo';
//import useAuth from 'src/hooks/useAuth';
import logoimg from 'src/assets/images/logo-lg.png';
import JWTLogin from './JWTLogin';
import { useDispatch } from 'src/store';
import { useMediaQuery } from 'react-responsive'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';


//import './App.css'

import Paper from '@material-ui/core/Paper';

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
  console.log(props)
    return (
        <Paper>
            <h2>{props.item.name}</h2>
            <img styles={{height:'100vh'}} src={props.item.src}></img>
 
            
        </Paper>
    )
}


const Forgot = () => {
  const classes = useStyles();
  //const { method } = useAuth();
  const {user_id}=useParams();
 
  let { forgotpassword } = useAuth();
  const isMountedRef = useIsMountedRef();
  //const { organizers } = useSelector((state) => state.organizer);
  let domain_name = window.location.hostname;
  const dispatch = useDispatch();

  const isTabletOrMobile = useMediaQuery({ query: '(max-width:768px)' })
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })

  useEffect(() => {
    dispatch(getuser(user_id));
  }, []);
  if(isTabletOrMobile && isPortrait){
    return <div>
      <h3>Your browser is too small!</h3><br></br>
      <p>For a better experience of the BSEI expo, kindly login from laptop or desktop.</p><br></br>
      <p>To still continue, please rotate your device to landscape mode.</p>
    </div>
  }


  return (
    <Grid container component="main" className={classes.root}>
      
      <Grid item xs={false} sm={4} md={8} ><Example/></Grid>
      <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          
          <Typography component="h1" variant="h4">
            Forgot Password
          </Typography>
          <Formik
      initialValues={{
        // email: 'test@test.com',
        // password: 'Test@@123',
        email: '',
        
        submit: null
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
       
      })}
      onSubmit={async (values, {
        setErrors,
        resetForm,
        setStatus,
        setSubmitting
      }) => {
        try {
          console.log('calling')
          await forgotpassword(values.email);
          alert('Mail has been send to your email id.')
          if (isMountedRef.current) {
            resetForm();
            setStatus({ success: true });
            setSubmitting(false);

          }
        } catch (err) {
          console.error(err);
          if (isMountedRef.current) {
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
          }
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values
      }) => (
          
          <form 
          noValidate
          onSubmit={handleSubmit}
         >
            <TextField
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              type="email"
              value={values.email}
              name="email"
              onBlur={handleBlur}
              onChange={handleChange}
              autoComplete="email"
              
            />
            
            
            {errors.submit && (
              <Box mt={3}>
                <FormHelperText error>
                  {errors.submit}
                </FormHelperText>
              </Box>
            )}
            <Button
              type="submit"
              fullWidth
              disabled={isSubmitting}
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Send Link
            </Button>
           
            
          </form>
        )}
    </Formik>
          
        </div>
      </Grid>
    </Grid>
  );
}
export default Forgot