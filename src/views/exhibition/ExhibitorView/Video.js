import React from 'react';
import {
    Grid,
    
} from '@material-ui/core';
import PropTypes from 'prop-types';


// const useStyles = makeStyles(theme => ({
//     root: {},
// }));

const Video = ({
    className,
    video,
    ...rest
}) => {

    //const classes = useStyles();
    return (
        <React.Fragment>
            {video.map((videodata) => {
                return (
                    <Grid item xs={4}>
                        <iframe title="Video" width="100%" height="240" src={videodata.assets_url} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </Grid>
                );
            })}
        </React.Fragment >
    )
}
Video.propTypes = {
    className: PropTypes.string,
    video: PropTypes.array.isRequired
};

Video.defaultProps = {
    video: []
};

export default Video;