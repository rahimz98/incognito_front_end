import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import NotFound from './notFound';
import { generate } from 'shortid';
// MUI
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import PhoneOutlinedIcon from '@material-ui/icons/PhoneOutlined';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
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
  },
  tabs: {
    margin: '0 auto',
  },
  indicator: {
    backgroundColor: '#FFA500',
    height: '10px',
    top: '45px',
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
  divider: {
    // marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  profileBase: {
    display: 'flex',
    // color: theme.palette.common.white,
    marginTop: theme.spacing(2),
    // marginBottom: theme.spacing(4),
    backgroundColor: '#8BB0E6',
  },
  profileContent: {
    padding: theme.spacing(3),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(3),
      paddingTop: 0,
    },
  },
  tabContent: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
  projectCardContent: {
    display: 'flex',
    flexDirection: 'column',
    '& .cardTop': {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    '& .date': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      '& .icon': {
        marginRight: theme.spacing(0.5),
      },
    },
  },
  loadingBase: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '250px',
  },
}));

const AboutTab = (props) => {
  const { about, value, index, ...other } = props;

  const filteredExp =
    about.experience &&
    Object.values(about.experience).filter((x) => x !== 'null');
  const filteredEdu =
    about.education &&
    Object.values(about.education).filter((x) => x !== 'null');
  const filteredAchv =
    about.achievements &&
    Object.values(about.achievements).filter((x) => x !== 'null');

  const classes = useStyles();
  return (
    <div id={index} hidden={value !== index} {...other}>
      {value === index && (
        <Container>
          <Grid container spacing={3} className={classes.root}>
            <Grid item xs={12}>
              <div className={classes.tabContent}>
                {about.bio && (
                  <>
                    <Typography className={classes.headers} variant='h5'>
                      Bio
                    </Typography>
                    <Card className={classes.card}>
                      <CardContent className={classes.cardContent}>
                        <Typography variant='body1'>{about.bio}</Typography>
                      </CardContent>
                    </Card>
                  </>
                )}
                {filteredExp && filteredExp.length > 0 && (
                  <Typography className={classes.headers} variant='h5'>
                    Experience
                  </Typography>
                )}
                {filteredExp &&
                  filteredExp.length > 0 &&
                  filteredExp.map((exp) => {
                    return (
                      <Card
                        key={generate()}
                        className={classes.card}
                        data-testid='expCard'
                      >
                        <CardContent className={classes.cardContent}>
                          <div className='cardTop'>
                            <Typography variant='h6'>{exp.title}</Typography>
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
                  })}
                {filteredEdu && filteredEdu.length > 0 && (
                  <Typography className={classes.headers} variant='h5'>
                    Education
                  </Typography>
                )}
                {filteredEdu &&
                  filteredEdu.length > 0 &&
                  filteredEdu.map((edu) => {
                    return (
                      <Card
                        key={generate()}
                        className={classes.card}
                        data-testid='eduCard'
                      >
                        <CardContent className={classes.cardContent}>
                          <div className='cardTop'>
                            <Typography variant='h6'>{edu.title}</Typography>
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
                  })}
                {filteredAchv && filteredAchv.length > 0 && (
                  <Typography className={classes.headers} variant='h5'>
                    Achievements
                  </Typography>
                )}
                {filteredAchv &&
                  filteredAchv.length > 0 &&
                  filteredAchv.map((achv) => {
                    return (
                      <Card
                        key={generate()}
                        className={classes.card}
                        data-testid='achvCard'
                      >
                        <CardContent className={classes.cardContent}>
                          <div className='cardTop'>
                            <Typography variant='h6'>{achv.title}</Typography>
                            <Typography variant='body1'>
                              {achv.description}
                            </Typography>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
              </div>
            </Grid>
          </Grid>
        </Container>
      )}
    </div>
  );
};

const ProjectsTab = (props) => {
  const { projects, userId, value, index, ...other } = props;
  const classes = useStyles();
  const filteredProjects = projects.filter(
    ([projectId]) => projectId !== 'null'
  );
  return (
    <div id={index} hidden={value !== index} {...other}>
      {value === index && (
        <Container>
          <Grid container spacing={3} className={classes.root}>
            <Grid item xs={12}>
              <div className={classes.tabContent}>
                {filteredProjects && filteredProjects.length > 0 && (
                  <Typography className={classes.headers} variant='h5'>
                    Projects
                  </Typography>
                )}
                {filteredProjects.map(([projectId, project], i) => (
                  <Link
                    key={i}
                    to={`/${userId}/${projectId}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <Card className={classes.card}>
                      <CardActionArea
                        disableRipple
                        className={classes.cardActionArea}
                      >
                        <CardContent className={classes.projectCardContent}>
                          <div className='cardTop'>
                            <Typography
                              className={classes.typoLink}
                              variant='h6'
                            >
                              {project}
                            </Typography>
                            <Typography className={classes.typoLink}>
                              View project
                            </Typography>
                          </div>
                          {/* <>
                                <Typography variant='body2' color='textSecondary'>
                                  {project.description}
                                </Typography>
                                <div className='date'>
                                  <ScheduleIcon className='icon' fontSize='small' />
                                  <Typography variant='caption' color='textSecondary'>
                                    Created on {project.creationDate}
                                  </Typography>
                                </div></> */}
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Link>
                ))}
              </div>
            </Grid>
          </Grid>
        </Container>
      )}
    </div>
  );
};

function a11yProps(index) {
  return {
    id: index,
  };
}

const ViewProfile = (props) => {
  const [value, setValue] = useState(0);
  const [profile, setProfile] = useState(null);
  const [found, setFound] = useState(true);
  const userId = props.id;

  useEffect(() => {
    axios
      .post('https://memento-backend.herokuapp.com/about/viewUser', { userId: userId })
      .then((res) => {
        // console.log(res.data);
        setProfile(res.data);
      })
      .catch((err) => {
        console.log(err.response);
        setFound(false);
      });
  }, [userId]);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  const ViewResume = () => {
    return (
      <div className={classes.resume}>
        <Typography className={classes.typoLink} variant='subtitle1'>
          <a
            href={profile.resume}
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

  const classes = useStyles();
  return (
    <>
      {profile === null ? (
        <>
          {found ? (
            <div className={classes.loadingBase}>
              <CircularProgress />
            </div>
          ) : (
            <NotFound />
          )}
        </>
      ) : (
        <>
          <Container>
            <Paper className={classes.profileBase}>
              <Grid container>
                <Box clone order={{ xs: 2, sm: 1 }}>
                  <Grid item xs={12} sm={6}>
                    <div className={classes.profileContent}>
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
                        {profile.phone && (
                          <ListItem>
                            <>
                              <PhoneOutlinedIcon className={classes.icon} />
                              <Typography variant='subtitle1'>
                                {profile.phone}
                              </Typography>
                            </>
                          </ListItem>
                        )}
                        {profile.resume && (
                          <ListItem>
                            <DescriptionOutlinedIcon className={classes.icon} />
                            <ViewResume />
                          </ListItem>
                        )}
                      </List>
                    </div>
                  </Grid>
                </Box>
                <Box clone order={{ xs: 1, sm: 2 }}>
                  <Grid className={classes.avatar} item xs={12} sm={6}>
                    <Avatar
                      className='profileImage'
                      alt={profile.name}
                      src={profile.pic}
                    />
                  </Grid>
                </Box>
              </Grid>
            </Paper>
            <Tabs
              classes={{ indicator: classes.indicator }}
              className={classes.tabs}
              // centered
              onChange={handleChange}
              value={value}
              // variant='fullWidth'
            >
              <Tab label='About' {...a11yProps(0)} />
              <Tab label='Projects' {...a11yProps(1)} />
            </Tabs>
            <Divider className={classes.divider} />
          </Container>
          <AboutTab value={value} index={0} about={profile}></AboutTab>

          <ProjectsTab
            value={value}
            index={1}
            projects={Object.entries(profile.projects)}
            userId={userId}
          ></ProjectsTab>
        </>
      )}
    </>
  );
};

export default ViewProfile;
