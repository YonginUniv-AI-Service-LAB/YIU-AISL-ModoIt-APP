import axios from 'axios';
import Constants from 'expo-constants';
const BASE_URL = Constants.expoConfig.extra.BASE_URL;
axios.defaults.withCredentials = true;

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
