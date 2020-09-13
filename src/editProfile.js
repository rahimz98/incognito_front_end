import React, { useState, useEffect, Fragment } from 'react'
// MUI
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';

const useStyles = makeStyles((theme) => ({
  textField: {
    margin: '10px auto 10px auto'
  }
}));

const EditProfile = () => {
  const [details, setDetails] = useState({
    phoneNumber: '',
    experience: '',
    education: '',
    accomplishments: '',
  });
  const [open, setOpen] = useState(false);

  // mapDetailsToState = (user) => {
  //   setDetails({
  //     // phoneNumber: /* user.phoneNumber */ ? /* user.phoneNumber */ : ''
  //     // experience: /* user.experience */ ? /* user.experience */ : ''
  //     // education: /* user.education */ ? /* user.education */ : ''
  //     // accomplishments: /* user.accomplishments */ ? /* user.accomplishments */ : ''
  //   });
  // }

  // useEffect((user) => {
  //   this.mapDetailsToState(user);
  // }, [])

  const handleClickOpen = () => {
    setOpen(true);
    // this.mapDetailsToState(user);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setDetails({
      ...details,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    // editProfile action with new changes (details)
    handleClose();
  }

  const classes = useStyles();
  return (
    <Fragment>
      <Tooltip title='Edit profile' placement='top'>
        <IconButton className='editIcon' onClick={handleClickOpen}>
          <EditOutlinedIcon/>
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth='md'
      > 
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              className={classes.textField}
              fullWidth
              label='Phone Number'
              name='phoneNumber'
              onChange={handleChange}
              type='text'
              value={details.phoneNumber}
              variant='outlined'
            />
            <TextField
              className={classes.textField}
              fullWidth
              label='Experience'
              multiline
              name='experience'
              onChange={handleChange}
              rows='3'
              type='text'
              value={details.experience}
              variant='outlined'
            />
            <TextField
              className={classes.textField}
              fullWidth
              label='Education'
              multiline
              name='education'
              onChange={handleChange}
              rows='3'
              type='text'
              value={details.education}
              variant='outlined'
            />
            <TextField
              className={classes.textField}
              fullWidth
              label='Accomplishments'
              multiline
              name='accomplishments'
              onChange={handleChange}
              rows='3'
              type='text'
              value={details.accomplishments}
              variant='outlined'
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}

export default EditProfile;
