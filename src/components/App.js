import React, {useState} from 'react';
import { ThemeProvider } from '@material-ui/styles';
import theme from '../theme'
import Login from './ui/Login';
import TopBar from '../layouts/DashboardLayout/TopBar';
import NavBar from '../layouts/DashboardLayout/NavBar'
import DashboardLayout from '../layouts/DashboardLayout';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Lobby from '../components/Lobby';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import logo from '../Assets/logo.png';
import UserDetails from './UserDetails';
import Agenda from './Agenda';
import Keynote from './Keynote'
import Loginview from '../views/auth/LoginView';
import ExhibitorView from '../views/exhibition/ExhibitorView';
import Footer from '../components/Footer';
import Messaging from '../components/Messaging';

import { HashRouter } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  cotterContainer: {
    margin: 'auto',
 },
 logo: {
  height: '72px',
},

formSection: {
  padding: '20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 4px 8px 0 rgba(0,0,0,.08), 0 6px 20px 0 rgba(0,0,0,.06)',
  flexDirection: 'column',
  marginTop:'100px',
},
}));



function App() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [value, setValue] = useState(0);
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <HashRouter>
        <TopBar />
        <Footer />
        <Switch>
          <Route exact path="/" component={() =>
            <div className={classes.root}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Loginview />
                </Grid>
              </Grid>
            </div>} />
{/* 
          <Route exact path="/agenda" render={props => (
            <Agenda 
              {...props}
              setValue={setValue}
              setSelectedIndex={setSelectedIndex}
            />
          )} 
          /> */}
          
          <Route exact path="/app/agenda" component={() => <div>Agenda</div>} />

          <Route exact path="/app/keynote" component={() => <div><Keynote /></div>} />

          <Route exact path="/app/exhibition" component={() => <div>Exhibition</div>} />

          <Route exact path="/app/networking" component={() => <Container  maxWidth="sm" className={classes.formSection}> <img alt="company logo" src={logo} className={classes.logo} /><Login /></Container>} />

          <Route exact path="/app/resources" component={() => <div>Resources</div>} />

          <Route exact path="/app/profile" component={() => <UserDetails />} />

          <Route exact path="/app/exhibitor" component={() => <ExhibitorView />} />

          <Route exact path="/app/messages" component={() => <Messaging />} />
        </Switch>
        
      </HashRouter>

    </ThemeProvider>
  );
}

export default App;
