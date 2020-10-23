import axios from 'axios';
import history from '../history';

/*
name
  description
  owner
  collaborators
  visibility
  creationDate
  mainImage
  project
  blog
  media
  links
  */

export const openProject = (id) => {
    const token = localStorage.getItem("jwt");
    axios
    .get('https://memento-backend.herokuapp.com/project/id',{
        headers: {
            'Authorization': token
        }
    })
    .then()

    
}