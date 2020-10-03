import React, { useState } from 'react';
import { Grid, Paper, makeStyles, Typography, Button, Box, Container, Divider, List, ListItem, ListItemText } from '@material-ui/core';
import { Link } from 'react-router-dom';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';


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
    project : {
        padding: theme.spacing(2),
    }
}));

export default function Content(props) {
    const classes = useStyles();
    const { content } = props;
    

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
                        <a style={{ fontSize: "20px", textTransform: 'none', color: "" }} href={value}>{value}</a>
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
                            return <ListItem style={{ fontSize: "15px", textTransform: 'none', color: "" }} ><a style={{ fontSize: "20px", textTransform: 'none', color: "" }} href={value}>{value}</a></ListItem>
                        })}
                    </List>
                </>
            )
        }
    }

    const blogPrint = () => {
        let blog = content.blog;
        if (content.blog) {
            return (
                <>
                    <Paper elevation={0} className={classes.sidebarBlogBox}>
                        <Typography variant="h6" gutterBottom>
                            Blog
                        </Typography>
                        <div dangerouslySetInnerHTML={{__html: content.blog}}/>
                    </Paper>
                </>
            )
        }
    }

    return (
        <div>
            <Container maxWidth="lg">
                <Grid container spacing={5} className={classes.mainGrid}>
                <Divider />
                    <Grid item xs={12} md={8}>
                        <Paper className = {classes.project}>
                            <div dangerouslySetInnerHTML={{__html: content.project}}/>
                        </Paper>
                    </Grid>
                    <Grid item container xs={12} md={4}>
                        <Grid item>
                            {blogPrint()}
                        </Grid>
                        <Grid item className={classes.sidebarSection}>
                            {linksPrint()}
                            {LinksList()}
                            
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}
