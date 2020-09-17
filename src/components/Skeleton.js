import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import {
    Grid, Card, CardContent, Box, Typography, Divider, CardActions, CardHeader, Container, makeStyles, Breadcrumbs, Button, Link,
} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { Link as RouterLink } from 'react-router-dom';

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

export default function Variants({ bredcrumbname, headername }) {

    const classes = useStyles();
    return (

        <Box mt={3}>

            <Container maxWidth={false}>

                <Grid
                    container
                    justify="space-between"
                    spacing={3}
                >
                    <Grid item>
                        <Breadcrumbs
                            separator={<NavigateNextIcon fontSize="small" />}
                            aria-label="breadcrumb"
                        >
                            <Link
                                variant="body1"
                                color="inherit"

                                component={RouterLink}
                            >
                                Dashboard
                        </Link>
                            <Link
                                variant="body1"
                                color="inherit"

                                component={RouterLink}
                            >
                                Management
                        </Link>
                            <Typography
                                variant="body1"
                                color="textPrimary"
                            >
                                {bredcrumbname}
                            </Typography>
                        </Breadcrumbs>
                        <Typography
                            variant="h4"
                            color="textPrimary"
                        >
                            {headername}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Button
                            component={RouterLink}
                        >
                            Cancel
                </Button>
                    </Grid>
                </Grid>
                <Divider className={classes.divider} />

                <Grid
                    container
                    spacing={3}
                >
                    <Grid
                        item
                        lg={8}
                        md={6}
                        xl={9}
                        xs={12}
                    >
                        <Card >
                            <CardHeader title="" />
                            <Divider />
                            <CardContent>
                                <Grid
                                    container
                                    spacing={4}
                                >
                                    <Grid
                                       item
                                       xs={12}
                                       lg={12}
                                    >
                                        <Skeleton variant="text" />

                                    </Grid>
                                    <Grid
                                        item                                       
                                        xs={12}
                                        lg={12}
                                    >
                                        <Skeleton variant="text" />

                                    </Grid>
                                    <Grid
                                        item
                                        md={6}
                                        xs={12}
                                    >
                                        <Skeleton variant="text" />

                                    </Grid>
                                    <Grid
                                        item
                                        md={6}
                                        xs={12}
                                    >
                                        <Skeleton variant="text" />

                                    </Grid>
                                    <Grid
                                        item
                                        md={6}
                                        xs={12}
                                    >
                                        <Skeleton variant="text" />

                                    </Grid>
                                    <Grid
                                        item
                                        md={6}
                                        xs={12}
                                    >
                                        <Skeleton variant="text" />

                                    </Grid>
                                    <Grid
                                        item
                                        md={6}
                                        xs={12}
                                    >
                                        <Skeleton variant="text" />

                                    </Grid>
                                    <Grid
                                        item
                                        md={6}
                                        xs={12}
                                    >
                                        <Skeleton variant="text" />

                                    </Grid>
                                    <Grid
                                        item
                                        md={6}
                                        xs={12}
                                    >
                                        <Skeleton variant="text" />

                                    </Grid>
                                    <Grid
                                        item
                                        md={6}
                                        xs={12}
                                    >
                                        <Skeleton variant="text" />

                                    </Grid>
                                    <Grid
                                        item
                                        md={6}
                                        xs={12}
                                    >
                                        <Skeleton variant="text" />

                                    </Grid>
                                    <Grid
                                        item
                                        md={6}
                                        xs={12}
                                    >
                                        <Skeleton variant="text" />

                                    </Grid>
                                    <Grid
                                        item
                                        md={6}
                                        xs={12}
                                    >
                                        <Skeleton variant="text" />

                                    </Grid>
                                    <Grid
                                        item
                                        md={6}
                                        xs={12}
                                    >
                                        <Skeleton variant="text" />

                                    </Grid>
                                </Grid>
                            </CardContent>
                            <Divider />
                        </Card>

                    </Grid>
                    <Grid
                        item
                        lg={4}
                        md={6}
                        xl={3}
                        xs={12}
                    >
                        <Card>
                            <CardContent>
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    flexDirection="column"
                                    textAlign="center"
                                >
                                    <Typography
                                        color="textPrimary"
                                        gutterBottom
                                        variant="h4"
                                    >
                                        Image
                            </Typography>
                                    <Skeleton variant="circle" width={100} height={100} />

                                </Box>
                            </CardContent>
                            <CardActions>
                                <Skeleton variant="text" />
                            </CardActions>
                        </Card>
                        <Box mt={3}>
                            <Card>
                                <CardContent>
                                    <Box
                                        display="flex"
                                        alignItems="center"
                                        flexDirection="column"
                                        textAlign="center"
                                    >
                                        <Typography
                                            color="textPrimary"
                                            gutterBottom
                                            variant="h4"
                                        >
                                            Image
                            </Typography>
                                        <Skeleton variant="circle" width={100} height={100} />

                                    </Box>
                                </CardContent>
                                <CardActions>
                                    <Skeleton variant="text" />
                                </CardActions>
                            </Card>
                        </Box>
                    </Grid>

                </Grid>
            </Container>
        </Box>
    );
}