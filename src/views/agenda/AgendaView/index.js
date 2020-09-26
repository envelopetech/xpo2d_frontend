import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'src/store';
import useAuth from 'src/hooks/useAuth';
import {
    getEventAgendas
} from 'src/slices/eventagenda';
import {
    makeStyles,
} from '@material-ui/core';
import Page from 'src/components/Page';
import Skeleton from 'src/components/Skeletonagenda';
import Results from './Results';
import { userpage_save } from 'src/slices/notification'

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        marginBottom: 15,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },

    agendaContainer: {
        marginTop: '1em',
    }
});
export default function AgendaView() {
    const classes = useStyles();
    const { eventagenda1, eventagenda2 } = useSelector((state) => state.eventagenda);
    // const { eventId } = useSelector((state) => state.organizer); 
    // alert(eventId)   
    const eventId = localStorage.getItem("eventId")
    const dispatch = useDispatch();
    const { user } = useAuth();


    useEffect(() => {
        const data = {
            pagename: "Agenda"
        }
        dispatch(userpage_save(data))
        dispatch(getEventAgendas(eventId));

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

    if (eventagenda1 !== undefined && eventagenda1.length === 0) {
        return <Skeleton></Skeleton>;
    }
    return (
        <Page
            className={classes.root}
            title="Event Agenda"
        >
            <Results eventagenda1={eventagenda1} eventagenda2={eventagenda2}></Results>
        </Page>

    )
}