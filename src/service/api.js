import axios from 'axios';

const api = axios.create({
  baseURL: "http://localhost:4000",
  timeout: 120000,
  headers: {
    Accept: '*/*',
  },
});

// Add an interceptor to attach the token to the headers if exist
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const ApiAction = {
  get: (url, headers = {}) => {
    return api
      .get(url, { headers: headers })
      .then((response) => response.data)
      .catch((err) => Promise.reject(err));
  },

  post: (url, data = {}, reqConfig = {}) => {
    return api
      .post(url, data, {
        ...reqConfig,
      })
      .then((response) => response.data)
      .catch((err) => Promise.reject(err));
  },

  put: (url, data = {}, reqConfig = {}) => {
    return api
      .put(url, data, {
        ...reqConfig,
      })
      .then((response) => response.data)
      .catch((err) => Promise.reject(err));
  },

  delete: (url) => {
    return api
      .delete(url)
      .then((response) => response.data)
      .catch((err) => Promise.reject(err));
  },
};

export default ApiAction;
