import React from 'react';
import background from 'src/assets/images/exhibit-hall.jpg';
import { makeStyles } from '@material-ui/styles';
import Link from '@material-ui/core/Link';
import Grid from "@material-ui/core/Grid";


const useStyles = makeStyles(theme => ({
    imgContainer: {
        margin: 'auto',
    },
    anchorStall1: {
        position: 'absolute', 
        left: '7.34%', 
        top: '61.11%', 
        width: '24.69%', 
        height: '26.11%', 
        zIndex: 2
    },
    anchorStall2: {
        position: 'absolute', 
        left: '34.22%', 
        top: '60.28%', 
        width: '27.19%', 
        height: '27.78%', 
        zIndex: 2
    },
    anchorStall3: {
        position: 'absolute', 
        left: '65.94%', 
        top: '59.72%', 
        width: '25.31%', 
        height: '27.22%', 
        zIndex: 2
    },
    anchorStall4: {
        position: 'absolute', 
        left: '18.28%', 
        top: '42.78%', 
        width: '18.44%', 
        height: '16.39%', 
        zIndex: 2
    },
    anchorStall5: {
        position: 'absolute', 
        left: '41.25%', 
        top: '43.33%', 
        width: '16.25%', 
        height: '17.22%', 
        zIndex: 2
    },
    anchorStall6: {
        position: 'absolute', 
        left: '61.88%', 
        top: '43.61%', 
        width: '15%', 
        height: '16.67%', 
        zIndex: 2
    },
}));


export default function Stallview() {
    const classes = useStyles();
    return (        
        <Grid item container style={{
            backgroundImage: `url(${background})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            height: "calc(100vh - 64px)"
        }}>
            <div className="users">
                <Link href='/app/exhibitor' className={classes.anchorStall1}></Link>
                <Link href='/app/exhibitor' className={classes.anchorStall2}></Link>
                <Link href='/app/exexhibitor' className={classes.anchorStall3}></Link>
                <Link href='/app/exhibitor' className={classes.anchorStall4}></Link>
                <Link href='/app/exhibitor' className={classes.anchorStall5}></Link>
                <Link href='/app/exhibitor' className={classes.anchorStall6}></Link>
            </div>
        </Grid>
    )
}