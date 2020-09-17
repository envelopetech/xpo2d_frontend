import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'src/store';
import { makeStyles } from '@material-ui/styles';
import {Grid, List, ListItem, ListItemText, ListItemAvatar,
    ListItemSecondaryAction} from '@material-ui/core';
import Users from './Users.js';
import Styles from 'src/components/styles.css'
import Page from 'src/components/Page';
import Skeleton from 'src/components/Skeletonnetwork';
import {
    geteventexhibitorstaff
} from 'src/slices/event';
import { userpage_save } from 'src/slices/notification'
import background from 'src/assets/images/network.jpg';

const useStyles = makeStyles(theme => ({
    imgContainer: {
        margin: 'auto',
    },
    background: {
        backgroundImage: `url(${background})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
    }
}));
export default function NetworkView() {
    const classes = useStyles();
    const { exhibitorstaff } = useSelector((state) => state.event);
    const eventId = localStorage.getItem("eventId")
    const dispatch = useDispatch();

     useEffect(() => {
    const data = {
        pagename: "Network"
    }
    dispatch(userpage_save(data));
    dispatch(geteventexhibitorstaff(eventId));
}, [dispatch]);
    return (
        <Page
            className={classes.root}
            title="My Network"
        >
            {/* <Typography variant="h4" gutterbottom><MyNetwork team={exhibitorstaff}/></Typography> */}
            <Grid item container style={{
                backgroundImage: `url(${background})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                height: "100vh"
            }}>
                <Grid item style={{ position: 'absolute', right: '25%', top: ' 28%' }}>
                    <Users  exhibitors={exhibitorstaff} />
                </Grid>
            </Grid>
        </Page>
    )
}