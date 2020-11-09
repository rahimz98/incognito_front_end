import React, { useState } from 'react'
import { DropzoneDialog } from 'material-ui-dropzone'
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, CircularProgress, Fab, Grid, Input, makeStyles, Typography } from '@material-ui/core';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';



const useStyles = makeStyles((theme) => ({
    loadingBase: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '200px',
    },
    cardMedia: {
        margin: "auto",
    },
    cardContent: {
        textAlign: "center",
    },
    imageContainer: {
        paddingTop: "20px",
        paddingLeft: "50px",
        paddingRight: "50px",
    },
    cardMedia: {
        margin: "auto",
    },
    cardContent: {
        textAlign: "center",
    },
    delete: {
        backgroundColor: "#DC004E",
        color: "#FFFFFF",
        '&:hover': {
            backgroundColor: "#DC004E",
            color: "#FFFFFF"
        },
    },
}));

const NoImage = () => {
    return (
        <>
            <Typography variant="h4">There seems to be no images entered as of yet</Typography>
        </>
    )
}

const ImagePage = () => {
    const token = localStorage.getItem("jwt");
    const [open, setOpen] = useState(false);
    const [project, setProject] = useState({});
    const { projectid } = useParams();
    const classes = useStyles();
    const [images, setImages] = useState({});



    React.useEffect(() => {
        console.log("HEllo Word 2.0");
        const token = localStorage.getItem("jwt");
        axios
            .get(`https://memento-backend.herokuapp.com/api/project/open/${projectid}`, {
                headers: {
                    'Authorization': token
                }
            })
            .then(res => {
                console.log("data:", res.data);
                setProject(res.data);
                setImages(res.data.media);
            })
    }, [projectid]);


    const uploadMedia = (formData) => {
        axios
            .post('https://memento-backend.herokuapp.com/api/project/edit/add-media', formData, {
                headers: {
                    Authorization: token,
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'multipart/form-data',
                }
            })
            .then((res) => {
                console.log("media recieved:", res.data.media);
                setImages(res.data.media);
                //window.location.reload(false);

            })
            .catch((err) => {
                console.log(err);
            })
    }

    const deleteImage = (imageName) => {
        var imageInfo = {
            projectId: `${projectid}`,
            deleteMediaName: `${imageName}`
        }
        console.log("ProjectID:",projectid,"imageName:",imageName);
        //imageInfo.append('projectId',projectid);
        //imageInfo.append('deleteMediaName', imageName);
        axios
            .post('https://memento-backend.herokuapp.com/api/project/edit/delete-media', imageInfo, {
                headers: {
                    Authorization: token,
                }
            })
            .then((res) => {
                console.log("media recieved:", res.data.media);
                setImages(res.data.media);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleSave = (filez) => {
        //Saving files to state for further use and closing Modal.
        const formData = new FormData();
        setOpen(false);
        console.log(filez);
        for (const file of filez) {
            formData.append('editMedia', file)
        }
        formData.append('projectId', projectid);
        console.log("formData:", formData);
        uploadMedia(formData);


    }

    const handleOpen = () => {
        setOpen(true);
    }

    const toFirstCharUppercase = (name) =>
        name.charAt(0).toUpperCase() + name.slice(1);

    const getImage = (fileName, fileLink) => {
        return (
            <Grid item xs={4}>
                <Card>
                    <CardActionArea onClick={() => window.open(fileLink)}>
                        <CardMedia
                            className={classes.cardMedia}
                            image={fileLink}
                            style={{ height: "200px" }}

                        />
                    </CardActionArea>
                    <CardActions>
                        <Grid
                            container
                            justify="flex-end"
                        >
                            <Fab size="small" color="primary" aria-label="add">
                                <DeleteOutlineIcon onClick={() => deleteImage(fileName)} />
                            </Fab>
                        </Grid>    
                    </CardActions>
                </Card>
            </Grid>
        )
    }


    return (
                <Grid container>
                    <Grid item xs={2} />
                    <Grid item xs={8} >
                        <Typography variant="h3">Gallery</Typography>
                        <Grid container justify="space-between">
                            <Grid item>
                                <Button variant='contained' color='primary' onClick={handleOpen.bind(this)}>
                                    Add Images
                                </Button>
                            </Grid>
                        </Grid>
                        {images ? (
                            <Grid container spacing={2} className={classes.imageContainer}>
                                {Object.entries(images).map(([imageName, imageLink]) =>
                                    getImage(imageName, imageLink)
                                )}
                            </Grid>
                        ) : (
                                <div className={classes.loadingBase}><NoImage /></div>
                            )}
                        <DropzoneDialog
                            open={open}
                            onSave={handleSave.bind(this)}
                            acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                            showPreviews={true}
                            maxFileSize={25000000}
                            filesLimit={10}
                            onClose={handleClose.bind(this)}
                        />
                    </Grid>
                    <Grid item xs={2} />
                </Grid>
    );
}

export default ImagePage;

