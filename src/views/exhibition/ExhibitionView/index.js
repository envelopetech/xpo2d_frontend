import React, { useEffect } from 'react';
import { Box } from '@material-ui/core';
//import useAuth from 'src/hooks/useAuth';
import { useDispatch, useSelector } from 'src/store';
import Results from './Results'
import Page from 'src/components/Page';
import Skeleton from 'src/components/Skeletonexhibition';
import { getexhibitors } from 'src/slices/exhibitor'
import { userpage_save } from 'src/slices/notification'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Stallview from './Stallview';
import useAuth from 'src/hooks/useAuth';

export default function ExhibitionView() {
    const { exhibitors } = useSelector((state) => state.exhibitor);
    const eventId = localStorage.getItem("eventId")
    const dispatch = useDispatch();
    const { user } = useAuth();

    const [state, setState] = React.useState({
        iscard: true,
    });
    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    useEffect(() => {
        const data = {
            pagename: "Exhibition"
        }
        dispatch(userpage_save(data))
        dispatch(getexhibitors(eventId));

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

    if (exhibitors !== undefined && exhibitors.length === 0) {
        return <Skeleton></Skeleton>;
    }

    console.log(state.iscard)

    return (
        <Page
            title="Exhibitor">
            {/* <Box>
                <FormControlLabel
                    control={
                        <Switch
                            checked={state.iscard}
                            onChange={handleChange}
                            name="iscard"
                            color="primary"
                        />
                    }
                    label="Card"
                />
            </Box>
            {
                (state.iscard) && (<Results exhibitors={exhibitors}></Results>)
            }
            {
                (!state.iscard) && (<Stallview exhibitors={exhibitors}></Stallview>)
            } */}

            <Stallview exhibitors={exhibitors}></Stallview>

        </Page>
    )
}