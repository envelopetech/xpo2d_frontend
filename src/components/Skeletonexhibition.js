import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import {
    Card, CardContent, Typography, Grid, makeStyles, CardActionArea
} from '@material-ui/core';
import background from 'src/assets/images/exhibit-hall.jpg';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
        marginBottom: 20,
    },

}));

export default function Variants() {
    const classes = useStyles();
    return (
        <React.Fragment>

            <Grid item container style={{
                height: "100%",
                padding: "45px",
                backgroundAttachment: 'fixed',
            }}>

                <Grid item xs={12} sm={4} xl={3}>
                    <Card className={classes.root}>
                        <CardActionArea>
                            <Skeleton variant="square" width={140} height={140} />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    <Skeleton variant="text" />
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    <Skeleton variant="text" />
                                </Typography>
                            </CardContent>
                        </CardActionArea>

                    </Card>
                </Grid>

                <Grid item xs={12} sm={4} xl={3}>
                    <Card className={classes.root}>
                        <CardActionArea>
                            <Skeleton variant="square" width={140} height={140} />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    <Skeleton variant="text" />
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    <Skeleton variant="text" />
                                </Typography>
                            </CardContent>
                        </CardActionArea>

                    </Card>
                </Grid>
                <Grid item xs={12} sm={4} xl={3}>
                    <Card className={classes.root}>
                        <CardActionArea>
                            <Skeleton variant="square" width={140} height={140} />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    <Skeleton variant="text" />
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    <Skeleton variant="text" />
                                </Typography>
                            </CardContent>
                        </CardActionArea>

                    </Card>
                </Grid>
                <Grid item xs={12} sm={4} xl={3}>
                    <Card className={classes.root}>
                        <CardActionArea>
                            <Skeleton variant="square" width={140} height={140} />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    <Skeleton variant="text" />
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    <Skeleton variant="text" />
                                </Typography>
                            </CardContent>
                        </CardActionArea>

                    </Card>
                </Grid>
                <Grid item xs={12} sm={4} xl={3}>
                    <Card className={classes.root}>
                        <CardActionArea>
                            <Skeleton variant="square" width={140} height={140} />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    <Skeleton variant="text" />
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    <Skeleton variant="text" />
                                </Typography>
                            </CardContent>
                        </CardActionArea>

                    </Card>
                </Grid>
                <Grid item xs={12} sm={4} xl={3}>
                    <Card className={classes.root}>
                        <CardActionArea>
                            <Skeleton variant="square" width={140} height={140} />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    <Skeleton variant="text" />
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    <Skeleton variant="text" />
                                </Typography>
                            </CardContent>
                        </CardActionArea>

                    </Card>
                </Grid>
                <Grid item xs={12} sm={4} xl={3}>
                    <Card className={classes.root}>
                        <CardActionArea>
                            <Skeleton variant="square" width={140} height={140} />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    <Skeleton variant="text" />
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    <Skeleton variant="text" />
                                </Typography>
                            </CardContent>
                        </CardActionArea>

                    </Card>
                </Grid>
            </Grid>
        </React.Fragment>

    );
}