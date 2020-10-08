import React from 'react';
import {
    Link,
    makeStyles,
    CardActionArea,
    CardActions,
    CardContent,
    Card,
    Grid,
    CardMedia,
    Typography,    
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import background from 'src/assets/images/solar-panel.jpg';
import ReactHtmlParser from 'react-html-parser';

const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: 345,
        marginBottom: 20,
    },
}));

const Results = ({
    className,
    exhibitors,
    ...rest
}) => {
    const classes = useStyles();
    const history = useHistory();
    const handleexhibitorpage = (event, slugname, id) => {
        history.push(`/app/exhibitor/${slugname}/${id}`);
    }

    return (
        <React.Fragment>
            <Grid item container style={{
                backgroundImage: `url(${background})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                height: "100%",
                padding: "45px",
                backgroundAttachment: 'fixed',
            }}>
                
                    {exhibitors.map((exhibitor) => {
                        return (
                            <Grid item xs={12} sm={4} xl={3}>
                                <Card className={classes.root} onClick={(event) => handleexhibitorpage(event, exhibitor.slug, exhibitor.id)}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            alt="Contemplative Reptile"
                                            height="140"
                                            image={exhibitor.company_logo}
                                            title="Contemplative Reptile"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {exhibitor.name}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">                                                
                                                {ReactHtmlParser(exhibitor.description)}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>

                                </Card>
                            </Grid>
                        );
                    })}
               
            </Grid>
        </React.Fragment>
    )
}
Results.propTypes = {
    className: PropTypes.string,
    exhibitors: PropTypes.array.isRequired
};

Results.defaultProps = {
    exhibitors: []
};
export default Results;