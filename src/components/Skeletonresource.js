import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import {
    makeStyles,
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody
} from '@material-ui/core';


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
}));

export default function Variants() {
    const classes = useStyles();
    return (
        <React.Fragment>
            <div className={classes.tablewrapper}>
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
                            <TableRow> <TableCell><Skeleton variant="text" /></TableCell><TableCell><Skeleton variant="text" /></TableCell><TableCell><Skeleton variant="text" /></TableCell></TableRow>
                            <TableRow> <TableCell><Skeleton variant="text" /></TableCell><TableCell><Skeleton variant="text" /></TableCell><TableCell><Skeleton variant="text" /></TableCell></TableRow>
                            <TableRow><TableCell><Skeleton variant="text" /></TableCell><TableCell> <Skeleton variant="text" /></TableCell><TableCell><Skeleton variant="text" /></TableCell></TableRow>
                            <TableRow><TableCell><Skeleton variant="text" /></TableCell><TableCell> <Skeleton variant="text" /></TableCell><TableCell><Skeleton variant="text" /></TableCell></TableRow>
                            <TableRow><TableCell><Skeleton variant="text" /></TableCell><TableCell> <Skeleton variant="text" /></TableCell><TableCell><Skeleton variant="text" /></TableCell></TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </React.Fragment>

    );
}