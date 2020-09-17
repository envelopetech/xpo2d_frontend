import React, {useState} from 'react';
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

const Results = ({
    className,
    eventagenda,
    ...rest
}) => {

    const classes = useStyles();
    const { user } = useAuth();
    //const [data, setdata] = useState(null);
    const isMountedRef = useIsMountedRef();
    const history = useHistory();
    const handleagenda = async (webinarid)  => {
        try {

            let data = {
                webinarid: webinarid,
                email: user.email,
                name: user.name
            }
            const response = await axios.post('/api/eventspeaker/userenterwebinar', data);            
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
                                <Link>
                                    {/* <Button href={event.webinar_url} target="_blank" size="small" variant="contained" color="primary">Watch Now</Button> */}
                                    <Button
                                        color="secondary"
                                        variant="contained"
                                        onClick={() => handleagenda(event1.webinar_url)}
                                    // component={RouterLink}
                                    // to={`/app/keynote/${user.id}/${event.id}`}
                                    >
                                        Watch Now
                                    </Button>
                                </Link>
                            </CardActions>
                        </Card>
                    </Container>
                );
            })}
        </React.Fragment>
    );
};

Results.propTypes = {
    className: PropTypes.string,
    eventagenda: PropTypes.array.isRequired
};

Results.defaultProps = {
    eventagenda: []
};

export default Results;
