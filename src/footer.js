import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import uniMelbLogo from './unimelb_logo.jpg';
import gitHubLogo from './githubLogo.png';

function Copyright() {
  return (
    <React.Fragment>
      {'© '}
      <Link color='inherit' href='/'>
        Memento.com
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
    color: '#ffffff',
    padding: theme.spacing(3, 2),
    marginTop: theme.spacing(8),
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
    backgroundColor: '#9099A2',
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
    '& >*': {
      textDecoration: 'inherit',
      color: '#192231',
    },
  },
  language: {
    marginTop: theme.spacing(1),
    width: 150,
  },
}));

export default function AppFooter() {
  const classes = useStyles();

  return (
    <Typography component='footer' className={classes.root}>
      <Container className={classes.container}>
        <Grid container spacing={5}>
          <Grid item xs={6} sm={4} md={3}>
            <Grid
              container
              direction='column'
              justify='flex-end'
              className={classes.iconsWrapper}
              spacing={2}
            >
              <Grid item className={classes.icons}>
                <a
                  href='https://handbook.unimelb.edu.au/2020/subjects/comp30022'
                  className={classes.icon}
                >
                  <img
                    src={uniMelbLogo}
                    alt='Unimelb'
                    className={classes.icon}
                  />
                </a>
                <a
                  href='https://github.com/rahimz98/incognito_front_end'
                  className={classes.icon}
                >
                  <img
                    src={gitHubLogo}
                    alt='Github Repo'
                    className={classes.icon}
                  />
                </a>
              </Grid>
              <Grid item>
                <Copyright />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <Typography variant='h6' marked='left' gutterBottom>
              Legal
            </Typography>
            <ul className={classes.list}>
              <li className={classes.listItem}>
                <Link href='/'>Terms</Link>
              </li>
              <li className={classes.listItem}>
                <Link href='/'>Privacy</Link>
              </li>
            </ul>
          </Grid>
          <Grid item xs={6} sm={8} md={4}>
            <Typography variant='h6' marked='left' gutterBottom>
              About Us Page (Page not made yet)
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant='caption'>
              Made by Team Incognito as part of our Univeristy of Melbourne
              Capstone IT project
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Typography>
  );
}
