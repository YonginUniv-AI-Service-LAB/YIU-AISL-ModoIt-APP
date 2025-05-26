import axios from 'axios';

//const BASE_URL = 'http://192.168.0.7:8080'; // 지영 집
//const BASE_URL = 'http://192.168.123.113:8080 // 유진 집
const BASE_URL = 'http://10.30.4.142:8080'; // 유진 학교

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
