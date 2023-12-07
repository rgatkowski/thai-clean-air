import axios from 'axios';

const server = axios.create({
  baseURL: process.env.API_ENDPOINT,
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': process.env.API_KEY,
  },
});

server.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error);
    if (error.response?.status === 402 || error.response?.status === 401) {
      window.location.replace('/');
    }
    return Promise.reject(error);
  }
);

export default server;
