// routineApi.js
import axios from 'axios';
import { format } from 'date-fns';

axios.defaults.withCredentials = true;

const BASE_URL = 'http://192.168.0.7:8080';
//const BASE_URL = 'http://192.168.123.113:8080 // 유진 집

// 날짜별 루틴 조회
export const fetchRoutinesByDate = async (date) => {
  return axios.get(`${BASE_URL}/main`, {
    params: { date: format(date, 'yyyy-MM-dd') },
    withCredentials: true,
  });
};
