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
    .get('http://localhost:5000/project/id',{
        headers: {
            'Authorization': token
        }
    })
    .then()

    
}