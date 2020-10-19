import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// MUI
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Container from '@material-ui/core/Container';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import ScheduleIcon from '@material-ui/icons/Schedule';
import CircularProgress from '@material-ui/core/CircularProgress';

// import mockData from './mockData';

const useStyles = makeStyles((theme) => ({
  tabs: {
    margin: '0 auto',
    textColor: '#192231',
  },
  indicator: {
    backgroundColor: '#FFA500',
    height: '10px',
    top: '45px',
  },
  card: {
    backgroundColor: 'inherit',
    // border: '1px solid #C0C0C0',
    marginBottom: '-1px',
    boxShadow: 'none',
    borderRadius: 0,
  },
  userCardContent: {
    display: 'flex',
    flexDirection: 'row',
    '& .avatar': {
      width: theme.spacing(8),
      height: theme.spacing(8),
      marginRight: theme.spacing(2),
    },
    '& .profileButton': {
      marginLeft: 'auto',
    },
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
  listItem: {
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
    '& >*': {
      textDecoration: 'inherit',
      color: '#192231',
    },
  },
  typoLink: {
    textDecoration: 'none',
    color: 'inherit',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  noResults: {
    marginTop: theme.spacing(3),
  },
  loadingBase: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '200px',
  },
}));

function a11yProps(index) {
  return {
    id: index,
  };
}

const PeopleTab = (props) => {
  const { user, value, index, ...other } = props;
  const classes = useStyles();
  return (
    <div id={index} hidden={value !== index} {...other}>
      {value === index && user ? (
        <>
          <Link to={`/${user.userId}`} style={{ textDecoration: 'none' }}>
            <Card className={classes.card}>
              <CardActionArea disableRipple className={classes.cardActionArea}>
                <CardContent className={classes.userCardContent}>
                  <Avatar className='avatar' alt={user.name} src={user.pic} />
                  <div>
                    <Typography className={classes.typoLink} variant='h6'>
                      {user.name}
                    </Typography>
                    <Typography variant='body2' color='textSecondary'>
                      {user.email}
                    </Typography>
                  </div>
                  <div className='profileButton'>
                    <Typography className={classes.typoLink}>
                      View profile
                    </Typography>
                  </div>
                </CardContent>
              </CardActionArea>
            </Card>
          </Link>
          <Divider />
        </>
      ) : (
        <Typography className={classes.noResults}>
          No results were found. Try searching something else.
        </Typography>
      )}
    </div>
  );
};

const ProjectTab = (props) => {
  const { project, value, index, ...other } = props;
  const classes = useStyles();
  return (
    <div id={index} hidden={value !== index} {...other}>
      {value === index && project ? (
        <>
          <Link
            to={`/${project.ownerId}/${project.projectId}`}
            style={{ textDecoration: 'none' }}
          >
            <Card className={classes.card}>
              <CardActionArea disableRipple className={classes.cardActionArea}>
                <CardContent className={classes.projectCardContent}>
                  <div className='cardTop'>
                    <Typography className={classes.typoLink} variant='h6'>
                      {project.name}
                    </Typography>
                    <Typography className={classes.typoLink}>
                      View project
                    </Typography>
                  </div>
                  <Typography variant='body2' color='textSecondary'>
                    {project.description}
                  </Typography>
                  <div className='date'>
                    <ScheduleIcon className='icon' fontSize='small' />
                    <Typography variant='caption' color='textSecondary'>
                      Created on {project.creationDate}
                    </Typography>
                  </div>
                </CardContent>
              </CardActionArea>
            </Card>
          </Link>
          <Divider />
        </>
      ) : (
        <Typography className={classes.noResults}>
          No results were found. Try searching something else.
        </Typography>
      )}
    </div>
  );
};

const SearchPage = () => {
  const [value, setValue] = useState(0);
  const results = useSelector((store) => store.search.results);
  const userResults = results.users;
  const projectResults = results.projects;

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  const classes = useStyles();
  return (
    <Container maxWidth='md'>
      <Tabs
        classes={{ indicator: classes.indicator }}
        className={classes.tabs}
        centered
        onChange={handleChange}
        value={value}
        variant='fullWidth'
      >
        <Tab label='People' {...a11yProps(0)} />
        <Tab label='Projects' {...a11yProps(1)} />
      </Tabs>
      <Divider />
      {userResults === null || projectResults == null ? (
        <div className={classes.loadingBase}>
          <CircularProgress />
        </div>
      ) : (
        <>
          {userResults.length > 0 ? (
            userResults.map((user, i) => (
              <PeopleTab
                value={value}
                index={0}
                key={i}
                user={user}
              ></PeopleTab>
            ))
          ) : (
            <PeopleTab value={value} index={0} user={null}></PeopleTab>
          )}
          {projectResults.length > 0 ? (
            projectResults.map((project, i) => (
              <ProjectTab
                value={value}
                index={1}
                key={i}
                project={project}
              ></ProjectTab>
            ))
          ) : (
            <ProjectTab value={value} index={1} project={null}></ProjectTab>
          )}
        </>
      )}
    </Container>
  );
};

export default SearchPage;
