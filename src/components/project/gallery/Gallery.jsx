import React, { useState } from 'react'
import { DropzoneDialog } from 'material-ui-dropzone'
import { Button, Card, CardContent, CardMedia, CircularProgress, Grid, Input, makeStyles, Typography } from '@material-ui/core';
import axios from 'axios';
import { useParams } from 'react-router-dom';

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
}));


const NoImage = () => {
    return (
        <>
            <Typography variant="h4">There seems to be no images entered as of yet</Typography>
        </>
    )
}

const Gallery = () => {
    const token = localStorage.getItem("jwt");
    const [open, setOpen] = useState(false);
    const [project, setProject] = useState({});
    const { projectid } = useParams();
    const classes = useStyles();
    const [images, setImages] = useState({});


    React.useEffect(() => {
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

    const getImage = (fileName, fileLink) => {
        return (
            <Grid item xs={4}>
                <Card onClick={() => window.open(fileLink)}>
                    <CardMedia
                        className={classes.cardMedia}
                        image={fileLink}
                        style={{ height: "200px" }}

                    />
                </Card>
            </Grid>
        )
    }

    return (
        <Grid container>
            <Grid item xs={2} />
            <Grid item xs={8} >
                <Typography variant="h3">Gallery</Typography>
                {images ? (
                    <Grid container spacing={2} className={classes.imageContainer}>
                        {Object.entries(images).map(([imageName, imageLink]) =>
                            getImage(imageName, imageLink)
                        )}
                    </Grid>
                ) : (
                        <div className={classes.loadingBase}><NoImage /></div>
                    )}
            </Grid>
            <Grid item xs={2} />
        </Grid>
    );
}

export default Gallery;

