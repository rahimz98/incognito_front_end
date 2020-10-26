import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { editProfile, deleteResume } from './actions/user';
import {
  editBasic,
  editBio,
  editExperience,
  editEducation,
  editAchievements,
} from './actions/profile';
import { AddResumeButton, ViewResume } from './profile';
import { generate } from 'shortid';
import { errorSnackbar, infoSnackbar } from './actions/snackbar';
// MUI
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import MuiPhoneNumber from 'material-ui-phone-number';

const useStyles = makeStyles((theme) => ({
  addButton: {
    display: 'flex',
  },
  typoLink: {
    '& .linkWrap': {
      display: 'flex',
      alignItems: 'center',
    },
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  binWrap: {
    display: 'flex',
    alignItems: 'flex-end',
    '& .binIcon': {
      marginLeft: 'auto',
    },
  },
  timePeriod: {
    display: 'flex',
    '& .to': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      margin: 'auto 5px auto 5px',
    },
  },
  editButtons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  resume: {
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    '& .binIcon': {
      marginLeft: 'auto',
    },
  },
  icon: {
    marginRight: theme.spacing(1),
  },
}));

export const AddButton = (props) => {
  const classes = useStyles();
  const location = useLocation();
  return (
    <div className={classes.addButton}>
      <Typography className={classes.typoLink} variant='subtitle1'>
        <Link
          to={location.pathname}
          className='linkWrap'
          onClick={props.add}
          style={{ color: 'inherit', textDecoration: 'none' }}
        >
          <AddIcon />
          Add {props.section}
        </Link>
      </Typography>
    </div>
  );
};

export const BasicForm = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = useSelector((store) => store.user);
  const profile = user.profile;
  const [open, setOpen] = useState(false);

  const [basic, setBasic] = useState({
    name: profile.name,
    email: profile.email,
    phone: profile.phone,
  });

  const handleChange = (e) => {
    setBasic({
      ...basic,
      [e.target.name]: e.target.value,
    });
  };

  const handlePhoneChange = (e) => {
    setBasic({ ...basic, phone: e });
  };

  const BasicFormButtons = () => {
    const handleClose = () => {
      dispatch(editBasic(false));
    };

    const handleSubmit = () => {
      if (basic.name.length > 0 && basic.email.length > 0) {
        const formatName = basic.name.replace(/(^\w{1})|(\s+\w{1})/g, (match) =>
          match.toUpperCase()
        );
        const formatPhone = basic.phone.length > 10 ? basic.phone : '';

        const userData = {
          ...profile,
          name: basic.name ? formatName : profile.name,
          email: basic.email ? basic.email : profile.email,
          phone: basic.phone ? formatPhone : profile.phone,
        };
        dispatch(infoSnackbar('Updating...'));
        dispatch(editProfile(userData));
        handleClose();
      } else {
        dispatch(errorSnackbar('There was a problem saving changes.'));
      }
    };

    return (
      <div className={classes.editButtons}>
        <Button aria-label='cancelBasic' onClick={() => handleClose()}>
          Cancel
        </Button>
        <Button
          aria-label='saveBasic'
          onClick={() => handleSubmit()}
          type='submit'
          variant='contained'
          color='primary'
        >
          Save
        </Button>
      </div>
    );
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    dispatch(deleteResume());
    setOpen(false);
  };

  return (
    <div className={classes.basicForm}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant='subtitle1'>Name</Typography>
          <TextField
            error={basic.name.length === 0}
            fullWidth
            helperText={
              basic.name.length > 0 ? '' : 'Please enter your full name'
            }
            name='name'
            onChange={handleChange}
            placeholder='Enter your name'
            size='small'
            type='text'
            value={basic.name}
            variant='outlined'
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant='subtitle1'>Email</Typography>
          <TextField
            error={basic.email.length === 0}
            className={classes.profileField}
            fullWidth
            helperText={
              basic.email.length > 0 ? '' : 'Please enter your email address'
            }
            name='email'
            onChange={handleChange}
            placeholder='Enter your email'
            size='small'
            type='text'
            value={basic.email}
            variant='outlined'
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant='subtitle1'>Phone number</Typography>
          <MuiPhoneNumber
            className={classes.profileField}
            fullWidth
            name='phone'
            placeholder='Add a phone number'
            size='small'
            value={basic.phone}
            variant='outlined'
            defaultCountry={'au'}
            onChange={handlePhoneChange}
          />
        </Grid>
        {user.resume ? (
          <Grid item xs={12}>
            <div className={classes.resume}>
              <DescriptionOutlinedIcon className={classes.icon} />
              <ViewResume />
              <IconButton className='binIcon' onClick={handleClickOpen}>
                <DeleteOutlineIcon fontSize='small' />
              </IconButton>
              <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Delete resume/CV</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    If you delete this resume, there will be no way to recover
                    this resume and it will be deleted forever.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color='primary' variant='b'>
                    Disagree
                  </Button>
                  <Button
                    onClick={handleDelete}
                    color='primary'
                    variant='b'
                    autoFocus
                  >
                    Agree
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </Grid>
        ) : (
          <Grid item xs={12}>
            <div className={classes.resume}>
              <DescriptionOutlinedIcon className={classes.icon} />
              <AddResumeButton />
            </div>
          </Grid>
        )}
      </Grid>
      <Divider className={classes.divider} />
      <BasicFormButtons />
    </div>
  );
};

