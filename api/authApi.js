import axios from 'axios';

//const BASE_URL = 'http://192.168.0.7:8080'; // 지영 집
//const BASE_URL = 'http://192.168.123.112:8080'; // 유진 집
const BASE_URL = 'http://10.30.7.87:8080'; // 유진 학교

export const sendVerificationEmail = (email) => {
  return axios.post(`${BASE_URL}/email-auth`, { email });
};

export const verifyEmailCode = (email, authNum) => {
  return axios.post(`${BASE_URL}/email-check`, {
    email,
    authNum: parseInt(authNum),
  });
};

export const signup = ({ name, email, password }) => {
  return axios.post(`${BASE_URL}/join`, {
    name,
    email,
    password,
  });
};

export const resetPassword = ({ email, authNum, password }) => {
  return axios.post(`${BASE_URL}/password-reset`, {
    email,
    authNum: parseInt(authNum),
    password,
  });
};

export const login = ({ email, password }) => {
  return axios.post(`${BASE_URL}/login`, {
    email,
    password,
  });
};
export const addRoutine = ({ timeSlot, content }) => {
  return axios.post(`${BASE_URL}/add-routine`, {
    timeSlot,
    content,
  });
};
export const checkRoutine = ({ routineId, checked }) => {
  return axios.post(`${BASE_URL}/check-routine`, {
    routineId,
    checked,
  });
};
export const getRoutineDetail = (id) => {
  return axios.get(`${BASE_URL}/edit-routine-detail/${id}`);
};
export const editRoutine = ({ id, time, title }) => {
  return axios.patch(`${BASE_URL}/edit-routine-detail`, {
    id,
    time,
    title,
  });
};
export const getRoutinesByDate = (date) => {
  return axios.get(`${BASE_URL}/main`, {
    params: { date }, // 예: '2025-06-11'
  });
};
export const finishRoutine = ({ checked, unchecked }) => {
  return axios.post(`${BASE_URL}/finish`, {
    checked,
    unchecked,
  });
};
