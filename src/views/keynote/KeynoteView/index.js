import React, { useEffect } from 'react';
import {
    Grid,
    makeStyles,
    Button,
    Dialog,
    DialogContent,
    DialogContentText,
    IconButton,
    Toolbar,
    Slide,
    Typography,
    Card,
    CardContent,
    Container,
    CardActions,
    Link,
    AppBar,
    Tabs,
    Tab,
    Box

} from '@material-ui/core';
import PropTypes from 'prop-types';
import CloseIcon from '@material-ui/icons/Close';
import ImageMapper from 'react-image-mapper';
import audi from 'src/assets/images/audi.jpg';
import Page from 'src/components/Page';
import background from 'src/assets/images/audi.jpg';
import background1 from 'src/assets/images/audi2.jpg';
import Styles from './styles.css';
import Backdrop from '@material-ui/core/Backdrop';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
//import Agenda from '../AgendaView'
import { withRouter } from "react-router";
import { useDispatch, useSelector } from 'src/store';
import { userpage_save } from 'src/slices/notification'
import { gettrackEventAgendas } from 'src/slices/eventagenda'
import { useParams } from 'react-router-dom';
import useAuth from 'src/hooks/useAuth';
import axios from 'src/utils/axios';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import moment from 'moment';
import ReactHtmlParser from 'react-html-parser';
import Iframe from 'react-iframe'
import Itemdata from 'src/views/agenda/AgendaView/Itemdata'
import { Link as RouterLink } from 'react-router-dom';
import {
    getEventAgendas
} from 'src/slices/eventagenda';
import { ZoomMtg } from '@zoomus/websdk'

ZoomMtg.preLoadWasm();
ZoomMtg.prepareJssdk();
ZoomMtg.setZoomJSLib('https://source.zoom.us/1.8.1/lib', '/av');
// const zoomMeeting = document.getElementById("zmmtg-root")

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: '100%',
    },



    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    imgContainer: {
        margin: 'auto',
    },
    iframeContainer: {
        overflow: 'hidden',
        position: 'relative',
    },
    iframeContainer_iframe: {
        border: '0',
        height: '800px',
        left: '0',
        position: 'relative',
        top: '0',
        width: '100%',
    },
    btnAgenda: {
        position: 'absolute',
        bottom: '30%',
        right: '47%',
    }
}));




const TabPanel = (props) => {
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


export function KeynoteView() {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [open3, setOpen3] = React.useState(false);
    const { user } = useAuth();
    const isMountedRef = useIsMountedRef();
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('lg');
    const [hidden, setHidden] = React.useState(false);
    const [webinarurl, setwebinarurl] = React.useState(localStorage.getItem("webinarurl"));
    const { eventagenda1, eventagenda2 } = useSelector((state) => state.eventagenda);
    const eventId = localStorage.getItem("eventId")
    const { track } = useParams();
    const signature = localStorage.getItem("signature")
    const name = localStorage.getItem("name")
    const email = localStorage.getItem("email")
    const webinarid = localStorage.getItem("webinarid")
    const zoomlink = 'http://127.0.0.1:9999/meeting.html?' + 'name=' + name + '&' + 'mn=' + webinarid + '&' + 'email=' + email + '&' + 'pwd=' + 'bJGYv8' + '&' + 'role=0&lang=en-US&signature=' + signature + '&' + 'china=0&apiKey=nyN04PPYSJqVPeb0RWtwLA'
    
    console.log(zoomlink)
    
    const src = zoomlink
    // const meetConfig = {
    //     apiKey: '3nyN04PPYSJqVPeb0RWtwLA',
    //     meetingNumber: webinarurl,
    //     leaveUrl: 'https://xporium.com',
    //     userName: ' Hetal Mehta',
    //     userEmail: 'hetal@xporium.com', // required
    //     // passWord: 'YR2c4g', // if required
    //     role: 0 // 1 for host; 0 for attendee
    
    // };
    
    
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    let backgroud_image = ''
    
    if(track === "contest")
    {
        backgroud_image = background1
    }
    else{
        backgroud_image = background
    }
    useEffect(() => {
        const data = {
            pagename: "Keynote"
        }
        dispatch(userpage_save(data))
        dispatch(getEventAgendas(eventId));

        const name = user.name;
        const email = user.email;
        const createdAt = Math.floor(Date.now() / 1000);
        const userId = user.user_id;
        const script = document.createElement("script");
        const t = document.createTextNode(`window.Intercom('boot', {hide_default_launcher: true, app_id: 'awgmsv98', name:'" + ${name} + "', email:'" + ${email} + "', created_at:'" + ${createdAt} + "', user_id:'" + ${userId} + "'});`);
        script.appendChild(t);
        //window.eval(script);
        document.body.appendChild(script);
    }, [dispatch]);
   
    const handleClickOpen = () => {
        setOpen2(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleClose3 = () => {
        setOpen2(false);
    };
    const handleVisibility = () => {
        setHidden((prevHidden) => !prevHidden);
    };

    const handleOpen2 = () => {
        setOpen(true);
    };

    const handleClose2 = () => {
        setOpen(false);
    };
    const handleagenda = async (webinarid) => {
        try {
            let data = {
                webinarid: webinarid,
                email: user.email,
                name: user.name
            }
            
            const response = await axios.post('/api/eventspeaker/zoomuserenterwebinar', data);
            console.log('response',response)
            
            // call the init method with meeting settings
//             ZoomMtg.init({
//                 leaveUrl: meetConfig.leaveUrl,
//                 isSupportAV: true,
//                 // on success, call the join method 
//                 success: function() {	
//                     ZoomMtg.join({
//                         // pass your signature response in the join method
//                         signature: response.data.signature,
//                         apiKey: meetConfig.apiKey,
//                         meetingNumber: meetConfig.meetingNumber,
//                         userName: meetConfig.userName,
//                         passWord: meetConfig.passWord,
//                         // on success, get the attendee list and verify the current user
//                         success: function (res) {
//             console.log("join meeting success");
//             console.log("get attendee list");
//             ZoomMtg.getAttendeeslist({});
//             ZoomMtg.getCurrentUser({
//                 success: function (res) {
//                 console.log("success getCurrentUser", res.result.currentUser);
//                 },
//             });
//             },
// error: function (res) {
//             console.log('response',res);
//             },
//                     })		
//                 }
//             })
            
            

            if (isMountedRef.current) {
                setwebinarurl(response.data.enter_uri)
                setOpen2(false);
            }
        } catch (err) {
            console.error(err);
        }
    }
    const handleFullScreen = () => {
        document.getElementById("full-screen").classList.add("no-display");;
        document.getElementById("audi-iframe").classList.add("audi-frame-full");
        document.getElementById("exit-full-screen").classList.add("display");
        //setHidden((prevHidden) => !prevHidden);
    };

    const handleExitFullScreen = () => {
        document.getElementById("full-screen").classList.remove("no-display");
        document.getElementById("audi-iframe").classList.remove("audi-frame-full");
        document.getElementById("exit-full-screen").classList.remove("display");
        //setHidden((prevHidden) => !prevHidden);
    };
    
    return (
        <Page className={classes.root}
            title="Keynote">
            <Grid item container style={{
                position: 'relative',
                webkitTransformOrigin: '0% 0% 0',
                transformOrigin: '0% 0% 0',
                height: '100%',
                width: '100%',
                maxWidth: '100%',
                overflow: 'hidden',
            }}>
                <div className="audi-background">
                    <img alt="auditorium" src={backgroud_image} className="background-fluid" />
                </div>
                <div className="audi-content">

                    <div className="audi-content-center">
                        <Button className="fullscreen" id="full-screen" onClick={handleFullScreen}>Full Screen</Button>
                        <Button className="exitfullscreen" id="exit-full-screen" onClick={handleExitFullScreen}>Exit Full Screen</Button>
                        {/* <Button className="fullscreen" id="full-screen" onClick={handleagenda}>ZOOM</Button> */}
                        <iframe id="audi-iframe" scrolling="no" width="100%" height="100%" src={src}
                            frameborder="0"
                             allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen="true" webkitallowfullscreen="true" mozallowfullscreen="true">
                         </iframe> 

                        {/* <iframe id="audi-iframe" scrolling="no" width="100%" height="100%" src={src} */}

                        
                        {/* <iframe src={src} allow="microphone; camera; fullscreen" /> */}
                        {/* {
                            (webinarurl != "undefined") && (
                                <iframe url={webinarurl}
                                    width="100%"
                                    height="100%"
                                    id="audi-iframe"
                                    className="myClassname"
                                    display="initial"
                                    position="relative"
                                    allowFullScreen />
                            )
                        } */}
                    </div>
                    {/* <Button variant="contained" color="primary" className={classes.btnAgenda} href="/app/agenda">Back to Agenda</Button> */}

                    <Button
                        color="primary"
                        variant="contained"
                        component={RouterLink}
                        to="/app/agenda"
                        className={classes.btnAgenda}
                    >
                        Back to Agenda
                    </Button>
                </div>
            </Grid>
            {/* <Button onClick={handleVisibility}>Toggle Speed Dial</Button>
            <Backdrop open={open} style={{ zIndex: '9' }} />
            <SpeedDial
                ariaLabel="SpeedDial tooltip example"
                className={classes.speedDial}
                hidden={hidden}
                icon={<SpeedDialIcon />}
                onClose={handleClose2}
                onOpen={handleOpen2}
                open={open}
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        tooltipOpen
                        onClick={handleClickOpen}
                    />
                ))}
            </SpeedDial>
            <Dialog
                open={open2}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose3}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
                fullWidth={fullWidth}
                maxWidth={maxWidth}
            >
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose3} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            All Videos
                        </Typography>
                    </Toolbar>
                    <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                        <Tab label="Day 2" {...a11yProps(0)} />
                        <Tab label="Day 1" {...a11yProps(1)} />
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>
                    <Itemdata eventagenda={eventagenda2}> </Itemdata>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Itemdata eventagenda={eventagenda1}> </Itemdata>
                </TabPanel>
            </Dialog> */}
        </Page>
    );
}
export default withRouter(KeynoteView);