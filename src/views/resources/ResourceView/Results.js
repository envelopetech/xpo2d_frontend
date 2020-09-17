import React from 'react';
import PropTypes from 'prop-types';
import {
    Box,
    makeStyles,
    Collapse,
    IconButton,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper
} from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import track from 'src/utils/analytics';
import useAuth from 'src/hooks/useAuth';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },        
    },
    tablewrapper: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
        marginBottom: 20,
    },
    link: {
        color: '#304ffe',
    },
}));



function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();

    const { user } = useAuth();
    const handleclick = (event) => {        
        track.event("Download Company Brochure ", {
            "event_category": "Company Brochure",
            "event_label": user.email
        });
    }

    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.name}
                </TableCell>
                <TableCell align="right">{row.totalcount}</TableCell>
                
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                Collection
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>File Name</TableCell>
                                        <TableCell>Type</TableCell>
                                        <TableCell align="right">Link</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.assets.map((assetsRow) => (
                                        <TableRow key={assetsRow.id}>
                                            <TableCell component="th" scope="row">
                                                {assetsRow.name}
                                            </TableCell>
                                            <TableCell>PDF</TableCell>
                                            <TableCell align="right" numeric component="a" target="_blank" href={assetsRow.assets_url} className={classes.link} onClick={handleclick}>Download</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

Row.propTypes = {
    row: PropTypes.shape({
        name: PropTypes.string.isRequired,
        totalcount: PropTypes.number.isRequired,
        assets: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
                name: PropTypes.string.isRequired
            }),
        ).isRequired,
    }).isRequired,
};


const Results = ({
    className,
    exhibitorassets,
    ...rest
}) => { 

    return (
        <React.Fragment>
            <Box margin={3}>
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>Company Name</TableCell>
                            <TableCell align="right">Assets</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {exhibitorassets.map((row) => (
                            <Row key={row.name} row={row} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            </Box>
        </React.Fragment>
    );
};

Results.propTypes = {
    className: PropTypes.string,
    exhibitorassets: PropTypes.array.isRequired
};

Results.defaultProps = {
    exhibitorassets: []
};

export default Results;
