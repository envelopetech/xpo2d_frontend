import React from 'react';
import ImageMapper from 'react-image-mapper';
import { makeStyles } from '@material-ui/styles';
import { dummyUsers } from "./Users";
import Styles from './styles.css';
import userimg from '../assets/images/user.jpeg';
import Talk from "talkjs";



const useStyles = makeStyles(theme => ({
    imgContainer: {
        margin: 'auto',
    }
}));

const MAP = {
    name: "lobby-map",
    areas: [
        { name: "Auditorium", shape: "rect", coords: [105, 138, 263, 209], href: "/keynote" },
        { name: "Resources", shape: "rect", coords: [364, 288, 499, 368], href: "/resources" },
        { name: "Exhibition", shape: "rect", coords: [621, 299, 869, 364], href: "/exhibition" },
        { name: "Networking", shape: "rect", coords: [1065, 267, 1212, 327], href: "/networking" },

    ]
};



export default function Network() {
    const classes = useStyles();
    const { currentUser } = "Nisarg Mehta";
    return (
        <React.Fragment>
            <div className="users">
                <div className="current-user-container">

                    <div>
                        <picture className="current-user-picture">
                            <img alt={"Nisarg"} src={userimg} />
                        </picture>
                        <div className="current-user-info">
                            <h3>Nisarg Mehta</h3>
                            <p>Founder at Xporium</p>
                        </div>
                    </div>

                </div>
                <div className="users-container">
                    <ul>
                        {dummyUsers.map(user =>
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
                                        <button onClick={(userId) => this.handleClick(user.id)}>Message</button>
                                    </div>
                                </div>
                            </li>
                        )}
                    </ul>
                    <div className="chatbox-container" ref={c => this.container = c}>
                        <div id="talkjs-container" style={{ height: "300px" }}><i></i></div>
                    </div>
                </div>
            </div>
           

        </React.Fragment >



    )
}