export const BioForm = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = useSelector((store) => store.user);
  const profile = user.profile;
  const [bio, setBio] = useState(profile.bio);

  const handleChange = (e) => {
    setBio(e.target.value);
  };

  const BioFormButtons = () => {
    const handleClose = () => {
      dispatch(editBio(false));
    };

    const handleSubmit = () => {
      const newBio = bio.length > 0 ? bio : '';
      const userData = {
        ...profile,
        bio: newBio,
      };
      dispatch(infoSnackbar('Updating...'));
      dispatch(editProfile(userData));
      handleClose();
    };

    return (
      <div className={classes.editButtons}>
        <Button aria-label='cancelBio' onClick={() => handleClose()}>
          Cancel
        </Button>
        <Button
          aria-label='saveBio'
          onClick={() => handleSubmit()}
          type='submit'
          variant='contained'
          color='primary'
        >
          Save
        </Button>
      </div>
    );
  };

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            name='bio'
            onChange={handleChange}
            placeholder='Add a Bio'
            rows='3'
            size='small'
            type='text'
            value={bio}
            variant='outlined'
          />
        </Grid>
      </Grid>
      <Divider className={classes.divider} />
      <BioFormButtons />
    </>
  );
};

export const ExperienceForm = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = useSelector((store) => store.user);
  const profile = user.profile;
  const [error, setError] = useState(false);
  const [experience, setExperience] = useState(
    Object.values(profile.experience).filter((x) => x !== 'null')
  );
  const [hasId, setHasId] = useState(false);

  useEffect(() => {
    const addIdField = () => {
      experience.forEach((x) => {
        x.id = generate();
      });
    };
    addIdField();
    setHasId(true);
  }, []);

  useEffect(() => {
    if (experience.length > 0) {
      setError(false);
      experience.forEach((x) => {
        if (x.title.length === 0) {
          setError(true);
        }
      });
    } else {
      setError(false);
    }
  }, [experience]);

  const addExperience = () => {
    setExperience((experience) => [
      {
        id: generate(),
        title: '',
        start_date: '',
        end_date: '',
        description: '',
      },
      ...experience,
    ]);
  };

  const removeExperience = (exp) => {
    setExperience(experience.filter((x) => x !== exp));
  };

  const handleChange = (e, id) => {
    const name = e.target.name;
    const value = e.target.value;
    setExperience((exp) =>
      exp.map((x) =>
        x.id === id
          ? {
              ...x,
              [name]: value,
            }
          : x
      )
    );
  };

  const ExperienceFormButtons = () => {
    const newExp = experience.map(({ id, ...rest }) => rest);
    const handleClose = () => {
      dispatch(editExperience(false));
    };

    const handleSubmit = () => {
      if (!error) {
        const userData = {
          ...profile,
          experience: newExp ? newExp : profile.experience,
        };
        dispatch(infoSnackbar('Updating...'));
        dispatch(editProfile(userData));
        handleClose();
      } else {
        dispatch(errorSnackbar('There was a problem saving changes.'));
      }
    };

    return (
      <div className={classes.editButtons}>
        <Button aria-label='cancelExp' onClick={() => handleClose()}>
          Cancel
        </Button>
        <Button
          aria-label='saveExp'
          onClick={() => handleSubmit()}
          type='submit'
          variant='contained'
          color='primary'
        >
          Save
        </Button>
      </div>
    );
  };

  return (
    <>
      <AddButton add={addExperience} section={'experience'} />
      {hasId &&
        experience.map((exp) => {
          return (
            <React.Fragment key={exp.id}>
              <Divider className={classes.divider} />
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <div className={classes.binWrap}>
                    <Typography variant='subtitle1'>Title</Typography>
                    <div className='binIcon'>
                      <IconButton onClick={() => removeExperience(exp)}>
                        <DeleteOutlineIcon fontSize='small' />
                      </IconButton>
                    </div>
                  </div>

                  <TextField
                    fullWidth
                    name='title'
                    onChange={(e) => handleChange(e, exp.id)}
                    placeholder='Title of experience'
                    size='small'
                    type='text'
                    value={exp.title}
                    variant='outlined'
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography variant='subtitle1'>Time period</Typography>
                  <div className={classes.timePeriod}>
                    <TextField
                      className={classes.dateField}
                      name='start_date'
                      onChange={(e) => handleChange(e, exp.id)}
                      placeholder='Jan-2020'
                      size='small'
                      type='text'
                      value={exp.start_date}
                      variant='outlined'
                    />
                    <Typography className='to' variant='subtitle1'>
                      to
                    </Typography>
                    <TextField
                      className={classes.dateField}
                      name='end_date'
                      onChange={(e) => handleChange(e, exp.id)}
                      placeholder='Current'
                      size='small'
                      type='text'
                      value={exp.end_date}
                      variant='outlined'
                    />
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='subtitle1'>Description</Typography>
                  <TextField
                    fullWidth
                    multiline
                    name='description'
                    onChange={(e) => handleChange(e, exp.id)}
                    placeholder='A description of your experience'
                    rows='3'
                    size='small'
                    type='text'
                    value={exp.description}
                    variant='outlined'
                  />
                </Grid>
              </Grid>
            </React.Fragment>
          );
        })}
      <Divider className={classes.divider} />
      <ExperienceFormButtons />
    </>
  );
};

