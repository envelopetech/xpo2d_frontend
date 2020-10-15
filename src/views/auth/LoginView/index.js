import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,  
  Container,  
  Typography,
  makeStyles,
  Divider,
  Link
} from '@material-ui/core';
import Page from 'src/components/Page';
import Logo from 'src/components/Logo';
//import useAuth from 'src/hooks/useAuth';
import logoimg from 'src/assets/images/logo-lg.png';

import JWTLogin from './JWTLogin';

// const methodIcons = {
//   'Auth0': '/static/images/auth0.svg',
//   'FirebaseAuth': '/static/images/firebase.svg',
//   'JWT': '/static/images/jwt.svg'
// };

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
  },
  banner: {
    backgroundColor: theme.palette.background.paper,
    paddingBottom: theme.spacing(2),
    paddingTop: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  bannerChip: {
    marginRight: theme.spacing(2)
  },
  methodIcon: {
    height: 30,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2)
  },
  cardContainer: {
    paddingBottom: 10,
    paddingTop: 20,       
    alignItems: 'center'    
  },
  cardContent: {
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    // minHeight: 400,
    alignItems: 'center'
  },
  currentMethodIcon: {
    height: 40,
    '& > img': {
      width: 'auto',
      maxHeight: '100%'
    }
  },
  logo: {
    height: '220px',
  },
}));

const LoginView = () => {
  const classes = useStyles();
  //const { method } = useAuth();

  return (
    <Page
    className={classes.root}
    title="Login"
  >
    
    <Container
      className={classes.cardContainer}
      maxWidth="sm"
    >
      <Box       
        display="flex"
        justifyContent="center"
      >
        <RouterLink to="/">
        <img
      alt="Logo"
      src={logoimg}
      className={classes.logo}
    />
        </RouterLink>
      </Box>
      <Card>
        <CardContent className={classes.cardContent}>
          <Box
            alignItems="center"
            display="flex"
            justifyContent="space-between"
            mb={1}
          >
            <div>
              <Typography
                color="textPrimary"
                gutterBottom
                variant="h2"
              >
                Sign in
              </Typography>                
            </div>              
          </Box>
          <Box
            flexGrow={1}
            mt={1}
          >
            <JWTLogin /> 
          </Box>
          {/* <Box my={3}>
              <Divider />
            </Box> */}
            {/* <Link
              component={RouterLink}
              to="/register"
              variant="body2"
              color="textSecondary"
            >
              Create new account
            </Link> */}
        </CardContent>
      </Card>
    </Container>
  </Page>
  );
};

export default LoginView;
