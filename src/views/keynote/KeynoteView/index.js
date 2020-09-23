import React, { useEffect } from 'react';
import {
    Grid,
    makeStyles,
    Button,
    Dialog,
    DialogContent,
    DialogContentText,
    IconButton,
    AppBar,
    Toolbar,
    Slide,
    Typography,
    Box

} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ImageMapper from 'react-image-mapper';
import audi from 'src/assets/images/audi.jpg';
import Page from 'src/components/Page';
import background from 'src/assets/images/audi.jpg';
import Styles from './styles.css';
import Backdrop from '@material-ui/core/Backdrop';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
//import Agenda from '../AgendaView'
import { useParams } from "react-router-dom";
import { withRouter } from "react-router";
import { useDispatch } from 'src/store';
import { userpage_save } from 'src/slices/notification'
import Iframe from 'react-iframe'

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: '100%',
    },

    playbutton: {
        display: "inline-block",
        marginBottom: "20px",
        color: "#000"
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
    speedDial: {
        position: 'absolute',
        bottom: theme.spacing(10),
        right: theme.spacing(6),
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const MAP = {
    name: "lobby-map",
    areas: [
        { name: "Webinar", shape: "rect", coords: [896, 357, 449, 143] },

    ]
}

const actions = [
    { icon: <FileCopyIcon />, name: 'All' },
];

export function KeynoteView() {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [open3, setOpen3] = React.useState(false);

    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('lg');
    const [hidden, setHidden] = React.useState(false);



    const webinarurl = localStorage.getItem("webinarurl")


    // let webinarurl = ""
    // if (agenda_id !== null && agenda_id !== undefined) {
    //     let data = JSON.parse(localStorage.getItem('agenda_data'))
    //     if (data !== undefined && data !== null && data.length > 0) {
    //         const agendadata = data.find((_agenda) => _agenda.id === parseInt(agenda_id));
    //         webinarurl = agendadata.webinar_url;
    //     }
    // }

    useEffect(() => {
        const data = {
            pagename: "Keynote"
        }
        dispatch(userpage_save(data))
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
    const handleplaybutton = () => {
    };
    const handleFullScreen = () => {
        document.getElementById("full-screen").classList.add("no-display");;
        document.getElementById("audi-iframe").classList.add("audi-frame-full");
        document.getElementById("exit-full-screen").classList.add("display");

        //setHidden((prevHidden) => !prevHidden);
    };

    const handleExitFullScreen = () => {
        document.getElementById("full-screen").classList.remove("no-display");;
        document.getElementById("audi-iframe").classList.remove("audi-frame-full");
        document.getElementById("exit-full-screen").classList.remove("display");
        //setHidden((prevHidden) => !prevHidden);
    };

    return (
        <Page className={classes.root}
            title="Keynote">
            {/* <div>
                <div className={classes.imgContainer}>
                    <ImageMapper src={audi} width={'100%'} imgWidth={1920} map={MAP} onClick={handleClickOpen} />
                </div>
                <Dialog fullWidth={fullWidth} maxWidth={maxWidth} open={open} onClose={handleClose} TransitionComponent={Transition}>
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                                <CloseIcon />
                            </IconButton>
                            <Typography variant="h6" className={classes.title}>
                                Demo Webinar
            </Typography>

                        </Toolbar>
                    </AppBar>
                    <div className={classes.iframeContainer}>
                        <iframe width="90%" className={classes.iframeContainer_iframe} src="https://www.bigmarker.com/xporium/Xporium-Demo?bmid=b0f384fa3336" allowfullscreen></iframe>
                    </div>
                </Dialog>
            </div> */}

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
                    <img alt="auditorium" src={background} className="background-fluid" />
                </div>
                <div className="audi-content">

                    <div className="audi-content-center">
                        <Button className="fullscreen" id="full-screen" onClick={handleFullScreen}>Full Screen</Button>
                        <Button className="exitfullscreen" id="exit-full-screen" onClick={handleExitFullScreen}>Exit Full Screen</Button>

                        {
                            (webinarurl != "undefined") && (
                                <Iframe url={webinarurl}
                                    width="100%"
                                    height="100%"
                                    id="audi-iframe"
                                    className="myClassname"
                                    display="initial"
                                    position="relative"
                                    allowFullScreen />
                            )
                        }
                    </div>

                </div>
            </Grid>

            <Button onClick={handleVisibility}>Toggle Speed Dial</Button>
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
                onClose={handleClose2}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
                fullWidth={fullWidth}
                maxWidth={maxWidth}
            >
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose3} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            All Videos
            </Typography>


                    </Toolbar>
                </AppBar>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Please click on the desired video to play it in the auditorium.
          </DialogContentText>
                    {/* <Agenda /> */}
                </DialogContent>
            </Dialog>

        </Page>

    );
}
export default withRouter(KeynoteView);