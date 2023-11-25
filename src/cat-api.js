import axios from 'axios';

const API_KEY =
  'live_jJ5aLGn50ZkM07nMxodxDW7fSjdGGLoPRReFN6eyXEoTBwtctXneqCxESjN80VWx';

const BASE_URL = 'https://api.thecatapi.com/v1';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'x-api-key': API_KEY,
    'Content-Type': 'application/json', 
  },
});

export function fetchBreeds() {
  return axiosInstance.get('/breeds')
    .then(response => response.data)
    .catch(error => {
      console.error(`Error fetching breeds: ${error}`);
      return [];
    });
}

export function fetchCatByBreed(id) {
  return axiosInstance.get(`/images/${id}`)
    .then(response => response.data)
    .catch(error => {
      throw new Error(error.response.statusText);
    });
}