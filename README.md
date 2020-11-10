<p>
    <img src='readme_gifs/logo.png' 
        style='display: block;
            margin-left: auto;
            margin-right: auto;
            width: 30%;'
    >
</p>

## Table of Contents
- [About](#about)
- [Creators](#creators)
- [Demo](#demo)
- [Features](#features)
- [Documentation](/Document)
- [Application Layer](#application-layer)
- [Installation guide](#installation-guide) 
- [API Documentation](#api-documentation)

## Creators
- Zill-e Rahim
- Gieester Thai
- Nik Faris Arief Nik Kamarudin
- Marcus Lim
- Jason Thien


## About

Memento is a retrospective based e-portfolio website meant to be used for students to showcase their projects to the public. Users are able to view other users as well as the projects that other users are currently working on via the search bar. Users can also choose to publicize or privatize their projects used for privacy-sake. 

## Demo

Following this [Link](https://memento-front-end.herokuapp.com/), you will be able to demo our product at your own leisure

## Features
Register & Login

![Register & Login](/readme_gifs/register.gif)

User Profile

![User Profile](/readme_gifs/profile.gif)

Sidebar 
- Access to home and projects
- Create projects

![Sidebar](/readme_gifs/menu.gif)

![Sidebar](/readme_gifs/createproject.gif)

Projects
- Edit & delete projects
- Add & delete images
- Share to social media

![Projects](/readme_gifs/project.gif)

Search
- Find people & projects

![Search](/readme_gifs/search.gif)

Dark Mode

![Dark Mode](/readme_gifs/darkmode.gif)

## Installation Guide 

Below are the steps to install both the front end and back end on local machines and be able to access all the data in the database:
1. Install NodeJS on your system from [Here](https://nodejs.org/en/download/)
2. Back-End [Repository Link](https://github.com/marcus247/Incognito)
 
    2.1. Clone the Repository into your machine and `cd` into the repository folder<br />
    2.2. In the terminal of your machine, execute the following command to install all the dependencies needed to run program<br /> 
    `npm install --save` <br />
    2.3. To start the Back-End sever, run the following command<br />
    `npm start`<br />
    2.4. Open [http://localhost:5000](http://localhost:5000) to view the server in the browser
    2.5. To connect the server to a Firebase database, follow the instruction on the [Firebase documentation](https://firebase.google.com/docs/web/setup) 
3. Front-End [Repository Link](https://github.com/rahimz98/incognito_front_end)
    
    3.1. Clone the Repository into your machine and `cd` into the repository folder<br />
    3.2. In the terminal of your machine, execute the following command to install all the dependencies needed to run program<br /> 
    `npm install --save` <br />
    3.3. To start the Front-End client, run the following command<br />
    `npm start`<br />
    3.4. Open [http://localhost:3000](http://localhost:3000) to view the client in the browser<br />
    3.5 (OPTIONAL) Install the React Redux Dev Tool extension, on Chrome, [Here](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd) to be able to see and visualize the redux states

## Application Layer

**Back-End**
- User controller (controllers/user-controller.js)
  - Creates, read, update, deletes all fields in the User reference
  - Verifies user login details
- About controller (controllers/about-controller.js)
  - Creates, read, update, deletes all fields in the About reference
  - Updates the contactEmail field in the User reference
- Project controller (controllers/project-controller.js)
  - Creates, read, update, deletes all fields in the Project reference
  - Updates the projects list in the User reference whenever a project’s collaborator
- Search controller (controllers/search-controller.js)
  - Handles the search for Users and Projects
- Database controller (controllers/db-controller.js)
  - Setup for the Firebase configuration

**Front-End**
(needs to be filled)


## API Documentation

**User**
- **‘api/users/’**
  - *‘api/users/loginUser’*
    - POST request
    - Verifies the user credentials that are passed from the back end through req.body (email, password)  and returns a jwt if signed in is successful or a message indicating failure
  - *‘api/users/logoutUser’*
    - POST request
    - Checks to see if the user has jwt and logs the user out
  - *‘api/users/createUser’*
    - POST request
    - Creates user from the fields from req.body (email, password, firstname, lastname) and saves the newly created users into the firebase database

**Search**
- **‘api/search’**
  - POST request
  - Searches through the database for user/project with the input string from req.body.query  given by the front-end and returns a json with a list of users and projects

**Project**
- **‘api/project’**
  - *‘api/project/open/:id’*
    - GET request
    - Passes project data in JSON format to the frontend to display
  - *‘api/project/unverified-user/open/:id’*
    - GET request
    - Passes project data in JSON format to the frontend to display for an unverified user
  - *‘api/project/create’*
    - POST request
    - Create a project
    - Takes multiple inputs from req.body (userId, name, description, visibility, collaborators)
  - *‘api/project/edit’*
    - POST request
    - Edit project fields
    - Takes multiple inputs from req.body (userId, projectId, editName, editDescription, editVisibility, editCollaborators, editLinks)
  - *‘api/project/edit/blog’*
    - POST request
    - Edit blog section of the project
    - Takes multiple inputs from req.body (userId, projectId, editBlog)
  - *‘api/project/edit/projectContent’*
    - POST request
    - Edit project content section of the project
    - Takes multiple inputs from req.body (userId, projectId, editProject)
  - *‘api/project/edit/add-media’*
    - POST request
    - ads picture to gallery section of the project
    - Takes input from req.files (editMedia) and req.body (projectId)
  - *‘api/project/edit/delete-media’*
    - POST request
    - Delete pictures from gallery section of the project
    - Takes multiple inputs from req.body (userId, projectId)
  - *‘api/project/delete/:id’*
    - GET request
    - Delete a project 
  - *‘api/project/get-project-list’*
    - GET request
    - Get project list a user is a collaborator for
  - *‘api/project/get-shareable-link/fb’*
    - GET request
    - Get a shareable link of the project to Facebook

**About**
 - **‘about/’**
   - *‘about/uploadImage’*
     - POST request
     - Uploads the profile picture of a user
     - Takes a file input of type png or jpeg only
   - *‘about/uploadResume’*
     - POST request
     - Uploads the resume of a user
     - Takes a file input of type pdf only
   - *‘about/updateContact’*
     - POST request
     - Updates all the information about user profile
     - Takes inputs from req.body (name, email, phone, bio, experience, education, achievements)
   - *‘about/getContact’*
     - GET request
     - Get all the information about user profile
   - *‘about/getProfilePic’*
     - GET request
     - Get the url reference of the user profile photo
   - *‘about/getResume’*
     - GET request
     - Get the url reference of the user resume
   - *‘about/viewUser’*
     - POST request
     - View user profile when they are not logged in
   - *‘about/deleteResume’*
     - POST request
     - Deletes the user resume from profile page