export const EducationForm = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = useSelector((store) => store.user);
  const profile = user.profile;
  const [error, setError] = useState(false);

  const [education, setEducation] = useState(
    Object.values(profile.education).filter((x) => x !== 'null')
  );
  const [hasId, setHasId] = useState(false);

  useEffect(() => {
    const addIdField = () => {
      education.forEach((x) => {
        x.id = generate();
      });
    };
    addIdField();
    setHasId(true);
  }, []);

  useEffect(() => {
    if (education.length > 0) {
      setError(false);
      education.forEach((x) => {
        if (x.title.length === 0) {
          setError(true);
        }
      });
    } else {
      setError(false);
    }
  }, [education]);

  const addEducation = () => {
    setEducation((education) => [
      {
        id: generate(),
        title: '',
        start_date: '',
        end_date: '',
        description: '',
      },
      ...education,
    ]);
  };

  const removeEducation = (edu) => {
    setEducation(education.filter((x) => x !== edu));
  };

  const handleChange = (e, id) => {
    const name = e.target.name;
    const value = e.target.value;
    setEducation((edu) =>
      edu.map((x) =>
        x.id === id
          ? {
              ...x,
              [name]: value,
            }
          : x
      )
    );
  };

  const EducationFormButtons = () => {
    const newEdu = education.map(({ id, ...rest }) => rest);
    const handleClose = () => {
      dispatch(editEducation(false));
    };

    const handleSubmit = () => {
      if (!error) {
        const userData = {
          ...profile,
          education: newEdu ? newEdu : profile.education,
        };
        dispatch(infoSnackbar('Updating...'));
        dispatch(editProfile(userData));
        handleClose();
      } else {
        dispatch(errorSnackbar('There was a problem saving changes.'));
      }
    };

    return (
      <div className={classes.editButtons}>
        <Button aria-label='cancelEdu' onClick={() => handleClose()}>
          Cancel
        </Button>
        <Button
          aria-label='saveEdu'
          onClick={() => handleSubmit()}
          type='submit'
          variant='contained'
          color='primary'
        >
          Save
        </Button>
      </div>
    );
  };

  return (
    <>
      <AddButton add={addEducation} section={'education'} />
      {hasId &&
        education.map((edu) => {
          return (
            <React.Fragment key={edu.id}>
              <Divider className={classes.divider} />
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <div className={classes.binWrap}>
                    <Typography variant='subtitle1'>Title</Typography>
                    <div className='binIcon'>
                      <IconButton onClick={() => removeEducation(edu)}>
                        <DeleteOutlineIcon fontSize='small' />
                      </IconButton>
                    </div>
                  </div>

                  <TextField
                    fullWidth
                    name='title'
                    onChange={(e) => handleChange(e, edu.id)}
                    placeholder='Title of education'
                    size='small'
                    type='text'
                    value={edu.title}
                    variant='outlined'
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography variant='subtitle1'>Time period</Typography>
                  <div className={classes.timePeriod}>
                    <TextField
                      className={classes.dateField}
                      name='start_date'
                      onChange={(e) => handleChange(e, edu.id)}
                      placeholder='Jan-2020'
                      size='small'
                      type='text'
                      value={edu.start_date}
                      variant='outlined'
                    />
                    <Typography className='to' variant='subtitle1'>
                      to
                    </Typography>
                    <TextField
                      className={classes.dateField}
                      name='end_date'
                      onChange={(e) => handleChange(e, edu.id)}
                      placeholder='Current'
                      size='small'
                      type='text'
                      value={edu.end_date}
                      variant='outlined'
                    />
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='subtitle1'>Description</Typography>
                  <TextField
                    fullWidth
                    multiline
                    name='description'
                    onChange={(e) => handleChange(e, edu.id)}
                    placeholder='A description of your education'
                    rows='3'
                    size='small'
                    type='text'
                    value={edu.description}
                    variant='outlined'
                  />
                </Grid>
              </Grid>
            </React.Fragment>
          );
        })}
      <Divider className={classes.divider} />
      <EducationFormButtons />
    </>
  );
};

