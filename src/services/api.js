import axios from 'axios';

export const getApiRequest = () => {

  const token = localStorage.getItem('paypost.token');

  return axios.create({
    baseURL: 'http://localhost:3003/api',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  });

}