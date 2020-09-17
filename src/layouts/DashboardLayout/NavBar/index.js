// /* eslint-disable no-use-before-define */
// import React, { useEffect } from 'react';
// import { matchPath } from 'react-router-dom';
// import { Link as RouterLink } from 'react-router-dom';
// import PerfectScrollbar from 'react-perfect-scrollbar';
// import PropTypes from 'prop-types';


// import {
//   Avatar,
//   Box,
//   Chip,
//   Divider,
//   Drawer,
//   Hidden,
//   Link,
//   List,
//   ListSubheader,
//   Typography,
//   makeStyles
// } from '@material-ui/core';
// import ReceiptIcon from '@material-ui/icons/ReceiptOutlined';
// import {
//   Briefcase as BriefcaseIcon,
//   Calendar as CalendarIcon,
//   ShoppingCart as ShoppingCartIcon,
//   Folder as FolderIcon,
//   BarChart as BarChartIcon,
//   Lock as LockIcon,
//   UserPlus as UserPlusIcon,
//   AlertCircle as AlertCircleIcon,
//   Trello as TrelloIcon,
//   User as UserIcon,
//   Layout as LayoutIcon,
//   Edit as EditIcon,
//   DollarSign as DollarSignIcon,
//   Mail as MailIcon,
//   MessageCircle as MessageCircleIcon,
//   PieChart as PieChartIcon,
//   Share2 as ShareIcon,
//   Users as UsersIcon
// } from 'react-feather';
// import Logo from '../../../components/Logo';
// import NavItem from './NavItem';

// const sections = [
//   {
//     subheader: 'Reports',
//     items: [
//       {
//         title: 'Dashboard',
//         icon: PieChartIcon,
//         href: '/app/reports/dashboard'
//       },
//       {
//         title: 'Dashboard Alternative',
//         icon: BarChartIcon,
//         href: '/app/reports/dashboard-alternative'
//       }
//     ]
//   },
// ];


// const useStyles = makeStyles(() => ({
//   mobileDrawer: {
//     width: 256
//   },
//   desktopDrawer: {
//     width: 256,
//     top: 64,
//     height: 'calc(100% - 64px)'
//   },
//   avatar: {
//     cursor: 'pointer',
//     width: 64,
//     height: 64
//   }
// }));

// const NavBar = ({ onMobileClose, openMobile }) => {
//   const classes = useStyles();




//   const content = (
//     <Box
//       height="100%"
//       display="flex"
//       flexDirection="column"
//     >
//       <PerfectScrollbar options={{ suppressScrollX: true }}>
//         <Hidden lgUp>
//           <Box
//             p={2}
//             display="flex"
//             justifyContent="center"
//           >
//             <RouterLink to="/">
//               <Logo />
//             </RouterLink>
//           </Box>
//         </Hidden>
//         <Box p={2}>
//           <Box
//             display="flex"
//             justifyContent="center"
//           >
//            </Box>

//           <Box
//             mt={2}
//             textAlign="center"
//           >
//               </Box>
//               </Box>

//         <Divider />
//         <Box p={2}>
//           {sections.map((section) => (
//             <List
//               key={section.subheader}
//               subheader={(
//                 <ListSubheader
//                   disableGutters
//                   disableSticky
//                 >
//                   {section.subheader}
//                 </ListSubheader>
//               )}
//             >

//             </List>
//           ))}
//         </Box>
//         <Divider />
//         <Box p={2}>
//           <Box
//             p={2}
//             borderRadius="borderRadius"
//             bgcolor="background.dark"
//           >
//             <Typography
//               variant="h6"
//               color="textPrimary"
//             >
//               Need Help?
//             </Typography>

//           </Box>
//         </Box>
//       </PerfectScrollbar>
//     </Box>
//   );

//   return (
//     <>
//       <Hidden lgUp>
//         <Drawer
//           anchor="left"
//           classes={{ paper: classes.mobileDrawer }}
//           onClose={onMobileClose}
//           open={openMobile}
//           variant="temporary"
//         >
//           {content}
//         </Drawer>
//       </Hidden>
//       <Hidden mdDown>
//         <Drawer
//           anchor="left"
//           classes={{ paper: classes.desktopDrawer }}
//           open
//           variant="persistent"
//         >
//           {content}
//         </Drawer>
//       </Hidden>
//     </>
//   );
// };

// NavBar.propTypes = {
//   onMobileClose: PropTypes.func,
//   openMobile: PropTypes.bool
// };

// export default NavBar;

