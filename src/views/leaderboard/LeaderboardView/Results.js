import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
    Avatar,
    Box,
    Card,
    InputAdornment,
    SvgIcon,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    TextField,
    Typography,
    makeStyles,
    withStyles
} from '@material-ui/core';
import {
    Search as SearchIcon
} from 'react-feather';
import getInitials from 'src/utils/getInitials';
import { useDispatch } from 'src/store';
import { sortOptions, applyPagination, applySort, applyFiltersLeaderboard } from 'src/utils/common'
import useAuth from 'src/hooks/useAuth';

const useStyles = makeStyles((theme) => ({
    root: {},
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
    footerpag: {
        marginBottom: "50px",
    },
}));

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

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
    const dispatch = useDispatch();

    const [filters, setFilters] = useState({
        hasAcceptedMarketing: null,
        isProspect: null,
        isReturning: null
    });

    const { user } = useAuth();

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
    const filteredExhibitors = applyFiltersLeaderboard(exhibitors, query, filters, ['name']);
    const sortedExhibitors = applySort(filteredExhibitors, sort);
    const paginatedExhibitors = applyPagination(sortedExhibitors, page, limit);
    const selectedSomeExhibitors = selectedExhibitors.length > 0 && selectedExhibitors.length < exhibitors.length;
    const selectedAllExhibitors = selectedExhibitors.length === exhibitors.length;

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
                </Box>
                <PerfectScrollbar>
                    <Box minWidth={700}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>
                                        Visitor Name
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        Company Name
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        Points
                                    </StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {paginatedExhibitors.map((exhibitor) => {
                                    const isExhibitorSelected = selectedExhibitors.includes(exhibitor.id);
                                    return (
                                        <TableRow
                                            hover
                                            key={exhibitor.id}
                                            selected={isExhibitorSelected}
                                        >
                                            <StyledTableCell>
                                                <Box
                                                    display="flex"
                                                    alignItems="center"
                                                >
                                                    <Avatar
                                                        className={classes.avatar}
                                                        src={exhibitor.visitor__avatar}
                                                    >
                                                        {getInitials(exhibitor.visitor__first_name)}
                                                    </Avatar>
                                                    <div>
                                                        <Typography
                                                            color="inherit"
                                                            variant="h6"
                                                        >
                                                            {exhibitor.visitor__first_name} {exhibitor.visitor__last_name}
                                                        </Typography>
                                                        <Typography
                                                            variant="body2"
                                                            color="textSecondary"
                                                        >
                                                            {exhibitor.visitor__company}
                                                        </Typography>
                                                    </div>
                                                </Box>
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                <Box
                                                    display="flex"
                                                    alignItems="center"
                                                >
                                                    <Avatar
                                                        className={classes.avatar}
                                                        src={exhibitor.exhibitor__company_logo}
                                                    >
                                                        {getInitials(exhibitor.exhibitor__name)}
                                                    </Avatar>
                                                    <div>
                                                        <Typography
                                                            color="inherit"
                                                            variant="h6"
                                                        >
                                                            {exhibitor.exhibitor__name}
                                                        </Typography>
                                                    </div>
                                                </Box>
                                            </StyledTableCell>
                                            <StyledTableCell>{exhibitor.totalscore}</StyledTableCell>
                                        </TableRow>
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
