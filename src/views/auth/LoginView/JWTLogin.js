import React, { useEffect, useState, useCallback } from 'react';

import PropTypes from 'prop-types';
import Logo from 'src/components/Logo'
import {
  Box,
  Button,
  Card,
  CardContent,
  FormHelperText,
  TextField,
  makeStyles,
  Checkbox,
  Typography,
  Link,
  Container,
  IconButton,
  SvgIcon
} from '@material-ui/core';
import useAuth from 'src/hooks/useAuth';
import wait from 'src/utils/wait';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'src/store';
import Dialog from '@material-ui/core/Dialog';
import { Formik } from 'formik';
import * as Yup from 'yup';
import clsx from 'clsx';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import {
  XCircle as CloseIcon,
} from 'react-feather';
import { getorganizer } from 'src/slices/organizer';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  logo: {
    height: '72px',
  },

  formSection: {
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 8px 0 rgba(0,0,0,.08), 0 6px 20px 0 rgba(0,0,0,.06)',
    flexDirection: 'column',
    marginTop: '100px',
  },
}));

const JWTLogin = ({ className, ...rest }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isMountedRef = useIsMountedRef();
  let domain_name = window.location.hostname;

  const [phone, setphone] = useState("+91");
  const { login, newuser, register, client } = useAuth();
  const [open, setOpen] = React.useState(false);
  const { organizers } = useSelector((state) => state.organizer);

  console.log(newuser)
  useEffect(() => {
    if (newuser) {
      setOpen(true);
    }
    dispatch(getorganizer(domain_name));
  }, [newuser]);  
  

  const handleClose = () => {
    setOpen(false);
  };

  // const handleonchange = (e) => {
  //   setphone(e.targe.value);
  // };


  const handleonchange = (event) => {
    event.persist();
    setphone(event.target.value);
  };

  return (
    <React.Fragment>
      <Dialog
        maxWidth="lg"
        disableBackdropClick
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box
          height="100%"
          display="flex"
          flexDirection="column"
        >
          <Container
            className={classes.cardContainer}
            maxWidth="sm"
          >
            <Card>
              <CardContent className={classes.cardContent}>
                <Box
                  alignItems="center"
                  display="flex"
                  justifyContent="space-between"
                  mb={3}
                >
                  <div>
                    <Typography
                      color="textPrimary"
                      gutterBottom
                      variant="h2"
                    >
                      Register
                </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                    >
                      You can set up your details below.
                </Typography>
                  </div>
                </Box>
                <Box
                  flexGrow={1}
                  mt={3}
                >
                  <Formik
                    initialValues={{
                      email: '',
                      first_name: '',
                      last_name: '',
                      company: '',
                      designation: '',
                      policy: false,
                      submit: null
                    }}
                    validationSchema={Yup.object().shape({
                      email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                      first_name: Yup.string().max(255).required('First name is required'),
                      last_name: Yup.string().max(255).required('Last name is required'),
                      policy: Yup.boolean().oneOf([true], 'This field must be checked')
                    })}
                    onSubmit={async (values, {
                      setErrors,
                      setStatus,
                      setSubmitting
                    }) => {
                      try {

                        let organizer_id = organizers[0].id
                        await register(values.email, values.first_name, values.last_name, values.company, values.designation, phone, organizer_id);
                        if (isMountedRef.current) {
                          setOpen(false)
                          setStatus({ success: true });
                          setSubmitting(false);
                        }
                      } catch (err) {
                        console.error(err);
                        //setOpen(false)
                        setStatus({ success: false });
                        setErrors({ submit: err.message });
                        setSubmitting(false);
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
                          className={clsx(classes.root, className)}
                          onSubmit={handleSubmit}
                          {...rest}
                        >
                          <Card>
                            <CardContent className={classes.cardContent}>
                              <TextField
                                error={Boolean(touched.first_name && errors.first_name)}
                                fullWidth
                                helperText={touched.first_name && errors.first_name}
                                label="First Name"
                                margin="normal"
                                name="first_name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.first_name}
                                variant="outlined"
                              />
                              <TextField
                                error={Boolean(touched.last_name && errors.last_name)}
                                fullWidth
                                helperText={touched.last_name && errors.last_name}
                                label="Last Name"
                                margin="normal"
                                name="last_name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.last_name}
                                variant="outlined"
                              />
                              <TextField
                                error={Boolean(touched.email && errors.email)}
                                fullWidth
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
                                error={Boolean(touched.company && errors.company)}
                                fullWidth
                                helperText={touched.company && errors.company}
                                label="Company"
                                margin="normal"
                                name="company"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.company}
                                variant="outlined"
                              />
                              <TextField
                                error={Boolean(touched.designation && errors.designation)}
                                fullWidth
                                helperText={touched.designation && errors.designation}
                                label="Designation"
                                margin="normal"
                                name="designation"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.designation}
                                variant="outlined"
                              />
                              <Box
                                alignItems="center"
                                display="flex"
                                mt={2}
                                ml={-1}
                              >
                                <Checkbox
                                  checked={values.policy}
                                  name="policy"
                                  onChange={handleChange}
                                />
                                <Typography
                                  variant="body2"
                                  color="textSecondary"
                                >
                                  I have read the
                                  {' '}
                                  <Link
                                    component="a"
                                    href="#"
                                    color="secondary"
                                  >
                                    Terms and Conditions
                                  </Link>
                                </Typography>
                              </Box>
                              {Boolean(touched.policy && errors.policy) && (
                                <FormHelperText error>
                                  {errors.policy}
                                </FormHelperText>
                              )}
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
                                  Register
                                </Button>
                              </Box>
                            </CardContent>
                          </Card>
                        </form>
                      )}
                  </Formik>
                </Box>
              </CardContent>
            </Card>
          </Container>
        </Box>
      </Dialog>

      <Formik
        initialValues={{
          phone_number: '+91',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          phone_number: Yup.string().required('Phone is required'),
        })}
        onSubmit={async (values, {
          setErrors,
          setStatus,
          setSubmitting
        }) => {
          try {

            await login(phone)
            if (isMountedRef.current) {
              setStatus({ success: true });
              setSubmitting(false);
            }
          } catch (err) {
            console.error(err);
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
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
              className={clsx(classes.root, className)}
              onSubmit={handleSubmit}
              {...rest}
            >
              <TextField
                error={Boolean(touched.phone_number && errors.phone_number)}
                fullWidth
                helperText={touched.phone_number && errors.phone_number}
                label="Phone Number"
                margin="normal"
                name="phone_number"
                onBlur={handleBlur}
                onChange={handleonchange}
                value={phone}
                variant="outlined"
              />
              <Typography
                color="textPrimary"
                gutterBottom
                variant="h5"
              >
                Please enter your Registered Mobile Number prefixed with +Country Code

              </Typography>
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
                  Login
          </Button>
              </Box>
            </form>
          )}
      </Formik>
    </React.Fragment>
  );
};
JWTLogin.propTypes = {
  className: PropTypes.string,
};
export default JWTLogin;

