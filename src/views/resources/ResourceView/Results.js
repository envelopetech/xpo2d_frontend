import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
    Avatar,
    Box,
    Button,
    Card,
    Checkbox,
    Divider,
    IconButton,
    InputAdornment,
    Link,
    SvgIcon,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Tabs,
    TextField,
    Typography,
    makeStyles,
    Paper

} from '@material-ui/core';
import {
    Search as SearchIcon
} from 'react-feather';
import getInitials from 'src/utils/getInitials';
import { useDispatch } from 'src/store';
import { tabs, sortOptions, applyPagination, applySort, applyFilters } from 'src/utils/common'
import track from 'src/utils/analytics';
import useAuth from 'src/hooks/useAuth';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { deletebriefcase } from 'src/slices/visitor'
import { lederboardsave } from 'src/slices/visitor'

const useStyles = makeStyles((theme) => ({
    root: {
    },
    queryField: {
        width: 500
    },
    bulkOperations: {
        position: 'relative'
    },
    bulkActions: {
        paddingLeft: 4,
        paddingRight: 4,
        marginTop: 6,
        position: 'absolute',
        width: '100%',
        zIndex: 2,
        backgroundColor: theme.palette.background.default
    },
    bulkAction: {
        marginLeft: theme.spacing(2)
    },
    avatar: {
        height: 42,
        width: 42,
        marginRight: theme.spacing(1)
    },
    link: {
        color: '#304ffe',
    },
    fontWeightMedium: {
        fontWeight: theme.typography.fontWeightMedium
    },
    footerpag: {
        marginBottom: "50px",
    },
}));

const Results = ({
    className,
    exhibitors,
    ...rest
}) => {
    const classes = useStyles();
    const [currentTab, setCurrentTab] = useState('all');
    const [selectedExhibitors, setselectedExhibitors] = useState([]);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [query, setQuery] = useState('');
    const [sort, setSort] = useState(sortOptions[0].value);
    const [open, setOpen] = React.useState(false);
    const [selectedExhibitor, setselectedExhibitor] = React.useState();
    const dispatch = useDispatch();


    const [expandtable, setexpandtable] = React.useState(false);
    const [viewcardtext, setviewcardtext] = React.useState("Expand");

    const [filters, setFilters] = useState({
        hasAcceptedMarketing: null,
        isProspect: null,
        isReturning: null
    });


    const { user } = useAuth();
    const handleclick = (event, type, exhibitor_id, assetsid, typetitle) => {
        track.event("Download Company Brochure ", {
            "event_category": "Company Brochure",
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


    const handleQueryChange = (event) => {
        event.persist();
        setQuery(event.target.value);
    };

    const handleSortChange = (event) => {
        event.persist();
        setSort(event.target.value);
    };

    const handleSelectAllExhibitors = (event) => {
        setselectedExhibitors(event.target.checked
            ? exhibitors.map((exhibitor) => exhibitor.id)
            : []);
    };

    const handleSelectOneExhibitor = (event, exhibitorId) => {
        if (!selectedExhibitors.includes(exhibitorId)) {
            setselectedExhibitors((prevSelected) => [...prevSelected, exhibitorId]);
        } else {
            setselectedExhibitors((prevSelected) => prevSelected.filter((id) => id !== exhibitorId));
        }
    };
    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };
    const handleLimitChange = (event) => {
        setLimit(parseInt(event.target.value));
    };
    const filteredExhibitors = applyFilters(exhibitors, query, filters, ['name']);
    const sortedExhibitors = applySort(filteredExhibitors, sort);
    const paginatedExhibitors = applyPagination(sortedExhibitors, page, limit);
    const selectedSomeExhibitors = selectedExhibitors.length > 0 && selectedExhibitors.length < exhibitors.length;
    const selectedAllExhibitors = selectedExhibitors.length === exhibitors.length;
    const enableBulkOperations = selectedExhibitors.length > 0;


    return (
        <React.Fragment>
            <Card
                className={clsx(classes.root, className)}
                {...rest}
            >
                <Box
                    p={2}
                    minHeight={56}
                    display="flex"
                    alignItems="center"
                >
                    <TextField
                        className={classes.queryField}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SvgIcon
                                        fontSize="small"
                                        color="action"
                                    >
                                        <SearchIcon />
                                    </SvgIcon>
                                </InputAdornment>
                            )
                        }}
                        onChange={handleQueryChange}
                        placeholder="Search"
                        value={query}
                        variant="outlined"
                    />
                    <Box flexGrow={1} />
                    <TextField
                        label="Sort By"
                        name="sort"
                        onChange={handleSortChange}
                        select
                        SelectProps={{ native: true }}
                        value={sort}
                        variant="outlined"
                    >
                        {sortOptions.map((option) => (
                            <option
                                key={option.value}
                                value={option.value}
                            >
                                {option.label}
                            </option>
                        ))}
                    </TextField>
                </Box>

                <PerfectScrollbar>
                    <Box minWidth={700}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            checked={selectedAllExhibitors}
                                            indeterminate={selectedSomeExhibitors}
                                            onChange={handleSelectAllExhibitors}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        File Name
                                    </TableCell>
                                    <TableCell>
                                        Type
                                    </TableCell>
                                    <TableCell>
                                        Link
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {paginatedExhibitors.map((exhibitor) => {
                                    const isExhibitorSelected = selectedExhibitors.includes(exhibitor.id);
                                    return (
                                        <>
                                            <TableRow
                                                hover
                                                key={exhibitor.id}
                                                selected={isExhibitorSelected}
                                            >
                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                        checked={isExhibitorSelected}
                                                        onChange={(event) => handleSelectOneExhibitor(event, exhibitor.id)}
                                                        value={isExhibitorSelected}
                                                    />
                                                </TableCell>

                                                <TableCell>
                                                    <Box
                                                        display="flex"
                                                        alignItems="center"
                                                    >
                                                        <Avatar
                                                            className={classes.avatar}
                                                            src={exhibitor.avatar}
                                                        >
                                                            {getInitials(exhibitor.name)}
                                                        </Avatar>
                                                        <div>
                                                            <Typography
                                                                color="inherit"
                                                                variant="h6"
                                                            >
                                                                {exhibitor.name}
                                                            </Typography>
                                                        </div>
                                                    </Box>
                                                </TableCell>
                                                <TableCell>PDF</TableCell>
                                                <TableCell numeric component="a" target="_blank" href={exhibitor.assets_url}
                                                    className={classes.link}
                                                    onClick={(event) => handleclick(event, exhibitor.typename, exhibitor.exhibitor_id, exhibitor.id, exhibitor.name)}>View</TableCell>

                                            </TableRow>
                                        </>

                                    );
                                })}
                            </TableBody>
                        </Table>
                    </Box>
                </PerfectScrollbar>
                <TablePagination
                    component="div"
                    count={filteredExhibitors.length}
                    onChangePage={handlePageChange}
                    onChangeRowsPerPage={handleLimitChange}
                    page={page}
                    rowsPerPage={limit}
                    rowsPerPageOptions={[5, 10, 25]}
                    className={classes.footerpag}
                />
            </Card>
        </React.Fragment>
    );
};

Results.propTypes = {
    className: PropTypes.string,
    exhibitors: PropTypes.array.isRequired
};

Results.defaultProps = {
    exhibitors: []
};

export default Results;
