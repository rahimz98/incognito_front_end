import React, { useEffect, useState } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import ProjectContent from './projectContent.jsx';
import axios from 'axios';
import ProjectHeading from './projectHeading.jsx';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    projectName: {
        color: "#68C2E8",
        fontSize: 48,
    },
    description: {
        color: "#566CD6",
    },
    editButton: {
        marginTop: theme.spacing(5),
        textTransform: 'none',

    },
    mainGrid: {
        margintop: theme.spacing(3),
    },
}));

const PrivateProject = () => {
    return (
        <>
            <h1>This is a Private Project. You do not have premision to view it</h1>
        </>
    )
}




const Project = () => {
    const classes = useStyles();
    const { projectid } = useParams();
    const [project, setProject] = useState({});
    console.log("ProjectID id is " + projectid);
    const user = useSelector(store => store.user);



    useEffect(() => {
        console.log("HEllo Word 2.0");
        const token = localStorage.getItem("jwt");
        axios
            .get(`http://localhost:5000/api/project/open/${projectid}`, {
                headers: {
                    'Authorization': token
                }
            })
            .then(res => {
                console.log(typeof (res));
                setProject(res.data);
            })
    }, [projectid]);

    return (
        <div className={classes.root}>
            <Grid container>
                <Grid item xs={1} />
                <Grid item xs={10}>
                    {project.visibility == "Private" ?
                        (project.ownerId === user.id ?
                            <Grid item container direction="column" spacing={2} >
                                {console.log("access granted")}
                                <Grid item />
                                <Grid item container spacing={1}>
                                    <Grid item xs={12} >
                                        <ProjectHeading content={project} projectId={projectid} />

                                    </Grid>
                                </Grid>

                                <Grid item container >
                                    <ProjectContent content={project} projectId={projectid} />
                                </Grid>
                            </Grid>
                            :
                            PrivateProject()
                        )
                        :
                        <Grid item container direction="column" spacing={2} >
                            <Grid item />
                            <Grid item container spacing={1}>
                                <Grid item xs={12} >
                                    <ProjectHeading content={project} projectId={projectid} />

                                </Grid>
                            </Grid>

                            <Grid item container >
                                <ProjectContent content={project} projectId={projectid} />
                            </Grid>
                        </Grid>
                    }
                </Grid>
                <Grid item xs={1} />
            </Grid>

        </div>
    )
}

export default Project;