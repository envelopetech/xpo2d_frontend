import React, { useEffect } from 'react';
import {
    makeStyles
    , Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow

} from '@material-ui/core';
import PropTypes from 'prop-types';
import useAuth from 'src/hooks/useAuth';
import track from 'src/utils/analytics';
import { lederboardsave, customlog_save } from 'src/slices/visitor'
import { useDispatch } from 'src/store';

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
            tab_type: 'assets',
            organizer_id: orgid,
            exhibitor_id: exhibitorid
        };
        dispatch(customlog_save(dataleaderboard));

    }, []);

    const handleclick = (exhibitor_id, assetsid, typetitle) => {
        track.event("Download Assets", {
            "event_category": "Assets",
            "event_label": user.email
        });

        const dataleaderboard = {
            exhibitor_id: exhibitor_id,
            assetsid: assetsid,
            leader_type: "downloadresources",
            typetitle: typetitle
        };
        dispatch(lederboardsave(dataleaderboard));
    }
    if (assets === null || assets.length == 0) {
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
                                    <TableCell align="right" numeric component="a" target="_blank" href={asset.assets_url}
                                        className={classes.link}
                                        onClick={() => handleclick(asset.exhibitor_id, asset.id, asset.name)}
                                    >Download</TableCell>
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