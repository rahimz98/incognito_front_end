import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

function Copyright() {
  return (
    <React.Fragment>
      {'© '}
      <Link color="inherit" href="/">
        Our Website
      </Link>{' '}
      {new Date().getFullYear()}
    </React.Fragment>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundColor: '#6D7993',
    flexDirection: 'column',
    color : '#ffffff',
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
  },
  container: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    display: 'flex',
    
  },
  iconsWrapper: {
    height: 120,
  },
  icons: {
    display: 'flex',
  },
  icon: {
    width: 48,
    height: 48,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#9099A2",
    marginRight: theme.spacing(1),
    '&:hover': {
      backgroundColor: theme.palette.warning.dark,
    },
  },
  list: {
    margin: 0,
    listStyle: 'none',
    padding: 0,
  },
  listItem: {
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
  },
  language: {
    marginTop: theme.spacing(1),
    width: 150,
  },
}));



export default function AppFooter() {
  const classes = useStyles();

  return (
    <Typography component="footer" className={classes.root}>
      <Container className={classes.container}>
        <Grid container spacing={5}>
          <Grid item xs={6} sm={4} md={3}>
            <Grid
              container
              direction="column"
              justify="flex-end"
              className={classes.iconsWrapper}
              spacing={2}
            >
              <Grid item className={classes.icons}>
                <a href="/" className={classes.icon}>
                  <img src="/Facebook.png" alt="Facebook" />
                </a>
                <a href="/" className={classes.icon}>
                  <img src="/Twitter.png" alt="Twitter" />
                </a>
              </Grid>
              <Grid item>
                <Copyright />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <Typography variant="h6" marked="left" gutterBottom>
              Legal
            </Typography>
            <ul className={classes.list}>
              <li className={classes.listItem}>
                <Link href="/">Terms</Link>
              </li>
              <li className={classes.listItem}>
                <Link href="/">Privacy</Link>
              </li>
            </ul>
          </Grid>
          <Grid item xs={6} sm={8} md={4}>
            <Typography variant="h6" marked="left" gutterBottom>
              Language
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="caption">
              Still working on this part, sorry its so bland right now, or maybe not idk 
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Typography>
  );
}