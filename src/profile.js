import React from 'react';
import EditProfile from './editProfile';
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
      right: '16px'
    }
  },
  contacts: {
    marginTop: theme.spacing(5),
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
      textAlign: 'center'
    }
  }
}));

const Profile = () => {
  // just for testing TODO: remove later
  const phoneNumber = true;
  
  const handleChangeImage = (e) => {
    console.log(e.target.files[0])
    // const image = e.target.files[0];
    // uploadImage action
  }

  const handleEditImage = () => {
    const fileInput = document.getElementById('fileInput')
    console.log(fileInput);
    fileInput.click();
  }

  const classes = useStyles();
  return (
    <Container>
      <Grid container spacing={3} className={classes.root}>
        {/* <Grid item xs={12}>
          <Typography variant='h3'>About me</Typography>
        </Grid> */}
        <Box clone order={{xs:2, sm:1}}>
          <Grid item xs={12} sm={6}>
            
            <Typography className={classes.name} variant='h4'>Firstname Lastname</Typography>
            <Typography className={classes.contacts} variant='h5'>Contact Details</Typography>
            <List>
              <ListItem>
                <EmailOutlinedIcon/>
                email@something.com
              </ListItem>
              {phoneNumber &&
                <ListItem>
                  <PhoneOutlinedIcon/>
                  0123-456-789
                </ListItem>
              }
            </List>
            {/* <Typography variant='body2'>Email</Typography>
            <Typography variant='body2'>Contact Number</Typography> */}
          </Grid>
        </Box>

        <Box className={classes.avatar} clone order={{xs:1, sm:2}}>
          <Grid item xs={12} sm={6}>
            <Badge
              overlap="circle"
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              badgeContent={
                <>
                  <Input
                  accept='image/*'
                  className={classes.input}
                  style={{display:'none'}}
                  id='fileInput'
                  type='file'
                  onChange={handleChangeImage}
                  />
                  <Tooltip title='Change profile picture' placement='top'>
                    <IconButton onClick={handleEditImage}>
                      <CameraAltOutlinedIcon/>
                    </IconButton>
                  </Tooltip>
                </>
              }
            >
              <Avatar className='profileImage' alt='Name' src='https://cdn.pixabay.com/photo/2020/08/14/09/12/penguin-5487301_960_720.png'/>
            </Badge>
            <EditProfile/>
          </Grid>
        </Box>
        
        <Box clone order={{xs:3, sm:3}}>
          <Grid item xs={12}>
            <Typography variant='h5'>Experience</Typography>
            <Typography className={classes.bodyText} variant='body1'>Text messaging, or texting, is the act of composing and sending electronic messages, typically consisting of alphabetic and numeric characters, between two or more users of mobile devices, desktops/laptops, or other type of compatible computer. Text messages may be sent over a cellular network, or may also be sent via an Internet connection.</Typography>
            <Typography variant='h5'>Education</Typography>
            <Typography className={classes.bodyText} variant='body1'>Text messaging, or texting, is the act of composing and sending electronic messages, typically consisting of alphabetic and numeric characters, between two or more users of mobile devices, desktops/laptops, or other type of compatible computer. Text messages may be sent over a cellular network, or may also be sent via an Internet connection.</Typography>
            <Typography variant='h5'>Accomplishments</Typography>
            <Typography className={classes.bodyText} variant='body1'>Text messaging, or texting, is the act of composing and sending electronic messages, typically consisting of alphabetic and numeric characters, between two or more users of mobile devices, desktops/laptops, or other type of compatible computer. Text messages may be sent over a cellular network, or may also be sent via an Internet connection.</Typography>
          </Grid>
        </Box>
        
      </Grid>
    </Container>
  );
}

export default Profile;
