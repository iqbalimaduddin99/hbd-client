import api from './api';

export const postLogin = (data) => api.post(`/user/login`, data);
export const postUser = (data) => api.post(`/user/create`, data);
export const getUserById = (id) => api.get(`/user/get/${id}`);
export const getBirthDay = () => api.get(`/user/birthday`);
export const putUser = (data, id) => api.put(`/user/update/${id}`, data);
export const deletUser = (id) => api.delete(`/user/delete/${id}`);
