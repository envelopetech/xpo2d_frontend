import React, { Component } from 'react';
import { dummyUsers, currentuser } from "./Users";
import userimg from '../assets/images/user.jpeg';
import Talk from "talkjs";
import { makeStyles, useTheme } from '@material-ui/styles';
import Grid from "@material-ui/core/Grid";

import background from '../assets/images/network.jpg';

const useStyles = makeStyles(theme => ({
    background: {
        backgroundImage: `url(${background})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat", 
    }
}));



class MyNetwork extends Component {

    constructor(props) {
        super(props); 
        // let currentUser;
        // const currentTalkjsUser = localStorage.getItem('currentTalkjsUser');
        // if (currentTalkjsUser) {
        //     currentUser = JSON.parse(currentTalkjsUser)
        // }
        this.state = {
            currentUser: currentuser
        }
    }

    handleClick(event, userId) {        
        const { currentUser } = this.state;
        const user = dummyUsers.find(user => user.id === userId);
        /* Session initialization code */
        Talk.ready
        .then(() => {            
            /* Create the two users that will participate in the conversation */
            const me = new Talk.User(currentUser[0]);
            const other = new Talk.User(user)
            /* Create a talk session if this does not exist. Remember to replace tthe APP ID with the one on your dashboard */
            if (!window.talkSession) {
                window.talkSession = new Talk.Session({
                    appId: "CO5Nj6vj",
                    me: me
                });
            }             
            /* Get a conversation ID or create one */
            const conversationId = Talk.oneOnOneId(me, other);
            const conversation = window.talkSession.getOrCreateConversation(conversationId);
            
            /* Set participants of the conversations */
            conversation.setParticipant(me);
            conversation.setParticipant(other);

            /* Create and mount chatbox in container */
            this.chatbox = window.talkSession.createChatbox(conversation);
            this.chatbox.mount(this.container);
        })            
        .catch(e => console.error(e));
    }
    
    render() {
        const { currentUser } = this.state;


        return (
            <Grid item container style={{backgroundImage: `url(${background})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            height: "100vh" }}>
            <div className="users">
                <div className="current-user-container">
                    {
                        <div>
                            <picture className="current-user-picture">
                            <img alt={"Nisarg"} src={userimg} />
                            </picture>
                            <div className="current-user-info">
                            <h4>Nisarg Mehta</h4>
                            <p>Founder at Xporium</p>
                            </div>
                        </div>
                    }
                </div>
                <div className="users-container"> 
                    <ul>
                        { dummyUsers.map(user => 
                            <li key={user.id} className="user">
                                <picture className="user-picture">
                                    <img src={user.photoUrl} alt={`${user.name}`} />
                                </picture>
                                <div className="user-info-container">
                                    <div className="user-info">
                                        <h4>{user.name}</h4>
                                        <p>{user.info}</p>
                                    </div>
                                    <div className="user-action">

                                        <button onClick={(event) => this.handleClick(event, user.id)}>Message</button>
                                    </div>
                                </div>
                            </li>
                        )}
                    </ul>

                    <div className="chatbox-container" ref={c => this.container = c}>
                        <div id="talkjs-container" style={{height: "300px"}}><i></i></div>
                    </div>
                </div>
            </div>
            </Grid>

        )
    }
}
export default MyNetwork;