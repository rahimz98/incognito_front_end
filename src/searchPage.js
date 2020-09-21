import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import history from './history';
// MUI
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import Container from '@material-ui/core/Container';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
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
  cardContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    '& .avatar': {
      width: theme.spacing(6),
      height: theme.spacing(6),
      marginRight: theme.spacing(2),
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

const TabContent = (props) => {
  const { data, value, index, ...other } = props;

  const classes = useStyles();
  return (
    <div id={index} hidden={value !== index} {...other}>
      {value === index && data ? (
        <Link href={`/users/${data.id}`} style={{ textDecoration: 'none' }}>
          <Card className={classes.card}>
            <CardActionArea className={classes.cardActionArea}>
              <CardContent className={classes.cardContent}>
                <Avatar className='avatar' alt={data.name} src={data.pic} />
                <Typography variant='h6'>
                  <Link href={`/users/${data.id}`} color='inherit'>
                    {data.name}
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

const SearchPage = () => {
  const [value, setValue] = useState(0);
  // const results = useSelector(store => store.search);
  const data = mockData;
  const projectData = mockData;

  const listItems = []; //data.map((d) => <li key={d.name}>{d.name}</li>);
  console.log(listItems);
  if (listItems.length > 0) {
    console.log(data);
  }

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
      {data ? (
        data.map((data) => (
          <TabContent value={value} index={0} data={data}></TabContent>
        ))
      ) : (
        <TabContent value={value} index={0} data={null}></TabContent>
      )}
      {projectData ? (
        projectData.map((projectData) => (
          <TabContent value={value} index={1} data={projectData}></TabContent>
        ))
      ) : (
        <TabContent value={value} index={1} data={null}></TabContent>
      )}
    </Container>
  );
};

export default SearchPage;
