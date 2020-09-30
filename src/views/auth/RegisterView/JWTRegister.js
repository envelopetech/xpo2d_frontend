import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Checkbox,
  FormHelperText,
  TextField,
  Typography,
  Link,
  makeStyles,
  AppBar,
  Toolbar, IconButton
} from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import useAuth from 'src/hooks/useAuth';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import GoogleMaps from 'src/components/GoogleMaps'
import Autocomplete from '@material-ui/lab/Autocomplete';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input'
import CustomPhoneNumber from 'src/components/Phonenumber'
import track from 'src/utils/analytics';


const useStyles = makeStyles((theme) => ({
  imgContainer: {
    margin: 'auto',
  },
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  root: {
  },
}));

const yourrole = [
  { title: 'Parent', value: "parent" },
  { title: 'Educator', value: "educator" },
  { title: 'Both', value: "both" },
  { title: 'None of the Above', value: "none" },
]

const JWTRegister = ({ className, ...rest }) => {
  const classes = useStyles();
  const { register, phone } = useAuth();
  const isMountedRef = useIsMountedRef();
  const [open, setOpen] = useState(false);
  const [phone1, setPhone1] = useState('')
  const [value, setValue] = React.useState(yourrole);
  const orgid = localStorage.getItem('org_id')  
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Dialog fullWidth={true}
        maxWidth="lg" open={open} onClose={handleClose}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
            </Typography>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Thank You for your registration.
          </DialogContentText>
        </DialogContent>
      </Dialog>
      <Formik
        initialValues={{
          email: '',
          first_name: '',
          last_name: '',
          occupation: '',
          childage: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          // email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          // first_name: Yup.string().max(255).required('First name is required'),
          // last_name: Yup.string().max(255).required('Last name is required'),
        })}
        onSubmit={async (values, {
          setErrors,
          resetForm,
          setStatus,
          setSubmitting
        }) => {
          try {
            await register(values.email
              , values.first_name
              , values.last_name
              , phone1
              , values.occupation
              , document.querySelector('#general-setting-google-map').value
              , value.value
              , values.childage,
              orgid);
            if (isMountedRef.current) {
              resetForm();
              setStatus({ success: true });
              setSubmitting(false);

              track.event("User Registration", {
                "event_category": "Registration",
                "event_label": values.email
              });
            }

          } catch (err) {
            console.error(err);
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
            // resetForm();
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
                required
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
                required
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
                required
              />
              <Box mt={2}>
                <PhoneInput
                  error={Boolean(touched.phone && errors.phone)}
                  fullWidth
                  defaultCountry="IN"
                  country="IN"
                  placeholder='Enter phone number'
                  value={phone}
                  onChange={setPhone1}
                  required={true}
                  inputComponent={CustomPhoneNumber}
                />
              </Box>
              <TextField
                error={Boolean(touched.occupation && errors.occupation)}
                fullWidth
                helperText={touched.occupation && errors.occupation}
                label="Occupation"
                margin="normal"
                name="occupation"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.occupation}
                variant="outlined"
              />
              <GoogleMaps id="general-setting-google-map" editvalue={values.location}
              />
              <Box mt={2}>
                <Autocomplete
                  id="combo-box-demo"
                  options={yourrole}
                  getOptionLabel={(option) => option.title}
                  style={{ width: 300 }}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} label="You are a" variant="outlined" required />}
                />
              </Box>
              <TextField
                error={Boolean(touched.childage && errors.childage)}
                fullWidth
                helperText={touched.childage && errors.childage}
                label="Age(s) of your child"
                margin="normal"
                name="childage"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.childage}
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
                  Register
            </Button>
              </Box>
            </form>
          )}
      </Formik>
    </>
  );
};

JWTRegister.propTypes = {
  className: PropTypes.string
};

export default JWTRegister;
