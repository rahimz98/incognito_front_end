import React from 'react';
import Grid from '@material-ui/core/Grid';
import Image1 from './home_page_pic.png';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';


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
  }));

export default function homePage () {
    const classes = userStyles();

    return (
    <div>
        <Grid container>
            <Grid item xs={2} />
            
            <Grid item xs={8}>
                <h1>
                    -----------------------Space being used--------------------------------------------------------------------------------------------
                </h1>
                
                <Grid container direction="column">
                    <Grid container>
                        <Grid item xs = {6}>
                            
                            <img src = {Image1} alt = "project pic" height = "440" />

                        </Grid>

                        <Grid item xs = {6} container direction = "column">
                            <Grid item >
                                <Typography variant = "h1" align = "center">
                                    WEBSITE NAME
                                </Typography>
                                <Typography variant = "h6" align = "center">
                                    Brought to you by Team Incognito
                                </Typography>
                            </Grid>
                            
                            <Grid item align = "center">
                                <Button varient = "outlined" size = "large" className  = {classes.registerButton} href = "/signup">Register YourSelf</Button>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item>
                        <h1>
                            -----------------------Space being used--------------------------------------------------------------------------------------------
                        </h1>
                    </Grid>    
                </Grid>
            </Grid>
            
            <Grid item xs={2} />
        </Grid>
    </div>
    );
}