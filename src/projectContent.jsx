import React from 'react';
import { Grid, Paper, makeStyles, Typography, Button, Divider, List, ListItem } from '@material-ui/core';
import { useSelector } from 'react-redux';
import history from './history';
import CssBaseline from "@material-ui/core/CssBaseline";
import { FacebookShareButton, FacebookIcon, LinkedinShareButton, LinkedinIcon } from "react-share";
import ImageStepper from './ImageStepper.jsx';
import HelmetMetaData from './HelmetMetaData';



const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        //textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    mainGrid: {
        margintop: theme.spacing(3),
    },

    sidebarBlogBox: {
        padding: theme.spacing(2),
        backgroundColor: theme.palette.grey[200],
        color: "#000000"
    },
    sidebarSection: {
        marginTop: theme.spacing(3),
    },
    project: {
        padding: theme.spacing(2),
    },
    editButton: {
        backgroundColor: '#2D3E50',
        color: '#FFFFFF',
        '&:hover': {
            backgroundColor: '#2D3E50',
        }
    },
    socialMediaButton: {
        margin: theme.spacing(1),
    }
}));

export default function Content(props) {
    const classes = useStyles();
    const { content, projectId } = props;
    const user = useSelector(store => store.user);


    const linksPrint = () => {
        if (content && Object.keys(content).length && content.links) {
            return (
                <>
                    <Typography variant="h6" gutterBottom>Links</Typography>
                </>
            )
        }
    }

    let linksList = (<div></div>)
    if (content && Object.keys(content).length && content.links) {
        const links = content.links;
        linksList = links.map((value, index) => {
            console.log(value);
            return (
                <>
                    <List>
                        <Button style={{ fontSize: "20px", textTransform: 'none', color: "" }} onClick={() => window.open(`https://facebook.com`)}>{value}</Button>
                    </List>
                </>
            )
        })
    }

    const LinksList = () => {
        if (content && Object.keys(content).length && content.links) {
            const links = content.links;
            return (
                <>
                    <List>
                        {linksList = links.map((value, index) => {
                            console.log(value);
                            return <ListItem style={{ fontSize: "15px", textTransform: 'none', color: "" }} ><Button style={{ fontSize: "20px", textTransform: 'none', color: "", display: "table-cell" }} onClick={() => window.open(`https://${value}`)} >{value}</Button></ListItem>
                        })}
                    </List>
                </>
            )
        }
    }

    const blogPrint = () => {
        if (content.blog) {
            return (
                <>
                {content.blog === "<p></p>" ? <div /> : 
                    <Paper elevation={0} className={classes.sidebarBlogBox}>
                        <Typography variant="h6" gutterBottom>
                            Blog
                        </Typography>
                        <div dangerouslySetInnerHTML={{ __html: content.blog }} />
                    </Paper>
                }
                </>
            )
        }
    }

    const noProject = "<h1>No Project has been entered yet</h1>"

    return (
        <div>
            <CssBaseline />
            <Grid container spacing={5} className={classes.mainGrid}>
                <Divider />
                {content.project === "<p></p>" ? <div /> :
                <Grid item xs={12} md={8}>
                    <Paper className={classes.project}>
                        {content.project ? <div dangerouslySetInnerHTML={{ __html: content.project }} /> : <div dangerouslySetInnerHTML={{ __html: noProject }} />}
                    </Paper>
                    
                </Grid>
                }
                <Grid item container direction="column" xs md>
                    <Grid item>
                        {blogPrint()}
                    </Grid>
                    <Grid item className={classes.sidebarSection}>
                        {linksPrint()}
                        {LinksList()}
                        <FacebookShareButton
                            url={`https://memento-front-end.herokuapp.com/${user.id}/${projectId}`} //ADD the proper project url when website is hosted
                            quote={"Check out this project!"}
                            hashtag="#Memento"
                            className={classes.socialMediaButton}>
                            <FacebookIcon size={36} />
                        </FacebookShareButton>
                        <LinkedinShareButton
                            title={content.name}
                            summary={content.description}
                            url={`https://memento-front-end.herokuapp.com/${user.id}/${projectId}`}
                            source={`https://memento-front-end.herokuapp.com/${user.id}/${projectId}`} //ADD project url when website is hosted
                            className={classes.socialMediaButton}
                        >
                            <LinkedinIcon size={36} />
                        </LinkedinShareButton>
                    </Grid>
                    <Grid item>
                        <ImageStepper images={content.media} projectId={projectId}/>
                    </Grid>
                    {content.canEdit === true ?
                        <Grid item>
                            <Button variant='contained' color='primary' onClick={() => { history.push(`/${user.id}/${projectId}/edit`) }}>Edit Project</Button>
                        </Grid>
                        :
                        <Grid item></Grid>
                    }
                </Grid>
            </Grid>

        </div>
    )
}
