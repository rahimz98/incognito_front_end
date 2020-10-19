import React from 'react';
import {Collapse, Fade, Hidden, Grid, Typography, makeStyles, Card,  CardMedia, CardContent, } from '@material-ui/core/';
import vision from './spg.svg';
import zil from './Zille.JPG';
import faris from './Faris.png';
import gstar from './Gstar.png';
import jason from './Jason.jpeg';
import marcus from  './Marcus.jpeg';


const useStyles = makeStyles((theme) => ({

    paper: {
        textAlign: 'center',
        padding: theme.spacing(2),
        margin: 'auto',
        verticalAlign: 'center'
    },

    text:{
        fontSize: 32,

    },
  
    root: {
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 60,
        textAlign: 'center',
    },
    otherTitle:{
        fontSize: 32,
        textAlign: 'center',
    },
    pos: {
        marginTop: 12,
    } 
}));

const PeopleCard = (props) =>{
    const [checked] = React.useState(true);
    const classes = useStyles();
  
    return (
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h2" textAlign="center">
            {props.name ? props.name:"None"}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            {props.nickname}
          </Typography>
          <Fade in= {checked}>
          <CardMedia style={{height:"350px"}} image = {props.pic ? props.pic: gstar}/>
          </Fade>
          <Typography className={classes.pos} variant="body2" component="p">
            {props.description ? props.description: "Oops add a description"}
          </Typography>
        </CardContent>
      </Card>
      
    );
  }

const Content =  () =>{
    return (
        <Grid container spacing = {1}>
            <Grid item xs={12} sm={4}>
                <PeopleCard nickname ={"The Planner"} name = {"Nik Faris Arief"} description ={"Fully fledged potato from Malaysia. Majoring in Computer Science at UniMelb. Good at coercing people to procrastinate with him"} pic ={faris}/>
            </Grid>
            <Grid item xs={12} sm={4}>
                <PeopleCard nickname = {"The Prodigy"} name = {"Gieester Thai"} description ={"Co-founder of Memento and an integral member of Team Incognito. Majoring in Computer Science at UniMelb. Whereabouts  unknown to this day"}/>
            </Grid>
            <Grid item xs={12} sm ={4}>
                <PeopleCard  nickname = {"The Smooth Talker"} name = {"Zill-e-Rahim"} description = {"Aspiring Web Developer born in Pakistan and raised in Qatar. Majoring in Computer Science at UniMelb. Loves everything about Pokemon ϞϞ(๑⚈ ․̫ ⚈๑)"} pic ={zil}/>
            </Grid>
            <Grid item xs={false}  sm={2}/>
            <Grid item xs={12} sm ={4}>
                <PeopleCard nickname = {"The Panic Button"} name = {"Jason Thien"} description ={"Champion raftsman from Sabah, Malaysia. Majoring in Computer Science at UniMelb. Likes to overthink and underthink at the same time."}  pic = {jason}/>
            </Grid>
            <Grid item xs={12} sm={4}>
                <PeopleCard nickname = {"The Expert Napper"} name = {"Marcus Lim"} pic={marcus} description={"Explorer from the land of Malaysia. Majoring in Computer Science at UniMelb. Finds any opportunities to nap his problems away."}/>
            </Grid>

            <Grid item xs={false} sm={2}/>

        </Grid>
    
    
    
        );


};

function AboutUs () {
    const classes = useStyles();

    const [checks1, setChecked1] = React.useState(true);

    const [checks2, setChecked2] = React.useState(true);

  const handleChange1 = () => {
    setChecked1((prev) => !prev);
  };

  const handleChange2 = () => {
    setChecked2((prev) => !prev);
  };



    return (
        
    <div>
            <Grid container direction = "column" spacing={1}>
                <Hidden  only={["xs"]}>
                    <Grid item xs={false} sm={2}/>
                    <Grid item container alignItems="center" justify = "space-evenly">
                        <img src = {vision} alt = "teams.svg"/>  
                    </Grid>
                    <Grid item xs={false} sm={2}/>
                    <Grid item xs={false} sm={2}/>
                </Hidden>
                <Grid item container >
                    <Grid item xs={false} sm={2}/>
                    <Grid item xs={12} sm={8} spacing ={2}>
                        <Card elevation={2} onClick={handleChange1}>
                                <Typography className={classes.title} color='textSecondary'>
                                    Our Goal
                                </Typography>
                        </Card>
                        <Collapse in={checks1}>
                            <Card className = {classes.paper}>
                                <Grid item xs={12} sm={12} >
                                    <Typography className={classes.text} color='textSecondary'>
                                        To provide a user-friendly platform for people to showcase their projects and contributions to the world!
                                    </Typography>
                                </Grid>
                            </Card>
                        </Collapse>
                    </Grid>
                    <Grid item xs={false} sm={2}/>
                </Grid>
                <Grid item container>
                    <Grid item xs={false} sm={2}/>

                        <Grid item xs={12} sm={8}>
                            <Card elevation={2} onClick={handleChange2}>
                                <Typography className={classes.title} color='textSecondary'>
                                    The Team
                                </Typography>
                            </Card>
                            <Collapse in={checks2}>
                                <Content/>
                            </Collapse>
                        </Grid>

                    <Grid item xs={false} sm={2}/>
                </Grid>
                <Hidden  only={["xs"]}>
                    <Grid item xs={false} sm={2}/>
                </Hidden>

            </Grid>



    </div>
    );
}

export default AboutUs;