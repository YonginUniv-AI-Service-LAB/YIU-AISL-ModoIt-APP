import axios from 'axios';
import Constants from 'expo-constants';
const BASE_URL = Constants.expoConfig.extra.BASE_URL;

axios.defaults.withCredentials = true;

// 오늘 성취율 조회
export const getFeedbackAchievementRate = () => {
  return axios.get(`${BASE_URL}/feedback-card`);
};

// 감정 & 강도 저장
export const submitFeedback = (payload) =>
  axios.post(`${BASE_URL}/feedback-card`, payload);
