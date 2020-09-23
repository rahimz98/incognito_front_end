import React from 'react';
import { Grid, Paper, makeStyles, Typography, Button, Box, Container, Divider, List, ListItem, ListItemText } from '@material-ui/core';
import { Link } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        //textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    mainGrid : {
        margintop : theme.spacing(3),
    },
    markdown: {
        ...theme.typography.body2,
        padding: theme.spacing(3, 0),
      },
    sidebarBlogBox: {
        padding: theme.spacing(2),
        backgroundColor: theme.palette.grey[200],
        color : "#000000"
    },
    sidebarSection: {
        marginTop: theme.spacing(3),
      },
}));

export default function Content(props) {
    const classes = useStyles();
    const {content} = props;
    console.log(content);
    return (
        <div>
           
            <Container maxWidth = "lg">
                <Grid  container spacing = {5} className =  {classes.mainGrid}>
                    <Grid item xs = {12} md = {8}>
                        
                        <Typography variant="h6" gutterBottom>
                            Title of the project
                        </Typography>
                        <Divider />
                        <Typography gutterBottom>
                            {content.Blog}
                        </Typography>
                        
                    </Grid>
                    <Grid item container xs = {12} md = {4}>
                        <Grid item>
                            <Paper elevation = {0} className = {classes.sidebarBlogBox}>
                                <Typography variant="h6" gutterBottom>
                                    Blog
                                </Typography>
                                <Typography>{content.About}</Typography>
                            </Paper>
                        </Grid>

                        <Grid item>
                            <Typography variant="h6" gutterBottom className={classes.sidebarSection}>
                                Links
                            </Typography>
                            <List>
                            {content.Links.map((links) => (
                                <Button component = {Link}  style={{fontSize: "20px" ,  textTransform: 'none', color: ""}}  href = {links}>
                                    <ListItemText primary = {links} />
                                </Button>    
                            ))}
                            </List>
                        </Grid>
                    </Grid>
                </Grid>    
            </Container>
        </div>    
    )
}
