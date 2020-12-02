import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
    Button,
    Card,
    CardContent,
    Typography,
    Container,
    makeStyles,
    CardActions,
    Link

} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import useAuth from 'src/hooks/useAuth';
import axios from 'src/utils/axios';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
// import { ZoomMtg } from '@zoomus/websdk'

// ZoomMtg.preLoadWasm();
// ZoomMtg.prepareJssdk();
const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
        marginBottom: 15,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },

    agendaContainer: {
        marginTop: '2em',
    }

}));

const Itemdata = ({
    className,
    eventagenda,
    ...rest
}) => {


    const classes = useStyles();
    const { user } = useAuth();
    const isMountedRef = useIsMountedRef();
    const history = useHistory();
  
    const handleagenda = async (webinarid, track, is_other_url) => {
        try {

            if(!is_other_url)
            {
                let data = {
                    webinarid: webinarid,
                    email: user.email,
                    name: user.name
                }
                // window.open(webinarid, '_blank');
                const response = await axios.post('/api/eventspeaker/zoomuserenterwebinar', data);
                // const response = await axios.post('/api/eventspeaker/userenterwebinarcovid', data);
                console.log('response:', response)
                

            }
            else
            {
                let data = {
                    webinarid: webinarid,
                    email: user.email,
                    name: user.name
                }
                
                // const response = await axios.post('/api/eventspeaker/userenterwebinarcovid', data);
                const response = await axios.post('/api/eventspeaker/zoomuserenterwebinar', data);
                console.log('response:',response)
                // alert(response)
                if (isMountedRef.current) {
                    //setdata(response.data.enter_uri);
                    localStorage.setItem("webinarurl", response.data.enter_uri)
                    const signature = localStorage.setItem("signature", response.data.signature)
                    const name = localStorage.setItem("name", response.data.name)
                    const email = localStorage.setItem("email", response.data.email)
                    const webinarid = localStorage.setItem("webinarid", response.data.webinarid)
                    // console.log('my signature', signature)
                    history.push(`/app/keynote/${track}`);
                    
                }
            }
            
        } catch (err) {
            console.error(err);
        }
    }

    const handledata = async (webinarid, track) => {
        try {
            localStorage.setItem("webinarurl", webinarid)
            history.push(`/app/keynote/${track}`);

        } catch (err) {
            console.error(err);
        }
    }

    return (
        <React.Fragment>
            {eventagenda.map((event1) => {
                let startdate = moment(event1.start_date).format("h:mm A");
                let enddate = moment(event1.end_date).format("h:mm A");
                let finaltime = `${startdate} - ${enddate}`
                var today = moment()
                var result = moment(today).isBetween(event1.start_date, event1.end_date)
                //result = true;
                console.log(result)
                var checkafterwebinar = moment(today).isAfter(event1.end_date)
                //checkafterwebinar = false
                return (
                    <Container className={classes.agendaContainer}>
                        <Card className={classes.root}>
                            <CardContent>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                    {finaltime}
                                </Typography>
                                <Typography variant="h5" component="h2">
                                    {event1.title}
                                </Typography>
                                <Typography className={classes.pos} color="textSecondary">
                                    {event1.speaker_name}
                                </Typography>
                                <Typography variant="body2" component="p">
                                    {ReactHtmlParser(event1.description)}
                                    <br />
                                </Typography>
                            </CardContent>
                            <CardActions>
                                {
                                    (checkafterwebinar) ? (
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            className={classes.button}
                                            onClick={() => handledata(event1.webinar_url, event1.track)}                                            
                                        >
                                            Watch on Demand
                                        </Button>

                                    ) :
                                        (
                                            result ? (
                                                <Button
                                                    color="secondary"
                                                    variant="contained"
                                                    onClick={() => handleagenda(event1.webinar_url, event1.track, event1.is_other_url)}
                                                // component={RouterLink}
                                                // to={`/app/keynote/${user.id}/${event.id}`}
                                                >
                                                    Watch Now
                                                </Button>
                                            )
                                                : (<Button
                                                    color="secondary"
                                                    variant="contained"
                                                    disabled={true}
                                                // component={RouterLink}
                                                // to={`/app/keynote/${user.id}/${event.id}`}
                                                >
                                                    Watch Now
                                                </Button>)
                                        )
                                }
                            </CardActions>
                        </Card>
                    </Container>
                );
            })}
        </React.Fragment>
    );
};

Itemdata.propTypes = {
    className: PropTypes.string,
    eventagenda: PropTypes.array.isRequired
};

Itemdata.defaultProps = {
    eventagenda: []
};

export default Itemdata;
