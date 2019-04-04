import axios from 'axios';

let root = process.env.API_ROOT

export const req_login = params => { return axios.post(`${root}/auth/login`, params).then(res => res.data); };

export const update_user_info = params => { return axios.put(`${root}/auth/update_user?user_id=${params.id}&tpe=info`, params); };

export const add_user = params => { return axios.post(`${root}/auth/register`, params).then(res => res.data); };

export const req_logout = params => { return axios.get(`${root}/auth/logout`, { params: params }); };

export const create_project = params => { return axios.post(`${root}/project/manager`, params).then(res => res.data); };

export const update_project = params => { return axios.put(`${root}/project/manager?proj_id=${params.id}`, params); };

export const del_project = params => { return axios.delete(`${root}/project/manager?proj_id=${params.id}`); };

export const get_project_list_page = params => { return axios.get(`${root}/project/manager`, { params: params }); };

export const editUser = params => { return axios.get(`${root}/user/edit`, { params: params }); };

export const addUser = params => { return axios.get(`${root}/user/add`, { params: params }); };
