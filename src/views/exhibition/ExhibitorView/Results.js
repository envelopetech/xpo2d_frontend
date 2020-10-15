import React, { useEffect } from 'react';
import {
    Dialog, Grid,
    AppBar, Toolbar, IconButton, makeStyles, Typography, Slide, Button, Tabs, Tab
    , Box, TextField, Tooltip, SvgIcon
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
import Iframe from 'react-iframe';
import LaunchIcon from '@material-ui/icons/Launch';
import Banner from './Banner';

import xpoimage from 'src/assets/images/stall1.png'
import exhibitorbg from 'src/assets/images/exhibitor-bg.jpg'
import exhibitorbg2 from 'src/assets/images/exhibitor-bg2.jpg'
import exhibitorbg3 from 'src/assets/images/exhibitor-bg3.jpg'

import exhibitorbg4 from 'src/assets/images/exhibitor-bg4.jpg'
import exhibitorbg5 from 'src/assets/images/exhibitor-bg5.jpg'
import exhibitorbg6 from 'src/assets/images/exhibitor-bg6.jpg'
import exhibitorbg7 from 'src/assets/images/exhibitor-bg7.jpg'
import exhibitorbg8 from 'src/assets/images/exhibitor-bg8.jpg'
import exhibitorbg9 from 'src/assets/images/exhibitor-bg9.jpg'
import exhibitorbg10 from 'src/assets/images/exhibitor-bg10.jpg'
import exhibitorbg11 from 'src/assets/images/exhibitor-bg11.jpg'
import exhibitorbg12 from 'src/assets/images/exhibitor-bg12.jpg'
import exhibitorbg13 from 'src/assets/images/exhibitor-bg13.jpg'
import exhibitorbg14 from 'src/assets/images/exhibitor-bg14.jpg'
import exhibitorbg15 from 'src/assets/images/exhibitor-bg15.jpg'
import exhibitorbg16 from 'src/assets/images/exhibitor-bg16.jpg'
import exhibitorbg17 from 'src/assets/images/exhibitor-bg17.jpg'
import exhibitorbg18 from 'src/assets/images/exhibitor-bg18.jpg'
import exhibitorbg19 from 'src/assets/images/exhibitor-bg19.jpg'
import exhibitorbg20 from 'src/assets/images/exhibitor-bg20.jpg'
import exhibitorbg21 from 'src/assets/images/exhibitor-bg21.jpg'
import exhibitorbg22 from 'src/assets/images/exhibitor-bg22.jpg'
import exhibitorbg23 from 'src/assets/images/exhibitor-bg23.jpg'
import exhibitorbg24 from 'src/assets/images/exhibitor-bg24.jpg'
import exhibitorbg25 from 'src/assets/images/exhibitor-bg25.jpg'
import exhibitorbg26 from 'src/assets/images/exhibitor-bg26.jpg'
import exhibitorbg27 from 'src/assets/images/exhibitor-bg27.jpg'
import exhibitorbg28 from 'src/assets/images/exhibitor-bg28.jpg'




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
    const [open3d, setopen3d] = React.useState(false)
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



    let backgroundimage = null
    if (exhibitor.id == 36) { //Prakriya green wisdom school
        backgroundimage = exhibitorbg9
    }
    else if (exhibitor.id == 37) { //Trio world school
        backgroundimage = exhibitorbg7
    }
    else if (exhibitor.id == 39) { //Triumph world school
        backgroundimage = exhibitorbg12
    }
    else if (exhibitor.id == 40) { //Treamis
        backgroundimage = exhibitorbg8
    }
    else if (exhibitor.id == 41) { //Skei
        backgroundimage = exhibitorbg10
    }
    else if (exhibitor.id == 42) { //Educationist corporation
        backgroundimage = exhibitorbg17
    }

    else if (exhibitor.id == 43) { //Reflex
        backgroundimage = exhibitorbg21
    }

    else if (exhibitor.id == 44) { //Learning arc
        backgroundimage = exhibitorbg15
    }
    else if (exhibitor.id == 45) { //Investography
        backgroundimage = exhibitorbg20
    }
    else if (exhibitor.id == 46) { //Learn.win
        backgroundimage = exhibitorbg18
    }
    else if (exhibitor.id == 47) { //Vingyan
        backgroundimage = exhibitorbg16
    }
    else if (exhibitor.id == 48) { //Joy of anubhava
        backgroundimage = exhibitorbg19
    }
    else if (exhibitor.id == 49) { //Global indian international school
        backgroundimage = exhibitorbg22
    }
    else if (exhibitor.id == 50) { //Quizzy edtech
        backgroundimage = exhibitorbg13
    }

    else if (exhibitor.id == 66) { //Vidya sagar
        backgroundimage = exhibitorbg11
    }
    else if (exhibitor.id == 52) { //Delhi public international school
        backgroundimage = exhibitorbg27
    }
    else if (exhibitor.id == 53) { //S stemlabs edugames india pvt ltd
        backgroundimage = exhibitorbg23
    }
    else if (exhibitor.id == 54) { //Aurinko academy
        backgroundimage = exhibitorbg6
    }
    else if (exhibitor.id == 55) { //Next education india pvt ltd
        backgroundimage = exhibitorbg24
    }
    else if (exhibitor.id == 56) { //Chaman bhartiya school
        backgroundimage = exhibitorbg
    }
    else if (exhibitor.id == 57) { //Coingal education pvt ltd
        backgroundimage = exhibitorbg25
    }

    else if (exhibitor.id == 58) {//Indian school of excellence
        backgroundimage = exhibitorbg26
    }
    else if (exhibitor.id == 59) { //Linguaphile skills hub
        backgroundimage = exhibitorbg4
    }
    else if (exhibitor.id == 60) { //Kunskapsskolan
        backgroundimage = exhibitorbg2
    }

    else if (exhibitor.id == 61) { //Envision group
        backgroundimage = exhibitorbg14
    }
    else if (exhibitor.id == 62) { //Karadi path
        backgroundimage = exhibitorbg5
    }
    else if (exhibitor.id == 63) { //The foundation school
        backgroundimage = exhibitorbg28
    }
    else if (exhibitor.id == 64) { //The foundation school
        backgroundimage = xpoimage
    }
    else if (exhibitor.id == 65) { //Valistus
        backgroundimage = exhibitorbg3
    }

    const handleOpen3dview = () => {
        setopen3d(true);
    };
    const handlecloseOpen3dview = () => {
        setopen3d(false);
    };


    return (
        <React.Fragment>

            <Dialog fullScreen open={open3d} onClose={handlecloseOpen3dview} TransitionComponent={Transition} >
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handlecloseOpen3dview} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            {exhibitor.name}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Iframe src={exhibitor.threed_url}
                    width="100%"
                    height="95%"
                    id="myId"
                    className="myClassname"
                    display="initial"
                    position="relative"
                    allowFullScreen />              </Dialog>
            <Grid item container style={{
                backgroundImage: `url(${backgroundimage})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                height: "calc(100vh - 64px)"
            }}>
                {
                    (exhibitor.is_viewthreed) && (
                        <Grid item style={{ position: 'absolute', right: '0%', top: ' 35%', backgroundColor: '#000', color: 'white' }}>
                            <Box>
                                <Tooltip title="3D View">
                                    <IconButton
                                        color="inherit"
                                        onClick={handleOpen3dview}
                                    >
                                        <Box mr={1}>
                                            <SvgIcon fontSize="large"  >
                                                <LaunchIcon />
                                            </SvgIcon>
                                        </Box>
                                        <Typography>Launch in 3D</Typography>
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        </Grid>
                    )
                }
                {
                    (exhibitor.is_zoomroom) && (
                        <Grid item style={{ position: 'absolute', right: '0%', top: ' 55%', backgroundColor: '#000', color: 'white' }}>
                            <Tooltip title="Meeting room">
                                <IconButton
                                    variant="contained"
                                    color="inherit"
                                    href={exhibitor.meeting_url}
                                    target="_blank"
                                >
                                    <Box mr={1}>
                                            <SvgIcon fontSize="large"  >
                                                <LaunchIcon />
                                            </SvgIcon>
                                        </Box>
                                    <Typography>Meeting Room</Typography>
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    )
                }
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
                    <Tab label="Offerings" {...a11yProps(1)} />
                    <Tab label="Team" {...a11yProps(2)} />
                    <Tab label="Banner" {...a11yProps(3)} />
                    <Tab label="Photo" {...a11yProps(4)} />
                    <Tab label="Video" {...a11yProps(5)} />
                    <Tab label="Assets" {...a11yProps(6)} />
                    <Tab label="Contact Us" {...a11yProps(7)} />
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
                        <Banner photo={exhibitor.banner_data} exhibitorid={exhibitor.id}></Banner>
                    </Grid>
                </TabPanel>
                <TabPanel value={value} index={4}>
                    <Grid container xs={12} sm spacing={2}>
                        <Photo photo={exhibitor.photo_data} exhibitorid={exhibitor.id}></Photo>
                    </Grid>
                </TabPanel>
                <TabPanel value={value} index={5}>
                    <Grid container xs={12} sm spacing={2}>
                        <Video video={exhibitor.video_data} exhibitorid={exhibitor.id}></Video>
                    </Grid>
                </TabPanel>
                <TabPanel value={value} index={6}>
                    <Assets assets={exhibitor.assets_data} exhibitorid={exhibitor.id}></Assets>
                </TabPanel>
                <TabPanel value={value} index={7}>
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
                                                    placeholder="Write your message here..."
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