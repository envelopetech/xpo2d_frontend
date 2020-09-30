import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Avatar,
  Box,  
  Card,
  CardActions,
  CardContent,
  Typography,
  makeStyles
} from '@material-ui/core';
import ReactFilestack from 'filestack-react';
import { useDispatch } from 'src/store';
import {
  updateUserprofilepic
} from 'src/slices/generalsettings';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles((theme) => ({
  root: {},
  name: {
    marginTop: theme.spacing(1)
  },
  avatar: {
    height: 100,
    width: 100
  }
}));

const ProfileDetails = ({ className, user, ...rest }) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();


  const handleprofilepic = async (result) => {    
    let url = result.filesUploaded[0]["url"]    
    const data = {
      avatar: url,
    };
    try {     
      await dispatch(updateUserprofilepic(data));      
      enqueueSnackbar('Profile pic updated', {
        variant: 'success'
      });
    } catch (err) {
      console.error(err);      
    }
  };
  // const handlecompanylogo = async (result) => {    
  //   let url = result.filesUploaded[0]["url"]    
  //   const data = {
  //     avatar: url,
  //   };
  //   try {     
  //     await dispatch(updateUsercompanylogo(data));      
  //     enqueueSnackbar('Company logo updated', {
  //       variant: 'success'
  //     });
  //   } catch (err) {
  //     console.error(err);      
  //   }
  // };

  const classes = useStyles();
  return (
    <React.Fragment>
      <Card
        className={clsx(classes.root, className)}
        {...rest}
      >
        <CardContent>
          <Box
            display="flex"
            alignItems="center"
            flexDirection="column"
            textAlign="center"
          >
            <Typography
              className={classes.name}
              color="textPrimary"
              gutterBottom
              variant="h4"
            >
              Profile Photo
          </Typography>
            <Avatar
              className={classes.avatar}
              src={user.avatar}
            />

          </Box>
        </CardContent>
        <CardActions>

          <ReactFilestack
            apikey={process.env.REACT_APP_FILESTACK_API_KEY}
            componentDisplayMode={{
              type: 'button',
              customText: "Edit Picture",
              customClass: "MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-fullWidth"
            }}
            onSuccess={handleprofilepic}
          />
        </CardActions>
      </Card>
     
    </React.Fragment>


  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object.isRequired
};

export default ProfileDetails;
