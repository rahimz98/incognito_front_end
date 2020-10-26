import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import {
  AddButton,
  BasicForm,
  BioForm,
  ExperienceForm,
  EducationForm,
  AchievementForm,
} from './editProfile';
import ViewProfile from './viewProfile';
import { uploadImage, uploadResume } from './actions/user';
import {
  editBasic,
  editBio,
  editExperience,
  editEducation,
  editAchievements,
  closeEdits,
} from './actions/profile';
import jwtDecode from 'jwt-decode';
import { generate } from 'shortid';
import { infoSnackbar } from './actions/snackbar';
// MUI
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import CameraAltOutlinedIcon from '@material-ui/icons/CameraAltOutlined';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import PhoneOutlinedIcon from '@material-ui/icons/PhoneOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  resume: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  typoLink: {
    '& .linkWrap': {
      display: 'flex',
      alignItems: 'center',
    },
    '&:hover': {
      textDecoration: 'underline',
      cursor: 'pointer',
    },
  },
  infoTooltip: {
    marginLeft: theme.spacing(2),
  },
  avatar: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(3),
    '& .profileImage': {
      width: theme.spacing(20),
      height: theme.spacing(20),
    },
    '& .editBasicIcon': {
      position: 'absolute',
      top: 12,
      right: 12,
    },
  },
  icon: {
    marginRight: theme.spacing(1),
  },
  bodyText: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3),
  },
  [theme.breakpoints.down('xs')]: {
    name: {
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
  profileBase: {
    display: 'flex',
    // color: theme.palette.common.white,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
    backgroundColor: '#8BB0E6',
  },
  profileContent: {
    padding: theme.spacing(3),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(3),
      paddingTop: 0,
    },
  },
  aboutContent: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
  loadingBase: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '250px',
  },
}));

export const AddResumeButton = () => {
  const classes = useStyles();
  const location = useLocation();
  const dispatch = useDispatch();
  const token = localStorage.getItem('jwt');

  const handleEditResume = () => {
    const resumeInput = document.getElementById('resumeInput');
    resumeInput.click();
  };

  const handleAddResume = (e) => {
    const decodedToken = jwtDecode(token);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    formData.append('userId', decodedToken.id);
    dispatch(infoSnackbar('Loading resume...'));
    dispatch(uploadResume(formData));
  };

  return (
    <div className={classes.resume}>
      <Typography className={classes.typoLink} variant='subtitle1'>
        <Input
          accept='application/pdf'
          className={classes.input}
          style={{ display: 'none' }}
          id='resumeInput'
          type='file'
          onChange={handleAddResume}
        />
        <Link
          to={location.pathname}
          className='linkWrap'
          onClick={handleEditResume}
          style={{ color: 'inherit', textDecoration: 'none' }}
        >
          <AddIcon />
          Add resume/CV
        </Link>
      </Typography>
      <Tooltip
        className={classes.infoTooltip}
        title='PDF files only'
        arrow
        placement='right'
      >
        <InfoOutlinedIcon fontSize='small' />
      </Tooltip>
    </div>
  );
};

export const ViewResume = () => {
  const classes = useStyles();
  const user = useSelector((store) => store.user);
  return (
    <div className={classes.resume}>
      <Typography className={classes.typoLink} variant='subtitle1'>
        <a
          href={user.resume}
          className='linkWrap'
          rel='noopener noreferrer'
          target='_blank'
          style={{ textDecoration: 'none' }}
        >
          View resume/CV
        </a>
      </Typography>
    </div>
  );
};

