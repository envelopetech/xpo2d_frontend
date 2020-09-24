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
        left: '8.75%', 
        top: '83.72%', 
        width: '9.78%', 
        height: '11.39%', 
        zIndex: 2,
       
    },
    anchorStall2: {
        position: 'absolute', 
        left: '20.25%', 
        top: '56.11%', 
        width: '9.38%', 
        height: '8.61%', 
        zIndex: 2,
       
    },
    anchorStall3: {
        position: 'absolute', 
        left: '36.47%', 
        top: '69.22%', 
        width: '8.31%', 
        height: '10%', 
        zIndex: 2,
        
    },
    anchorStall4: {
        position: 'absolute', 
        left: '46.44%', 
        top: '70.78%', 
        width: '10%', 
        height: '13.17%', 
        zIndex: 2
    },
    anchorStall5: {
        position: 'absolute', 
        left: '58.38%', 
        top: '69.44%', 
        width: '10.63%', 
        height: '11.67%', 
        zIndex: 2
    },
    anchorStall6: {
        position: 'absolute', 
        left: '72.84%', 
        top: '63.39%', 
        width: '11.72%', 
        height: '10%', 
        zIndex: 2
    },
    anchorStall7: {
        position: 'absolute', 
        left: '84.84%', 
        top: '79.39%', 
        width: '11.72%', 
        height: '10%', 
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
                <Link href='/app/exhibitor/apex-medical-corp./17' className={classes.anchorStall1}></Link>
                <Link href='/app/exhibitor/mytrex-health-technologies,-inc./21' className={classes.anchorStall2}></Link>
                <Link href='/app/exhibitor/makalot-industrial-co.,-ltd./20' className={classes.anchorStall3}></Link>
                <Link href='/app/exhibitor/dr-willmar-schwabe-india-pvt.ltd/35' className={classes.anchorStall4}></Link>
                <Link href='/app/exhibitor/ebm-technologies/18' className={classes.anchorStall5}></Link>
                <Link href='/app/exhibitor/golden-biotechnology-corporation/19' className={classes.anchorStall6}></Link>
                <Link href='/app/exhibitor/chitkara-university/22' className={classes.anchorStall7}></Link>
               
            </div>
        </Grid>
    )
}
//apex-medical-corp.  17
//ebm-technologies 18
//makalot-industrial-co.,-ltd.  20
//chitkara-university 22
//golden-biotechnology-corporation 19
//mytrex-health-technologies,-inc. 21