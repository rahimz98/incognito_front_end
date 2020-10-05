import React from 'react';
import { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import logo from './logo.png';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  
    root: {
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    } 
}));

const PeopleCard = (props) =>{
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;
  
    return (
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            Developers
          </Typography>
          <Typography variant="h5" component="h2">
            {props.name ? props.name:"Poop"}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            adjective
          </Typography>
          <Typography variant="body2" component="p">
            handsome   baby.
            <br />
            {'"a benevolent smile"'}
          </Typography>
        </CardContent>
      </Card>
      
    );
  }

const Content =  () =>{
    return (
        <Grid container spacing = {1}>
            <Grid item xs={12} sm={4}>
                <PeopleCard name = {"Faris"}/>
            </Grid>
            <Grid item xs={12} sm={4}>
                <PeopleCard name = {"Gstar"}/>
            </Grid>
            <Grid item xs={12} sm ={4}>
                <PeopleCard  name = {"Zil"}/>
            </Grid>
            <Grid item xs={false}  sm={2}/>
            <Grid item xs={12} sm ={4}>
                <PeopleCard name = {"Jason"}/>
            </Grid>
            <Grid item xs={12} sm={4}>
                <PeopleCard name = {"Marcus"}/>
            </Grid>

            <Grid item xs={false} sm={2}/>

        </Grid>
    
    
    
        );


};

export default function AboutUs () {
    const classes = useStyles();
    const [checked] = React.useState(true);


    return (
        
    <div>
            <Grid container direction = "column">
                <Grid item>
                    This is the details section that will be made
                </Grid>
                <Grid item container>
                    <Grid item xs={false} sm={2}/>
                    <Grid item xs={12} sm={8}>
                        <Content/>

                    </Grid>
                    <Grid item xs={false} sm={2}/>
                </Grid>

            </Grid>



    </div>
    );
}