import React from 'react';
import clsx from 'clsx';
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
  makeStyles
} from '@material-ui/core';
import useAuth from 'src/hooks/useAuth';
import useIsMountedRef from 'src/hooks/useIsMountedRef';

const useStyles = makeStyles(() => ({
  root: {}
}));

const JWTRegister = ({ className, ...rest }) => {
  const classes = useStyles();
  const { register, phone } = useAuth();
  const isMountedRef = useIsMountedRef();

  return (
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
        // email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
        // first_name: Yup.string().max(255).required('First name is required'),
        // last_name: Yup.string().max(255).required('Last name is required'),
        // policy: Yup.boolean().oneOf([true], 'This field must be checked')
      })}
      onSubmit={async (values, {
        setErrors,
        setStatus,
        setSubmitting
      }) => {
        try {
          let organizer_id =11
          await register(values.email, values.first_name, values.last_name, values.company, values.designation, phone, organizer_id);
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
          </form>
        )}
    </Formik>
  );
};

JWTRegister.propTypes = {
  className: PropTypes.string
};

export default JWTRegister;
