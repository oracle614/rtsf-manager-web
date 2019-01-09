import axios from 'axios';

let base = 'http://127.0.0.1:5000';

export const req_login = params => { return axios.post(`${base}/auth/login`, params).then(res => res.data); };

export const update_user_info = params => { return axios.put(`${base}/auth/update_user?user_id=${params.id}&tpe=info`, params); };

export const add_user = params => { return axios.post(`${base}/auth/register`, params).then(res => res.data); };

export const req_logout = params => { return axios.get(`${base}/auth/logout`, { params: params }); };

export const create_project = params => { return axios.post(`${base}/project/manager`, params).then(res => res.data); };

export const update_project = params => { return axios.put(`${base}/project/manager?proj_id=${params.id}`, params); };

export const del_project = params => { return axios.delete(`${base}/project/manager?proj_id=${params.id}`); };

export const get_project = params => { return axios.get(`${base}/project/manager`, { params: params }); };

export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };
