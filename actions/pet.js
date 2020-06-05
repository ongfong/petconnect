import fetch from 'isomorphic-fetch';
import {API} from '../config';

export const createPet = (pet, token) => {
  return fetch(`${API}/pets`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: pet,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const listPets = (user) => {
  return fetch(`${API}/pets/${user}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getProfileQrcodePet = (id, email) => {
  return fetch(`${API}/pets/qrcode/${id}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      body: email,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getProfilePet = (id) => {
  return fetch(`${API}/pets/profile/${id}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const update = (pet, token, id) => {
  return fetch(`${API}/pets/update/${id}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: pet,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const removePet = (id, token) => {
  return fetch(`${API}/pets/remove/${id}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
export const lost = (id, token) => {
  return fetch(`${API}/pets/lost/${id}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
export const find = (id, token) => {
  return fetch(`${API}/pets/find/${id}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const listLostPets = () => {
  return fetch(`${API}/pets/lost/list`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getMap = (apikey) => {
  return fetch(
    `https://www.googleapis.com/geolocation/v1/geolocate?key=${apikey}`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
    },
  )
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
