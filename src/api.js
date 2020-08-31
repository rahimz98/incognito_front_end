
import { useState, useEffect } from "react";

const BASE_URL = "http://localhost:5000/api/";


export function createUser(user) {
    const { email, firstname, lastname, password } = user;
  
    console.log({
      firstname,
      lastname
    });
    const endpoint = BASE_URL + 'users/createUser';
    // console.log(author);
    return fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        firstname,
        lastname,
        password
      })
  }).then(res => window.location.reload());
}

export function loginUser(user) {
  const { email, password} = user;

  const endpoint = BASE_URL + 'users/loginUser';
  return fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email,
      password
    })
  }).then(res => window.location.reload());
}
  