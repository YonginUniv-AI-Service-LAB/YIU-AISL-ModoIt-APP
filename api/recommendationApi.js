import axios from 'axios';
axios.defaults.withCredentials = true;

const BASE_URL = 'http://192.168.0.7:8080'; // 지영 집
//const BASE_URL = 'http://192.168.123.113:8080 // 유진 집
// const BASE_URL = 'http://10.31.2.46:8080'; // 유진 학교

// 감정 + 강도 저장 (사전조사)
export const savePreResearch = ({ emotion, intensity }) => {
  return axios.post(
    `${BASE_URL}/pre-research`,
    { emotion, intensity },
    {
      withCredentials: true, // 세션 쿠키 포함
    }
  );
};


// 사전조사 결과를 기반으로 추천 루틴 가져오기
export const fetchRecommendedRoutines = ({ emotion, intensity, category }) => {
  return axios.get(`${BASE_URL}/recommendation`, {
    params: { emotion, intensity, category },
    withCredentials: true,
  });
};

// 추천 루틴 저장 API
export const saveRecommendedRoutines = async (routinePresetList) => {
  return axios.post(`${BASE_URL}/start`, routinePresetList, {
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true, // 세션 쿠키 포함
  });
};