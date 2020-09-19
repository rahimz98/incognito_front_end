import React from 'react';
import { Link } from 'react-router-dom';
import status404 from './status404.png'
// MUI
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem  from '@material-ui/core/ListItem';
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
  },
  typo: {
    align: 'center'
  },
  button: {
    backgroundColor: '#192231',
    color: '#FFFFFF',
  }
}));

const NotFound = () => {
  const classes = useStyles();
  return (
    <Container maxWidth='md'>
      <Grid className={classes.root} container spacing={3}>
        <Grid item xs={12} align="center">
          <img className={classes.image} alt='404' src={status404}  ></img>
        </Grid>
        <Grid item xs={12}> 
          <List>
            <ListItem>
              <Typography className={classes.typo} variant='h2'>PAGE NOT FOUND</Typography>
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12}  align='center'>
          <Button
            className={classes.button}
            component={Link} 
            size = 'large'
            to='/'
            variant='contained' 
          >
            <Typography variant='h5'>HOME PAGE</Typography>
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default NotFound;
