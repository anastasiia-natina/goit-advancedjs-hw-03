import axios, { AxiosHeaders } from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_jJ5aLGn50ZkM07nMxodxDW7fSjdGGLoPRReFN6eyXEoTBwtctXneqCxESjN80VWx';

const BASE_URL = 'https://api.thecatapi.com/v1';

export function fetchBreeds() {
  return fetch(`${BASE_URL}/breeds?x-api-key=${AxiosHeaders}`).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
    } else {
      return resp.json();
    }
  });
}

export function fetchCatByBreed(id) {
  return fetch(`${BASE_URL}/images/${id}`).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
    } else {
      return resp.json();
    }
  });
}