import React from 'react';
import {
    Grid,
    makeStyles, Card, CardActionArea, CardMedia
    , Link,

} from '@material-ui/core';
import PropTypes from 'prop-types';


const useStyles = makeStyles(theme => ({
    root: { maxWidth: 345, },
}));
const Photo = ({
    className,
    photo,
    ...rest
}) => {
    const classes = useStyles();
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