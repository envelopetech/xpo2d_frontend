import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import {
    Card, CardContent, Typography, CardActions, Container, makeStyles, Button, Link,
} from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: '100%',
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3)
    },
    divider: {
        width: 0,
        height: 32,
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2)
    }
}));

export default function Variants() {
    const classes = useStyles();
    return (
        <React.Fragment>


            <Container className={classes.agendaContainer}>
                <Card className={classes.root}>
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            <Skeleton variant="text" />
                        </Typography>
                        <Typography variant="h5" component="h2">
                            <Skeleton variant="text" />
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                        <Skeleton variant="text" />
                        </Typography>
                        <Typography variant="body2" component="p">
                            <Skeleton variant="text" />
                            <br />
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Link>
                            <Button target="_blank" size="small" variant="contained" color="primary"><Skeleton variant="text" /></Button></Link>
                    </CardActions>
                </Card>
            </Container>
        </React.Fragment>

    );
}