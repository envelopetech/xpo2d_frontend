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
import BusinessCenterOutlinedIcon from '@material-ui/icons/BusinessCenterOutlined';
import { IconButton,Tooltip } from '@material-ui/core'
import { briefcasesave } from 'src/slices/event'
import { useSnackbar } from 'notistack';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
const useStyles = makeStyles(theme => ({
    root: {},
    link: {
        color: '#304ffe',
    },
    table: {
        minWidth: 650,
    },
    snackbar: {
        bottom: "45px"
    }
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
    const { enqueueSnackbar } = useSnackbar();   
    const [open, setOpen] = React.useState(false);

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

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };

    const briefcaseClick = (assetid, index) => {
        try {
            const data = {
                index:index,
                from_form: "exhibitor_asset", //exhibitor product   exhibitor asset
                table_primary_id: assetid,//product id  assetid
                type: "assets",
                organizer_id: orgid //product assets
            }
            dispatch(briefcasesave(data))
            // enqueueSnackbar('Data save in your briefcase.', {
            //     variant: 'success'
            // });
            setOpen(true);

        } catch (err) {
            console.error(err);            
        }
        
        
        //setsharedisabled(true)
    }

    return (
        <React.Fragment>
            <Snackbar open={open}  className={classes.snackbar}
            autoHideDuration={6000} 
            onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                Data saved in your briefcase
                </Alert>
            </Snackbar>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>File Name</TableCell>
                            <TableCell align="right">Link</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {assets.map((asset, index) => {
                            return (
                                <TableRow key={asset.id}>
                                    <TableCell component="th" scope="row">
                                        {asset.name}
                                    </TableCell>
                                    <TableCell align="right" numeric component="a" target="_blank" href={asset.assets_url}
                                        className={classes.link}
                                        onClick={() => handleclick(asset.exhibitor_id, asset.id, asset.name)}
                                    >Download
                                   
                                    </TableCell>
                                    <TableCell>
                                    <Tooltip title='Briefcase'>
                                <IconButton  onClick={() => briefcaseClick(asset.id, index)}>
                                <BusinessCenterOutlinedIcon />
                                </IconButton>
                                </Tooltip>
                                </TableCell>
                                    
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