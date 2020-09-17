import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles, useTheme } from '@material-ui/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
    inputField: {
        marginBottom: '1em',
        marginTop: '1em'
    },
    formSection: {
        padding: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        marginTop:'100px',
      },
}))

export default function UserDetails() {
    const classes = useStyles()
    const theme = useTheme()

    return (
        <Container maxWidth="sm" className={classes.formSection}>
<Grid container direction="column">
            <Grid item container direction="column">
                <Grid item>
                    <Typography variant="h4">Profile</Typography>
                    <Typography variant="body1"> You can set up your details below.</Typography>
                </Grid>
            </Grid>
            <Grid item container direction="column">
                <Grid item>
                    <TextField label="Name" id="name" variant="outlined" className={classes.inputField} />
                </Grid>
                <Grid item>
                    <TextField label="Email" id="email" variant="outlined" className={classes.inputField}  />
                </Grid>
                <Grid item>
                    <TextField label="Company" id="company" variant="outlined" className={classes.inputField}  />
                </Grid>
                <Grid item>
                    <TextField label="Designation" id="designation" variant="outlined" className={classes.inputField}  />
                </Grid>
                <Grid item>
                    <Button variant="contained">Save</Button>
                </Grid>
            </Grid>
        </Grid>
        </Container>
        
    )
}