import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import HomeIcon from '@material-ui/icons/Home';
import MailIcon from '@material-ui/icons/Mail';
import DraftsIcon from '@material-ui/icons/Drafts';
import logo from '../../../assets/images/logo.png';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Email';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Link } from 'react-router-dom';
import Badge from '@material-ui/core/Badge';
import Grid from '@material-ui/core/Grid';
import Account from '../TopBar/Account';
import Contacts from '../TopBar/Contacts';
//import Notifications from '../TopBar/Notifications';
//import Search from '../TopBar/Search';
import Settings from '../TopBar/Settings';
import EventIcon from '@material-ui/icons/Event';
import SlideshowIcon from '@material-ui/icons/Slideshow';
import ArtTrackIcon from '@material-ui/icons/ArtTrack';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import Tooltip from '@material-ui/core/Tooltip';
import AspectRatioOutlinedIcon from '@material-ui/icons/AspectRatioOutlined';
import BusinessCenterOutlinedIcon from '@material-ui/icons/BusinessCenterOutlined';
import useAuth from 'src/hooks/useAuth';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    //display: 'flex',
    height: '64px',
  },
  logo: {
    height: '60px',
    marginLeft: '35%',
  },
  appBar: {
    background: '#ffffff',
    color: '#000000',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

export default function NavBar() { 
  const classes = useStyles();
  const theme = useTheme();
  const { user } = useAuth();
  const [open, setOpen] = React.useState(false);
  let logo1 = localStorage.getItem("org_logo")
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget)
    setOpen(true)
  }

  const handleClose = (e) => {
    setAnchorEl(null)
    setOpen(false)
  }

  const [anchorEl, setAnchorEl] = useState(null);


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const menuId = 'primary-search-account-menu';

  //   const renderMenu = (
  //     <Menu
  //         anchorEl={anchorEl}
  //         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
  //         id={menuId}
  //         keepMounted
  //         transformOrigin={{ vertical: 'top', horizontal: 'right' }}
  //         open={isMenuOpen}
  //         onClose={handleMenuClose}
  //     >
  //         <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
  //         <MenuItem onClick={handleMenuClose}>My account</MenuItem>
  //     </Menu>
  // );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            <Grid
              container
              direction="column"
              justify="flex-start"
              alignItems="flex-start"
            >
              <Grid item>
                Total Attendees: {user.totalattendee}
                </Grid>
              <Grid item>
                Now Attending: {user.nowattendee}
                </Grid>
            </Grid>
          </Typography>
          <img alt="company logo" src={logo1} className={classes.logo} />
          <Box
            ml={2}
            flexGrow={1}
          />
          {/* <Search /> */}
          <Contacts />
          {/* <Notifications /> */}


          <Box ml={2}>
            <Account />
          </Box>

          {/* <div className={classes.sectionDesktop}>

                        <IconButton aria-label="show 17 new notifications" color="inherit">
                            <Badge badgeContent={17} color="secondary" component={Link} to="/messaging" label="Message" >
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
                        <MenuItem onClick={handleClose} component={Link} to ="/profile">Profile</MenuItem>
                        <MenuItem onClick={handleClose}>SignOut</MenuItem>
                    </Menu> */}
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        {/* <List>
          {['Lobby', 'Starred'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List> */}
        <Divider />
        {/* <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List> */}
        <List component="nav" aria-label="main mailbox folders">
          <Tooltip title="Lobby" placement="right">
            <ListItemLink component={Link} to="/app/lobby">
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Lobby" />
            </ListItemLink>
          </Tooltip>

          <Tooltip title="Agenda" placement="right">
            <ListItemLink component={Link} to="/app/agenda">
              <ListItemIcon>
                <EventIcon />
              </ListItemIcon>
              <ListItemText primary="Agenda" />
            </ListItemLink>
          </Tooltip>

          <Tooltip title="Keynote" placement="right">
            <ListItemLink component={Link} to="/app/keynote">
              <ListItemIcon>
                <SlideshowIcon />
              </ListItemIcon>
              <ListItemText primary="Keynote" />
            </ListItemLink>
          </Tooltip>

          <Tooltip title="Exhibition" placement="right">
            <ListItemLink component={Link} to="/app/exhibition">
              <ListItemIcon>
                <ArtTrackIcon />
              </ListItemIcon>
              <ListItemText primary="Exhibition" />
            </ListItemLink>
          </Tooltip>

          <Tooltip title="Network" placement="right">
            <ListItemLink component={Link} to="/app/networking">
              <ListItemIcon>
                <PeopleOutlineIcon />
              </ListItemIcon>
              <ListItemText primary="Network" />
            </ListItemLink>
          </Tooltip>

          <Tooltip title="Resources" placement="right">
            <ListItemLink component={Link} to="/app/resources">
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Resources" />
            </ListItemLink>
          </Tooltip>

          <Tooltip title="3D View" placement="right">
            <ListItemLink component={Link} to="/app/3D">
              <ListItemIcon>
                <AspectRatioOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="3D View" />
            </ListItemLink>
          </Tooltip>

        </List>
        <Divider />
        <List>
          <ListItemLink component={Link} to="/app/leaderboard">
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Leaderboard" />
          </ListItemLink>

          <ListItemLink component={Link} to="/app/briefcase">
            <ListItemIcon>
              <BusinessCenterOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Briefcase" />
          </ListItemLink>

          <ListItemLink component={Link} to="/app/feedback">
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Feedback" />
          </ListItemLink>
        </List>
        <Divider />

      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />

      </main>
    </div>
  );
}