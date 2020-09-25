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
        left: '1.75%',
        top: '83.72%',
        width: '13.78%',
        height: '16.39%',
        zIndex: 2,

    },
    anchorStall2: {
        position: 'absolute',
        left: '16.25%',
        top: '59.11%',
        width: '15.38%',
        height: '20.61%',
        zIndex: 2,

    },
    anchorStall3: {
        position: 'absolute',
        left: '32.47%',
        top: '78.22%',
        width: '10.31%',
        height: '15%',
        zIndex: 2,

    },
    anchorStall4: {
        position: 'absolute',
        left: '43.44%',
        top: '82.78%',
        width: '13%',
        height: '15.17%',
        zIndex: 2
    },
    anchorStall5: {
        position: 'absolute',
        left: '56.38%',
        top: '77.44%',
        width: '11.63%',
        height: '14.67%',
        zIndex: 2
    },
    anchorStall6: {
        position: 'absolute',
        left: '72.84%',
        top: '63.39%',
        width: '11.72%',
        height: '21%',
        zIndex: 2
    },
    anchorStall7: {
        position: 'absolute',
        left: '84.84%',
        top: '74.39%',
        width: '11.72%',
        height: '26%',
        zIndex: 2
    },
}));

export default function Stallview() {
    const classes = useStyles();
    return (
        <Grid item container style={{
            position: 'relative',
            webkitTransformOrigin: '0% 0% 0',
            transformOrigin: '0% 0% 0',
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            height: "100vh",
        }}>
            <div className="audi-background">
                <img alt="auditorium" src={background} className="background-fluid" />
                <div className="users">
                    <Link href='/app/exhibitor/apex-medical-corp./17' className={classes.anchorStall1}></Link>
                    <Link href='/app/exhibitor/mytrex-health-technologies,-inc./21' className={classes.anchorStall2}></Link>
                    <Link href='/app/exhibitor/makalot-industrial-co.,-ltd./20' className={classes.anchorStall3}></Link>
                    <Link href='/app/exhibitor/dr-willmar-schwabe-india-pvt.ltd/35' className={classes.anchorStall4}></Link>
                    <Link href='/app/exhibitor/ebm-technologies/18' className={classes.anchorStall5}></Link>
                    <Link href='/app/exhibitor/golden-biotechnology-corporation/19' className={classes.anchorStall6}></Link>
                    <Link href='/app/exhibitor/chitkara-university/22' className={classes.anchorStall7}></Link>

                </div>
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