const Profile = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const profile = user.profile;
  console.log(user);
  const edit = useSelector((store) => store.profile);
  const token = localStorage.getItem('jwt');
  const { id } = useParams();

  const filteredExp =
    profile.experience &&
    Object.values(profile.experience).filter((x) => x !== 'null');
  const filteredEdu =
    profile.education &&
    Object.values(profile.education).filter((x) => x !== 'null');
  const filteredAchv =
    profile.achievements &&
    Object.values(profile.achievements).filter((x) => x !== 'null');

  useEffect(() => {
    dispatch(closeEdits());
  }, [dispatch]);

  const handleEditImage = () => {
    const fileInput = document.getElementById('fileInput');
    fileInput.click();
  };

  const handleChangeImage = (e) => {
    const decodedToken = jwtDecode(token);
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append('image', image);
    formData.append('userId', decodedToken.id);
    dispatch(infoSnackbar('Loading image...'));
    dispatch(uploadImage(formData));
  };

  return (
    <>
      {token === null || parseInt(id) !== user.id ? (
        <ViewProfile id={id} />
      ) : (
        <>
          {Object.keys(user.profile).length === 0 ? (
            <div className={classes.loadingBase}>
              <CircularProgress />
            </div>
          ) : (
            <>
              <Container>
                <Paper className={classes.profileBase}>
                  <Grid container>
                    <Box clone order={{ xs: 2, sm: 1 }}>
                      <Grid item xs={12} sm={6}>
                        <div className={classes.profileContent}>
                          {edit.basic ? (
                            <BasicForm />
                          ) : (
                            <>
                              <Typography className={classes.name} variant='h3'>
                                {profile.name}
                              </Typography>
                              <List>
                                <ListItem>
                                  <EmailOutlinedIcon className={classes.icon} />
                                  <Typography variant='subtitle1'>
                                    {profile.email}
                                  </Typography>
                                </ListItem>
                                <ListItem>
                                  {profile.phone ? (
                                    <>
                                      <PhoneOutlinedIcon
                                        className={classes.icon}
                                      />
                                      <Typography variant='subtitle1'>
                                        {profile.phone}
                                      </Typography>
                                    </>
                                  ) : (
                                    <>
                                      <PhoneOutlinedIcon
                                        className={classes.icon}
                                      />
                                      <AddButton
                                        add={(e) => dispatch(editBasic(true))}
                                        section={'phone number'}
                                      />
                                    </>
                                  )}
                                </ListItem>
                                <ListItem>
                                  {user.resume ? (
                                    <>
                                      <DescriptionOutlinedIcon
                                        className={classes.icon}
                                      />
                                      <ViewResume />
                                    </>
                                  ) : (
                                    <>
                                      <DescriptionOutlinedIcon
                                        className={classes.icon}
                                      />
                                      <AddResumeButton />
                                    </>
                                  )}
                                </ListItem>
                              </List>
                            </>
                          )}
                        </div>
                      </Grid>
                    </Box>
                    <Box clone order={{ xs: 1, sm: 2 }}>
                      <Grid className={classes.avatar} item xs={12} sm={6}>
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
                              <IconButton onClick={handleEditImage}>
                                <CameraAltOutlinedIcon />
                              </IconButton>
                            </>
                          }
                        >
                          <Avatar
                            className='profileImage'
                            alt={profile.name}
                            src={user.image}
                          />
                        </Badge>
                        {!edit.basic && (
                          <IconButton
                            className='editBasicIcon'
                            onClick={(e) => dispatch(editBasic(true))}
                            data-testid='basicEditBtn'
                          >
                            <EditOutlinedIcon fontSize='small' />
                          </IconButton>
                        )}
                      </Grid>
                    </Box>
                  </Grid>
                </Paper>
              </Container>

              <Container>
                <Grid container spacing={3} className={classes.root}>
                  <Box clone order={{ xs: 3, sm: 3 }}>
                    <Grid item xs={12}>
                      <div className={classes.aboutContent}>
                        {edit.bio ? (
                          <>
                            <Typography
                              className={classes.headers}
                              variant='h5'
                            >
                              Bio
                            </Typography>
                            <BioForm />
                          </>
                        ) : (
                          <>
                            <Typography
                              className={classes.headers}
                              variant='h5'
                            >
                              Bio
                              <IconButton
                                onClick={(e) => dispatch(editBio(true))}
                                data-testid='bioEditBtn'
                              >
                                <EditOutlinedIcon fontSize='small' />
                              </IconButton>
                            </Typography>

                            {profile.bio ? (
                              <Card className={classes.card}>
                                <CardContent className={classes.cardContent}>
                                  <Typography variant='body1'>
                                    {profile.bio}
                                  </Typography>
                                </CardContent>
                              </Card>
                            ) : (
                              <Typography
                                className={classes.bodyText}
                                variant='body1'
                              >
                                This section is empty.
                              </Typography>
                            )}
                          </>
                        )}

                        {edit.experience ? (
                          <>
                            <Typography
                              className={classes.headers}
                              variant='h5'
                            >
                              Experience
                            </Typography>
                            <ExperienceForm />
                          </>
                        ) : (
                          <>
                            <Typography
                              className={classes.headers}
                              variant='h5'
                            >
                              Experience
                              <IconButton
                                onClick={(e) => dispatch(editExperience(true))}
                                data-testid='expEditBtn'
                              >
                                <EditOutlinedIcon fontSize='small' />
                              </IconButton>
                            </Typography>

                            {filteredExp && filteredExp.length > 0 ? (
                              filteredExp.map((exp) => {
                                return (
                                  <Card
                                    key={generate()}
                                    className={classes.card}
                                    data-testid='expCard'
                                  >
                                    <CardContent
                                      className={classes.cardContent}
                                    >
                                      <div className='cardTop'>
                                        <Typography variant='h6'>
                                          {exp.title}
                                        </Typography>
                                        {exp.start_date.length > 0 &&
                                          exp.end_date.length > 0 && (
                                            <Typography
                                              variant='subtitle2'
                                              color='textSecondary'
                                            >
                                              {exp.start_date} to {exp.end_date}
                                            </Typography>
                                          )}
                                        <Typography variant='body1'>
                                          {exp.description}
                                        </Typography>
                                      </div>
                                    </CardContent>
                                  </Card>
                                );
                              })
                            ) : (
                              <Typography
                                className={classes.bodyText}
                                variant='body1'
                              >
                                This section is empty.
                              </Typography>
                            )}
                          </>
                        )}

                        {edit.education ? (
                          <>
                            <Typography
                              className={classes.headers}
                              variant='h5'
                            >
                              Education
                            </Typography>
                            <EducationForm />
                          </>
                        ) : (
                          <>
                            <Typography
                              className={classes.headers}
                              variant='h5'
                            >
                              Education
                              <IconButton
                                onClick={(e) => dispatch(editEducation(true))}
                                data-testid='eduEditBtn'
                              >
                                <EditOutlinedIcon fontSize='small' />
                              </IconButton>
                            </Typography>

                            {filteredEdu && filteredEdu.length > 0 ? (
                              filteredEdu.map((edu) => {
                                return (
                                  <Card
                                    key={generate()}
                                    className={classes.card}
                                    data-testid='eduCard'
                                  >
                                    <CardContent
                                      className={classes.cardContent}
                                    >
                                      <div className='cardTop'>
                                        <Typography variant='h6'>
                                          {edu.title}
                                        </Typography>
                                        {edu.start_date.length > 0 &&
                                          edu.end_date.length > 0 && (
                                            <Typography
                                              variant='subtitle2'
                                              color='textSecondary'
                                            >
                                              {edu.start_date} to {edu.end_date}
                                            </Typography>
                                          )}
                                        <Typography variant='body1'>
                                          {edu.description}
                                        </Typography>
                                      </div>
                                    </CardContent>
                                  </Card>
                                );
                              })
                            ) : (
                              <Typography
                                className={classes.bodyText}
                                variant='body1'
                              >
                                This section is empty.
                              </Typography>
                            )}
                          </>
                        )}

                        {edit.achievements ? (
                          <>
                            <Typography
                              className={classes.headers}
                              variant='h5'
                            >
                              Achievements
                            </Typography>
                            <AchievementForm />
                          </>
                        ) : (
                          <>
                            <Typography
                              className={classes.headers}
                              variant='h5'
                            >
                              Achievements
                              <IconButton
                                onClick={(e) =>
                                  dispatch(editAchievements(true))
                                }
                                data-testid='achvEditBtn'
                              >
                                <EditOutlinedIcon fontSize='small' />
                              </IconButton>
                            </Typography>

                            {filteredAchv && filteredAchv.length > 0 ? (
                              filteredAchv.map((achv) => {
                                return (
                                  <Card
                                    key={generate()}
                                    className={classes.card}
                                    data-testid='achvCard'
                                  >
                                    <CardContent
                                      className={classes.cardContent}
                                    >
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
                              <Typography
                                className={classes.bodyText}
                                variant='body1'
                              >
                                This section is empty.
                              </Typography>
                            )}
                          </>
                        )}
                      </div>
                    </Grid>
                  </Box>
                </Grid>
              </Container>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Profile;
