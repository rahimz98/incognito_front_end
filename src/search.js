import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import history from './history';
import { getSearchResult } from './actions/search';
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
    [theme.breakpoints.down('xs')]: {
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
  const dispatch = useDispatch();
  const [query, setQuery] = useState();
  const queryParams = new URLSearchParams(useLocation().search);

  useEffect(() => {
    setQuery(queryParams.get('q'));
    dispatch(getSearchResult(queryParams.get('q')));
  }, [queryParams, dispatch]);

  const onEnterPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query) {
      dispatch(getSearchResult(query));
      history.push(`/search?q=${query}`);
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
          value={query}
        />
        <SearchIcon className={classes.icon} onClick={handleSubmit} />
      </div>
    </form>
  );
}

export default Search;
