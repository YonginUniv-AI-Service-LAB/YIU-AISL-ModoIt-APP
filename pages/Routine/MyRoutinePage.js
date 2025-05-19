import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import styles from './MyRoutinePage.styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import dayjs from 'dayjs';

const daysOfWeek = ['월', '화', '수', '목', '금', '토', '일'];

// 이번 주 월요일부터 일요일까지 날짜 생성
const generateWeekDates = () => {
  const startOfWeek = dayjs().startOf('week').add(1, 'day'); // 일요일이 0이므로 +1
  return Array(7)
    .fill(0)
    .map((_, i) => startOfWeek.add(i, 'day').date());
};

export default function MyRoutinePage({ navigation }) {
  // 1) 날짜 상태
  const [dates, setDates] = useState(generateWeekDates());

  // 2) 루틴 상태 (섹션별)
  const [routines, setRoutines] = useState({
    morning: [
      { time: '7:00', title: '기상', done: true },
      { time: '7:00', title: '뭐할지', done: false },
    ],
    lunch: [{ time: '12:00', title: '점심 루틴1', done: false }],
    evening: [{ time: '18:00', title: '저녁 루틴1', done: false }],
  });

  // 3) 매주 첫날(월요일) 새벽에 한 번만 날짜 재생성
  useEffect(() => {
    const now = dayjs();
    const nextMonday = dayjs()
      .startOf('week')
      .add(8, 'day') // 다음 주 월요일
      .hour(0)
      .minute(0)
      .second(0);
    const msUntilNextMonday = nextMonday.diff(now);
    const timer = setTimeout(() => {
      setDates(generateWeekDates());
      // 재귀 호출로 그 다음 주도 예약
      // (간단히 다시 이 effect가 동작하도록 페이지를 리마운트하거나,
      //  아래처럼 재설정하셔도 됩니다)
    }, msUntilNextMonday);
    return () => clearTimeout(timer);
  }, [dates]);

  // 4) 루틴 추가 핸들러
  const addRoutine = (section) => {
    setRoutines((prev) => ({
      ...prev,
      [section]: [
        ...prev[section],
        { time: '00:00', title: '새 루틴', done: false },
      ],
    }));
  };

  // 루틴 아이템 컴포넌트
  const RoutineItem = ({ time, title, done }) => (
    <View /* style={styles.routineRow} */>
      <Text>{time}</Text>
      <Text numberOfLines={1}>{title}</Text>
      <TouchableOpacity>
        {done ? (
          <Ionicons name="checkmark-circle" size={24} />
        ) : (
          <Ionicons name="ellipse-outline" size={24} />
        )}
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView /* style={styles.container} */>
      {/* ── 헤더 & 달력 ── */}
      <View /* style={styles.header} */>
        <Text>5월</Text>
      </View>
      <View /* style={styles.calendarStrip} */>
        <View /* style={styles.weekDays} */>
          {daysOfWeek.map((d, i) => (
            <Text key={i}>{d}</Text>
          ))}
        </View>
        <View /* style={styles.dates} */>
          {dates.map((d, i) => (
            <TouchableOpacity key={i}>
              <Text>{d}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* ── 탭바 + 스크롤 영역 ── */}
      <ScrollView /* style={styles.scroll} */>
        {/* (스크롤 내리면 이 영역 아래로 탭바가 따라오지 않고, 
             탭바 아래에 컨텐츠가 계속 이어집니다.) */}

        {/* 탭바 */}
        <View /* style={styles.tabBar} */>
          <TouchableOpacity /* style={styles.tabItem} */>
            <Ionicons name="list" size={24} />
            <Text>나의 루틴</Text>
          </TouchableOpacity>
          <TouchableOpacity /* style={styles.tabItem} */>
            <Ionicons name="chatbubbles" size={24} />
            <Text>피드백 카드</Text>
          </TouchableOpacity>
          <TouchableOpacity /* style={styles.tabItem} */>
            <Ionicons name="star" size={24} />
            <Text>맛보기</Text>
          </TouchableOpacity>
        </View>

        {/* 탭별 컨텐츠 예시: “나의 루틴” */}
        <View /* style={styles.section} */>
          <Text>아침</Text>
          {routines.morning.map((item, i) => (
            <RoutineItem key={i} {...item} />
          ))}
          <TouchableOpacity onPress={() => addRoutine('morning')}>
            <Ionicons name="add-circle-outline" size={28} />
          </TouchableOpacity>
        </View>

        <View /* style={styles.section} */>
          <Text>점심</Text>
          {routines.lunch.map((item, i) => (
            <RoutineItem key={i} {...item} />
          ))}
          <TouchableOpacity onPress={() => addRoutine('lunch')}>
            <Ionicons name="add-circle-outline" size={28} />
          </TouchableOpacity>
        </View>

        <View /* style={styles.section} */>
          <Text>저녁</Text>
          {routines.evening.map((item, i) => (
            <RoutineItem key={i} {...item} />
          ))}
          <TouchableOpacity onPress={() => addRoutine('evening')}>
            <Ionicons name="add-circle-outline" size={28} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
