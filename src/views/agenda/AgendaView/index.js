import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'src/store';
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



    useEffect(() => {
        const data = {
            pagename: "Agenda"
        }
        dispatch(userpage_save(data))
        dispatch(getEventAgendas(eventId));
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