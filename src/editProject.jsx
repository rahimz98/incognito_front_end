import { Grid, Hidden, makeStyles, Paper } from '@material-ui/core';
import * as React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import history from './history';
import { useSelector } from 'react-redux';
import { Formik, Form, Field, FieldArray } from 'formik';
import {
    Button,
    MenuItem,
    Typography,
} from '@material-ui/core';
import {
    TextField,
} from 'formik-material-ui';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';



const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
        elevation: 0,
        marginBottom: theme.spacing(2),
    },
    project: {
        padding: theme.spacing(2),
        color: theme.palette.text.primary,
        elevation: 0,
        marginBottom: theme.spacing(2),
    },
    owner: {
        marginBottom: theme.spacing(2),
    },
    edit: {
        marginTop: theme.spacing(2),
    },
    delete: {
        backgroundColor: "#DC004E",
        color: "#FFFFFF",
        '&:hover': {
            backgroundColor: "#DC004E",
            color: "#FFFFFF"
        },
    },
    submit: {
    }


}));

const ranges = [
    {
        value: 'Public',
        label: 'Public',
    },
    {
        value: 'Private',
        label: 'Private',
    }
]

const modules = {
    toolbar: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image'],
        ['clean']
    ],
}

const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video',
]

const EditProject = (props) => {
    const [project, setProject] = React.useState({});
    const { projectid } = useParams();
    const classes = useStyles();
    const user = useSelector(store => store.user);
    const [open, setOpen] = React.useState(false);

    const blogContent = {
        projectId: `${projectid}`,
        editBlog: `${project.blog}`,
    }

    const projectContent = {
        projectId: `${projectid}`,
        editProject: `${project.project}`,
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };




    const onChangeProjectContent = (value) => {
        project.project = value;
        projectContent.editProject = value;
        console.log("editProject", projectContent.editProject);
    }

    const onChangeProjectBlog = (value) => {
        project.blog = value;
        blogContent.editBlog = value;
        console.log("editBlog", blogContent.editBlog);
    }

    // All 3 post request happen here
    const sendProject = (values) => {
        const token = localStorage.getItem("jwt");
        console.log("projectContent:  ", projectContent);
        //Project content

        axios
            .post('http://localhost:5000/api/project/edit/projectContent', projectContent, {
                headers: {
                    'Authorization': token
                }
            })
            .then((res) => {
                console.log("res:", res);
            })
            .catch((err) => {
                console.log(err);
            })


        //Project details
        axios
            .post('http://localhost:5000/api/project/edit', values, {
                headers: {
                    'Authorization': token
                }
            })
            .then((res) => {
                console.log("res:", res);

            })
            .catch((err) => {
                console.log(err);
            })

        //Blog Content
        setTimeout(() => {
            console.log("blogcontent:", blogContent);
            axios
                .post('http://localhost:5000/api/project/edit/blog', blogContent, {
                    headers: {
                        'Authorization': token
                    }
                })
                .then((res) => {
                    console.log("res:", res);
                    setTimeout(() => {
                        history.push(`/${user.id}/${projectid}`);
                    }, 1000);
                })
                .catch((err) => {
                    console.log(err);
                })
        }, 1000);
    }

    const deleteProject = () => {
        const token = localStorage.getItem("jwt");
        axios
            .get(`http://localhost:5000/api/project/delete/${projectid}`, {
                headers: {
                    'Authorization': token
                }
            })
            .then((res) => {
                console.log("res:", res);
                console.log("Project Deleted");
                setTimeout(() => {
                    history.push(`/${user.id}`);
                }, 1000);
            })
            .catch((err) => {
                console.log(err);
            })
    }


    React.useEffect(() => {
        console.log("HEllo Word 2.0");
        const token = localStorage.getItem("jwt");
        axios
            .get(`http://localhost:5000/api/project/open/${projectid}`, {
                headers: {
                    'Authorization': token
                }
            })
            .then(res => {
                console.log("data:", res.data);
                setProject(res.data);
                projectContent.editProject = project.project;
                blogContent.editBlog = project.blog;

            })
    }, [projectid]);


    return (
        <>
            <Grid container>
                <Hidden only={["xs", "sm"]}>
                    <Grid item xs={1} />
                </Hidden>
                <Grid item xs={10}>
                    <Grid item container direction='column'>
                        <Typography variant="h4" className={classes.edit}>Edit Project</Typography>
                        {project && project.name && project.collaborators && projectid ? (
                            <React.Fragment>
                                <Typography className={classes.owner} >Owner: {project.owner}</Typography>
                                <Formik
                                    initialValues={{
                                        projectId: `${projectid}`,
                                        editName: `${project.name}`,
                                        editDescription: `${project.description}`,
                                        editOwner: `${project.owner}`,
                                        editCollaborators: project.collaborators,
                                        editVisibility: `${project.visibility}`,
                                        editLinks: project.links,
                                    }}
                                    onSubmit={(values, { setSubmitting }) => {

                                        setSubmitting(false);
                                        console.log(projectid);
                                        sendProject(values);

                                    }}
                                >
                                    {({ submitForm, isSubmitting, values }) => (

                                        <Form>
                                            <Grid item container spacing={2}>
                                                <Grid item xs={12} md={8}>
                                                    <Paper className={classes.paper} elevation={1}>
                                                        <Typography>Project Details</Typography>
                                                        <Box margin={2}>
                                                            <Field
                                                                fullWidth
                                                                component={TextField}
                                                                name='editName'
                                                                label='Project Name'
                                                            />
                                                        </Box>
                                                        <Box margin={2}>
                                                            <Field
                                                                fullWidth
                                                                component={TextField}
                                                                name='editDescription'
                                                                label='Project Description'
                                                            />
                                                        </Box>
                                                    </Paper>
                                                    <Paper className={classes.project} elevation={1}>
                                                        <Typography>Blog</Typography>
                                                        <ReactQuill
                                                            theme="snow"
                                                            modules={modules}
                                                            formats={formats}
                                                            value={project.blog || ''}
                                                            onChange={(e) => onChangeProjectBlog(e)}
                                                            placeholder={"Start typing away ^_^"}
                                                        />
                                                    </Paper>

                                                </Grid>


                                                <Grid item xs={12} md={4}>
                                                    <Paper className={classes.paper} elevation={1}>
                                                        <Typography>Visibility</Typography>
                                                        <Field
                                                            fullWidth
                                                            component={TextField}
                                                            type="text"
                                                            name="editVisibility"
                                                            select
                                                            variant="standard"
                                                            helperText="Visibility"
                                                            margin="normal"
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                        >
                                                            {ranges.map((option) => (
                                                                <MenuItem key={option.value} value={option.value}>
                                                                    {option.label}
                                                                </MenuItem>
                                                            ))}
                                                        </Field>
                                                    </Paper>
                                                    <Paper className={classes.paper} elevation={1}>
                                                        <Typography>Collaborators</Typography>
                                                        <FieldArray
                                                            name="editCollaborators"
                                                            render={arrayHelpers => (
                                                                <div>
                                                                    {values.editCollaborators && values.editCollaborators.length > 0 ? (
                                                                        values.editCollaborators.map((friend, index) => (
                                                                            <div key={index}>
                                                                                <Field component={TextField} name={`editCollaborators.${index}`} />
                                                                                <Button
                                                                                    type="button"
                                                                                    onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                                                                                >
                                                                                    -
                                                                                </Button>
                                                                                <Button
                                                                                    type="button"
                                                                                    onClick={() => arrayHelpers.insert(index, '')} // insert an empty string at a position
                                                                                >
                                                                                    +
                                                                                </Button>
                                                                            </div>
                                                                        ))
                                                                    ) : (
                                                                            <Button type="button" onClick={() => arrayHelpers.push('')}>
                                                                                {/* show this when user has removed all collaborators from the list */}
                                                                                Add a Colloborator
                                                                            </Button>
                                                                        )}
                                                                </div>
                                                            )}
                                                        />
                                                    </Paper>
                                                    <Paper className={classes.paper} elevation={1}>
                                                        <Typography>Links</Typography>
                                                        <FieldArray
                                                            name="editLinks"
                                                            render={arrayHelpers => (
                                                                <div>
                                                                    {values.editLinks && values.editLinks.length > 0 ? (
                                                                        values.editLinks.map((friend, index) => (
                                                                            <div key={index}>
                                                                                <Field component={TextField} name={`editLinks.${index}`} />
                                                                                <Button
                                                                                    type="button"
                                                                                    onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                                                                                >
                                                                                    -
                                                                                </Button>
                                                                                <Button
                                                                                    type="button"
                                                                                    onClick={() => arrayHelpers.insert(index, '')} // insert an empty string at a position
                                                                                >
                                                                                    +
                                                                                </Button>
                                                                            </div>
                                                                        ))
                                                                    ) : (
                                                                            <Button type="button" onClick={() => arrayHelpers.push('')}>
                                                                                {/* show this when user has removed all collaborators from the list */}
                                                                                Add a Link
                                                                            </Button>
                                                                        )}
                                                                </div>
                                                            )}
                                                        />
                                                    </Paper>
                                                </Grid>
                                            </Grid>

                                            <Paper className={classes.project} elevation={1}>
                                                <Typography>Project</Typography>
                                                <ReactQuill
                                                    theme="snow"
                                                    modules={modules}
                                                    formats={formats}
                                                    value={project.project || ''}
                                                    onChange={(e) => onChangeProjectContent(e)}
                                                    placeholder={"Start typing away ^_^"}
                                                />
                                            </Paper>
                                            <Grid container justify="space-between">
                                                <Grid item>
                                                    <Button
                                                        startIcon={<DeleteIcon />}
                                                        variant="contained"
                                                        className={classes.delete}
                                                        onClick={deleteProject}
                                                        onClick={handleClickOpen}
                                                    >
                                                        Delete project
                                                    </Button>
                                                    <Dialog
                                                        open={open}
                                                        onClose={handleClose}
                                                        aria-labelledby="alert-dialog-title"
                                                        aria-describedby="alert-dialog-description"
                                                    >
                                                        <DialogTitle id="alert-dialog-title">{"Delete This Project"}</DialogTitle>
                                                        <DialogContent>
                                                            <DialogContentText id="alert-dialog-description">
                                                                If you delete this project, there will be no way to recover this project and it will be deleted forever.
                                                            </DialogContentText>
                                                        </DialogContent>
                                                        <DialogActions>
                                                            <Button onClick={handleClose} color="primary" variant="b">
                                                                Disagree
                                                            </Button>
                                                            <Button onClick={deleteProject} color="primary" variant="b" autoFocus>
                                                                Agree
                                                            </Button>
                                                        </DialogActions>
                                                    </Dialog>
                                                </Grid>
                                                <Grid item>
                                                    <Button
                                                        variant='contained'
                                                        color='primary'
                                                        disabled={isSubmitting}
                                                        onClick={submitForm}
                                                        startIcon={<SaveIcon />}
                                                        className={classes.submit}
                                                    >
                                                        Submit
                                                </Button>

                                                </Grid>
                                            </Grid>

                                        </Form>

                                    )}
                                </Formik>
                            </React.Fragment>
                        ) : <CircularProgress />}

                    </Grid>
                </Grid>
                <Hidden only={["xs", "sm"]}>
                    <Grid item xs={1} />
                </Hidden>
            </Grid>
        </>
    )
}

export default EditProject;