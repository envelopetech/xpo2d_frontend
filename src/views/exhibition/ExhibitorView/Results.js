import React, { useEffect } from 'react';
import {
    Dialog, Grid,
    AppBar, Toolbar, IconButton, makeStyles, Typography, Slide, Button, Tabs, Tab
    , Box, TextField
} from '@material-ui/core';
import PropTypes from 'prop-types';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import CloseIcon from '@material-ui/icons/Close';
import ReactHtmlParser from 'react-html-parser';
import Product from './Product'
import Team from './Team'
import Video from './Video'
import Assets from './Assets'
import CallIcon from '@material-ui/icons/Call';
import MailIcon from '@material-ui/icons/Mail';
import clsx from 'clsx';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'src/store';
import { createEnquiry } from 'src/slices/enquiry'
import useAuth from 'src/hooks/useAuth';
import Photo from './Photo'
import { customlog_save } from 'src/slices/visitor'
import backgroundimage from '../../../assets/images/solar-panel.jpg';

import background1 from '../../../assets/images/exhibitor-bg.jpg';
import background2 from '../../../assets/images/exhibitor-bg2.jpg';
import background3 from '../../../assets/images/exhibitor-bg3.jpg';
import background4 from '../../../assets/images/exhibitor-bg4.jpg';
import background5 from '../../../assets/images/exhibitor-bg5.jpg';
import background6 from '../../../assets/images/exhibitor-bg6.jpg';
import background7 from '../../../assets/images/exhibitor-bg7.jpg';


import {
    openModal,
    closeModal
} from 'src/slices/exhibitor';
function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


