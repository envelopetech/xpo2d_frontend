import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    FormHelperText,
    Grid,
    TextField,
    makeStyles
} from '@material-ui/core';
import {
    updateUser,
} from 'src/slices/generalsettings';
import { useDispatch } from 'src/store';
//import GoogleMaps from 'src/components/GoogleMaps'



const useStyles = makeStyles(() => ({
    root: {}
}));

const GeneralSettings = ({ className, user, ...rest }) => {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();


    return (
        <Formik
            enableReinitialize
            initialValues={{
                first_name: user.first_name || '',
                last_name: user.last_name || '',
                email: user.email || '',
                phone: user.phone_number || '',
                //location: user.location,
                designation: user.designation || '',
                company: user.company || '',
                submit: null
            }}
            validationSchema={Yup.object().shape({
                email: Yup.string().max(255).required('Email is required').email('Must be a valid email'),
                phone: Yup.string().max(25).required('Phone is required'),
                first_name: Yup.string().max(255).required("First name required"),
                last_name: Yup.string().max(255).required("Last name required"),
            })}
            onSubmit={async (values, {
                resetForm,
                setErrors,
                setStatus,
                setSubmitting
            }) => {
                try {

                    //alert(document.querySelector('#general-setting-google-map').value)
                    const data = {
                        first_name: values.first_name,
                        last_name: values.last_name,
                        phone_number: values.phone,
                        address: values.address,
                        name: values.name,
                        //location: document.querySelector('#general-setting-google-map').value
                        designation: values.designation,
                        company: values.company
                    };

                    await dispatch(updateUser(data));
                    //await wait(200);
                    resetForm();
                    setStatus({ success: true });
                    setSubmitting(false);
                    enqueueSnackbar('Profile updated', {
                        variant: 'success'
                    });
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
                setFieldValue,
                touched,
                values
            }) => (
                    <form onSubmit={handleSubmit}>
                        <Card
                            className={clsx(classes.root, className)}
                            {...rest}
                        >
                            <CardHeader title="Profile" />
                            <Divider />
                            <CardContent>
                                <Grid
                                    container
                                    spacing={4}
                                >
                                    <Grid
                                        item
                                        md={6}
                                        xs={12}
                                    >
                                        <TextField
                                            error={Boolean(touched.first_name && errors.first_name)}
                                            fullWidth
                                            helperText={touched.first_name && errors.first_name}
                                            label="First Name"
                                            name="first_name"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.first_name}
                                            variant="outlined"
                                            required
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        md={6}
                                        xs={12}
                                    >
                                        <TextField
                                            error={Boolean(touched.last_name && errors.last_name)}
                                            fullWidth
                                            helperText={touched.last_name && errors.last_name}
                                            label="Last Name"
                                            name="last_name"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.last_name}
                                            variant="outlined"
                                            required
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        md={6}
                                        xs={12}
                                    >
                                        <TextField
                                            error={Boolean(touched.email && errors.email)}
                                            fullWidth
                                            helperText={touched.email && errors.email}
                                            label="Email"
                                            name="email"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.email}
                                            variant="outlined"
                                            required
                                            disabled={true}
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        md={6}
                                        xs={12}
                                    >
                                        <TextField
                                            error={Boolean(touched.phone && errors.phone)}
                                            fullWidth
                                            label="Phone"
                                            name="phone"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            required
                                            value={values.phone}
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        md={6}
                                        xs={12}
                                    >
                                        <TextField
                                            error={Boolean(touched.company && errors.company)}
                                            fullWidth
                                            label="Company"
                                            name="company"
                                            onBlur={handleBlur}
                                            onChange={handleChange}                                            
                                            value={values.company}
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        md={6}
                                        xs={12}
                                    >
                                        <TextField
                                            error={Boolean(touched.designation && errors.designation)}
                                            fullWidth
                                            label="Designation"
                                            name="designation"
                                            onBlur={handleBlur}
                                            onChange={handleChange}                                            
                                            value={values.designation}
                                            variant="outlined"
                                        />
                                    </Grid>
                                    {/* <Grid
                                        item
                                        md={6}
                                        xs={12}
                                    >
                                        <GoogleMaps editvalue={values.location} id="general-setting-google-map"
                                        />
                                    </Grid> */}
                                </Grid>
                                {errors.submit && (
                                    <Box mt={3}>
                                        <FormHelperText error>
                                            {errors.submit}
                                        </FormHelperText>
                                    </Box>
                                )}
                            </CardContent>
                            <Divider />
                            <Box
                                p={2}
                                display="flex"
                                justifyContent="flex-end"
                            >
                                <Button
                                    color="secondary"
                                    disabled={isSubmitting}
                                    type="submit"
                                    variant="contained"
                                >
                                    Save Changes
              </Button>
                            </Box>
                        </Card>
                    </form>
                )}
        </Formik>
    );
};

GeneralSettings.propTypes = {
    className: PropTypes.string,
    user: PropTypes.object.isRequired
};

export default GeneralSettings;
