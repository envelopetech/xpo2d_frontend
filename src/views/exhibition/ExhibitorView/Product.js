import React from 'react';
import {
    Grid,
    makeStyles, Typography, Card, CardActionArea, CardActions, CardContent, CardMedia
    , Link, Button
} from '@material-ui/core';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';
import track from 'src/utils/analytics';
import useAuth from 'src/hooks/useAuth';

const useStyles = makeStyles(theme => ({
    root: { maxWidth: 345, },
}));

const Product = ({
    className,
    product,
    ...rest
}) => {

    const classes = useStyles();
    const { user } = useAuth();
    const handleclick = (event) => {       
        track.event("Download Product Brochure", {
            "event_category": "Product Brochure",
            "event_label": user.email
        });
    }
    return (
        <React.Fragment>
            {product.map((pro) => {
                return (
                    <Grid item xs={6}>
                        <Card className={classes.root}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    alt={pro.name}
                                    height="140"
                                    image={pro.product_image}
                                    title={pro.name}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {pro.name}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {ReactHtmlParser(pro.description)}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Link href={pro.product_brochure} target="_blank" onClick={handleclick}>
                                    View Brochure                                   
                                </Link>                                
                            </CardActions>
                        </Card>
                    </Grid>
                );
            })}
        </React.Fragment>
    )
}
Product.propTypes = {
    className: PropTypes.string,
    prouct: PropTypes.array.isRequired
};

Product.defaultProps = {
    prouct: []
};

export default Product;