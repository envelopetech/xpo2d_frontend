import React, { useEffect } from 'react';
import ImageMapper from 'react-image-mapper';
import lobby from 'src/assets/images/lobby.jpg';
import {withStyles, makeStyles } from '@material-ui/styles';
import Page from 'src/components/Page';
import Grid from "@material-ui/core/Grid";
import background from '../../../assets/images/exhibit-hall.jpg';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import MovieIcon from '@material-ui/icons/Movie';
import Tooltip from '@material-ui/core/Tooltip';
import Styles from './styles.css';
import ReactPlayer from 'react-player'
import video from '../../../assets/media/video1.mp4'



const useStyles = makeStyles(theme => ({
    imgContainer: {
        margin: 'auto',
    },
    anchorStall2: {
        position: 'absolute', 
        left: '15.34%', 
        top: '53.74%', 
        width: '11.99%', 
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
    anchorStall3: {
        position: 'absolute', 
        left: '30.94%', 
        top: '56.5%', 
        width: '13.57%', 
        height: '22.15%', 
        zIndex: 2
    },
    anchorStall4: {
        position: 'absolute', 
        left: '42.94%', 
        top: '76.5%', 
        width: '13.57%', 
        height: '22.15%', 
        zIndex: 2
    },
    anchorStall5: {
        position: 'absolute', 
        left: '56.02%', 
        top: '57.7%', 
        width: '12.2%', 
        height: '19.85%', 
        zIndex: 2
    },
    anchorStall6: {
        position: 'absolute', 
        left: '73.02%', 
        top: '50.7%', 
        width: '12.2%', 
        height: '19.85%', 
        zIndex: 2
    },
    anchorStall7: {
        position: 'absolute', 
        left: '85.02%', 
        top: '69.7%', 
        width: '12.2%', 
        height: '19.85%', 
        zIndex: 2
    },
    anchorStall1: {
        position: 'absolute', 
        left: '2%', 
        top: '66.5%', 
        width: '16.2%', 
        height: '23.85%', 
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

    useEffect(() => {
        const name = "Nisarg Mehta";
        const email = "envelopetech@gmail.com";
        const createdAt = Math.floor(Date.now() / 1000);
        const userId = "123456";
        const script = document.createElement("script");
        //const t = document.createTextNode("window.intercomSettings = {app_id: 'a5iw6q1x', name:'"+`${name}`+"', email:'"+`${email}`+"', created_at:'"+`${createdAt}`+"', user_id:'"+`${userId}`+"'};");
        const t = document.createTextNode("window.Intercom('boot', {app_id: 'a5iw6q1x', name:'" + `${name}` + "', email:'" + `${email}` + "', created_at:'" + `${createdAt}` + "', user_id:'" + `${userId}` + "'});");
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
               
                <img alt="auditorium" src={background} className="background-fluid" />
                </div>
                <div className="audi-content">
                    <div className="lobby-content-center">
                    {/* <iframe width="100%" height="100%" src="https://www.youtube.com/embed/ElnqwnadBGY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}
                    </div>
                    <div className="users">
                    <Link href='/app/exhibitor/apex-medical-corp./17' className={classes.anchorStall1}>
                    
                    <Button variant="outlined" style={{width:'100%', height:'100%'}} aria-label="auditorium">    
                    </Button>
                 
                </Link>
                    <Link href='/app/exhibitor/mytrex-health-technologies,-inc./21' className={classes.anchorStall2}>
                   
                        <Button variant="outlined" style={{width:'100%', height:'100%'}} aria-label="auditorium">    
                        </Button>
                   
                    </Link>
                    <Link href='/app/exhibitor/makalot-industrial-co.,-ltd./20' className={classes.anchorStall3}> 
                    
                        <Button variant="outlined" style={{width:'100%', height:'100%'}} aria-label="auditorium">    
                        </Button>
                              
                    </Link>
                    <Link href='/app/exhibitor/dr-willmar-schwabe-india-pvt.ltd/35' className={classes.anchorStall4}> 
                    
                    <Button variant="outlined" style={{width:'100%', height:'100%'}} aria-label="auditorium">    
                    </Button>
                          
                </Link>
                    <Link href='/app/exhibitor/ebm-technologies/18' className={classes.anchorStall5}>
                   
                        <Button variant="outlined" style={{width:'100%', height:'100%'}} aria-label="auditorium">    
                        </Button>
                       
                    </Link>
                    <Link href='/app/exhibitor/golden-biotechnology-corporation/19' className={classes.anchorStall6}>
                   
                   <Button variant="outlined" style={{width:'100%', height:'100%'}} aria-label="auditorium">    
                   </Button>
                  
               </Link>
               <Link href='/app/exhibitor/chitkara-university/22' className={classes.anchorStall7}>
                   
                   <Button variant="outlined" style={{width:'100%', height:'100%'}} aria-label="auditorium">    
                   </Button>
                  
               </Link>
                   
                </div>
                </div>
            </Grid>
        </Page>


    )
}