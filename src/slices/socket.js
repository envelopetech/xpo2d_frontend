import socketIOClient from "socket.io-client";


export default function () {
    const socket = socketIOClient(process.env.REACT_APP_SOCKET_END_POINT, { 'transports': ['websocket', 'polling'] });    
    function test(data) {
        socket.emit('test', data)
    }
 
    function team_chat(data) {
        socket.emit('team_chat', data)
    }
    function network_message(data) {
        socket.emit('network_message', data)
    }

    function view_messages(data) {
        socket.emit('view_messages', data)
    }
    return {
        test,   
        team_chat,
        network_message,
        view_messages
    }
}