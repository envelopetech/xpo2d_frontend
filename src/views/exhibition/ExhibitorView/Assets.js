import React from 'react';
import {    
    makeStyles 
    ,Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow
    
} from '@material-ui/core';
import PropTypes from 'prop-types';
import useAuth from 'src/hooks/useAuth';
import track from 'src/utils/analytics';

const useStyles = makeStyles(theme => ({
    root: {},
    link: {
        color: '#304ffe',
    },
    table: {
        minWidth: 650,
    },
}));

const Assets = ({
    className,
    assets,
    ...rest
}) => {

    const classes = useStyles();
    const { user } = useAuth();

    const handleclick = (event) => {       
        track.event("Download Assets", {
            "event_category": "Assets",
            "event_label": user.email
        });
    }
    if (assets === null || assets.length == 0 ) {
        return <div>No Assets Aavailable</div>;
    }

    return (
        <React.Fragment>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>File Name</TableCell>                           
                            <TableCell align="right">Link</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {assets.map((asset) => {
                            return (
                                <TableRow key={asset.id}>
                                    <TableCell component="th" scope="row">
                                        {asset.name}
                                    </TableCell>                                    
                                    <TableCell align="right" numeric component="a" target="_blank" href={asset.assets_url} className={classes.link} onClick={handleclick}>Download</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </React.Fragment >
    )
}
Assets.propTypes = {
    className: PropTypes.string,
    assets: PropTypes.array.isRequired
};

Assets.defaultProps = {
    assets: []
};

export default Assets;