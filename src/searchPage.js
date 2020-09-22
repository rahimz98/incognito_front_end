import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import history from './history';
// MUI
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Container from '@material-ui/core/Container';
import CardContent from '@material-ui/core/CardContent';
import Link from '@material-ui/core/Link';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';

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
    border: '1px solid #C0C0C0',
    marginBottom: '-1px',
    boxShadow: 'none',
    borderRadius: 0,
  },
  personCardContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    '& .avatar': {
      width: theme.spacing(6),
      height: theme.spacing(6),
      marginRight: theme.spacing(2),
    },
  },
  projectCardContent: {
    display: 'flex',
    flexDirection: 'column',
    '& .cardHeader': {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
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
  const { person, value, index, ...other } = props;
  const classes = useStyles();
  return (
    <div id={index} hidden={value !== index} {...other}>
      {value === index && person ? (
        <Link href={`/users/${person.id}`} style={{ textDecoration: 'none' }}>
          <Card className={classes.card}>
            <CardActionArea disableRipple className={classes.cardActionArea}>
              <CardContent className={classes.personCardContent}>
                <Avatar className='avatar' alt={person.name} src={person.pic} />
                <Typography variant='h6'>
                  <Link href={`/users/${person.id}`} color='inherit'>
                    {person.name}
                  </Link>
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Link>
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
        <Link
          href={`/users/id/projects/${project.id}`} // need to add owner id
          style={{ textDecoration: 'none' }}
        >
          <Card className={classes.card}>
            <CardActionArea disableRipple className={classes.cardActionArea}>
              <CardContent className={classes.projectCardContent}>
                <div className='cardHeader'>
                  <Typography variant='h6'>
                    <Link
                      href={`/users/id/projects/${project.id}`} // need to add owner id
                      color='inherit'
                    >
                      {project.title}
                    </Link>
                  </Typography>
                  <Button onclick>View project</Button>
                </div>
                <Typography variant='body2' color='textSecondary'>
                  {project.description}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Link>
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
  // const results = useSelector(store => store.search);
  const peopleResults = mockData.people;
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
      {peopleResults ? (
        peopleResults.map((person) => (
          <PeopleTab value={value} index={0} person={person}></PeopleTab>
        ))
      ) : (
        <PeopleTab value={value} index={0} data={null}></PeopleTab>
      )}
      {projectResults ? (
        projectResults.map((project) => (
          <ProjectTab value={value} index={1} project={project}></ProjectTab>
        ))
      ) : (
        <ProjectTab value={value} index={1} data={null}></ProjectTab>
      )}
    </Container>
  );
};

export default SearchPage;
