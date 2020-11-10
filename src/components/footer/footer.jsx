import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import uniMelbLogo from '../../images/unimelb_logo.jpg';
import gitHubLogo from '../../images/githubLogo.png';
import CssBaseline from '@material-ui/core/CssBaseline';

function Copyright() {
  return (
    <>
      ©&nbsp;
      <Link color='inherit' href='/'>
        Memento.com
      </Link>
      &nbsp;
      {new Date().getFullYear()}
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    //backgroundColor: 'primary',
    flexDirection: 'column',
    color: '#ffffff',
    padding: theme.spacing(3, 2),
    marginTop: theme.spacing(8),
    backgroundColor: theme.palette.primary.main,
  },
  container: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconsWrapper: {
    height: 120,
  },
  items: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icons: {
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      marginLeft: theme.spacing(1),
    },
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
  aboutUs: {
    color: '#ffffff',
  },
}));

export default function AppFooter() {
  const classes = useStyles();

  return (
    <>
      <CssBaseline />
      <Typography component='footer' className={classes.root}>
        <Container maxWidth='lg' className={classes.container}>
          <Grid container spacing={5}>
            <Grid item xs={12} md={3} lg={3} className={classes.icons}>
              <a
                href='https://handbook.unimelb.edu.au/2020/subjects/comp30022'
                className={classes.icon}
              >
                <img src={uniMelbLogo} alt='Unimelb' className={classes.icon} />
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
            <Grid item xs={12} md={3} lg={3} className={classes.items}>
              <Typography
                variant='body3'
                // marked='left'
                className={classes.aboutUs}
              >
                <Link href='/aboutUs' className={classes.aboutUs}>
                  {'About Us'}
                </Link>
              </Typography>
            </Grid>
            <Grid item xs={12} md={3} lg={3} className={classes.items}>
              <Typography variant='body3' className={classes.items}>
                Made by Team Incognito for IT project
              </Typography>
            </Grid>
            <Grid item xs={12} md={3} lg={3} className={classes.items}>
              <Copyright />
            </Grid>
          </Grid>
        </Container>
      </Typography>
    </>
  );
}
