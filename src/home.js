import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Hidden, Card, CardMedia} from "@material-ui/core";
import logo from './logo.png';
import uploadPic from './uploadProjectPic.png';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grow from '@material-ui/core/Grow';
import Zoom from '@material-ui/core/Zoom';
import { ColorLensOutlined } from '@material-ui/icons';
import BubbleImage from './bubbleImage.png';
import PeopleWorking from './peopleWorking.png';







const userStyles = makeStyles((theme) => ({
  
    registerButton: {
        //textTransform : 'none',
        //color: '#96858F',
        color : '#192231',
        borderColor : '#192231',
       
    },
    signInButton: {
      backgroundColor : '#192231',
      color : '#FFFFFF',
      textTransform : 'none',
      
    },
    centerImage : {
      //display: "flex",
      //justifyContent: "center", /* horizontally center */
      //alignItems: "center",    /* vertically center */
      minHeight: "100px",
      minwidth: "100px",
      //align : "center",
      //alignContent: "center",
      //textAlign : "center",
      maxWidth : "300px",
      maxHeight : "300px",
      height : '250px',
      weight : '250px'
     
   
    },

    uploadPic : {
      display: "flex",
      justifyContent: "center", /* horizontally center */
      alignItems: "center",    /* vertically center */
      align : "center",
      height: "410px",
      alignContent: "center",
      textAlign : "center",
    },

    typography : {
      variant : "h3",
      align : 'center',
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.primary,
      },
    media : {
        height : 300,
    },
  }));

export default function HomePage () {
    const classes = userStyles();
    const [checked] = React.useState(true);


    return (
        
    <div >
        <Grid container direction = "column" spacing = "5" >  
        <div style = {{ backgroundRepeat : "no-repeat", backgroundImage:`url(${BubbleImage})`}}>
        <Grid item container justify = "center" height = '100%'>  
            <Hidden only = {["xs", "sm"]}>
                <Grid item xs={2} />
            </Hidden>
            <Grid item xs={8}>
                    <Grow in={checked}>    
                        <Grid item container direction = "column" alignItems="center" justify = "space-evenly">

                            <Grid item >
                                 
                                <img src = {logo} alt = "logo.png" className = {classes.centerImage}/>
            
                            </Grid>
                            
                            <Grid item >
                                <Button variant = "outlined" size = "large" className  = {classes.registerButton} href = "/signup">Register YourSelf</Button>
                                
                            </Grid>
                        </Grid> 
                    </Grow> 
                                 
            </Grid>
            
            <Hidden only = {["xs", "sm"]}>
                <Grid item xs={2} />
            </Hidden>

        </Grid>  
        </div>  

        <Grid item container justify = "center">
            
            <Hidden only = {["xs", "sm"]}>
                <Grid item xs={2} />
            </Hidden>

            <Grid item xs = {8} >
                <Grid item container spacing = {3}>
                    <Hidden only = {["xs", "sm" ]}>
                    
                        <Grid item xs = {6} alignItems="center" justify="center" >
                            <Zoom in = {checked}>
                            <Card>
                                <CardMedia
                                    className = {classes.media} 
                                    image = {uploadPic} 
                                    alt = "laptop" 
                                    title = "laptopPicture" 
                                />
                            </Card> 
                            </Zoom>
                        </Grid>
                    </Hidden>
                    <Grid item xs = {6} textAlign = "center">
                        <Box display = "flex">
                            <Box  m = "auto">
                                <Typography  variant =  "h3" align = 'center' >
                                    Upload your Projects
                                </Typography>
                                <Typography align = 'center'>
                                    Start uploading your projects so you can show it to the public with a professional manner. Have Control on how your project will look like and show the world what your really capable of! 
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>    
                </Grid>
                
            </Grid>

            <Hidden only = {["xs", "sm"]}>
                <Grid item xs={2} />
            </Hidden>
        </Grid>

        <Grid item container justify = "center">
           
        <Hidden only = {["xs", "sm"]}>
                <Grid item xs={2} />
            </Hidden>
            
            <Grid item xs = {8}>
                <Grid item container spacing = {3}>
                    <Grid item xs = {6} alignItems="center" justify="center" >
                        <Box display = "flex" >
                            <Box m = "auto">
                                <Typography  variant =  "h3" align = 'center' >
                                    Look up your colleague's projects                         
                                </Typography>
                                <Typography align = 'center'>
                                    Start uploading your projects so you can show it to the public with a professional manner. Have Control on how your project will look like and show the world what your really capable of! 
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Hidden only = {["xs", "sm"]}>
                    <Grid item xs = {6} textAlign = "center">
                    <Zoom in = {checked}> 
                        <Card>
                            <CardMedia
                                className = {classes.media} 
                                image = {uploadPic} 
                                alt = "laptop" 
                                title = "laptopPicture" 
                            />
                        </Card>
                    </Zoom>
                    </Grid>    
                    </Hidden>
                </Grid>
            </Grid>

            <Hidden only = {["xs", "sm"]}>
                <Grid item xs={2} />
            </Hidden>    

        </Grid>
        
      
        </Grid>

    </div>
    );
}