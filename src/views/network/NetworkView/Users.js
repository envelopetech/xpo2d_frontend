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
    List, ListItem, ListItemText, ListItemAvatar,
    ListItemSecondaryAction, Tooltip, Drawer

} from '@material-ui/core';
import {
    Edit as EditIcon,
    Search as SearchIcon
} from 'react-feather';
import { useDispatch } from 'src/store';
import { tabs, sortOptions, applyPagination, applySort, applyFilters } from 'src/utils/common'
import Talk from "talkjs";
import useAuth from 'src/hooks/useAuth';
import ChatIcon from '@material-ui/icons/Chat';
import { briefcasesave } from 'src/slices/event'


const useStyles = makeStyles((theme) => ({
    root: {},
    drawer: {
        width: 500,
        maxWidth: '100%'
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
}));

const Users = ({
    className,
    exhibitors,
    ...rest
}) => {
    const classes = useStyles();
    const [currentTab, setCurrentTab] = useState('all');
    const [selectedExhibitors, setselectedExhibitors] = useState([]);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(1000);
    const [query, setQuery] = useState('');
    const [sort, setSort] = useState(sortOptions[0].value);
    const [open, setOpen] = React.useState(false);
    const [selectedExhibitor, setselectedExhibitor] = React.useState();
    const dispatch = useDispatch();
    const { user, client } = useAuth();
    const [isOpen, setisOpen] = useState(false);
    const [sharedisabled, setsharedisabled] = useState(false)
    const [filters, setFilters] = useState({
        hasAcceptedMarketing: null,
        isProspect: null,
        isReturning: null
    });


    const handleOpen = () => {
        setisOpen(true);
    };

    const handleClose = () => {
        setisOpen(false);
    };

    const handleTabsChange = (event, value) => {
        const updatedFilters = {
            ...filters,
            hasAcceptedMarketing: null,
            isProspect: null,
            isReturning: null
        };

        if (value !== 'all') {
            updatedFilters[value] = true;
        }

        setFilters(updatedFilters);
        setselectedExhibitors([]);
        setCurrentTab(value);
    };

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

    const handlesharevisitongcard = (user_id, user_type, index) => {

        const data = {
            index: index,
            from_form: "sharecard",
            table_primary_id: user_id,
            user_type: user_type,
            type: "visitingcard"
        }
        dispatch(briefcasesave(data))
        //setsharedisabled(true)
    }
    const handlemessage = (event, user_id, first_name, email, avatar) => {
        setisOpen(false);
        
        

        window._demo = {};
        Talk.ready.then(() => {

            const me = new Talk.User({
                id: user.user_id,
                name: user.first_name, // get this user data from the API
                email: user.email,  // get this user data from the API
                photoUrl: user.avatar,
                welcomeMessage: "Hi there, how are you? :-)",  // get this user data from the API
                role: "Member"
            });
            window.talkSession = new Talk.Session({
                appId: process.env.REACT_APP_TALKJS_APP_ID,
                me: me
            });
            console.log(me)
            const other = new Talk.User({
                id: user_id,
                name: first_name,
                email: email,
                photoUrl: avatar,
                welcomeMessage: "Hi there, how are you? :-)",
                role: "Member"
            });
            console.log(other)
            var conversation = window.talkSession.getOrCreateConversation(Talk.oneOnOneId(me, other))
            conversation.setParticipant(me);
            conversation.setParticipant(other);

            // var inbox = window.talkSession.createInbox({ selected: conversation });
            // let element = document.getElementById("talkjs-container")
            // element.classList.add("display_block")
            // inbox.mount(document.getElementById("talkjs-container"));


            var popup = window.talkSession.createPopup(conversation, { keepOpen: true });
            popup.mount({ show: true });
            var button = document.getElementById("btn-close");
            button.classList.add("display_block")
            button.addEventListener("click", function (event) {
                event.preventDefault();
                popup.hide();
                button.classList.remove("display_block")
            });


            

            me.current_user_id = user_id;
            me.current_user_name = first_name;
            me.current_user_email = email;
            me.current_user_avatar = avatar;
            popup.on("sendMessage", function () {
                console.log("message send")
                client.network_message(me);
            })
            //client.network_message(me);
        });
    }

    const filteredExhibitors = applyFilters(exhibitors, query, filters, ['name']);
    const sortedExhibitors = applySort(filteredExhibitors, sort);
    const paginatedExhibitors = applyPagination(sortedExhibitors, page, limit);
    const selectedSomeExhibitors = selectedExhibitors.length > 0 && selectedExhibitors.length < exhibitors.length;
    const selectedAllExhibitors = selectedExhibitors.length === exhibitors.length;
    
    return (
        <>
            <Tooltip title="Chat">
                <IconButton
                    color="inherit"
                    onClick={handleOpen}
                >
                    <SvgIcon fontSize="large">
                        <ChatIcon />
                    </SvgIcon>
                    <Typography>Click to Network</Typography>
                </IconButton>
            </Tooltip>
            <Drawer
                anchor="right"
                classes={{ paper: classes.drawer }}
                ModalProps={{ BackdropProps: { invisible: true } }}
                onClose={handleClose}
                open={isOpen}
                variant="temporary"
            >
                <PerfectScrollbar options={{ suppressScrollX: true }}>

                    <Card
                        className={clsx(classes.root, className)}
                        {...rest}
                    >

                        <Divider />
                        <Box
                            mt={5}
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
                                placeholder="Search peoples"
                                value={query}
                                variant="outlined"
                            />
                            <Box flexGrow={1} />

                        </Box>
                        <Box mt={5}>
                            <PerfectScrollbar>
                                <Divider />
                                {paginatedExhibitors.map((exhibitor, index) => {
                                    let status_briefcase = exhibitor.briefcase_status
                                    let designation = ""
                                    if(exhibitor.company !== null)
                                    {
                                        designation = exhibitor.designation + " at " +  exhibitor.company 
                                    }
                                    else
                                    {
                                        designation = exhibitor.designation
                                    }
                                    return (
                                        <>
                                            <ListItem ContainerComponent="div">
                                                <ListItemAvatar>
                                                    <Avatar className={classes.avatar_small} src={exhibitor.avatar}>
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText primary={exhibitor.name} secondary={designation} />
                                                <ListItemSecondaryAction className="user-action">
                                                    <Button onClick={(event) => handlemessage(event, exhibitor.id, exhibitor.name, exhibitor.email, exhibitor.avatar)}>
                                                        Message
                                                    </Button>
                                                    {/* <Box ml={1}>
                                                        <Button onClick={() => handlesharevisitongcard(exhibitor.id, exhibitor.user_type, index)} disabled={status_briefcase}>
                                                            Share
                                                    </Button></Box> */}
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                            <Divider />
                                        </>
                                    );
                                })}
                            </PerfectScrollbar>
                        </Box>
                    </Card>
                </PerfectScrollbar>
            </Drawer>
        </>
    );
};

Users.propTypes = {
    className: PropTypes.string,
    exhibitors: PropTypes.array.isRequired
};

Users.defaultProps = {
    exhibitors: []
};

export default Users;
