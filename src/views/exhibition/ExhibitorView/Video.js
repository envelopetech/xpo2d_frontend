import React, { useEffect } from 'react';
import {
    Grid,
    makeStyles
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { customlog_save } from 'src/slices/visitor'
import useAuth from 'src/hooks/useAuth';
import { useDispatch } from 'src/store';
import track from 'src/utils/analytics';
import ReactPlayer from 'react-player'



const useStyles = makeStyles(theme => ({
    root: { maxWidth: 345, },
}));

const Video = ({
    className,
    video,
    exhibitorid,
    ...rest
}) => {
    const classes = useStyles();
    const orgid = localStorage.getItem('org_id')
    const { user } = useAuth();
    const dispatch = useDispatch();

    useEffect(() => {
        const dataleaderboard = {
            log_type: "stall_tabs",
            tab_type: 'video',
            organizer_id: orgid,
            exhibitor_id: exhibitorid
        };
        dispatch(customlog_save(dataleaderboard));

    }, []);


    const customloghandler = (id) => {
        track.event("Play Video", {
            "event_category": "Video",
            "event_label": user.email
        });

        const dataleaderboard = {
            log_type: "playvideo",
            organizer_id: orgid,
            visited_id: id,
            exhibitor_id: exhibitorid
        };
        dispatch(customlog_save(dataleaderboard));
    }
    if (video === null || video.length == 0) {
        return <div>No Videos Aavailable</div>;
    }
    //const classes = useStyles();
    return (
        <React.Fragment>
            {video.map((videodata) => {
                return (
                    <Grid item xs={4}>
                        {/* <iframe title="Video" width="100%" height="240" src={videodata.assets_url} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe> */}
                        <ReactPlayer url={videodata.assets_url} className={classes.anchorVideo}
                            width="100%" height="240"
                            playing='true'
                            volume='6'
                            loop='true'
                            onStart={() => customloghandler(videodata.id)} />
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