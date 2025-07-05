import axios from 'axios';
import Constants from 'expo-constants';
const BASE_URL = Constants.expoConfig.extra.BASE_URL;

axios.defaults.withCredentials = true;

// 오늘 성취율 조회
export const getFeedbackAchievementRate = (date) => {
  return axios.get(`${BASE_URL}/feedback-card`, { params: { date } });
};

// 감정 & 강도 저장
export const submitFeedback = (payload) =>
  axios.post(`${BASE_URL}/feedback-card`, payload);

// 완료하지 않은 루틴 조회
export const getUncheckedRoutines = () =>
  axios.get(`${BASE_URL}/delect-routine`);

// 추천 루틴 조회
export const getRecommendations = () =>
  axios.get(`${BASE_URL}/recommend-routine`);

// 추천 루틴 저장
export const saveRecommendedRoutines = (routineList) =>
  axios.post(`${BASE_URL}/recommend-routine`, routineList);

// 연·월별 피드백 카드 조회
export const getFeedbackCards = (year, month) =>
  axios.get(`${BASE_URL}/check-feedback-card`, {
    params: { year, month },
  });
