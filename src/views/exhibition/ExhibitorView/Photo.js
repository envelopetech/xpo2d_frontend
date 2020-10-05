import React, { useEffect } from 'react';
import {
    Grid,
    makeStyles, Card, CardActionArea, CardMedia
    , Link,

} from '@material-ui/core';
import PropTypes from 'prop-types';
import { customlog_save } from 'src/slices/visitor'
import { useDispatch } from 'src/store';

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
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    alt={photodata.name}
                                    height="240"
                                    width="240"
                                    image={photodata.assets_url}
                                    title={photodata.name}
                                />
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