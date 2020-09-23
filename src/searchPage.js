import React, { useState } from 'react';
import { useSelector } from 'react-redux';
// MUI
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Container from '@material-ui/core/Container';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import ScheduleIcon from '@material-ui/icons/Schedule';

import mockData from './mockData';

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
  noResults: {
    marginTop: theme.spacing(3),
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
          <Link href={`/${user.userId}`} style={{ textDecoration: 'none' }}>
            <Card className={classes.card}>
              <CardActionArea disableRipple className={classes.cardActionArea}>
                <CardContent className={classes.userCardContent}>
                  <Avatar className='avatar' alt={user.name} src={user.pic} />
                  <div>
                    <Typography variant='h6'>
                      <Link href={`/${user.userId}`} color='inherit'>
                        {user.name}
                      </Link>
                    </Typography>
                    <Typography variant='body2' color='textSecondary'>
                      {user.email}
                    </Typography>
                  </div>
                  <div className='profileButton'>
                    <Button>View profile</Button>
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
            href={`/${project.owner}/projects/${project.id}`} // need to add owner id
            style={{ textDecoration: 'none' }}
          >
            <Card className={classes.card}>
              <CardActionArea disableRipple className={classes.cardActionArea}>
                <CardContent className={classes.projectCardContent}>
                  <div className='cardTop'>
                    <Typography variant='h6'>
                      <Link
                        href={`/${project.owner}/projects/${project.id}`} // need to add owner id
                        color='inherit'
                      >
                        {project.name}
                      </Link>
                    </Typography>
                    <Button>View project</Button>
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
  // console.log(results);
  const userResults = results; //? results : [];
  // const userResults = mockData.user;
  const projectResults = mockData.projects;

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
      {userResults === null || projectResults == null ? (
        <Typography>Loading...</Typography>
      ) : (
        <>
          {userResults.length > 0 ? (
            userResults.map((user) => (
              <PeopleTab value={value} index={0} user={user}></PeopleTab>
            ))
          ) : (
            <PeopleTab value={value} index={0} user={null}></PeopleTab>
          )}
          {projectResults.length > 0 ? (
            projectResults.map((project) => (
              <ProjectTab
                value={value}
                index={1}
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
