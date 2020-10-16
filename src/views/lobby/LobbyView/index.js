import React, { useEffect } from 'react';
import ImageMapper from 'react-image-mapper';
import lobby from 'src/assets/images/lobby.jpg';
import {withStyles, makeStyles } from '@material-ui/styles';
import Page from 'src/components/Page';
import Grid from "@material-ui/core/Grid";
import background from '../../../assets/images/lobby.jpg';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import MovieIcon from '@material-ui/icons/Movie';
import Tooltip from '@material-ui/core/Tooltip';
import Styles from './styles.css';
import useAuth from 'src/hooks/useAuth';
import { useDispatch } from 'src/store';
import { userpage_save } from 'src/slices/notification'
//import video from 'src/assets/media/video1.mp4'
import ReactPlayer from 'react-player'


const useStyles = makeStyles(theme => ({
    imgContainer: {
        margin: 'auto',
    },
    anchorKeynote: {
        position: 'absolute', 
        left: '9.34%', 
        top: '61.74%', 
        width: '12.99%', 
        height: '15.2%', 
        zIndex: 2
    },
    anchorResource: {
        position: 'absolute', 
        left: '30%', 
        top: '45.74%', 
        width: '7.74%', 
        height: '5.96%', 
        zIndex: 2
    },
    anchorExhibition: {
        position: 'absolute', 
        left: '41.94%', 
        top: '62.5%', 
        width: '15.57%', 
        height: '16.15%', 
        zIndex: 2
    },
    anchorNetwork: {
        position: 'absolute', 
        left: '78.02%', 
        top: '61.7%', 
        width: '11.2%', 
        height: '26.85%', 
        zIndex: 2
    },
    anchorHelp: {
        position: 'absolute', 
        left: '9%', 
        top: '80.5%', 
        width: '16.2%', 
        height: '12.85%', 
        zIndex: 2
    },
    fab: {
        margin: theme.spacing(2),
      },
      absolute: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(3),
      },
      anchorVideo: {
        position: 'absolute',
        top: '17%',
        right: '40.5%',
        },
        anchorSideLeft: {
            position: 'absolute', 
            left: '37%', 
            top: '61.5%', 
            width: '4.2%', 
            height: '17.85%', 
            zIndex: 2
        },
        anchorSideRight: {
            position: 'absolute', 
            left: '58%', 
            top: '61.5%', 
            width: '4.2%', 
            height: '17.85%', 
            zIndex: 2
        },
        anchorAgenda: {
            position: 'absolute', 
            left: '13%', 
            top: '26.5%', 
            width: '6.2%', 
            height: '31.85%', 
            zIndex: 2
        },
}));

const LightTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: theme.palette.common.white,
      color: 'rgba(0, 0, 0, 0.87)',
      boxShadow: theme.shadows[1],
      fontSize: 15,
    },
  }))(Tooltip);


const MAP = {
    name: "lobby-map",
    areas: [
        { name: "Auditorium", shape: "rect", coords: [105, 138, 263, 209], href: "/app/keynote" },
        { name: "Resources", shape: "rect", coords: [364, 288, 499, 368], href: "/app/resources" },
        { name: "Exhibition", shape: "rect", coords: [621, 299, 869, 364], href: "/app/exhibition" },
        { name: "Networking", shape: "rect", coords: [1065, 267, 1212, 327], href: "/app/networking" },
    ]
}

