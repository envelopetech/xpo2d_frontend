import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
    imgContainer: {
        margin: 'auto',
    }
}));


export default function ThreeD() {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Grid item container direction="column"
                justify="center"
                alignItems="center" style={{ paddingTop: "15px" }}>
                <Grid item container direction="column" justify="center" alignItems="center">
                <Typography variant="h2" gutterbottom>Feedback Form</Typography>
                <Typography variant="h6" gutterbottom>Thank you for visiting us. We would love to hear your feedback.</Typography>
                <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSeSWzDgkGTubGvcKz3Fg17q5uoIvD1xEu2ggaOiVWbrejKKCQ/viewform?embedded=true" width="640" height="943" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
                </Grid>                
            </Grid>
        </React.Fragment>
    )
}