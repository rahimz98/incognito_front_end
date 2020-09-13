import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import {Paper, Hidden, Card, CardMedia, CardActionArea} from "@material-ui/core";
import Image1 from './eportfolio6.png';
import logo from './logo.png';
import blueCurve from './curveLine.png';
import uploadPic from './uploadProjectPic.png';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Image from "react-image-resizer"; 
import Box from '@material-ui/core/Box';
import Grow from '@material-ui/core/Grow';





const userStyles = makeStyles((theme) => ({
  
    registerButton: {
        //textTransform : 'none',
        //color: '#96858F',
        //color : '#ffffff'
       
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
      minHeight: "100px",
      minwidth: "100px",
      align : "center",
      alignContent: "center",
      textAlign : "center",
      maxWidth : "300px",
      maxHeight : "300px",
      height : '300px',
      weight : '300px'
     
   
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

export default function homePage () {
    const classes = userStyles();

    return (
        
    <div >
        <Grid container direction = "column" spacing = "5" >  
        <div style = {{backgroundImage: `url(${Image1})`, backgroundRepeat : "no-repeat", backgroundColor : "#D5D5D5"}}>
        <Grid item container justify = "center">  
            <Hidden only = {["xs", "sm"]}>
                <Grid item xs={2} />
            </Hidden>
            <Grid item xs={8}>
                
                    
                    
                         


                        <Grid item container direction = "column" alignItems="center" justify = "space-evenly">

                            <Grid item >
                                 
                                <img src = {logo} className = {classes.centerImage}/>
            
                            </Grid>
                            
                            <Grid item >
                                <Button variant = "outlined" size = "large" className  = {classes.registerButton} href = "/signup">Register YourSelf</Button>
                            </Grid>
                        </Grid>
                    
                    

                       
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
                            <Card>
                                <CardMedia
                                    className = {classes.media} 
                                    image = {uploadPic} 
                                    alt = "laptop" 
                                    title = "laptopPicture" 
                                />
                            </Card> 
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
                        <Card>
                            <CardMedia
                                className = {classes.media} 
                                image = {uploadPic} 
                                alt = "laptop" 
                                title = "laptopPicture" 
                            />
                        </Card>
                    </Grid>    
                    </Hidden>
                </Grid>
            </Grid>

            <Hidden only = {["xs", "sm"]}>
                <Grid item xs={2} />
            </Hidden>    

        </Grid>
        
        <Grid item container>

        </Grid>
        </Grid>

    </div>
    );
}