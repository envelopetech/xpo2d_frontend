import React,{useEffect} from 'react';
//import { makeStyles } from '@material-ui/styles';
import { useDispatch } from 'src/store';
import Grid from "@material-ui/core/Grid";
import { userpage_save } from 'src/slices/notification'
// const useStyles = makeStyles(theme => ({
//     imgContainer: {
//         margin: 'auto',
//     }
// }));


export default function ThreeD() {
    //const classes = useStyles();
    const dispatch = useDispatch();


    useEffect(() => {  
        const data = {
            pagename: "3D"
        }
        dispatch(userpage_save(data))                   
    }, [dispatch]);

    return (
        <React.Fragment>
            <Grid item container direction="column"
                justify="center"
                alignItems="center" style={{ paddingTop: "15px" }}>
                {/* <Grid item container direction="column" justify="center" alignItems="center">
                <Typography variant="h2" gutterbottom>Welcome to Xporium 3D</Typography>
                <Typography variant="h6" gutterbottom>Please click on the play button below to load the 3D environment.</Typography>
                </Grid> */}
                <Grid item style={{ width: "80vw", height: "80vh" }}>
                    <iframe title="3d" width="100%" height="100%" src="https://uae.xporium.com/timesexpo/" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </Grid>

            </Grid>

        </React.Fragment>
    )
}