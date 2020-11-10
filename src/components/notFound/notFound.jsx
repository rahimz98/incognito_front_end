import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import error404 from '../../images/error404Image.png';
// MUI
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
  },
  image: {
    margin: 'auto',
    width: '100%',
  },
  typo: {
    textAlign: 'center',
  },
}));

const NotFound = () => {
  const [returnRoute, setReturnRoute] = useState('/');
  const user = useSelector((store) => store.user);

  useEffect(() => {
    if (user.isAuth) {
      setReturnRoute(`/${user.id}`);
    }
  }, [user]);

  const classes = useStyles();
  return (
    <Container maxWidth='md'>
      <Grid className={classes.root} container spacing={3}>
        <Grid item xs={12} align='center'>
          <img className={classes.image} alt='404' src={error404}></img>
        </Grid>
        <Grid item xs={12}>
          <List>
            <ListItem>
              <Typography className={classes.typo} variant='h3'>
                Error - Page not found
              </Typography>
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12} align='center'>
          <Button
            component={Link}
            size='large'
            to={returnRoute}
            variant='contained'
            color='primary'
          >
            <Typography variant='h5'>Home Page</Typography>
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default NotFound;
