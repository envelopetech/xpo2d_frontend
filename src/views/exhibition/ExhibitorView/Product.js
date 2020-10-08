import React, { useEffect } from 'react';
import {
    Grid,
    makeStyles, Typography, Card, CardActionArea, CardActions, CardContent, CardMedia
    , Link, Button
} from '@material-ui/core';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';
import track from 'src/utils/analytics';
import useAuth from 'src/hooks/useAuth';
import { customlog_save } from 'src/slices/visitor'
import { useDispatch } from 'src/store';

const useStyles = makeStyles(theme => ({
    root: { maxWidth: 345, },
}));

const Product = ({
    className,
    product,
    exhibitorid,
    ...rest
}) => {

    const classes = useStyles();
    const { user } = useAuth();
    const dispatch = useDispatch();

    const orgid = localStorage.getItem('org_id')


    useEffect(() => {
        const dataleaderboard = {
            log_type: "stall_tabs",
            tab_type: 'product',
            organizer_id: orgid,
            exhibitor_id: exhibitorid
        };
        dispatch(customlog_save(dataleaderboard));

    }, []);

    const handleclick = (id, name) => {
        track.event("Download Product Brochure", {
            "event_category": "Product Brochure",
            "event_label": user.email
        });

        const dataleaderboard = {
            log_type: "productbrochure",
            organizer_id: orgid,
            visited_id: id,
            exhibitor_id: exhibitorid,
            tab_type: name,
        };
        dispatch(customlog_save(dataleaderboard));
    }
    if (product === null || product.length == 0) {
        return <div>No Products Aavailable</div>;
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
                                <Link href={pro.product_brochure} target="_blank" onClick={() => handleclick(pro.id, pro.name)}>
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