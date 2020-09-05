import React from 'react';
import Grid from '@material-ui/core/Grid';
import {Paper} from "@material-ui/core";
import Image1 from './eportfolio5.png';
import logo from './logo.png';
import uploadPic from './uploadProjectPic.png';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Image from "react-image-resizer"; 



const userStyles = makeStyles((theme) => ({
  
    registerButton: {
        //textTransform : 'none',
        color: '#96858F',
       
    },
    signInButton: {
      backgroundColor : '#96858F',
      color : '#FFFFFF',
      textTransform : 'none',
      
    },
    centerImage : {
      display: "flex",
      justifyContent: "center", /* horizontally center */
      alignItems: "center",    /* vertically center */
      height: "300px",
      width: "300px",
      align : "center",
      alignContent: "center",
      textAlign : "center",
     
   
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
  }));

export default function homePage () {
    const classes = userStyles();

    return (
        
    <div >
        <Grid container direction = "column" spacing = "5" justify="center">  
        <div style = {{backgroundImage: `url(${Image1})`, backgroundRepeat : "no-repeat", backgroundColor : "#D5D5D5"}}>
        <Grid item container>  

            <Grid item xs={2} />
            
            <Grid item xs={8}>
                
                    
                    <Grid container alignItems="center" justify="center">
                        <Grid item xs = {6}>
                            

                        </Grid>

                        <Grid item xs = {6} container direction = "column" alignItems="center" justify="center">

                            <Grid item >
                                <div class = "center-image" >
                                <img src = {logo} className = {classes.centerImage}/>
                                </div>
                                <Typography variant = "h6" align = "center">
                                    Brought to you by Team Incognito
                                </Typography>
                            </Grid>
                            
                            <Grid item align = "center">
                                <Button varient = "outlined" size = "large" className  = {classes.registerButton} href = "/signup">Register YourSelf</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    

                       
            </Grid>
            
            <Grid item xs={2} />

        </Grid>  
        </div>  


        <Grid item container>
            <Grid item xs = {2} />

            <Grid item xs = {8}>
                <Grid item container spacing = {3}>
                    <Grid item xs = {6} alignItems="center" justify="center" >
                        <img src = {uploadPic} className = {classes.uploadPic}/>
                    </Grid>
                    <Grid item xs = {6} textAlign = "center">
                        <Paper className = {classes.paper} >
                        <Typography  variant =  "h3" align = 'center' >
                            Upload your Projects
                        </Typography>
                        <Typography>
                            Start uploading your projects so you can show it to the public with a professional manner. Have Control on how your project will look like and show the world what your really capable of! 
                        </Typography>
                        </Paper>
                    </Grid>    
                </Grid>
                
            </Grid>

            <Grid item xs = {2} />
        </Grid>
        

        <Grid item container>
           
            <Grid item xs = {2} />
            
            <Grid item xs = {8}>
                <Grid item container spacing = {3}>
                    <Grid item xs = {6} alignItems="center" justify="center" >
                        <Paper className = {classes.paper} >
                        <Typography  variant =  "h3" align = 'center' >
                            Look up your colleague's projects                         
                        </Typography>
                        <Typography>
                            Start uploading your projects so you can show it to the public with a professional manner. Have Control on how your project will look like and show the world what your really capable of! 
                        </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs = {6} textAlign = "center">
                        <img src = {uploadPic} className = {classes.uploadPic}/>

                    </Grid>    
                </Grid>
            </Grid>

            <Grid item xs = {2} />    

        </Grid>

        <Grid item container>

        </Grid>
        </Grid>

    </div>
    );
}