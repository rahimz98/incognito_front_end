import React from 'react';
import { Grid, Paper, makeStyles, Typography, Button, Box } from '@material-ui/core';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import ProjectContent from './projectContent.jsx';
//Dummy API
import project1 from './dummyAPI/project1.json';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow : 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    projectName : {
        color : "#68C2E8",
        fontSize : 48,
    },
    description : {
        color : "#566CD6",
    },
    editButton : {
        marginTop: theme.spacing(5), 
        //backgroundColor : '#192231',
        //color : '#FFFFFF',
        textTransform : 'none',
        
    },
    mainGrid : {
        margintop : theme.spacing(3),
    },
}));

const proj = [project1];
console.log(project1.Blog);

export default function Project() {
const classes = useStyles();

    return (
        <div className = {classes.root}>
            <Grid container >
                <Grid item xs = {1} />
                
                <Grid item container direction = "column" xs = {10} spacing = {2} >
                    
                    <Grid item />
                    <Grid item container spacing = {1}>

                        <Grid item xs = {6}>
                            <Typography  className = {classes.projectName}>
                                {project1.Name}
                            </Typography>
                            <Typography variant = "body1" className = {classes.description}>
                                Owner: {project1.Owner}
                            </Typography>
                            <Typography variant = "body1" className = {classes.description}>
                                Contributors: n/a
                            </Typography>
                            <Typography variant = "body1">
                                Visible: {project1.Visibility}
                            </Typography>
                            <Typography variant = "body1">
                                Date of Creation: {project1["Date of creation"]}
                            </Typography>
                            <Typography variant = "h6">
                                Description: {project1.Description}
                            </Typography>
                        </Grid>
                        
                        
                        <Grid item container xs = {6} alignItems="flex-start" justify="flex-end" direction="row">
                            <EditOutlinedIcon  className = {classes.editButton} fontSize = "large"/>
                        </Grid>   
                        

                    </Grid>

                    <Grid item container >
                        <ProjectContent content = {project1} />
                    </Grid>    

                </Grid>

                <Grid item xs = {1} />

            </Grid>
        </div>
    )
}