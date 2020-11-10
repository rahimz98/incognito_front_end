import React, { useState } from "react";
import { Card, CardContent, Container, MenuItem, Typography, Button, Box, Stepper, Step, StepLabel, makeStyles, CircularProgress, Grid, Snackbar } from '@material-ui/core';
import { Form, Formik, Field, FieldArray } from "formik";
import { TextField as TF } from 'formik-material-ui';
import axios from "axios";
import { useSelector } from 'react-redux';
import history from '../../history';
import { Alert } from "@material-ui/lab";





const useStyles = makeStyles((theme) => ({
    button: {
        marginRight: theme.spacing(2),
    },
    card: {
        marginTop: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: "#68C2E8",
    },
    typography: {
        marginBottom: theme.spacing(2),
    }
}));

const visibility = [
    {
        value: "Public",
        label: "Public",
    },
    {
        value: "Private",
        label: "Private",
    },
];

const sleep = (time) => new Promise((acc) => setTimeout(acc, time));



const CreateProject = () => {
    const [visible, setVisible] = React.useState('Public');
    const classes = useStyles();
    const user = useSelector(store => store.user);
    const token = localStorage.getItem("jwt");
    const [collabList, setCollabList] = React.useState([]);
    const [open, setOpen] = React.useState(false);


    const handleChange = (event) => {
        setVisible(event.target.value)
    }

   

    const snackBarSuccess = () => {
        return (
        
        <Snackbar open={open} autoHideDuration={3000} >
            {console.log("displaying snackbar")}
            <Alert  severity="success">
                Project Created Successfully
            </Alert>
        </Snackbar>
    )}

    const postProject = (values) => {
        axios
            .post('https://memento-backend.herokuapp.com/api/project/create', values, {
                headers: {
                    'Authorization': token
                }
            })
            .then((res) => {
                console.log("res", res);                
                history.push(`/${user.id}/${res.data.projectId}`);
            })
            .catch((err) => {
                console.log(err);
            })
    }


    const FriendList = (collaborators) => (
        <div>
            <Typography className={classes.typography} variant="h6">Add the project's collaborators</Typography>
            <Formik
                initialValues={{ collaborators }}
                onSubmit={values =>
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                    }, 500)
                }
                render={({ values }) => (
                    <Form>
                        <FieldArray
                            name="collaborators"
                            render={arrayHelpers => (
                                <div>
                                    {values.collaborators && values.collaborators.length > 0 ? (
                                        values.collaborators.map((friend, index) => (
                                            <div key={index}>
                                                <Field component={TF} name={`collaborators.${index}`} />
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
                                    {console.log(values)}
                                    {setCollabList(values)}

                                </div>
                            )}
                        />
                    </Form>
                )}
            />
        </div>
    );


    return (
        <>
            <Container maxWeidth="lg">
                <Container maxWeidth="lg" >
                    <Grid Container justify="center" alignItems="center">
                        <Box className={classes.paper}>
                            <Typography variant="h3">Let's Create a Project</Typography>
                        </Box>
                    </Grid>
                </Container>

                <Card className={classes.card}>
                    <CardContent>
                        <FormikStepper
                            initialValues={{
                                name: '',
                                description: '',
                                visibility: 'Public',
                                collaborators: [],
                            }} onSubmit={async (values) => {
                                await sleep(3000);
                                values.collaborators = Object.assign(values.collaborators, collabList);
                                console.log('values: ', values);
                                postProject(values);
                                setOpen(true);
                                console.log("open:",open);
                                snackBarSuccess();
                            }}>


                            <FormikStep label="Project Name">
                                <Box paddingBottom={2}>
                                    <Field fullWidth name="name" component={TF} label="Name Of Project" />
                                </Box>
                            </FormikStep>

                            <FormikStep label="Project Visibility">
                                <Box paddingBottom={2}>
                                    <Field
                                        fullWidth
                                        component={TF}
                                        type="text"
                                        name="visibility"
                                        select
                                        variant="standard"
                                        helperText="Please Select whether you want this project to be public or private"
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    >
                                        {visibility.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </Field>
                                </Box>
                            </FormikStep>


                            <FormikStep label="Project Description" >
                                <Box paddingBottom={2}>
                                    <Field fullWidth name="description" component={TF} label="Project Description" />

                                </Box>
                            </FormikStep>

                        </FormikStepper>

                    </CardContent>
                </Card>
            </Container>
        </>
    )
}

export function FormikStep({ children }) {
    return <>{children}</>
}

export function FormikStepper({ children, ...props }) {
    const childrenArray = React.Children.toArray(children);
    const [step, setStep] = useState(0);
    const currentChild = childrenArray[step];
    const classes = useStyles();

    function isLastStep() {
        return step === childrenArray.length - 1;
    }

    return (
        <Formik {...props} onSubmit={async (values, helpers) => {
            if (isLastStep()) {
                await props.onSubmit(values, helpers)
            } else {
                setStep(s => s + 1);
            }
        }}>
            {({ isSubmitting }) => (


                <Form autoComplete="off">
                    <Stepper activeStep={step} alternativeLabel>
                        {childrenArray.map((child) => (
                            <Step key={child.props.label}>
                                <StepLabel>{child.props.label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {currentChild}
                    {step > 0 ? <Button className={classes.button} disabled={isSubmitting} variant="outlined" onClick={() => setStep(s => s - 1)}>Back</Button> : null}
                    <Button startIcon={isSubmitting ? <CircularProgress size="1rem" /> : null} disabled={isSubmitting} variant="outlined" type="submit">{isSubmitting ? 'Submitting' : isLastStep() ? 'Submit' : 'Next'}</Button>
                </Form>
            )}
        </Formik>
    )
}


export default CreateProject;