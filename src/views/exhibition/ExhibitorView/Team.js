import React from 'react';
import {
    Grid,
    makeStyles, Typography, Button, Card, CardContent, Avatar
} from '@material-ui/core';
import PropTypes from 'prop-types';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import ChatIcon from '@material-ui/icons/Chat';
import useAuth from 'src/hooks/useAuth';
import Talk from "talkjs";
import { useDispatch } from 'src/store';
import {
    closeModal
} from 'src/slices/exhibitor';
import track from 'src/utils/analytics';
import {lederboardsave} from 'src/slices/visitor'

const useStyles = makeStyles(theme => ({
    root: {},
    button: {
        marginRight: theme.spacing(2),
    },
    large: {
        width: theme.spacing(9),
        height: theme.spacing(9),
    },
}));

const Team = ({
    className,
    team,
    ...rest
}) => {

    const classes = useStyles();
    const { user, client } = useAuth();
    const dispatch = useDispatch();
    const handlechat = (event, user_id, first_name, email, avatar) => {
        dispatch(closeModal());        
        const data = ({
            id: user.user_id,
            name: user.first_name,
            email: user.email,  // get this user data from the API
            photoUrl: user.avatar,
        })
        track.event("Initiate Chat", {
            "event_category": "chat",
            "event_label": user.email
        });

        Talk.ready.then(() => {
            const me = new Talk.User({
                id: user.user_id,
                name: user.first_name, // get this user data from the API
                email: user.email,  // get this user data from the API
                photoUrl: user.avatar,
                welcomeMessage: "Hi there, how are you? :-)",  // get this user data from the API
                role: "Member"
            });
            window.talkSession = new Talk.Session({
                appId: process.env.REACT_APP_TALKJS_APP_ID,
                me: me
            });
            console.log(me)
            const other = new Talk.User({
                id: user_id,
                name: first_name,
                email: email,
                photoUrl: avatar,
                welcomeMessage: "Hi there, how are you? :-)",
                role: "Member"
            });
            console.log(other)
            var conversation = window.talkSession.getOrCreateConversation(Talk.oneOnOneId(me, other))
            conversation.setParticipant(me);
            conversation.setParticipant(other);


            // var inbox = window.talkSession.createInbox({ selected: conversation });
            // let element = document.getElementById("talkjs-container")
            // element.classList.add("display_block")
            // inbox.mount(document.getElementById("talkjs-container"));

            var popup = window.talkSession.createPopup(conversation, { keepOpen: true });
            popup.mount({ show: true });
            var button = document.getElementById("btn-close");
            button.classList.add("display_block")
            button.addEventListener("click", function (event) {
                event.preventDefault();
                popup.hide();
                button.classList.remove("display_block")
            });

            me.current_user_id = user_id;
            me.current_user_name = first_name;
            me.current_user_email = email;
            me.current_user_avatar = avatar;
            client.team_chat(me);
            

        });

    }
    const handleclick = (exhibitorid) => {       
        const dataleaderboard = {            
            exhibitor_id: exhibitorid,            
            leader_type: "videocall",
        };
        dispatch (lederboardsave(dataleaderboard));
    }
    if (team === null || team.length == 0 ) {
        return <div>No Team Aavailable</div>;
    }
    return (
        <React.Fragment>
            {team.map((staff) => {
                return (
                    <Grid item xs={6}>
                        <Card elevation={3}>
                            <CardContent>
                                <Grid container spacing={2}>
                                    <Grid item>
                                        <Avatar alt="Remy Sharp" src={staff.avatar} variant="square" className={classes.large} />
                                    </Grid>
                                    <Grid item xs={12} sm container>
                                        <Grid item xs container direction="column">
                                            <Grid item xs>
                                                <Typography variant="h6" >{staff.name}</Typography>
                                                <Typography variant="subtitle1">{staff.designation} at {staff.exhibitor_name}</Typography>
                                                {/* <Typography variant="subtitle1" gutterBottom>Meeting ID: {staff.zoom_meeting_id}</Typography>
                                                <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    className={classes.button}
                                                    startIcon={<VideoCallIcon />}
                                                    href={staff.zoom_meeting_url}
                                                    target="_blank"
                                                    onClick={() => handleclick(staff.exhibitor_id)}
                                                >
                                                    Video Call
                                                </Button> */}
                                                <Button
                                                    onClick={(event) => handlechat(event, staff.user_id, staff.first_name, staff.email, staff.avatar)}
                                                    variant="outlined"
                                                    className={classes.button}
                                                    startIcon={<ChatIcon />}
                                                >
                                                    Chat
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                );
            })}
        </React.Fragment>
    )
}
Team.propTypes = {
    className: PropTypes.string,
    team: PropTypes.array.isRequired
};

Team.defaultProps = {
    team: []
};

export default Team;