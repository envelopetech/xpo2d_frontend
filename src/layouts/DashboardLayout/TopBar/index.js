import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
    AppBar,
    Box,
    Hidden,
    IconButton,
    Toolbar,
    makeStyles,
} from '@material-ui/core';
import Logo from 'src/components/Logo';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
//import { useParams } from 'react-router';
import { useHistory, useParams } from 'react-router-dom';
//import socketIOClient from "socket.io-client";
//import Talk from 'talkjs';
import useAuth from 'src/hooks/useAuth';

const useStyles = makeStyles(theme => ({
    toolbarMargin: {
        ...theme.mixins.toolbar,
        marginBottom: "0em"
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
        marginLeft: 'auto',
    },

    tabContainter: {
        marginLeft: 'auto',
    },

    appbar: {
       background: '#ffffff',
       color: '#000000'
    },
    logo: {
        height: '60px',
     }
}));

export default function TopBar(props) {    
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const { user, logout } = useAuth();
    const history = useHistory();

    let params = useParams();    
    const handleChange = (e, value) => {
        setValue(value)
    }
    useEffect(()=> {      
        if (window.location.pathname === "/app/lobby" && value !== 0) {
            setValue(0);
        } else if (window.location.pathname === "/app/agenda" && value !== 1) {
            setValue(1);
        } else if (window.location.pathname === "/app/keynote" && value !== 2) {
            setValue(2);
        } else if (window.location.pathname === "/app/exhibition" && value !== 3) {
            setValue(3);
        } else if (window.location.pathname === "/app/networking" && value !== 4) {
            setValue(4);
        } else if (window.location.pathname === "/app/resources" && value !== 5) {
            setValue(5);
        }  else if (window.location.pathname === "/app/exhibitor" && value !== 3) {
            setValue(3); 
        }
    }, [value]);
    const handleClick = (e) => {
        setAnchorEl(e.currentTarget)
        setOpen(true)
    }
    const handleLogout = async () => {
        try {
          handleClose();
          await logout();
          history.push('/');
        } catch (err) {
          console.error(err);         
        }
      };
    const handleClose = (e) => {
        setAnchorEl(null)
        setOpen(false)
    }

    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false)

    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };   

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >

            <MenuItem>
                <IconButton aria-label="show 11 new notifications" color="inherit">
                    <Badge badgeContent={11} color="secondary">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    return (
        <React.Fragment>
            <AppBar className={classes.appbar}>
                <Toolbar>
                   <Logo page="inner"></Logo>
                    <Tabs 
                    value={value} 
                    onChange={handleChange} 
                    className={classes.tabContainter}
                    indicatorColor='secondary'
                    >
                        <Tab component={Link} to="/app/lobby" label="Lobby" />
                        <Tab component={Link} to="/app/agenda" label="Agenda" />
                        <Tab component={Link} to="/app/keynote" label="Keynote" />
                        <Tab component={Link} to="/app/exhibition" label="Exhibition" />
                        <Tab component={Link} to="/app/networking" label="Network" />
                        <Tab component={Link} to="/app/resources" label="Resources" />
                    </Tabs>
                    <div className={classes.sectionDesktop}>
                        <IconButton aria-label="show 17 new notifications" color="inherit">
                            <Badge badgeContent={17} color="secondary">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-owns={anchorEl ? "simple-menu" : undefined}
                            aria-haspopup={anchorEl ? "true" : undefined}
                            onClick={event=>handleClick(event)}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                    </div>
                    <Menu id="simple-menu" anchorEl={anchorEl} open={open} onClose={handleClose}>
                        <MenuItem onClick={handleClose} component={Link} to ="/app/profile">Profile</MenuItem>
                        <MenuItem onClick={handleLogout}>SignOut</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
            <div className={classes.toolbarMargin} />
        </React.Fragment>

    )
}

