import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { editProfile } from './actions/user';
import {
  editName,
  editContacts,
  editBio,
  editExperience,
  editEducation,
  editAchievements,
} from './actions/profile';
import { generate } from 'shortid';
// MUI
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

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
  nameField: {
    marginTop: theme.spacing(5),
  },
  [theme.breakpoints.down('xs')]: {
    nameField: {
      marginTop: theme.spacing(1),
      textAlign: 'center',
    },
  },
  contactForm: {
    marginTop: theme.spacing(2),
  },
  title: {
    backgroundColor: '#6D7993',
    color: 'white',
    marginBottom: theme.spacing(3),
  },
  editButtons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  submit: {
    backgroundColor: '#192231',
    color: '#FFFFFF',
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
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

const EditFormButtons = (props) => {
  const {
    action,
    newName,
    newContact,
    newBio,
    newExp,
    newEdu,
    newAchv,
  } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const profile = user.profile;

  const details = {
    name: newName ? newName.name : profile.name,
    email: newContact ? newContact.email : profile.email,
    phone: newContact ? newContact.phone : profile.phone,
    bio: newBio ? newBio.bio : profile.bio,
    experience: newExp ? newExp : profile.experience,
    education: newEdu ? newEdu : profile.education,
    achievements: newAchv ? newAchv : profile.achievements,
  };

  const handleClose = (action) => {
    dispatch(action);
  };

  const handleSubmit = (action) => {
    if (details.name.length > 0 && details.email.length > 0) {
      const formatName = details.name.replace(/(^\w{1})|(\s+\w{1})/g, (match) =>
        match.toUpperCase()
      );

      const userData = {
        name: formatName,
        email: details.email,
        phone: details.phone,
        bio: details.bio,
        experience: details.experience,
        education: details.education,
        achievements: details.achievements,
      };
      dispatch(editProfile(userData));
      handleClose(action);
    }
  };

  return (
    <div className={classes.editButtons}>
      <Button onClick={() => handleClose(action)}>Cancel</Button>
      <Button
        className={classes.submit}
        onClick={() => handleSubmit(action)}
        type='submit'
        variant='contained'
      >
        Save
      </Button>
    </div>
  );
};

export const NameForm = () => {
  const classes = useStyles();
  const user = useSelector((store) => store.user);
  const profile = user.profile;
  const [name, setName] = useState(profile.name);

  const handleChange = (e) => {
    setName(e.target.value);
  };

  return (
    <div className={classes.nameForm}>
      <div className={classes.nameField}>
        <TextField
          error={name.length === 0}
          helperText={name.length > 0 ? '' : 'Please enter your full name'}
          name='name'
          onChange={handleChange}
          placeholder='Enter your name'
          type='text'
          value={name}
          variant='outlined'
        />
      </div>
      <Divider className={classes.divider} />
      <EditFormButtons action={editName(false)} newName={{ name }} />
    </div>
  );
};

export const ContactForm = () => {
  const classes = useStyles();
  const user = useSelector((store) => store.user);
  const profile = user.profile;

  const [contact, setContact] = useState({
    email: profile.email,
    phone: profile.phone,
  });

  const handleChange = (e) => {
    setContact({
      ...contact,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={classes.contactForm}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant='subtitle1'>Email</Typography>
          <TextField
            error={contact.email.length === 0}
            className={classes.contactField}
            helperText={
              contact.email.length > 0 ? '' : 'Please enter your email address'
            }
            name='email'
            onChange={handleChange}
            placeholder='example@email.com'
            type='text'
            value={contact.email}
            variant='outlined'
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant='subtitle1'>Phone number</Typography>
          <TextField
            className={classes.contactField}
            name='phone'
            onChange={handleChange}
            placeholder='e.g 555-555-5555'
            type='text'
            value={contact.phone}
            variant='outlined'
          />
        </Grid>
      </Grid>
      <Divider className={classes.divider} />
      <EditFormButtons action={editContacts(false)} newContact={contact} />
    </div>
  );
};

export const BioForm = () => {
  const classes = useStyles();
  const user = useSelector((store) => store.user);
  const profile = user.profile;
  const [bio, setBio] = useState(profile.bio);

  const handleChange = (e) => {
    setBio(e.target.value);
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
            type='text'
            value={bio}
            variant='outlined'
          />
        </Grid>
      </Grid>
      <Divider className={classes.divider} />
      <EditFormButtons action={editBio(false)} newBio={{ bio }} />
    </>
  );
};

export const ExperienceForm = () => {
  const classes = useStyles();
  const user = useSelector((store) => store.user);
  const profile = user.profile;

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
    console.log(experience);
    // console.log();
    setHasId(true);
  }, []);

  const addExperience = () => {
    // api to add experience

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
      <EditFormButtons
        action={editExperience(false)}
        newExp={experience.map(({ id, ...rest }) => rest)}
      />
    </>
  );
};

export const EducationForm = () => {
  const classes = useStyles();
  const user = useSelector((store) => store.user);
  const profile = user.profile;

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
    console.log(education);
    setHasId(true);
  }, []);

  const addEducation = () => {
    // api to add experience

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
      <EditFormButtons
        action={editEducation(false)}
        newEdu={education.map(({ id, ...rest }) => rest)}
      />
    </>
  );
};

export const AchievementForm = () => {
  const classes = useStyles();
  const user = useSelector((store) => store.user);
  const profile = user.profile;

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
    console.log(achievements);
    setHasId(true);
  }, []);

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
      <EditFormButtons
        action={editAchievements(false)}
        newAchv={achievements.map(({ id, ...rest }) => rest)}
      />
    </>
  );
};
