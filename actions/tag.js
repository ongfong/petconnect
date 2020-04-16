import fetch from 'isomorphic-fetch';
import cookie from 'js-cookie';
import { API } from '../config';

export const requestTag = tag => {
    return fetch(`${API}/requestTag`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(tag)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
