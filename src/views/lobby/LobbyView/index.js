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
import ReactPlayer from 'react-player'
import video from '../../../assets/media/video1.mp4'
import useAuth from 'src/hooks/useAuth';
import { useDispatch } from 'src/store';
import { userpage_save } from 'src/slices/notification'

const useStyles = makeStyles(theme => ({
    imgContainer: {
        margin: 'auto',
    },
    anchorKeynote: {
        position: 'absolute', 
        left: '23.34%', 
        top: '53.74%', 
        width: '8.99%', 
        height: '6.2%', 
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
        top: '52.5%', 
        width: '15.57%', 
        height: '7.15%', 
        zIndex: 2
    },
    anchorNetwork: {
        position: 'absolute', 
        left: '66.02%', 
        top: '54.7%', 
        width: '11.2%', 
        height: '4.85%', 
        zIndex: 2
    },
    anchorHelp: {
        position: 'absolute', 
        left: '12%', 
        top: '75.5%', 
        width: '14.2%', 
        height: '7.85%', 
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
        const t = document.createTextNode(`window.Intercom('boot', {hide_default_launcher: true, app_id: 'a5iw6q1x', name:'" + ${name} + "', email:'" + ${email} + "', created_at:'" + ${createdAt} + "', user_id:'" + ${userId} + "'});`);
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
                <ReactPlayer url={video} className={classes.anchorVideo}
                width='19%' 
                height='51%'
                playing='true'
                volume= '0'
                loop='true' />
                <img alt="auditorium" src={background} className="background-fluid" />
                </div>
                <div className="audi-content">
                    <div className="lobby-content-center">
                    {/* <iframe width="100%" height="100%" src="https://www.youtube.com/embed/ElnqwnadBGY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}
                    </div>
                    <div className="users">
                    <Link href='/app/networking' className={classes.anchorKeynote}>
                    <LightTooltip title="See who all are attending and get a chance to interact with them">
                        <Button variant="outlined" style={{width:'100%', height:'100%'}} aria-label="auditorium">    
                        </Button>
                    </LightTooltip>
                    </Link>
                    <Link href='/app/agenda' className={classes.anchorExhibition}> 
                    <LightTooltip title="Click here to attend panel discussions by healthcare industry leaders">
                        <Button variant="outlined" style={{width:'100%', height:'100%'}} aria-label="auditorium">    
                        </Button>
                    </LightTooltip>            
                    </Link>
                    <Link href='/app/exhibition' className={classes.anchorNetwork}>
                    <LightTooltip title="Visit our expert partners from across the world">
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
                </div>
                </div>
            </Grid>
        </Page>


    )
}