import React, { useEffect, useState } from 'react';
import { CircularProgress, Grid, makeStyles } from '@material-ui/core';
import ProjectContent from './projectContent.jsx';
import axios from 'axios';
import ProjectHeading from './projectHeading.jsx';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import NotFound from '../notFound/notFound';


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
    loadingBase: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '250px',
    },
}));

const PrivateProject = () => {
    return (
        <>
            <NotFound />
        </>
    )
}

const ViewProject = (props) => {
    const { projectId } = props;
    const classes = useStyles();
    const [project, setProject] = useState({});
    console.log("ProjectID id is " + projectId);
    const [open, setOpen] = useState(true);
    const [projectPrivate, setProjectPrivate] = useState(false);
    const [dataReceived, setDataReceived] = useState(false);


    useEffect(() => {
        console.log("Opening project as a visitor");
        //const token = localStorage.getItem("jwt");
        axios
            .get(`https://memento-backend.herokuapp.com/api/project/unverified-user/open/${projectId}`, {
            })
            .then(res => {
                console.log("res:", res);
                setDataReceived(true);
                if (res.data.msg === "Project does not exist") {
                    setOpen(false);
                    console.log("Project was not found");
                    setProjectPrivate(false);
                }
                else if (res.data.msg === "Project access denied"){
                    setProjectPrivate(true);
                }
                else {
                    setProject(res.data);
                    setOpen(true);
                    setProjectPrivate(false);
                }
            })
            .catch((err) => {
                console.log(err);

            })
    }, [projectId]);


    return (
        <>
        {dataReceived ?  
        <>
            {open == false ? (<NotFound />) : (
                <>  
                    {projectPrivate == true ? (<PrivateProject />) : (
                        <div className={classes.root}>
                            <Grid container>
                                <Grid item xs={1} />
                                <Grid item xs={10}>
                                    {project ?
                                        <Grid item container direction="column" spacing={2} >
                                            <Grid item />
                                            <Grid item container spacing={1}>
                                                <Grid item xs={12} >
                                                    <ProjectHeading content={project} projectId={projectId} />

                                                </Grid>
                                            </Grid>

                                            <Grid item container >
                                                <ProjectContent content={project} projectId={projectId} />
                                            </Grid>
                                        </Grid>
                                        :
                                        <PrivateProject />
                                    }
                                </Grid>
                                <Grid item xs={1} />
                            </Grid>
                        </div>
                    )}
                </>
            )}
            </>
        :
        <div className = {classes.loadingBase}><CircularProgress /></div>
        }
        </>
    )
}

export default ViewProject;