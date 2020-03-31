import fetch from 'isomorphic-fetch';
import { API } from '../config';

export const listPetsRequestTags = () => {
    return fetch(`${API}/tag/list`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};