import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NotFound from './notFound';
// MUI
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import PhoneOutlinedIcon from '@material-ui/icons/PhoneOutlined';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  avatar: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& .profileImage': {
      width: theme.spacing(20),
      height: theme.spacing(20),
    },
    '& .editIcon': {
      position: 'absolute',
      top: '45px',
      right: '16px',
    },
  },
  contacts: {
    marginTop: theme.spacing(5),
  },
  icon: {
    marginRight: theme.spacing(1),
  },
  bodyText: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3),
  },
  name: {
    marginTop: theme.spacing(5),
  },
  [theme.breakpoints.down('xs')]: {
    avatar: {
      marginTop: theme.spacing(3),
    },
    name: {
      marginTop: theme.spacing(1),
      textAlign: 'center',
    },
  },
}));

const ViewProfile = (props) => {
  const [profile, setProfile] = useState(null);
  const [found, setFound] = useState(true);
  const userId = props.id;

  useEffect(() => {
    axios
      .post('http://localhost:5000/about/viewUser', { userId: userId })
      .then((res) => {
        setProfile(res.data);
      })
      .catch((err) => {
        console.log(err.response);
        setFound(false);
      });
  }, [userId]);

  const classes = useStyles();

  return (
    <>
      {profile === null ? (
        <>{found ? <Typography>Loading...</Typography> : <NotFound />}</>
      ) : (
        <>
          <Container>
            <Grid container spacing={3} className={classes.root}>
              <Box clone order={{ xs: 2, sm: 1 }}>
                <Grid item xs={12} sm={6}>
                  <Typography className={classes.name} variant='h4'>
                    {profile.name}
                  </Typography>
                  <Typography className={classes.contacts} variant='h5'>
                    Contact Details
                  </Typography>
                  <List>
                    <ListItem>
                      <EmailOutlinedIcon className={classes.icon} />
                      {profile.email}
                    </ListItem>
                    {profile.phone && (
                      <ListItem>
                        <PhoneOutlinedIcon className={classes.icon} />
                        {profile.phone}
                      </ListItem>
                    )}
                  </List>
                </Grid>
              </Box>

              <Box className={classes.avatar} clone order={{ xs: 1, sm: 2 }}>
                <Grid item xs={12} sm={6}>
                  <Badge
                    overlap='circle'
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                  >
                    <Avatar
                      className='profileImage'
                      alt='profileImage'
                      src={profile.pic}
                    />
                  </Badge>
                </Grid>
              </Box>

              <Box clone order={{ xs: 3, sm: 3 }}>
                <Grid item xs={12}>
                  <Typography variant='h5'>Experience</Typography>
                  {profile.experience ? (
                    <Typography className={classes.bodyText} variant='body1'>
                      {profile.experience}
                    </Typography>
                  ) : (
                    <Typography className={classes.bodyText} variant='body1'>
                      This section is empty.
                    </Typography>
                  )}
                  <Typography variant='h5'>Education</Typography>
                  {profile.education ? (
                    <Typography className={classes.bodyText} variant='body1'>
                      {profile.education}
                    </Typography>
                  ) : (
                    <Typography className={classes.bodyText} variant='body1'>
                      This section is empty.
                    </Typography>
                  )}
                  <Typography variant='h5'>Achievements</Typography>
                  {profile.achievements ? (
                    <Typography className={classes.bodyText} variant='body1'>
                      {profile.achievements}
                    </Typography>
                  ) : (
                    <Typography className={classes.bodyText} variant='body1'>
                      This section is empty.
                    </Typography>
                  )}
                </Grid>
              </Box>
            </Grid>
          </Container>
        </>
      )}
    </>
  );
};

export default ViewProfile;
