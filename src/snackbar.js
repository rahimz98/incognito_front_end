import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { clearSnackbar } from "./actions/snackbar";
import Slide from "@material-ui/core/Slide"
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

export default function DisplaySnackbar() {
  const dispatch = useDispatch();
  const props = useSelector(state => state.snackbar);
 
  function handleClose() {
    dispatch(clearSnackbar());
  }
  
  const SlideTransition = (e) => <Slide {...e} direction='left'/>
  
  return (
    <Snackbar
      anchorOrigin={{
        horizontal: "center",
        vertical: "top"
      }}
      open={props.open}
      autoHideDuration={5000}
      onClose={handleClose}
      TransitionComponent={SlideTransition}
    >
      <Alert 
        severity={props.type} 
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={handleClose}
          >
            <CloseIcon fontSize="inherit"/>
          </IconButton>
        }
      >
        {props.text}
      </Alert>
    </Snackbar>
  );
}
