import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import CardActionArea from '@material-ui/core/CardActionArea';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import Popover from '@material-ui/core/Popover';
import ListItemText from '@material-ui/core/ListItemText';
import projectDefaultPic1 from './images/projectDefaultBG1.png';
import projectDefaultPic2 from './images/projectDefaultBG2.png';
import { Button, Divider } from '@material-ui/core';
import history from './history';
import {  useSelector } from 'react-redux';



const useStyles = makeStyles((theme) => ({
  mainFeaturedPost: {
    position: 'relative',
    //backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: `url(${projectDefaultPic1})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    //backgroundColor: 'rgba(0,0,0,.3)',
  },
  mainFeaturedPostContent: {
    position: 'relative',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing(1),
  },
  grids: {
    margin: "0",
  }
}));

export default function MainFeaturedPost(props) {
  const classes = useStyles();
  const { content, projectId } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const user = useSelector(store => store.user);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  let collabList = (<div></div>)
  if (content && Object.keys(content).length && content.collaborators) {
    const collabs = content.collaborators;
    collabList = collabs.map((value, index) => {
      console.log(value);
      return <Typography><ListItemText primary={value} /><Divider /></Typography>
    })
  }


  return (
    <>
      <Paper className={classes.mainFeaturedPost}  >

        <div className={classes.overlay} />
        <Grid container>
          <Grid item md={6}>
            <div className={classes.mainFeaturedPostContent}>
              <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                {content.name}
              </Typography>
              <Typography variant="h5" color="inherit" paragraph>
                {content.description}
              </Typography>
              <Link variant="subtitle1" href="#">
                link
            </Link>
            </div>
          </Grid>
        </Grid>
      </Paper>
      <Grid container >
        <Grid item xs={12} md={6}>
            <Card className={classes.card}>
              <div className={classes.cardDetails}>
                <CardContent>
                  <Typography component="h2" variant="h5">
                    Project Owner: {content.owner}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Creation : {content.creationDate}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    paragraph
                    aria-owns={open ? 'mouse-over-popover' : undefined}
                    aria-haspopup="true"
                    onMouseEnter={handlePopoverOpen}
                    onMouseLeave={handlePopoverClose}
                  >
                    Colloborators
              </Typography>
                  <Popover
                    id="mouse-over-popover"
                    className={classes.popover}
                    classes={{
                      paper: classes.paper,
                    }}
                    open={open}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                    onClose={handlePopoverClose}
                    disableRestoreFocus
                  >
                    {collabList}
                  </Popover>

                </CardContent>
              </div>
              <Hidden xsDown>
                <CardMedia className={classes.cardMedia} title="image" />
              </Hidden>
            </Card>
        </Grid>
      </Grid>


    </>
  );
}

MainFeaturedPost.propTypes = {
  content: PropTypes.object,
};