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

    const handleagenda = async (webinarid) => {
        try {

            let data = {
                webinarid: webinarid,
                email: user.email,
                name: user.name
            }
            const response = await axios.post('/api/eventspeaker/userenterwebinarcovid', data);
            if (isMountedRef.current) {
                //setdata(response.data.enter_uri);
                localStorage.setItem("webinarurl", response.data.enter_uri)
                history.push(`/app/keynote`);

            }
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
                console.log(result)
                var checkafterwebinar = moment(today).isAfter(event1.end_date)
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
                                            href={event1.webinar_url}
                                            target="_blank"
                                        >
                                            Watch on Demand
                                        </Button>

                                    ) :
                                        (
                                            result ? (
                                                <Button
                                                    color="secondary"
                                                    variant="contained"
                                                    onClick={() => handleagenda(event1.webinar_url)}
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
