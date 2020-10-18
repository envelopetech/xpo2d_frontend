import React, { useEffect } from 'react';
import clsx from 'clsx';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
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
​
import { useMediaQuery } from 'react-responsive'
​
const useStyles = makeStyles(() => ({
  root: {}
}));
​
const JWTLogin = ({ className, ...rest }) => {
  const classes = useStyles();
  let { login } = useAuth();
  const isMountedRef = useIsMountedRef();
  //const { organizers } = useSelector((state) => state.organizer);
  let domain_name = window.location.hostname;
  const dispatch = useDispatch();
 
  const isTabletOrMobile = useMediaQuery({ query: '(max-width:768px)' })
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
​
​
  useEffect(() => {
    dispatch(getorganizer(domain_name));
  }, []);
​
  if(isTabletOrMobile && isPortrait){
    return <div>
      <h3>Your browser is too small!</h3><br></br>
      <p>For a better experience of the BSEI expo, kindly login from laptop or desktop.</p><br></br>
      <p>To still continue, please rotate your device to landscape mode.</p>
    </div>
  }
  return (
    
     
    <React.Fragment>
      
    
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
​
            setStatus({ success: true });
            setSubmitting(false);
​
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
            className={clsx(classes.root, className)}
            {...rest}
          >
            <TextField
              error={Boolean(touched.email && errors.email)}
              fullWidth
              autoFocus
              helperText={touched.email && errors.email}
              label="Email Address"
              margin="normal"
              name="email"
              onBlur={handleBlur}
              onChange={handleChange}
              type="email"
              value={values.email}
              variant="outlined"
            />
            <TextField
              error={Boolean(touched.password && errors.password)}
              fullWidth
              helperText={touched.password && errors.password}
              label="Password"
              margin="normal"
              name="password"
              onBlur={handleBlur}
              onChange={handleChange}
              type="password"
              value={values.password}
              variant="outlined"
            />
            {errors.submit && (
              <Box mt={3}>
                <FormHelperText error>
                  {errors.submit}
                </FormHelperText>
              </Box>
            )}
            <Box mt={2}>
              <Button
                color="secondary"
                disabled={isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Log In
            </Button>
              <Button
                color="#FFFFFF"
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                style={{ marginTop: '20px' }}
                href="https://bsei-xporium.herokuapp.com/"
                target="_blank"
              >
                Register for free
            </Button>
            </Box>
​
          </form>
        )}
    </Formik>
    </React.Fragment>
  );
};
​
JWTLogin.propTypes = {
  className: PropTypes.string,
};
​
​
export default JWTLogin;