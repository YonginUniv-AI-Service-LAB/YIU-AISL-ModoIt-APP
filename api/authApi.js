import axios from 'axios';

const BASE_URL = 'http://192.168.0.7:8080'; // 지영 집
//const BASE_URL = 'http://192.168.123.113:8080 // 유진 집
// const BASE_URL = 'http://10.31.2.46:8080'; // 유진 학교

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

/*
;(async () => {
  try {
    const res = await sendVerificationEmail('gusdb0214@naver.com');
    console.log('✅ 요청 성공:', res.data);
  } catch (err) {
    console.error('❌ 요청 실패:', err.message);
  }
})();
*/
