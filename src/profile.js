import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import EditProfile from './editProfile';
import ViewProfile from './viewProfile';
import { uploadImage } from './actions/user';
import jwtDecode from 'jwt-decode';
// MUI
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import CameraAltOutlinedIcon from '@material-ui/icons/CameraAltOutlined';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import PhoneOutlinedIcon from '@material-ui/icons/PhoneOutlined';
import AddIcon from '@material-ui/icons/Add';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';

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

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const profile = user.profile;
  const token = localStorage.getItem('jwt');
  const { id } = useParams();
  console.log(id + '  ' + user.id);
  if (id === user.id) {
    console.log('THEY ARE EQUAL');
  } else {
    console.log(typeof id + ' ' + typeof user.id);
  }
  const handleChangeImage = (e) => {
    // This assumes that a token exists as user is able to edit...
    const decodedToken = jwtDecode(token);
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append('image', image);
    formData.append('userId', decodedToken.id);
    dispatch(uploadImage(formData));
  };

  const handleEditImage = () => {
    const fileInput = document.getElementById('fileInput');
    fileInput.click();
  };

  const classes = useStyles();
  return (
    <>
      {token === null || parseInt(id) !== user.id ? (
        <ViewProfile id={id} />
      ) : (
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
                  <ListItem>
                    <PhoneOutlinedIcon className={classes.icon} />
                    {profile.phone ? (
                      <>{profile.phone}</>
                    ) : (
                      <EditProfile icon={AddIcon} title={'Add phone number'} />
                    )}
                  </ListItem>
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
                  badgeContent={
                    <>
                      <Input
                        accept='image/*'
                        className={classes.input}
                        style={{ display: 'none' }}
                        id='fileInput'
                        type='file'
                        onChange={handleChangeImage}
                      />
                      <Tooltip title='Change profile picture' placement='top'>
                        <IconButton onClick={handleEditImage}>
                          <CameraAltOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    </>
                  }
                >
                  <Avatar
                    className='profileImage'
                    alt={profile.name}
                    src={user.image}
                  />
                </Badge>
                <EditProfile icon={EditOutlinedIcon} title={'Edit profile'} />
              </Grid>
            </Box>

            <Box clone order={{ xs: 3, sm: 3 }}>
              <Grid item xs={12}>
                <Typography variant='h5'>Bio</Typography>
                {profile.bio ? (
                  <Typography className={classes.bodyText} variant='body1'>
                    {profile.bio}
                  </Typography>
                ) : (
                  <Typography className={classes.bodyText} variant='body1'>
                    This section is empty.
                  </Typography>
                )}
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
      )}
    </>
  );
};

export default Profile;
