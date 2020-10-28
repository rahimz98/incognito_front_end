import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Hidden, Card, CardMedia } from "@material-ui/core";
import logo from './logo.png';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grow from '@material-ui/core/Grow';
import Zoom from '@material-ui/core/Zoom';
import flatOfficePic from './images/flatOffice.png';
import projectLaptop from './images/projectLaptop.jpg';
import Typical from 'react-typical'







const userStyles = makeStyles((theme) => ({

    registerButton: {
        color: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
        marginBottom: theme.spacing(2)

    },
    signInButton: {
        backgroundColor: '#192231',
        color: '#FFFFFF',
        textTransform: 'none',

    },
    centerImage: {

        minHeight: "100px",
        minwidth: "100px",

        maxWidth: "300px",
        maxHeight: "300px",
        height: '250px',
        weight: '250px'


    },

    uploadPic: {
        display: "flex",
        justifyContent: "center", /* horizontally center */
        alignItems: "center",    /* vertically center */
        align: "center",
        height: "410px",
        alignContent: "center",
        textAlign: "center",
    },

    typography: {
        variant: "h3",
        align: 'center',
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.primary,
    },
    media: {
        height: 300,
    },
    steps: {
        color: "#68C2E8"
    },
    stepsHeader: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(0),

    }
}));

var TxtRotate = function (el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtRotate.prototype.tick = function () {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    var that = this;
    var delta = 150 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function () {
        that.tick();
    }, delta);
};

window.onload = function () {
    var elements = document.getElementsByClassName('txt-rotate');
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-rotate');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtRotate(elements[i], JSON.parse(toRotate), period);
        }
    }
};



export default function HomePage() {
    const classes = userStyles();
    const [checked] = React.useState(true);


    return (

        <div style={{ padding: 20 }}>
            <Grid container>
                <Hidden only={["xs", "sm"]}>
                    <Grid item xs={2} />
                </Hidden>
                <Grid item xs={8}>
                    <Grid container direction="column" spacing="5" >
                        <div style={{}}>
                            <Grid item container justify="center">
                                <Grid item container >
                                    <Grid item container xs={6} justify="flex-start" alignItems="center">
                                        <h1>This is a creative area where anyone can{'  '}  
                                            <span
                                                class="txt-rotate"
                                                data-period="100"
                                                style={{ color: "#68C2E8" }}
                                                data-rotate='[ "upload their projects.", "look up other projects.", "upload their CV.", "write up a retrospective.", "have fun!" ]'></span>
                                        </h1>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Grow in={checked}>
                                            <Grid item container direction="column" alignItems="center" justify="space-evenly">
                                                <Grid item >
                                                    <img src={logo} alt="logo.png" className={classes.centerImage} />
                                                </Grid>
                                            </Grid>
                                        </Grow >
                                    </Grid>
                                </Grid>
                            </Grid>
                        </div>

                        <Grid item container alignItems="center" justify="center">

                            <Grid item>
                                <Grid item container spacing={3} alignItems="center" justify="center">
                                    <Hidden only={["xs"]}>
                                        <Grid item xs={6} >
                                            <Zoom in={checked}>
                                                <Card>
                                                    <CardMedia
                                                        className={classes.media}
                                                        image={flatOfficePic}
                                                        alt="laptop"
                                                        title="laptopPicture"
                                                    />
                                                </Card>
                                            </Zoom>
                                        </Grid>
                                    </Hidden>
                                    <Grid item xs={6} textAlign="center">
                                        <Box display="flex">
                                            <Box m="auto">
                                                <Typography variant="h3" align='center' >
                                                    Upload Your Projects
                                                </Typography>
                                                <Typography align='center'>
                                                    Start uploading your projects so you can show it to the public with a professional manner. Have Control on how your project will look like and show the world what your really capable of!
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item container justify="center" alignItems="center">
                            <Grid item >
                                <Grid item container spacing={3} alignItems="center" justify="center">
                                    <Grid item xs={6}  >
                                        <Box display="flex" >
                                            <Box m="auto">
                                                <Typography variant="h3" align='center' >
                                                    Look up Your Colleague's Profile
                                        </Typography>
                                                <Typography align='center'>
                                                    Search up your friends, associates or colleagues and be able to see their profile, resume and alongside their projects and all the hardwork they have accomplished over the years!
                                        </Typography>
                                            </Box>
                                        </Box>
                                    </Grid>
                                    <Hidden only={["xs"]}>
                                        <Grid item xs={6} textAlign="center">
                                            <Zoom in={checked}>
                                                <Card>
                                                    <CardMedia
                                                        className={classes.media}
                                                        image={projectLaptop}
                                                        alt="laptop"
                                                        title="laptopPicture"
                                                    />
                                                </Card>
                                            </Zoom>
                                        </Grid>
                                    </Hidden>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Hidden only={["xs", "sm"]}>
                    <Grid item xs={2} />
                </Hidden>
            </Grid>


        </div>
    );
}