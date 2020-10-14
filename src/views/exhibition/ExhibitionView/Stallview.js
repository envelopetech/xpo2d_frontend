import React, { useEffect } from 'react';
import ImageMapper from 'react-image-mapper';
import lobby from 'src/assets/images/lobby.jpg';
import { withStyles, makeStyles } from '@material-ui/styles';
import Page from 'src/components/Page';
import Grid from "@material-ui/core/Grid";

import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import MovieIcon from '@material-ui/icons/Movie';
import Tooltip from '@material-ui/core/Tooltip';
import Styles from './styles.css';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";



import background from 'src/assets/images/exhibit-hall-sponsor1.jpg';
import background2 from 'src/assets/images/exhibit-hall-sponsor2.jpg';
import background3 from 'src/assets/images/exhibit-hall-sponsor3.jpg';
import background4 from 'src/assets/images/exhibit-hall-sponsor4.jpg';
import background5 from 'src/assets/images/exhibit-hall-gold1.jpg';
import background6 from 'src/assets/images/exhibit-hall-gold2.jpg';
import background7 from 'src/assets/images/exhibit-hall-gold3.jpg';
import background8 from 'src/assets/images/exhibit-hall-gold4.jpg';
import background9 from 'src/assets/images/exhibit-hall-gold5.jpg';
import background10 from 'src/assets/images/exhibit-hall-silver1.jpg';
import background11 from 'src/assets/images/exhibit-hall-silver2.jpg';
import background12 from 'src/assets/images/exhibit-hall-silver3.jpg';
import background13 from 'src/assets/images/exhibit-hall-silver4.jpg';
import background14 from 'src/assets/images/exhibit-hall-silver5.jpg';



const useStyles = makeStyles(theme => ({
    imgContainer: {
        margin: 'auto',
    },
    anchorStall1: {
        position: 'absolute',
        left: '5%',
        top: '10.5%',
        width: '91.2%',
        height: '68.85%',
        zIndex: 2
    },
    anchorStall2Left: {
        position: 'absolute',
        left: '5%',
        top: '34.5%',
        width: '42.2%',
        height: '38.85%',
        zIndex: 2
    },
    anchorStall2Right: {
        position: 'absolute',
        left: '53%',
        top: '34.5%',
        width: '42.2%',
        height: '38.85%',
        zIndex: 2
    },
    anchorStall3Left: {
        position: 'absolute',
        left: '7%',
        top: '28.5%',
        width: '26.2%',
        height: '37.85%',
        zIndex: 2
    },
    anchorStall3Middle: {
        position: 'absolute',
        left: '37%',
        top: '28.5%',
        width: '26.2%',
        height: '37.85%',
        zIndex: 2
    },
    anchorStall3Right: {
        position: 'absolute',
        left: '67%',
        top: '28.5%',
        width: '26.2%',
        height: '37.85%',
        zIndex: 2
    },
    // anchorStall2: {
    //     position: 'absolute', 
    //     left: '15.34%', 
    //     top: '53.74%', 
    //     width: '11.99%', 
    //     height: '15.2%', 
    //     zIndex: 2
    // },
    // anchorResource: {
    //     position: 'absolute', 
    //     left: '30%', 
    //     top: '45.74%', 
    //     width: '7.74%', 
    //     height: '5.96%', 
    //     zIndex: 2
    // },
    // anchorStall3: {
    //     position: 'absolute', 
    //     left: '30.94%', 
    //     top: '56.5%', 
    //     width: '13.57%', 
    //     height: '22.15%', 
    //     zIndex: 2
    // },
    // anchorStall4: {
    //     position: 'absolute', 
    //     left: '42.94%', 
    //     top: '76.5%', 
    //     width: '13.57%', 
    //     height: '22.15%', 
    //     zIndex: 2
    // },
    // anchorStall5: {
    //     position: 'absolute', 
    //     left: '56.02%', 
    //     top: '57.7%', 
    //     width: '12.2%', 
    //     height: '19.85%', 
    //     zIndex: 2
    // },
    // anchorStall6: {
    //     position: 'absolute', 
    //     left: '73.02%', 
    //     top: '50.7%', 
    //     width: '12.2%', 
    //     height: '19.85%', 
    //     zIndex: 2
    // },
    // anchorStall7: {
    //     position: 'absolute', 
    //     left: '85.02%', 
    //     top: '69.7%', 
    //     width: '12.2%', 
    //     height: '19.85%', 
    //     zIndex: 2
    // },

    fab: {
        margin: theme.spacing(2),
    },
    absolute: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(3),
    },
    anchorVideo: {
        position: 'absolute',
        top: '17%',
        right: '40.5%',
    },
}));

const LightTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: 15,
    },
}))(Tooltip);



export default function LobbyView() {
    const classes = useStyles();

    useEffect(() => {
        const name = "Nisarg Mehta";
        const email = "envelopetech@gmail.com";
        const createdAt = Math.floor(Date.now() / 1000);
        const userId = "123456";
        const script = document.createElement("script");
        const t = document.createTextNode("window.Intercom('boot', {app_id: 'a5iw6q1x', name:'" + `${name}` + "', email:'" + `${email}` + "', created_at:'" + `${createdAt}` + "', user_id:'" + `${userId}` + "'});");
        script.appendChild(t);
        document.body.appendChild(script);
    }, []);
    return (
        <Page title="Exhibition">
            <Grid item container style={{
                position: 'relative',
                webkitTransformOrigin: '0% 0% 0',
                transformOrigin: '0% 0% 0',
                height: '100%',
                width: '100%',
                maxWidth: '100%',
                overflow: 'hidden',
            }}>

                <Carousel>
                    <div>
                        <img alt="auditorium" src={background} className="background-fluid" />
                        <div className="audi-content">
                            <div className="lobby-content-center">
                            </div>
                            <div className="users">
                                <Link href='/app/exhibitor/chaman-bhartiya-school/56' className={classes.anchorStall1}>
                                    <LightTooltip title="Chaman Bhartiya School (Click to open)" placement="top">
                                        <Button variant="outlined" style={{ width: '100%', height: '100%' }} aria-label="auditorium">
                                        </Button>
                                    </LightTooltip>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div>
                        <img alt="auditorium" src={background2} className="background-fluid" />
                        <div className="audi-content">
                            <div className="lobby-content-center">
                            </div>
                            <div className="users">
                                <Link href='/app/exhibitor/kunskapsskolan/60' className={classes.anchorStall1}>
                                    <LightTooltip title="Kunskapsskolan (Click to open)" placement="top">
                                        <Button variant="outlined" style={{ width: '100%', height: '100%' }} aria-label="auditorium">
                                        </Button>
                                    </LightTooltip>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div>
                        <img alt="auditorium" src={background3} className="background-fluid" />
                        <div className="audi-content">
                            <div className="lobby-content-center">
                            </div>
                            <div className="users">
                                <Link href='/app/exhibitor/valistus/65' className={classes.anchorStall1}>
                                    <LightTooltip title="Valistus (Click to open)" placement="top">
                                        <Button variant="outlined" style={{ width: '100%', height: '100%' }} aria-label="auditorium">
                                        </Button>
                                    </LightTooltip>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div>
                        <img alt="auditorium" src={background4} className="background-fluid" />
                        <div className="audi-content">
                            <div className="lobby-content-center">
                            </div>
                            <div className="users">
                                <Link href='/app/exhibitor/linguaphile-skills-hub/59' className={classes.anchorStall1}>
                                    <LightTooltip title="Linguaphile (Click to open)" placement="top">
                                        <Button variant="outlined" style={{ width: '100%', height: '100%' }} aria-label="auditorium">
                                        </Button>
                                    </LightTooltip>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div>
                        <img alt="auditorium" src={background5} className="background-fluid" />
                        <div className="audi-content">
                            <div className="lobby-content-center">
                            </div>
                            <div className="users">
                                <Link href='/app/exhibitor/karadi-path/62' className={classes.anchorStall2Left}>
                                    <LightTooltip title="Karadi Path (Click to open)" placement="top">
                                        <Button variant="outlined" style={{ width: '100%', height: '100%' }} aria-label="auditorium">
                                        </Button>
                                    </LightTooltip>
                                </Link>
                                <Link href='/app/exhibitor/aurinko-academy/54' className={classes.anchorStall2Right}>
                                    <LightTooltip title="Aurinko Academy (Click to open)" placement="top">
                                        <Button variant="outlined" style={{ width: '100%', height: '100%' }} aria-label="auditorium">
                                        </Button>
                                    </LightTooltip>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div>
                        <img alt="auditorium" src={background6} className="background-fluid" />
                        <div className="audi-content">
                            <div className="lobby-content-center">
                            </div>
                            <div className="users">
                                <Link href='/app/exhibitor/trio-world-school/37' className={classes.anchorStall2Left}>
                                    <LightTooltip title="Trio World School (Click to open)" placement="top">
                                        <Button variant="outlined" style={{ width: '100%', height: '100%' }} aria-label="auditorium">
                                        </Button>
                                    </LightTooltip>
                                </Link>
                                <Link href='/app/exhibitor/treamis/40' className={classes.anchorStall2Right}>
                                    <LightTooltip title="Tremis (Click to open)" placement="top">
                                        <Button variant="outlined" style={{ width: '100%', height: '100%' }} aria-label="auditorium">
                                        </Button>
                                    </LightTooltip>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div>
                        <img alt="auditorium" src={background7} className="background-fluid" />
                        <div className="audi-content">
                            <div className="lobby-content-center">
                            </div>
                            <div className="users">
                                <Link href='/app/exhibitor/prakriya-green-wisdom-school/36' className={classes.anchorStall2Left}>
                                    <LightTooltip title="Prakriya School(Click to open)" placement="top">
                                        <Button variant="outlined" style={{ width: '100%', height: '100%' }} aria-label="auditorium">
                                        </Button>
                                    </LightTooltip>
                                </Link>
                                <Link href='/app/exhibitor/skei/41' className={classes.anchorStall2Right}>
                                    <LightTooltip title="SKEI (Click to open)" placement="top">
                                        <Button variant="outlined" style={{ width: '100%', height: '100%' }} aria-label="auditorium">
                                        </Button>
                                    </LightTooltip>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div>
                        <img alt="auditorium" src={background8} className="background-fluid" />
                        <div className="audi-content">
                            <div className="lobby-content-center">
                            </div>
                            <div className="users">
                                <Link href='/app/exhibitor/vidya-sagar/51' className={classes.anchorStall2Left}>
                                    <LightTooltip title="VidyaSagar PreSchool (Click to open)" placement="top">
                                        <Button variant="outlined" style={{ width: '100%', height: '100%' }} aria-label="auditorium">
                                        </Button>
                                    </LightTooltip>
                                </Link>
                                <Link href='/app/exhibitor/triumph-world-school/39' className={classes.anchorStall2Right}>
                                    <LightTooltip title="Triumph School (Click to open)" placement="top">
                                        <Button variant="outlined" style={{ width: '100%', height: '100%' }} aria-label="auditorium">
                                        </Button>
                                    </LightTooltip>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div>
                        <img alt="auditorium" src={background9} className="background-fluid" />
                        <div className="audi-content">
                            <div className="lobby-content-center">
                            </div>
                            <div className="users">
                                <Link href='/app/exhibitor/quizzy-edtech/50' className={classes.anchorStall2Left}>
                                    <LightTooltip title="Quizzy EdTech (Click to open)" placement="top">
                                        <Button variant="outlined" style={{ width: '100%', height: '100%' }} aria-label="auditorium">
                                        </Button>
                                    </LightTooltip>
                                </Link>
                                <Link href='/app/exhibitor/envision-group/61' className={classes.anchorStall2Right}>
                                    <LightTooltip title="Envision High (Click to open)" placement="top">
                                        <Button variant="outlined" style={{ width: '100%', height: '100%' }} aria-label="auditorium">
                                        </Button>
                                    </LightTooltip>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div>
                        <img alt="auditorium" src={background10} className="background-fluid" />
                        <div className="audi-content">
                            <div className="lobby-content-center">
                            </div>
                            <div className="users">
                                <Link href='/app/exhibitor/learning-arc/44' className={classes.anchorStall3Left}>
                                    <LightTooltip title="Learning Arc (Click to open)" placement="top">
                                        <Button variant="outlined" style={{ width: '100%', height: '100%' }} aria-label="auditorium">
                                        </Button>
                                    </LightTooltip>
                                </Link>
                                <Link href='/app/exhibitor/vingyan/47' className={classes.anchorStall3Middle}>
                                    <LightTooltip title="Vingyan (Click to open)" placement="top">
                                        <Button variant="outlined" style={{ width: '100%', height: '100%' }} aria-label="auditorium">
                                        </Button>
                                    </LightTooltip>
                                </Link>
                                <Link href='/app/exhibitor/educationist-corporation/42' className={classes.anchorStall3Right}>
                                    <LightTooltip title="Educationist Corporation (Click to open)" placement="top">
                                        <Button variant="outlined" style={{ width: '100%', height: '100%' }} aria-label="auditorium">
                                        </Button>
                                    </LightTooltip>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div>
                        <img alt="auditorium" src={background11} className="background-fluid" />
                        <div className="audi-content">
                            <div className="lobby-content-center">
                            </div>
                            <div className="users">
                                <Link href='/app/exhibitor/learn.win/46' className={classes.anchorStall3Left}>
                                    <LightTooltip title="8Worksera(Click to open)" placement="top">
                                        <Button variant="outlined" style={{ width: '100%', height: '100%' }} aria-label="auditorium">
                                        </Button>
                                    </LightTooltip>
                                </Link>
                                <Link href='/app/exhibitor/joy-of-anubhava/48' className={classes.anchorStall3Middle}>
                                    <LightTooltip title="Joy of Anubhava (Click to open)" placement="top">
                                        <Button variant="outlined" style={{ width: '100%', height: '100%' }} aria-label="auditorium">
                                        </Button>
                                    </LightTooltip>
                                </Link>
                                <Link href='/app/exhibitor/investography/45' className={classes.anchorStall3Right}>
                                    <LightTooltip title="Investography (Click to open)" placement="top">
                                        <Button variant="outlined" style={{ width: '100%', height: '100%' }} aria-label="auditorium">
                                        </Button>
                                    </LightTooltip>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div>
                        <img alt="auditorium" src={background12} className="background-fluid" />
                        <div className="audi-content">
                            <div className="lobby-content-center">
                            </div>
                            <div className="users">
                                <Link href='/app/exhibitor/reflex/43' className={classes.anchorStall3Left}>
                                    <LightTooltip title="Reflex (Click to open)" placement="top">
                                        <Button variant="outlined" style={{ width: '100%', height: '100%' }} aria-label="auditorium">
                                        </Button>
                                    </LightTooltip>
                                </Link>
                                <Link href='/app/exhibitor/global-indian-international-school/49' className={classes.anchorStall3Middle}>
                                    <LightTooltip title="Global Indian International School (Click to open)" placement="top">
                                        <Button variant="outlined" style={{ width: '100%', height: '100%' }} aria-label="auditorium">
                                        </Button>
                                    </LightTooltip>
                                </Link>
                                <Link href='/app/exhibitor/s-stemlabs-edugames-india-pvt-ltd/53' className={classes.anchorStall3Right}>
                                    <LightTooltip title="S Stem Labs Edugames (Click to open)" placement="top">
                                        <Button variant="outlined" style={{ width: '100%', height: '100%' }} aria-label="auditorium">
                                        </Button>
                                    </LightTooltip>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div>
                        <img alt="auditorium" src={background13} className="background-fluid" />
                        <div className="audi-content">
                            <div className="lobby-content-center">
                            </div>
                            <div className="users">
                                <Link href='/app/exhibitor/next-education-india-pvt-ltd/55' className={classes.anchorStall3Left}>
                                    <LightTooltip title="Next Education (Click to open)" placement="top">
                                        <Button variant="outlined" style={{ width: '100%', height: '100%' }} aria-label="auditorium">
                                        </Button>
                                    </LightTooltip>
                                </Link>
                                <Link href='/app/exhibitor/coingal-education-pvt-ltd/57' className={classes.anchorStall3Middle}>
                                    <LightTooltip title="Coingal Education Pvt Ltd (Click to open)" placement="top">
                                        <Button variant="outlined" style={{ width: '100%', height: '100%' }} aria-label="auditorium">
                                        </Button>
                                    </LightTooltip>
                                </Link>
                                <Link href='/app/exhibitor/indian-school-of-excellence/58' className={classes.anchorStall3Right}>
                                    <LightTooltip title="Indian School of Excellence (Click to open)" placement="top">
                                        <Button variant="outlined" style={{ width: '100%', height: '100%' }} aria-label="auditorium">
                                        </Button>
                                    </LightTooltip>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div>
                        <img alt="auditorium" src={background14} className="background-fluid" />
                        <div className="audi-content">
                            <div className="lobby-content-center">
                            </div>
                            <div className="users">
                                <Link href='/app/exhibitor/delhi-public-international-school/52' className={classes.anchorStall3Left}>
                                    <LightTooltip title="Delhi Public International School (Click to open)" placement="top">
                                        <Button variant="outlined" style={{ width: '100%', height: '100%' }} aria-label="auditorium">
                                        </Button>
                                    </LightTooltip>
                                </Link>
                                <Link href='/app/exhibitor/the-foundation-school/63' className={classes.anchorStall3Middle}>
                                    <LightTooltip title="The Foundation School (Click to open)" placement="top">
                                        <Button variant="outlined" style={{ width: '100%', height: '100%' }} aria-label="auditorium">
                                        </Button>
                                    </LightTooltip>
                                </Link>
                            </div>
                        </div>
                    </div>
                </Carousel>
            </Grid>
        </Page>
    )
}