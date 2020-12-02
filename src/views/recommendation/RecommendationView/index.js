import React,{useState, useEffect} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { useDispatch, useSelector } from 'src/store';
import { getdropdownproduct, 
        getdropdownexhibitor, 
        productrecommendation, 
        exhibitorrecommendation } from 'src/slices/exhibitor'
import {Box, 
        CardMedia, 
        CardActionArea, 
        CardContent,
        Typography,
        Grid,
        Card,
        AppBar, 
        Toolbar, 
        IconButton } from '@material-ui/core';
import defaultlogo from 'src/assets/images/download.png';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import Dialog from "@material-ui/core/Dialog";
import CloseIcon from "@material-ui/icons/Close";
import Productpage from './productpage';


const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: '100%',
    },
    
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    imgContainer: {
        margin: 'auto',
    },
    iframeContainer: {
        overflow: 'hidden',
        position: 'relative',
    },
    iframeContainer_iframe: {
        border: '0',
        height: '800px',
        left: '0',
        position: 'relative',
        top: '0',
        width: '100%',
    },
    speedDial: {
        position: 'absolute',
        bottom: theme.spacing(10),
        right: theme.spacing(6),
      }

}));


export default function RecommendationView() {


    const dispatch = useDispatch();
    useEffect(() => {
    
        dispatch(getdropdownproduct())
        dispatch(getdropdownexhibitor())
        dispatch(productrecommendation())
        dispatch(exhibitorrecommendation())
        
    }, []);

      const { dropdown_product } = useSelector((state) => state.exhibitor);
      const { dropdown_exhibitor } = useSelector((state) => state.exhibitor);
      const { prorec } = useSelector((state) => state.exhibitor);
      const { exhrec } = useSelector((state) => state.exhibitor);
    
    const handleproductChange = async(event, value) => {
        console.log(value.productid);
        localStorage.setItem('productid', value.productid);
        const productid = localStorage.getItem("productid")
        console.log('productid',productid)
        dispatch(productrecommendation(productid));
        
      };
    
      
    const handleexhibitorChange = (event, value) => {
        console.log(value.exhibitorid);
        localStorage.setItem('exhibitorid', value.exhibitorid);
        const exhibitorid = localStorage.getItem("exhibitorid")
        console.log('exhibitorid',exhibitorid)
        dispatch(exhibitorrecommendation(exhibitorid));
      };
    
    const handleexhibitorpage = (event, slugname, id) => {
        //history.push(`/app/exhibitor/${slugname}/${id}`);
        window.open(`/app/exhibitor/${slugname}/${id}`, '_blank');
    }
    
    const classes = useStyles();
    const [ productopen, setproductopen ] = useState(false) 
    const [ exhibitoropen, setexhibitoropen ] = useState(false)
    
    const productopenfunction = () => {
        setproductopen(true);
        setexhibitoropen(false); 
        }

    const exhibitoropenfunction = () => {
        setproductopen(false);
        setexhibitoropen(true);
        
        }
    
    const [openproduct, setOpenproduct] = React.useState(false);
    const [productname, setproductname] = useState() 
    const [statedescription, setstatedescription] = useState() 
    const [stateexhibitor_id, setstateexhibitor_id] = useState()
    const [stateslug, setstateslug] = useState()
    const [stateproduct_image, setstateproduct_image] = useState()
    const [stateproduct_brochure, setstateproduct_brochure] = useState()
    const [stateproduct_id, setstateproduct_id] = useState()
    
    const handleproductpage = (event, name, description, exhibitor_id, slug, product_image, product_brochure) => {
        const productid = localStorage.getItem("productid")
        console.log('productid',productid)
        setOpenproduct(true);
        setproductname(name);
        setstatedescription(description);
        setstateexhibitor_id(exhibitor_id);
        setstateslug(slug)
        setstateproduct_image(product_image)
        setstateproduct_brochure(product_brochure)
        setstateproduct_id(productid)
        
    }
    
    const handleClose = () => {
        setOpenproduct(false);
    };

    return (
        <>
        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={openproduct}>
        <AppBar className={classes.appBar} >
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            {productname}
                        </Typography>
                    </Toolbar>
                </AppBar>
          <Productpage datan={productname} 
            datad={statedescription} 
            dataexh={stateexhibitor_id} 
            datas={stateslug}
            dataproduct_image={stateproduct_image}
            dataproduct_brochure={stateproduct_brochure}
            dataproduct_id={stateproduct_id}
            
            >
          </Productpage>
      </Dialog>
            <center><ButtonGroup disableElevation variant="contained" color="primary">
                <Button onClick={productopenfunction}>Search for products</Button>
                <Button onClick={exhibitoropenfunction}>Search for Exhibitors</Button>
            </ButtonGroup></center>
            <div>
                {
                    productopen && (  
                        <form>
                            <Box mb={1}>      
                                <Autocomplete className={classes.root}
                                    freeSolo
                                    id="free-solo-2-demo"
                                    disableClearable
                                    options={dropdown_product}
                                    onChange={handleproductChange}
                                    getOptionLabel={(option) => option.text}
                                    renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Search Products"
                                        margin="normal"
                                        variant="outlined"
                                        InputProps={{ ...params.InputProps, type: 'search' }}
                                    />
                                    )}
                                />
                            </Box>
                            <React.Fragment>
                                <Grid item container style={{                
                                    backgroundPosition: "center",
                                    backgroundSize: "cover",
                                    backgroundRepeat: "no-repeat",
                                    height: "100%",
                                    padding: "45px",
                                    backgroundAttachment: 'fixed',
                                }}>
                                {
                                    prorec !== undefined && (
                                        prorec.map((prorecs) => {
                                            return(
                                                <Grid it em xs={12} sm={4} xl={3}>
                                                <Card className={classes.root} onClick={(event) => handleproductpage(event, 
                                                                                                                    prorecs.name, 
                                                                                                                    prorecs.description, 
                                                                                                                    prorecs.exhibitor_id, 
                                                                                                                    prorecs.slug, 
                                                                                                                    prorecs.product_image, 
                                                                                                                    prorecs.product_brochure)}>
                                                <CardActionArea>
                                                    <CardMedia
                                                        component="img"
                                                        alt={prorecs.name}
                                                        height="140"
                                                        image={prorecs.product_image}
                                                        title={prorecs.name}
                                                        src={defaultlogo}
                                                    />
                                                    <CardContent>
                                                        <Typography gutterBottom variant="h5" component="h2" align="center">
                                                            {prorecs.name}
                                                        </Typography>
                                                    </CardContent>
                                                </CardActionArea>
                                                </Card>
                                                
                                                </Grid> 
                                            );
                                        })
                                    )
                                }
                              
                            
                            </Grid>
                        </React.Fragment>
                        </form>
                    ) 
                }
            </div>
            <div>
                {
                    exhibitoropen && (
                       <>
                            <Box mb={1}>
                                <Autocomplete className={classes.root}
                                    freeSolo
                                    id="free-solo-2-demo"
                                    disableClearable
                                    options={dropdown_exhibitor}
                                    onChange={handleexhibitorChange}
                                    getOptionLabel={(option) => option.text}
                                    renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Search Exhibitors"
                                        margin="normal"
                                        variant="outlined"
                                        InputProps={{ ...params.InputProps, type: 'search' }}
                                    />
                                    )}
                                />
                            </Box>
                            <React.Fragment>
                                <Grid item container style={{                
                                    backgroundPosition: "center",
                                    backgroundSize: "cover",
                                    backgroundRepeat: "no-repeat",
                                    height: "100%",
                                    padding: "45px",
                                    backgroundAttachment: 'fixed',
                                }}>
                            {
                                    exhrec !== undefined && (
                                        exhrec.map((exhrecs) => {
                                            return(
                                                <Grid item xs={12} sm={4} xl={3}>
                                                <Card className={classes.root} onClick={(event) => handleexhibitorpage(event, exhrecs.slug, exhrecs.id)}>
                                                <CardActionArea>
                                                    <CardMedia
                                                        component="img"
                                                        alt={exhrecs.name}
                                                        height="140"
                                                        image={exhrecs.product_image}
                                                        title={exhrecs.name}
                                                        src={defaultlogo}
                                                    />
                                                    <CardContent>
                                                        <Typography gutterBottom variant="h5" component="h2" align="center">
                                                            {exhrecs.name}
                                                        </Typography>
                                                    </CardContent>
                                                </CardActionArea>
                                                </Card>
                                                </Grid>
                                    
                                            );
                                        })
                                    )
                                }
                            </Grid>
                        </React.Fragment>
                            </>
                    ) 
                }
            </div>
       </>
    );
}
