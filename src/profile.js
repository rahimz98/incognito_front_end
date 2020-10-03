import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  NameForm,
  ContactForm,
  BioForm,
  ExperienceForm,
  EducationForm,
  AchievementForm,
} from './editProfile';
import ViewProfile from './viewProfile';
import { uploadImage } from './actions/user';
import {
  editName,
  editContacts,
  editBio,
  editExperience,
  editEducation,
  editAchievements,
  closeEdits,
} from './actions/profile';
import jwtDecode from 'jwt-decode';
import { generate } from 'shortid';
// MUI
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';

import Divider from '@material-ui/core/Divider';

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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& .profileImage': {
      width: theme.spacing(20),
      height: theme.spacing(20),
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
  headers: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  card: {
    marginBottom: theme.spacing(1),
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const Profile = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const profile = user.profile;
  const edit = useSelector((store) => store.profile);
  const token = localStorage.getItem('jwt');
  const { id } = useParams();

  console.log(profile);
  useEffect(() => {
    dispatch(closeEdits());
  }, [dispatch]);

  const handleOpen = ({ action }) => {
    dispatch(action);
  };

  const handleEditImage = () => {
    const fileInput = document.getElementById('fileInput');
    fileInput.click();
  };

  const handleChangeImage = (e) => {
    // This assumes that a token exists as user is able to edit...
    const decodedToken = jwtDecode(token);
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append('image', image);
    formData.append('userId', decodedToken.id);
    dispatch(uploadImage(formData));
  };

  const EditIcon = (action) => (
    <IconButton className='editIcon' onClick={() => handleOpen(action)}>
      <EditOutlinedIcon fontSize='small' />
    </IconButton>
  );

  return (
    <>
      {token === null || parseInt(id) !== user.id ? (
        <ViewProfile id={id} />
      ) : (
        <Container>
          <Grid container spacing={3} className={classes.root}>
            <Box clone order={{ xs: 2, sm: 1 }}>
              <Grid item xs={12} sm={6}>
                {edit.name ? (
                  <NameForm />
                ) : (
                  <Typography className={classes.name} variant='h4'>
                    {profile.name}
                    <EditIcon action={editName(true)} />
                  </Typography>
                )}

                {edit.contacts ? (
                  <>
                    <Typography className={classes.contacts} variant='h5'>
                      Contact Info
                    </Typography>
                    <ContactForm />
                  </>
                ) : (
                  <>
                    <Typography className={classes.contacts} variant='h5'>
                      Contact Info
                      <EditIcon action={editContacts(true)} />
                    </Typography>

                    <List>
                      <ListItem>
                        <EmailOutlinedIcon className={classes.icon} />
                        {profile.email}
                      </ListItem>
                      <ListItem>
                        {profile.phone && (
                          <>
                            <PhoneOutlinedIcon className={classes.icon} />
                            {profile.phone}
                          </>
                        )}
                        {/* <EditProfile icon={AddIcon} title={'Add phone number'} /> */}
                      </ListItem>
                    </List>
                  </>
                )}
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
              </Grid>
            </Box>

            <Box clone order={{ xs: 3, sm: 3 }}>
              <Grid item xs={12}>
                {edit.bio ? (
                  <>
                    <Typography className={classes.headers} variant='h5'>
                      Bio
                    </Typography>
                    <BioForm />
                  </>
                ) : (
                  <>
                    <Typography className={classes.headers} variant='h5'>
                      Bio
                      <EditIcon action={editBio(true)} />
                    </Typography>

                    {profile.bio ? (
                      <Typography className={classes.bodyText} variant='body1'>
                        {profile.bio}
                      </Typography>
                    ) : (
                      <Typography className={classes.bodyText} variant='body1'>
                        This section is empty.
                      </Typography>
                    )}
                  </>
                )}

                {edit.experience ? (
                  <>
                    <Typography className={classes.headers} variant='h5'>
                      Experience
                    </Typography>
                    <ExperienceForm />
                  </>
                ) : (
                  <>
                    <Typography className={classes.headers} variant='h5'>
                      Experience
                      <EditIcon action={editExperience(true)} />
                    </Typography>

                    {profile.experience ? (
                      Object.values(profile.experience)
                        .filter((x) => x !== 'null')
                        .map((exp) => {
                          return (
                            <Card key={generate()} className={classes.card}>
                              <CardContent className={classes.cardContent}>
                                <div className='cardTop'>
                                  <Typography variant='h6'>
                                    {exp.title}
                                  </Typography>
                                  <Typography
                                    variant='subtitle2'
                                    color='textSecondary'
                                  >
                                    {exp.start_date} to {exp.end_date}
                                  </Typography>
                                  <Typography variant='body1'>
                                    {exp.description}
                                  </Typography>
                                </div>
                              </CardContent>
                            </Card>
                          );
                        })
                    ) : (
                      <Typography className={classes.bodyText} variant='body1'>
                        This section is empty.
                      </Typography>
                    )}
                  </>
                )}

                {edit.education ? (
                  <>
                    <Typography className={classes.headers} variant='h5'>
                      Education
                    </Typography>
                    <EducationForm />
                  </>
                ) : (
                  <>
                    <Typography className={classes.headers} variant='h5'>
                      Education
                      <EditIcon action={editEducation(true)} />
                    </Typography>

                    {profile.education ? (
                      Object.values(profile.education)
                        .filter((x) => x !== 'null')
                        .map((edu) => {
                          return (
                            <Card key={generate()} className={classes.card}>
                              <CardContent className={classes.cardContent}>
                                <div className='cardTop'>
                                  <Typography variant='h6'>
                                    {edu.title}
                                  </Typography>
                                  <Typography
                                    variant='subtitle2'
                                    color='textSecondary'
                                  >
                                    {edu.start_date} to {edu.end_date}
                                  </Typography>
                                  <Typography variant='body1'>
                                    {edu.description}
                                  </Typography>
                                </div>
                              </CardContent>
                            </Card>
                          );
                        })
                    ) : (
                      <Typography className={classes.bodyText} variant='body1'>
                        This section is empty.
                      </Typography>
                    )}
                  </>
                )}

                {edit.achievements ? (
                  <>
                    <Typography className={classes.headers} variant='h5'>
                      Achievements
                    </Typography>
                    <AchievementForm />
                  </>
                ) : (
                  <>
                    <Typography className={classes.headers} variant='h5'>
                      Achievements
                      <EditIcon action={editAchievements(true)} />
                    </Typography>

                    {profile.achievements ? (
                      Object.values(profile.achievements)
                        .filter((x) => x !== 'null')
                        .map((achv) => {
                          return (
                            <Card key={generate()} className={classes.card}>
                              <CardContent className={classes.cardContent}>
                                <div className='cardTop'>
                                  <Typography variant='h6'>
                                    {achv.title}
                                  </Typography>
                                  <Typography variant='body1'>
                                    {achv.description}
                                  </Typography>
                                </div>
                              </CardContent>
                            </Card>
                          );
                        })
                    ) : (
                      <Typography className={classes.bodyText} variant='body1'>
                        This section is empty.
                      </Typography>
                    )}
                  </>
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
