import axios from 'axios';

const server = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

server.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.log(error);
        if (
            error.response.status === 402 ||
            error.response.status === 401
        ) {
            window.location.replace('/');
        }
        return Promise.reject(error);
    }
)

export default server;