import React, {useEffect} from 'react';
import ModalImage from 'react-modal-image'
import {
    Grid,
    makeStyles, Card, CardActionArea, CardMedia
    , Link,

} from '@material-ui/core';
import PropTypes from 'prop-types';
import { customlog_save } from 'src/slices/visitor'
import { useDispatch } from 'src/store';
import useAuth from 'src/hooks/useAuth';
import track from 'src/utils/analytics';

const useStyles = makeStyles(theme => ({
    root: { maxWidth: 345, },
}));
const Banner = ({
    className,
    photo,
    exhibitorid,
    ...rest
}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { user } = useAuth();
    const orgid = localStorage.getItem('org_id')


    useEffect(() => {
        const dataleaderboard = {
            log_type: "stall_tabs",
            tab_type: 'banner',
            organizer_id: orgid,
            exhibitor_id: exhibitorid
        };
        dispatch(customlog_save(dataleaderboard));

    }, []);


    const handleclick = (id, name) => {        
        track.event("View Banner", {
            "event_category": "View Banner",
            "event_label": user.email
        });

        const dataleaderboard = {
            log_type: "banner",
            organizer_id: orgid,
            visited_id: id,
            exhibitor_id: exhibitorid,
            tab_type: name,
        };
        dispatch(customlog_save(dataleaderboard));
    }

    if (photo === null || photo.length == 0) {
        return <div>No Banner Aavailable</div>;
    }

    return (
        <React.Fragment>
            {photo.map((photodata) => {
                return (
                    <Grid item xs={4}>
                        <Card className={classes.root}>
                            <CardActionArea onClick={() => handleclick(photodata.id, photodata.name)}>
                                {/* <CardMedia
                                    component="img"
                                    alt={photodata.name}
                                    height="240"
                                    width="240"
                                    image={photodata.assets_url}
                                    title={photodata.name}
                                /> */}
                                <ModalImage 
                                small={photodata.assets_url}
                                large={photodata.assets_url}
                                alt={photodata.name}
                                />

                            </CardActionArea>
                        </Card>
                    </Grid>
                );
            })}
        </React.Fragment >
    )
}
Banner.propTypes = {
    className: PropTypes.string,
    photo: PropTypes.array.isRequired
};

Banner.defaultProps = {
    photo: []
};

export default Banner;