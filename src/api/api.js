import axios from 'axios';

let root = process.env.API_ROOT

// auth
export const req_login = params => { return axios.post(`${root}/auth/login`, params).then(res => res.data); };

export const update_user_info = params => { return axios.put(`${root}/auth/update_user?user_id=${params.id}&tpe=info`, params); };

export const add_user = params => { return axios.post(`${root}/auth/register`, params).then(res => res.data); };

export const req_logout = params => { return axios.get(`${root}/auth/logout`, { params: params }); };

// project manager
export const get_distinct = params => { return axios.get(`${root}/project/get_distinct`, { params: params }); };

export const create_project = params => { return axios.post(`${root}/project/manager`, params); };

export const update_project = params => { return axios.put(`${root}/project/manager?proj_id=${params.id}`, params); };

export const del_project = params => { return axios.delete(`${root}/project/manager?proj_id=${params.id}`); };

export const get_project_list_page = params => { return axios.get(`${root}/project/manager`, { params: params }); };

// case manager
export const get_case = params => { return axios.get(`${root}/case/manager`, { params: params }); };

export const add_case = params => { return axios.post(`${root}/case/manager`, params); };

export const update_case = params => { return axios.put(`${root}/case/manager?case_id=${params.id}`, params); };

export const del_case = params => { return axios.delete(`${root}/case/manager?case_id=${params.id}`); };

// case requests manager
export const get_case_requests = params => { return axios.get(`${root}/httptest/manager`, { params: params }); };

export const add_case_requests = params => { return axios.post(`${root}/httptest/manager`, params); };

export const update_case_requests = params => { return axios.put(`${root}/httptest/manager?id=${params.id}`, params); };

export const del_case_requests = params => { return axios.delete(`${root}/httptest/manager?id=${params.id}`); };



// export const editUser = params => { return axios.get(`${root}/user/edit`, { params: params }); };
// export const addUser = params => { return axios.get(`${root}/user/add`, { params: params }); };
