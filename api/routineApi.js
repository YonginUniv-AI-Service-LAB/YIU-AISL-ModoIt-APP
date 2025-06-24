// routineApi.js
import axios from 'axios';
import { format } from 'date-fns';

axios.defaults.withCredentials = true;

const BASE_URL = 'http://192.168.0.7:8080';
// const BASE_URL = 'http://192.168.123.109:8080'; // 유진 집

// 날짜별 루틴 조회
export const fetchRoutinesByDate = async (date) => {
  return axios.get(`${BASE_URL}/main`, {
    params: { date: format(date, 'yyyy-MM-dd') },
    withCredentials: true,
  });
};

// 루틴 체크 토글
export const toggleRoutineCheck = async (routineId) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/check-routine`, 
      { id: routineId },
      { withCredentials: true }
    );

    return response.data;
  } catch (error) {
    console.error('루틴 체크 실패:', error);
    throw error;
  }
};

export const addRoutine = ({ timeSlot, content }) => {
  return axios.post(`${BASE_URL}/add-routine`, {
    timeSlot,
    content,
  });
};

export const getRoutineDetail = (id) => {
  return axios.get(`${BASE_URL}/edit-routine-detail/${id}`);
};

export const editRoutine = ({ id, timeSlot, content }) => {
  return axios.patch(`${BASE_URL}/edit-routine-detail`, {
    id,
    timeSlot,
    content,
  });
};

export const getRoutinesByDate = (date) => {
  return axios.get(`${BASE_URL}/main`, {
    params: { date }, // 예: '2025-06-11'
    withCredentials: true,
  });
};

export const finishRoutine = ({ checked, unchecked }) => {
  return axios.post(`${BASE_URL}/finish`, {
    checked,
    unchecked,
  });
};
