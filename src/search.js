import React, { useState } from 'react';
import history from 'history';
// MUI
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import Input from '@material-ui/core/Input';

const useStyles = makeStyles((theme) => ({
  search: {
    display: 'flex',
  },
  input: {
    display: 'flex',
    alignItem: 'center',
    border: '1px solid #FFFFFF',
    borderRadius: '100px',
    height: '30px',
    margin: '0 auto',
    padding: '1px 6px',
    width: '35vw',
    maxWidth: '600px',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    '& .MuiInput-input': {
      color: '#FFFFFF',
      padding: '1px 6px',
      fontSize: 'medium',
      '&::placeholder': {
        color: '#D3D3D3',
      },
    },
  },
  icon: {
    color: '#FFFFFF',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
}));

function Search() {
  const [input, setInput] = useState('');

  const onEnterPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  const handleSearchChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input) {
      console.log('entered');
      // Dispatch search
      // history.push('/search');
    }
  };

  const classes = useStyles();
  return (
    <form className={classes.search} onKeyDown={onEnterPress}>
      <div className={classes.input}>
        <Input
          disableUnderline
          fullWidth
          onChange={handleSearchChange}
          placeholder='Search Memento'
          type='text'
          value={input}
        />
        <SearchIcon className={classes.icon} onClick={handleSubmit} />
      </div>
    </form>
  );
}

export default Search;
