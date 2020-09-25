import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'src/store';
import { makeStyles } from '@material-ui/styles';
import {
    Grid, List, ListItem, ListItemText, ListItemAvatar,
    ListItemSecondaryAction
} from '@material-ui/core';
import Users from './Users.js';
import Styles from 'src/components/styles.css'
import Page from 'src/components/Page';
import Skeleton from 'src/components/Skeletonnetwork';
import {
    geteventexhibitorstaff
} from 'src/slices/event';
import { userpage_save } from 'src/slices/notification'
import background from 'src/assets/images/network.jpg';
import useAuth from 'src/hooks/useAuth';

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
    const { user } = useAuth();

    useEffect(() => {
        const data = {
            pagename: "Network"
        }
        dispatch(userpage_save(data));
        dispatch(geteventexhibitorstaff(eventId));

        const name = user.name;
        const email = user.email;
        const createdAt = Math.floor(Date.now() / 1000);
        const userId = user.user_id;
        const script = document.createElement("script");
        const t = document.createTextNode(`window.Intercom('boot', {hide_default_launcher: true, app_id: 'a5iw6q1x', name:'" + ${name} + "', email:'" + ${email} + "', created_at:'" + ${createdAt} + "', user_id:'" + ${userId} + "'});`);
        script.appendChild(t);
        //window.eval(script);
        document.body.appendChild(script);

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
                <Grid item style={{ position: 'absolute', right: '0%', top: ' 50%', backgroundColor: 'forestgreen', color: 'white' }}>
                    <Users exhibitors={exhibitorstaff} />
                </Grid>
            </Grid>
        </Page>
    )
}