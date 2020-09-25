import React, {
  useRef,
  useState,
  useEffect
} from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Badge,
  Avatar,
  Box,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Popover,
  SvgIcon,
  Tooltip,
  Typography,
  makeStyles,
  Button
} from '@material-ui/core';
import { Mail as MailIcon } from 'react-feather';
import { useDispatch } from 'src/store';
import useAuth from 'src/hooks/useAuth';
import socketIOClient from "socket.io-client";
import Talk from "talkjs";
import {
  Bell as BellIcon,
  Package as PackageIcon,
  MessageCircle as MessageIcon,
  Truck as TruckIcon
} from 'react-feather';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  badge: {
    height: 25,
    width: 25,
    borderRadius: 20,
    marginTop: 10,
    marginRight: 10
  },
  popover: {
    width: 320,
    padding: theme.spacing(2)
  },
  list: {
    padding: theme.spacing(1, 3)
  },
  listItemText: {
    marginRight: theme.spacing(1)
  },
  lastActivity: {
    whiteSpace: 'nowrap'
  }
}));

const Contacts = () => {
  const classes = useStyles();
  const history = useHistory();
  const ref = useRef(null);
  const dispatch = useDispatch();
  const [isOpen, setOpen] = useState(false);
  const [messengerdata, setmessengerdata] = useState([]);
  const { user, client } = useAuth();

  const [messagecount, setmessagecount] = useState(0);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const socket = socketIOClient(process.env.REACT_APP_SOCKET_END_POINT, { 'transports': ['websocket', 'polling'] });
    console.log("11111111111111111111111")
    socket.on('show_network_message', (data) => {  
      console.log("2222222222222222222222")
      if (data.current_user_id === user.user_id) {
        console.log("3333333333333333333333")
        setmessengerdata(data)
        let message_count = parseInt(messagecount, 10) + 1
        setmessagecount(parseInt(message_count))

      }
    })
    return () => {
      socket.off("show_network_message");
    }
  }, []);
  const handlemessages = (event) => {
    try {
      setmessagecount(0)
      client.view_messages(messengerdata);
      history.push('/app/messages');
      setOpen(false);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <Tooltip title="Messages">
        <Badge
          badgeContent={messagecount} color="primary"
          classes={{ badge: classes.badge }}
        >
          <IconButton
            color="inherit"
            onClick={handleOpen}
            ref={ref}
          >
            <SvgIcon fontSize="small">
              <MailIcon />
            </SvgIcon>
          </IconButton>
        </Badge>
      </Tooltip>
      <Popover
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        classes={{ paper: classes.popover }}
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
      >
        {messengerdata.length === 0 ? (
          <Box p={2}>
            <Typography
              variant="h6"
              color="textPrimary"
            >
              There are no messages
            </Typography>
          </Box>
        ) : (
            <>
              <List disablePadding>
                <ListItem onClick={(event) => handlemessages(event)}
                  divider
                >
                  <ListItemAvatar>
                    <Avatar
                      className={classes.icon}
                      src={messengerdata.avatar}
                    >
                      <SvgIcon fontSize="small">
                        <MessageIcon />
                      </SvgIcon>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${messengerdata.name} message you`}
                    primaryTypographyProps={{ variant: 'subtitle2', color: 'textPrimary' }}
                  />
                </ListItem>
              </List>
              <Box
                p={1}
                display="flex"
                justifyContent="center"
              >
                <Button
                  component={RouterLink}
                  size="small"
                  to="#"
                >
                  Mark all as read
              </Button>
              </Box>
            </>
          )}

      </Popover>
    </>
  );
};
export default Contacts;