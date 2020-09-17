import React, { useEffect, useState } from "react";
import Cotter from "cotter"; //  1️⃣  Import Cotter
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
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


function Login() {
  const [payload, setpayload] = useState(null);
  const classes = useStyles()

  //  2️⃣ Initialize and show the form
  useEffect(() => {
    var cotter = new Cotter('dea0e7e0-e9ac-497a-a500-2225bf389a9b'); // 👈 Specify your API KEY ID here
    cotter
      .signInWithOTP() // use .signInWithOTP() to send an OTP
      .showPhoneForm()  // use .showPhoneForm() to send magic link to a phone number 
      .then(response => {
        setpayload(response); // show the response in our state
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <Container  maxWidth="sm" className={classes.formSection}>
      <div>
      {/*  3️⃣  Put a <div> that will contain the form */}
      <div id="cotter-form-container" style={{ width: 300, height: 300 }} />
      
      
    </div>
    </Container>}
    
  );


export default Login;