import React, { useEffect } from 'react';
import clsx from 'clsx';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { Formik } from 'formik';
import {
  Box,
  Button,
  FormHelperText,
  TextField,
  makeStyles
} from '@material-ui/core';
import useAuth from 'src/hooks/useAuth';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import { getorganizer } from 'src/slices/organizer';
import { useDispatch } from 'src/store';
import { useMediaQuery } from 'react-responsive'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';

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


const JWTLogin = ({ className, ...rest }) => {
  const classes = useStyles();
  let { login } = useAuth();
  const isMountedRef = useIsMountedRef();
  //const { organizers } = useSelector((state) => state.organizer);
  let domain_name = window.location.hostname;
  const dispatch = useDispatch();

  const isTabletOrMobile = useMediaQuery({ query: '(max-width:768px)' })
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })


  useEffect(() => {
    dispatch(getorganizer(domain_name));
  }, []);


  if(isTabletOrMobile && isPortrait){
    return <div>
      <h3>Your browser is too small!</h3><br></br>
      <p>For a better experience of the BSEI expo, kindly login from laptop or desktop.</p><br></br>
      <p>To still continue, please rotate your device to landscape mode.</p>
    </div>
  }
  

  return (
    <Formik
      initialValues={{
        // email: 'test@test.com',
        // password: 'Test@@123',
        email: '',
        password: '',
        submit: null
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
        password: Yup.string().max(255).required('Password is required')
      })}
      onSubmit={async (values, {
        setErrors,
        setStatus,
        setSubmitting
      }) => {
        try {
          await login(values.email, values.password);
          if (isMountedRef.current) {

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
          // <form
          //   noValidate
          //   onSubmit={handleSubmit}
          //   className={clsx(classes.root, className)}
          //   {...rest}
          // >
          //   <TextField
          //     error={Boolean(touched.email && errors.email)}
          //     fullWidth
          //     autoFocus
          //     helperText={touched.email && errors.email}
          //     label="Email Address"
          //     margin="normal"
          //     name="email"
          //     onBlur={handleBlur}
          //     onChange={handleChange}
          //     type="email"
          //     value={values.email}
          //     variant="outlined"
          //   />
          //   <TextField
          //     error={Boolean(touched.password && errors.password)}
          //     fullWidth
          //     helperText={touched.password && errors.password}
          //     label="Password"
          //     margin="normal"
          //     name="password"
          //     onBlur={handleBlur}
          //     onChange={handleChange}
          //     type="password"
          //     value={values.password}
          //     variant="outlined"
          //   />
          //   {errors.submit && (
          //     <Box mt={3}>
          //       <FormHelperText error>
          //         {errors.submit}
          //       </FormHelperText>
          //     </Box>
          //   )}
          //   <Box mt={2}>
          //     <Button
          //       color="secondary"
          //       disabled={isSubmitting}
          //       fullWidth
          //       size="large"
          //       type="submit"
          //       variant="contained"
          //     >
          //       Log In
          //   </Button>
          //     <Button
          //       color="#FFFFFF"
          //       fullWidth
          //       size="large"
          //       type="submit"
          //       variant="contained"
          //       style={{ marginTop: '20px' }}
          //       href="https://bsei-xporium.herokuapp.com/"
          //       target="_blank"
          //     >
          //       Register for free
          //   </Button>
          //   </Box>

          // </form>
          <form 
          noValidate
          onSubmit={handleSubmit}
          className={clsx(classes.form, className)}
          {...rest}>
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
            <TextField
              error={Boolean(touched.password && errors.password)}
              fullWidth
              helperText={touched.password && errors.password}
              variant="outlined"
              margin="normal"
              required
              onBlur={handleBlur}
              onChange={handleChange}
              type="password"
              value={values.password}
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
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
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <RouterLink to="/register">
                  <Link variant="body2">Don't have an account? Sign Up</Link>
                </RouterLink>
              </Grid>
            </Grid>
            
          </form>
        )}
    </Formik>
  );
};

JWTLogin.propTypes = {
  className: PropTypes.string,
};

export default JWTLogin;
