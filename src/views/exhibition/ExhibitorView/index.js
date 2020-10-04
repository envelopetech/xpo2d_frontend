import React, { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { withRouter } from "react-router";
import { getexhibitor, localstorageexhibitor } from 'src/slices/exhibitor';
import Skeleton from 'src/components/Skeletonexhibitor';
import Results from './Results';
import { useDispatch, useSelector } from 'src/store';
import background from '../../../assets/images/exhibitor-bg.jpg';
import Grid from '@material-ui/core/Grid';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { userpage_save } from 'src/slices/notification'
import useAuth from 'src/hooks/useAuth';
import { lederboardsave } from 'src/slices/visitor'

// const useStyles = makeStyles(theme => ({
//     root: {
//         maxWidth: 345,
//     },

// }));

export function Exhibitor() {
    //const classes = useStyles();
    const { exhibitorid } = useParams();
    const { selectedExhibitor } = useSelector((state) => state.exhibitor);
    const dispatch = useDispatch();
    const { user } = useAuth();



    useEffect(() => {
        const data1 = {
            pagename: "Exhibitor"
        }
        dispatch(userpage_save(data1))

        const dataleaderboard = {
            exhibitor_id: exhibitorid,
            leader_type: "stallview",
        };
        dispatch(lederboardsave(dataleaderboard));

        // let data = JSON.parse(localStorage.getItem('exhibitoralldata'))
        // if (data !== undefined && data !== null && data.length > 0) {
        //     const singledata = data.find((_agenda) => _agenda.id === parseInt(exhibitorid));
        //     if (singledata !== null && singledata !== undefined) {
        //         dispatch(localstorageexhibitor(data));
        //     }
        //     else {
        //         dispatch(getexhibitor(exhibitorid));
        //     }
        // }
        // else {
        dispatch(getexhibitor(exhibitorid));
        // } 

        const name = user.name;
        const email = user.email;
        const createdAt = Math.floor(Date.now() / 1000);
        const userId = user.user_id;
        const script = document.createElement("script");
        const t = document.createTextNode(`window.Intercom('boot', {hide_default_launcher: true, app_id: 'a5iw6q1x', name:'" + ${name} + "', email:'" + ${email} + "', created_at:'" + ${createdAt} + "', user_id:'" + ${userId} + "'});`);
        script.appendChild(t);
        //window.eval(script);
        document.body.appendChild(script);

    }, []);
    if (selectedExhibitor === null) {
        return <Skeleton></Skeleton>;
    }
    return (
        <React.Fragment>
            {/* <Grid item container style={{
                position: 'relative',
                webkitTransformOrigin: '0% 0% 0',
                transformOrigin: '0% 0% 0',
                height: '100%',
                width: '100%',
                maxWidth: '100%',
                overflow: 'hidden',
            }}>
                <div className="audi-background">
                    <img alt="auditorium" src={background} className="background-fluid" />
                </div>
                <div className="exhibitor-content" style={{ position: 'absolute', margin: '0 10%' }}> */}
            <Results exhibitor={selectedExhibitor[0]}></Results>
            {/* </div>
            </Grid> */}
        </React.Fragment>
    )
}
export default withRouter(Exhibitor);