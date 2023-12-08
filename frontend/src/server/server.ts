import axios from 'axios';

const server = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': '973649dc98986199308a3734b26e4e60efb12ecaf29fb4c4110239acb6a67a5f',
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
