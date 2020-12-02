import React from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from 'src/store';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ReactHtmlParser from 'react-html-parser';
import track from 'src/utils/analytics';
import useAuth from 'src/hooks/useAuth';
import { customlog_save } from 'src/slices/visitor'
import { briefcasesave } from 'src/slices/event'
import BusinessCenterOutlinedIcon from '@material-ui/icons/BusinessCenterOutlined';
import { Tooltip } from '@material-ui/core'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));



export default function CustomizedDialogs(props) {

const classes = useStyles();
const { user } = useAuth();
const handleexhibitorpage = (event, datas, dataexh) => {
  console.log('slugs',datas)
  console.log('exh',dataexh)
    //history.push(`/app/exhibitor/${slugname}/${id}`);
    window.open(`/app/exhibitor/${datas}/${dataexh}`, '_blank');
}
const dispatch = useDispatch();


const orgid = localStorage.getItem('org_id')
const handleproductbrochureclick = (event,dataproduct_id, datan) => {
  track.event("Download Product Brochure", {
      "event_category": "Product Brochure",
      "event_label": user.email
  });
  const dataleaderboard = {
      log_type: "productbrochure",
      organizer_id: orgid,
      visited_id: dataproduct_id,
      exhibitor_id: props.dataexh,
      tab_type: datan,
  };
  dispatch(customlog_save(dataleaderboard));
}

const [open, setOpen] = React.useState(false);
const briefcaseClick = (event,dataproduct_id) => {
console.log('id', dataproduct_id)
  const data = {
     
      from_form: "exhibitor_product", //exhibitor product   exhibitor asset
      table_primary_id: dataproduct_id,//product id  assetid
      type: "product" ,
      organizer_id: orgid
  }
  dispatch(briefcasesave(data))
  setOpen(true);
}

const handleClose = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }

  setOpen(false);
};

  return (
    <div>
    <Snackbar open={open}  className={classes.snackbar}
            autoHideDuration={6000} 
            onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                Data saved in your briefcase
                </Alert>
            </Snackbar>
    <Grid item spacing={3} container style={{                
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            height: "100%",
            padding: "45px",
            backgroundAttachment: 'fixed',
            
        }}>
          <Grid item>
            
              <img height='90px' width='90px'className={classes.img} alt="complex" src={props.dataproduct_image} />
              <Typography align="center" gutterBottom variant="h5" component="h2">
                                        {props.datan}
                                    </Typography>
            
          </Grid>
          <Grid item xs={12}  sm container>
            
            <Grid item xs={12}>
              <Typography gutterBottom variant="h5" component="h2">Product Description</Typography>
              <Typography variant="body2" color="textSecondary" component="p">{ReactHtmlParser(props.datad)}</Typography>
            </Grid>
          </Grid>
          
          <Grid >
          <Button  color="primary" href={props.dataproduct_brochure} target="_blank" onClick={(event) => handleproductbrochureclick(event,props.dataproduct_id, props.datan)}>
              View Brochure
          </Button>
          <Tooltip title='Briefcase'>
            <IconButton onClick={(event) => briefcaseClick(event,props.dataproduct_id)}  >
            <BusinessCenterOutlinedIcon />
            </IconButton> 
          </Tooltip>
          <Button color="primary" onClick={(event) => handleexhibitorpage(event,props.datas, props.dataexh)}>Visit product exhibitor</Button>
          </Grid>
      
        </Grid>
        
    </div>
  );
}
