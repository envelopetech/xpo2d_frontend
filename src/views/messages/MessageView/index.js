
import React, { Fragment, useEffect } from 'react';
import Talk from 'talkjs';
import useAuth from 'src/hooks/useAuth';
import {
    Box,
} from '@material-ui/core';

const MessageView = () => {
    const { user, client } = useAuth();
    useEffect(() => {
        Talk.ready.then(() => {
            const me = new Talk.User({
                id: user.user_id,
                name: user.name,
                email: user.email,
                photoUrl: user.avatar,
                welcomeMessage: "Hi there, how are you? :-)",
                role: "Member"
            });
            window.talkSession = new Talk.Session({
                appId: process.env.REACT_APP_TALKJS_APP_ID, // replace with your appId
                me: me
            });
            var inbox = window.talkSession.createInbox();
            inbox.mount(document.getElementById("talkjs-container1"));


            let current_user_id = null;
            let current_user_name = null;

            inbox.on("conversationSelected", (evt) => {
                console.log(evt.others);                
                current_user_id = evt.others[0]["id"];
                current_user_name = evt.others[0]["name"];              

                me.current_user_id = current_user_id;
                me.current_user_name = current_user_name;

            });
            inbox.on("sendMessage", () => {               
                client.network_message(me);
            });
        });
    }, []);
    return (
        <Fragment>
            <Box mt={4}>
                <div style={{ height: '500px' }} className="inbox-container" id="talkjs-container1">Loading...</div></Box>
        </Fragment>
    );
}
export default MessageView;