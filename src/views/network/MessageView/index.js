
import React, { useRef , Fragment } from 'react';
import Talk from "talkjs";
import socketIOClient from "socket.io-client";
import Talk from 'talkjs';
import useAuth from 'src/hooks/useAuth';

const MessageView = () => {
    const { user } = useAuth();
    alert("1111111111111111")
    // const container = useRef();
    // useEffect(() => {
    //     debugger;
    //     const socket = socketIOClient(process.env.REACT_APP_SOCKET_END_POINT, { 'transports': ['websocket', 'polling'] });
    //     socket.on('show_view_messages', (data) => {
    //         debugger;
    //         alert(JSON.stringify(data))
    //         if (data.current_user_id === user.user_id) {
    //             Talk.ready.then(() => {
    //                 const me = new Talk.User({
    //                     id: data.current_user_id,
    //                     name: data.current_user_name,
    //                     email: data.current_user_email,
    //                     welcomeMessage: "Hi there, how are you? :-)",
    //                     role: "Member"
    //                 });
    //                 window.talkSession = new Talk.Session({
    //                     appId: process.env.REACT_APP_TALKJS_APP_ID, // replace with your appId
    //                     me: me
    //                 });
    //                 console.log(me)
    //                 const other = new Talk.User({
    //                     id: data.id,
    //                     name: data.name, // get this user data from the API
    //                     email: data.email,  // get this user data from the API
    //                     welcomeMessage: "Hi there, how are you? :-)",  // get this user data from the API
    //                     role: "Member"
    //                 });
    //                 console.log(other)
    //                 var conversation = window.talkSession.getOrCreateConversation(Talk.oneOnOneId(other, me))
    //                 conversation.setParticipant(me);
    //                 conversation.setParticipant(other);

    //                 var inbox = window.talkSession.createInbox({ selected: conversation });
    //                 inbox.mount(container);
    //             });
    //         }
    //     })
    //     return () => {
    //         socket.off("show_view_messages");
    //     }

    // }, []);
    return (
        <Fragment>
            <div style={{ height: '500px' }} className="inbox-container" ref={container}>Loading...</div>
        </Fragment>
    );
}


export default MessageView;