import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
    Box,
    CardContent,
    Typography,
    Container,
    makeStyles,
    CardActions,
    AppBar,
    Tabs,
    Tab

} from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import ReactHtmlParser from 'react-html-parser';
import useAuth from 'src/hooks/useAuth';
import axios from 'src/utils/axios';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import Itemdata from './Itemdata'
import Skeleton from 'src/components/Skeletonagenda';

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
        marginBottom: 15,
    },
}));

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

const Results = ({
    className,
    eventagenda1,
    eventagenda2,
    ...rest
}) => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                    <Tab label="Day 1" {...a11yProps(0)} />
                    <Tab label="Day 2" {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <Itemdata eventagenda={eventagenda1}> </Itemdata>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Itemdata eventagenda={eventagenda2}> </Itemdata>
            </TabPanel>
        </div>
    );
};

Results.propTypes = {
    className: PropTypes.string,
    eventagenda: PropTypes.array.isRequired
};

Results.defaultProps = {
    eventagenda: []
};

export default Results;