export const AchievementForm = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = useSelector((store) => store.user);
  const profile = user.profile;
  const [error, setError] = useState(false);

  const [achievements, setAchievements] = useState(
    Object.values(profile.achievements).filter((x) => x !== 'null')
  );
  const [hasId, setHasId] = useState(false);

  useEffect(() => {
    const addIdField = () => {
      achievements.forEach((x) => {
        x.id = generate();
      });
    };
    addIdField();
    setHasId(true);
  }, []);

  useEffect(() => {
    if (achievements.length > 0) {
      setError(false);
      achievements.forEach((x) => {
        if (x.title.length === 0) {
          setError(true);
        }
      });
    } else {
      setError(false);
    }
  }, [achievements]);

  const addAchievement = () => {
    setAchievements((achievements) => [
      {
        id: generate(),
        title: '',
        description: '',
      },
      ...achievements,
    ]);
  };

  const removeAchievement = (achv) => {
    setAchievements(achievements.filter((x) => x !== achv));
  };

  const handleChange = (e, id) => {
    const name = e.target.name;
    const value = e.target.value;
    setAchievements((achv) =>
      achv.map((x) =>
        x.id === id
          ? {
              ...x,
              [name]: value,
            }
          : x
      )
    );
  };

  const AchievementFormButtons = () => {
    const newAchv = achievements.map(({ id, ...rest }) => rest);
    const handleClose = () => {
      dispatch(editAchievements(false));
    };

    const handleSubmit = () => {
      if (!error) {
        const userData = {
          ...profile,
          achievements: newAchv ? newAchv : profile.achievements,
        };
        dispatch(infoSnackbar('Updating...'));
        dispatch(editProfile(userData));
        handleClose();
      } else {
        dispatch(errorSnackbar('There was a problem saving changes.'));
      }
    };

    return (
      <div className={classes.editButtons}>
        <Button aria-label='cancelAchv' onClick={() => handleClose()}>
          Cancel
        </Button>
        <Button
          aria-label='saveAchv'
          onClick={() => handleSubmit()}
          type='submit'
          variant='contained'
          color='primary'
        >
          Save
        </Button>
      </div>
    );
  };

  return (
    <>
      <AddButton add={addAchievement} section={'achievement'} />
      {hasId &&
        achievements.map((achv) => {
          return (
            <React.Fragment key={achv.id}>
              <Divider className={classes.divider} />
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <div className={classes.binWrap}>
                    <Typography variant='subtitle1'>Title</Typography>
                    <div className='binIcon'>
                      <IconButton onClick={() => removeAchievement(achv)}>
                        <DeleteOutlineIcon fontSize='small' />
                      </IconButton>
                    </div>
                  </div>

                  <TextField
                    fullWidth
                    name='title'
                    onChange={(e) => handleChange(e, achv.id)}
                    placeholder='Title of achievement'
                    size='small'
                    type='text'
                    value={achv.title}
                    variant='outlined'
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='subtitle1'>Description</Typography>
                  <TextField
                    fullWidth
                    multiline
                    name='description'
                    onChange={(e) => handleChange(e, achv.id)}
                    placeholder='A description of your achievement'
                    rows='3'
                    size='small'
                    type='text'
                    value={achv.description}
                    variant='outlined'
                  />
                </Grid>
              </Grid>
            </React.Fragment>
          );
        })}
      <Divider className={classes.divider} />
      <AchievementFormButtons />
    </>
  );
};