export default function LobbyView() {
    const classes = useStyles();
    const { user } = useAuth();
    const dispatch = useDispatch();

    useEffect(() => {
        const data = {
            pagename: "Lobby"
        }
        dispatch(userpage_save(data))

        const name = user.name;
        const email = user.email;
        const createdAt = Math.floor(Date.now() / 1000);
        const userId = user.user_id;
        const script = document.createElement("script");
        const t = document.createTextNode(`window.Intercom('boot', {app_id: 'a5iw6q1x', name:'" + ${name} + "', email:'" + ${email} + "', created_at:'" + ${createdAt} + "', user_id:'" + ${userId} + "'});`);
        script.appendChild(t);
        //window.eval(script);
        document.body.appendChild(script); 
    }, []);
  
    return (
        <Page>
            {/* <div className={classes.imgContainer}>
            <ImageMapper src={lobby} width={1366} imgWidth={1280} map={MAP}/>
        </div> */}

            {/* <Grid item container style={{
                backgroundImage: `url(${background})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                height: "calc(100vh - 64px)"
            }}>
                <div className="users">
                    <Link href='/app/keynote' className={classes.anchorKeynote}>
                    <Tooltip title="Click here to attend panel discussions by healthcare industry leaders">
                        <Button variant="contained" color="primary" style={{width:'100%', height:'100%'}} aria-label="auditorium">
                            <MovieIcon />Exhibition Hall
                        </Button>
                    </Tooltip>
                    </Link>
                    <Link href='/app/networking' className={classes.anchorResource}>
                    <Tooltip title="Click here to attend panel discussions by healthcare industry leaders">
                        <Button variant="contained" color="primary" style={{width:'100%', height:'100%'}} aria-label="auditorium">
                            <MovieIcon />Resource Center
                        </Button>
                    </Tooltip>
                    </Link>
                    <Link href='/app/3d' className={classes.anchorExhibition}>
                    <Tooltip title="Click here to attend panel discussions by healthcare industry leaders">
                        <Button variant="contained" color="primary" style={{width:'100%', height:'100%'}} aria-label="auditorium">
                            <MovieIcon />Enter Auditorium
                        </Button>
                    </Tooltip>
                    </Link>
                    <Link href='/app/exhibition' className={classes.anchorNetwork}>
                    <Tooltip title="Click here to attend panel discussions by healthcare industry leaders">
                        <Button variant="contained" color="primary" style={{width:'100%', height:'100%'}} aria-label="auditorium">
                            <MovieIcon />Networking Lounge
                        </Button>
                    </Tooltip>
                    </Link>
                </div>
            </Grid> */}
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
                <ReactPlayer url='https://www.youtube.com/watch?v=5UB1TpMdP9E&feature=youtu.be' className={classes.anchorVideo}
                width='15%' 
                height='17%'
                playing='true'
                volume= '6'
                loop='true'
                allowFullScreen />
                <img alt="auditorium" src={background} className="background-fluid" />
                </div>
                <div className="audi-content">
                    <div className="lobby-content-center">
                    {/* <iframe width="100%" height="100%" src="https://www.youtube.com/embed/ElnqwnadBGY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}
                    </div>
                    <div className="users">
                    <Link href='/app/agenda' className={classes.anchorKeynote}>
                    <LightTooltip title="Click here to attend panel discussions by industry leaders">
                        <Button variant="outlined" style={{width:'100%', height:'100%'}} aria-label="auditorium">    
                        </Button>
                    </LightTooltip>
                    </Link>
                    <Link href='/app/exhibition' className={classes.anchorExhibition}> 
                    <LightTooltip title="Visit our exhibitors and interact on their booth in real time">
                        <Button variant="outlined" style={{width:'100%', height:'100%'}} aria-label="auditorium">    
                        </Button>
                    </LightTooltip>            
                    </Link>
                    <Link href='/app/networking' className={classes.anchorNetwork}>
                    <LightTooltip title="See who all are attending and get a chance to interact with them">
                        <Button variant="outlined" style={{width:'100%', height:'100%'}} aria-label="auditorium">    
                        </Button>
                    </LightTooltip>   
                    </Link>
                    <Link href='/app/helpdesk' className={classes.anchorHelp}>
                    <LightTooltip title="Please feel free to ask us for help. We would be happy to assist.">
                        <Button variant="outlined" style={{width:'100%', height:'100%'}} aria-label="auditorium">    
                        </Button>
                    </LightTooltip>   
                    </Link>
                    <Link className={classes.anchorSideLeft} style={{ cursor: 'pointer' }} 
                    href='https://zoom.us/meeting/register/tJEvcuGsrj0qHta0sLk0iRXDHpc7wps4b-vG' target="_blank"></Link>
                    <Link className={classes.anchorSideRight} style={{ cursor: 'pointer' }}></Link>
                    <Link className={classes.anchorAgenda} style={{ cursor: 'pointer' }} href='/app/agenda'></Link>
                </div>
                </div>
            </Grid>
        </Page>


    )
}