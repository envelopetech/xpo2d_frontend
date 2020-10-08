<<<<<<< HEAD
import React from 'react';
import ModalImage from 'react-modal-image'
=======
import React, { useEffect } from 'react';
>>>>>>> f383b25220da6d89897a655900fe65ab8c6c8b84
import {
    Grid,
    makeStyles, Card, CardActionArea, CardMedia
    , Link,

} from '@material-ui/core';

import PropTypes from 'prop-types';
import { customlog_save } from 'src/slices/visitor'
import { useDispatch } from 'src/store';
import ModalImage from "react-modal-image"

const useStyles = makeStyles(theme => ({
    root: { maxWidth: 345, },
}));
const Photo = ({
    className,
    photo,
    exhibitorid,
    ...rest
}) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const orgid = localStorage.getItem('org_id')


    useEffect(() => {
        const dataleaderboard = {
            log_type: "stall_tabs",
            tab_type: 'photo',
            organizer_id: orgid,
            exhibitor_id: exhibitorid
        };
        dispatch(customlog_save(dataleaderboard));

    }, []);

    if (photo === null || photo.length == 0) {
        return <div>No Photos Aavailable</div>;
    }

    return (
        <React.Fragment>
            {photo.map((photodata) => {
                return (
                    <Grid item xs={4}>
                        <Card className={classes.root}>
<<<<<<< HEAD
                            <CardActionArea >
=======
                            <CardActionArea>
>>>>>>> b1f980f9d2ba0aee9d0155a86427b7d0649ef4a5
                                {/* <CardMedia
                                    component="img"
                                    alt={photodata.name}
                                    height="240"
                                    width="240"
                                    image={photodata.assets_url}
                                    title={photodata.name}
                                /> */}
<<<<<<< HEAD
                                <ModalImage
                                    small={photodata.assets_url}
                                    large={photodata.assets_url}
                                    alt={photodata.name}
                                    hideDownload='true'
                                    hideZoom='true'
                                />
                                
=======
                                <ModalImage 
                                small={photodata.assets_url}
                                large={photodata.assets_url}
                                alt={photodata.name}
                                />

>>>>>>> b1f980f9d2ba0aee9d0155a86427b7d0649ef4a5
                            </CardActionArea>
                        </Card>
                    </Grid>
                );
            })}
        </React.Fragment >
    )
}
Photo.propTypes = {
    className: PropTypes.string,
    photo: PropTypes.array.isRequired
};

Photo.defaultProps = {
    photo: []
};

export default Photo;