const useStyles = makeStyles(theme => ({
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
        maxWidth: 345,
    },
    table: {
        minWidth: 650,
    },
    link: {
        color: '#304ffe',
    },
    large: {
        width: theme.spacing(9),
        height: theme.spacing(9),
    },
    button: {
        marginRight: theme.spacing(2),
    },
    anchorStall1: {
        position: 'absolute',
        left: '14.88%',
        top: '16.67%',
        width: '75%',
        height: '75%',
        zIndex: 2
    },

}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const Results = ({
    className,
    exhibitor,
    ...rest
}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();    
    const [value, setValue] = React.useState(0);
    const { isModalOpen } = useSelector((state) => state.exhibitor);   
    const { user } = useAuth();
    const orgid = localStorage.getItem('org_id')
    // useEffect(() => {
    //     if (value == 0) {
    //         const dataleaderboard = {
    //             log_type: "stall_tabs",
    //             tab_type: 'about',
    //             organizer_id: orgid,
    //             exhibitor_id: exhibitor.id
    //         };
    //         dispatch(customlog_save(dataleaderboard));
    //     }
    // }, []);
    const handleChange1 = (event, newValue) => {
        setValue(newValue);
        if (newValue === 0) {
            const dataleaderboard = {
                log_type: "stall_tabs",
                tab_type: 'about',
                organizer_id: orgid,
                exhibitor_id: exhibitor.id
            };
            dispatch(customlog_save(dataleaderboard));
        }
        else if (newValue === 6) {
            const dataleaderboard = {
                log_type: "stall_tabs",
                tab_type: 'contact',
                organizer_id: orgid,
                exhibitor_id: exhibitor.id
            };
            dispatch(customlog_save(dataleaderboard));
        }
    };

    const handleClickOpen = () => {
        dispatch(openModal());
    };

    const handleClose = () => {
        dispatch(closeModal());
    };



    // let backgroundimage = null
    // if (exhibitor.id == 17) {
    //     backgroundimage = background1
    // }
    // else if (exhibitor.id == 18) {
    //     backgroundimage = background5
    // }
    // else if (exhibitor.id == 19) {
    //     backgroundimage = background6
    // }
    // else if (exhibitor.id == 20) {
    //     backgroundimage = background3
    // }
    // else if (exhibitor.id == 21) {
    //     backgroundimage = background2
    // }
    // else if (exhibitor.id == 22) {
    //     backgroundimage = background7
    // }

    // else if (exhibitor.id == 35) {
    //     backgroundimage = background4
    // }

    return (
        <React.Fragment>


            <Grid item container style={{
                backgroundImage: `url(${exhibitor.stall_image})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                height: "calc(100vh - 64px)"
            }}>
                <div className="users">
                    <div className={classes.anchorStall1} onClick={handleClickOpen} style={{ cursor: 'pointer' }}></div>
                </div>
            </Grid>
            <Dialog fullWidth={true}
                maxWidth="lg" open={isModalOpen} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            {exhibitor.name}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Tabs value={value} onChange={handleChange1} aria-label="simple tabs example">
                    <Tab label="About" {...a11yProps(0)} />
                    <Tab label="Products" {...a11yProps(1)} />
                    <Tab label="Team" {...a11yProps(2)} />
                    <Tab label="Photo" {...a11yProps(3)} />
                    <Tab label="Video" {...a11yProps(4)} />
                    <Tab label="Assets" {...a11yProps(5)} />
                    <Tab label="Contact Us" {...a11yProps(6)} />
                </Tabs>
                <TabPanel value={value} index={0}>
                    <Typography>{ReactHtmlParser(exhibitor.about_me)}</Typography>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Grid container xs={12} sm spacing={2}>
                        <Product exhibitorid={exhibitor.id} product={exhibitor.product_data}></Product>
                    </Grid>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <Grid container xs={12} sm spacing={2}>
                        <Team team={exhibitor.staff_data} exhibitorid={exhibitor.id}></Team>
                    </Grid>
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <Grid container xs={12} sm spacing={2}>
                        <Photo photo={exhibitor.photo_data} exhibitorid={exhibitor.id}></Photo>
                    </Grid>
                </TabPanel>
                <TabPanel value={value} index={4}>
                    <Grid container xs={12} sm spacing={2}>
                        <Video video={exhibitor.video_data} exhibitorid={exhibitor.id}></Video>
                    </Grid>
                </TabPanel>
                <TabPanel value={value} index={5}>
                    <Assets assets={exhibitor.assets_data} exhibitorid={exhibitor.id}></Assets>
                </TabPanel>
                <TabPanel value={value} index={6}>
                    <Formik
                        initialValues={{
                            message: '',
                            submit: null
                        }}
                        validationSchema={Yup.object().shape({
                            message: Yup.string().max(1000).required("Message is required"),
                        })}
                        onSubmit={async (values, {
                            resetForm,
                            setErrors,
                            setStatus,
                            setSubmitting
                        }) => {
                            try {
                                const data = {
                                    message: values.message,
                                    exhibitor_id: exhibitor.id,
                                    visitor_id: user.id,
                                    leader_type: "enquiry",
                                };
                                await dispatch(createEnquiry(data));
                                dispatch(closeModal());
                                resetForm();
                                setStatus({ success: true });
                                setSubmitting(false);
                                enqueueSnackbar('Enquiry send', {
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
                                <form
                                    onSubmit={handleSubmit}
                                    className={clsx(classes.root, className)}
                                    {...rest}
                                >
                                    <Grid item container direction="column">
                                        <Grid item>
                                            <Grid item container spacing={2}>
                                                <Grid item>
                                                    <CallIcon />
                                                </Grid>
                                                <Grid item>
                                                    <Typography variant="body1">{exhibitor.phone_number}</Typography>
                                                </Grid>
                                            </Grid>
                                            <Grid item container spacing={2}>
                                                <Grid item>
                                                    <MailIcon />
                                                </Grid>
                                                <Grid item>
                                                    <Typography variant="body1">{exhibitor.email}</Typography>
                                                </Grid>

                                            </Grid>
                                            <Grid item style={{ marginTop: "1em", marginBottom: "1em" }}>
                                                <TextField style={{ width: "100%" }}
                                                    error={Boolean(touched.message && errors.message)}
                                                    fullWidth
                                                    helperText={touched.message && errors.message}
                                                    id="outlined-multiline-static"
                                                    name="message"
                                                    label="Send Enquiry"
                                                    multiline
                                                    rows={4}
                                                    defaultValue="Write your message here..."
                                                    variant="outlined"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </Grid>
                                            <Grid item>
                                                <Button variant="contained" type="submit">Send Enquiry</Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </form>
                            )}
                    </Formik>
                </TabPanel>
            </Dialog>

        </React.Fragment>
    )
}
Results.propTypes = {
    className: PropTypes.string,
    exhibitor: PropTypes.array.isRequired
};

Results.defaultProps = {
    exhibitor: []
};
export default Results;