import React,{useEffect} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Page from 'src/components/Page';
import Grid from "@material-ui/core/Grid";
import background from '../../../assets/images/Helpdesk.jpg';
import useAuth from 'src/hooks/useAuth';



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
    speedDial: {
        position: 'absolute',
        bottom: theme.spacing(10),
        right: theme.spacing(6),
      },
}));


const MAP = {
    name: "lobby-map",
    areas: [
        { name: "Webinar", shape: "rect", coords: [896, 357, 449, 143] },

    ]
}


export default function KeynoteView() {
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [open3, setOpen3] = React.useState(false);
    const classes = useStyles();
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('lg');
    const [hidden, setHidden] = React.useState(false);
    const { user } = useAuth();

    useEffect(() => {
        // const name = "Nisarg Mehta";
        // const email = "envelopetech@gmail.com";
        // const createdAt = Math.floor(Date.now() / 1000);
        // const userId = "123456";
        // const script = document.createElement("script");
        // //const t = document.createTextNode("window.intercomSettings = {app_id: 'a5iw6q1x', name:'"+`${name}`+"', email:'"+`${email}`+"', created_at:'"+`${createdAt}`+"', user_id:'"+`${userId}`+"'};");
        // const t = document.createTextNode("window.Intercom('boot', {hide_default_launcher: false, app_id: 'a5iw6q1x', name:'" + `${name}` + "', email:'" + `${email}` + "', created_at:'" + `${createdAt}` + "', user_id:'" + `${userId}` + "'});");
        // script.appendChild(t);
        // //window.eval(script);
        // document.body.appendChild(script);

        const name = user.name;
        const email = user.email;
        const createdAt = Math.floor(Date.now() / 1000);
        const userId = user.user_id;
        const script = document.createElement("script");
        const t = document.createTextNode(`window.Intercom('boot', {hide_default_launcher: false, app_id: 'a5iw6q1x', name:'" + ${name} + "', email:'" + ${email} + "', created_at:'" + ${createdAt} + "', user_id:'" + ${userId} + "'});`);
        script.appendChild(t);
        //window.eval(script);
        document.body.appendChild(script);

    }, []);

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
                {/* <Grid item style={{position: 'absolute', right: '25%', top:' 28%'}}>
                        <Users />
                </Grid> */}
                    <div className="audi-content-center">
                   
                    </div>
                
                </div>
            </Grid>
            
  
    
        </Page>

    );
}
