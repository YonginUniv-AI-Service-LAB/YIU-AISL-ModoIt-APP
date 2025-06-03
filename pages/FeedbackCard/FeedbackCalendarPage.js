// FeedbackCalendarPage.js
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import styles from './FeedbackCalendarPage.styles';
import BottomTabBar from '../../components/common/BottomTabBar';
import FeedbackModal from '../../components/Modal/FeedbackModal';
import CircularProgressWithIcon from '../../components/Graph/CircularProgressWithIcon';

export default function FeedbackCalendarPage({ navigation }) {
  // ─── 1. 오늘(today) 정보 ───
  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth();
  const todayDate = today.getDate();

  // ─── 2. 캘린더 관련 state ───
  const [currentDate, setCurrentDate] = useState(
    new Date(todayYear, todayMonth, 1)
  );
  const [selectedDay, setSelectedDay] = useState(todayDate);

  // ─── 3. 모달 가시성 state ───
  const [modalVisible, setModalVisible] = useState(false);

  // ─── 4. 하단 탭바 현재 탭 ───
  const currentTab = 'feedback';

  // ─── 5. 한글 월 배열 ───
  const monthNames = [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ];

  // ─── 6. 해당 월 말일 반환 ───
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // ─── 7. 달력 데이터 생성 ───
  const generateCalendarArray = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstOfMonth = new Date(year, month, 1);
    const firstDayIndex = firstOfMonth.getDay(); // 0=일,1=월,…,6=토

    // “월요일부터 시작” 보정
    const blankCount = (firstDayIndex + 6) % 7;
    const prevYear = month === 0 ? year - 1 : year;
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevMonthLastDate = getDaysInMonth(prevYear, prevMonth);
    const thisMonthLastDate = getDaysInMonth(year, month);

    const arr = [];
    // [1] 이전 달 날짜 채우기
    for (let i = 0; i < blankCount; i++) {
      const d = prevMonthLastDate - blankCount + 1 + i;
      arr.push({ day: d, current: false });
    }
    // [2] 이번 달 날짜 채우기
    for (let d = 1; d <= thisMonthLastDate; d++) {
      arr.push({ day: d, current: true });
    }
    return arr;
  };

  // ─── 8. 이전/다음 달 버튼 ───
  const onPrevMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    setCurrentDate(new Date(year, month - 1, 1));
    setSelectedDay(null);
  };
  const onNextMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    setCurrentDate(new Date(year, month + 1, 1));
    setSelectedDay(null);
  };

  // ─── 9. 날짜 선택 ───
  const onSelectDay = (day) => {
    setSelectedDay(day);
  };

  // ─── 10. “오늘이 속한 달인지” 검사 ───
  useEffect(() => {
    const viewYear = currentDate.getFullYear();
    const viewMonth = currentDate.getMonth();
    if (viewYear === todayYear && viewMonth === todayMonth) {
      setSelectedDay(todayDate);
    } else {
      setSelectedDay(null);
    }
  }, [currentDate, todayYear, todayMonth, todayDate]);

  // ─── 11. 달력 배열 생성 & 주 단위 분할 ───
  const calendarArray = generateCalendarArray();
  const weeks = [];
  for (let i = 0; i < calendarArray.length; i += 7) {
    weeks.push(calendarArray.slice(i, i + 7));
  }

  // ─── 12. 탭바 클릭 시 네비게이션 ───
  const handleTabPress = (tabKey) => {
    if (tabKey === 'feedback') return;
    if (tabKey === 'routine') navigation.navigate('Main');
    else if (tabKey === 'sample') navigation.navigate('SampleRoutine');
  };

  // ─── 13. 퍼센트 상태 (예시로 100%) ───
  const [progress, setProgress] = useState(100);

  // ─── 14. 선택된 날짜(YYYY-MM-DD)를 “YY.MM.DD” 형식으로 포맷 ───
  // selectedDay가 null이면 빈 문자열이 출력됩니다.
  const formatSelectedDate = () => {
    if (!selectedDay) return '';
    const y = currentDate.getFullYear() % 100; // ex) 2025 → 25
    const m = currentDate.getMonth() + 1; // 0~11 → 1~12
    const d = selectedDay; // 1~31
    // 두 자리 숫자 맞춤
    const yy = String(y).padStart(2, '0');
    const mm = String(m).padStart(2, '0');
    const dd = String(d).padStart(2, '0');
    return `${yy}.${mm}.${dd}`; // ex) "25.06.07"
  };

  return (
    <View style={styles.container}>
      {/* ───── Header (◀ 6월 ▶) ───── */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onPrevMonth}>
          <Text style={styles.navArrowText}>{'< '} </Text>
        </TouchableOpacity>
        <Text style={styles.monthText}>
          {monthNames[currentDate.getMonth()]}
        </Text>
        <TouchableOpacity onPress={onNextMonth}>
          <Text style={styles.navArrowText}>{' >'}</Text>
        </TouchableOpacity>
      </View>

      {/* ───── 요일 레이블 ───── */}
      <View style={styles.weekdayContainer}>
        {['월', '화', '수', '목', '금', '토', '일'].map((wd) => (
          <Text key={wd} style={styles.weekdayText}>
            {wd}
          </Text>
        ))}
      </View>

      {/* ───── 날짜 그리드 ───── */}
      <View style={styles.calendarContainer}>
        {weeks.map((week, wIdx) => (
          <View key={wIdx} style={styles.weekRow}>
            {week.map((cell, idx) => {
              const { day, current } = cell;
              return (
                <TouchableOpacity
                  key={idx}
                  style={[
                    styles.dayContainer,
                    current && day === selectedDay
                      ? styles.selectedDayContainer
                      : null,
                  ]}
                  onPress={() => current && onSelectDay(day)}
                  disabled={!current}
                >
                  <Text
                    style={[
                      styles.dayText,
                      current && day === selectedDay
                        ? styles.selectedDayText
                        : null,
                      !current ? { color: '#C0C0C0' } : null,
                    ]}
                  >
                    {day}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </View>

      {/* ───── Feedback 카드 ───── */}
      <View style={styles.feedbackCard}>
        {/* 피드백 타이틀 (가운데 정렬) + '>' 버튼 */}
        <View style={styles.titleRow}>
          <Text style={styles.feedbackTitle}>이대로만 하면 돼요!</Text>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text style={styles.arrowIcon}>{'>'}</Text>
          </TouchableOpacity>
        </View>

        {/* CircularProgressWithIcon 컴포넌트 */}
        <View style={styles.centered}>
          <CircularProgressWithIcon
            progress={progress}
            // 실제 아이콘 경로를 프로젝트 구조에 맞게 수정하세요.
            iconSource={require('../../assets/images/emotion_happy.png')}
          />
        </View>
      </View>

      {/* ───── Feedback Modal ───── */}
      <FeedbackModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        // ▶ 여기에 formatSelectedDate()를 계산하여 prop으로 전달
        selectedDate={formatSelectedDate()}
      />

      {/* ───── 하단 탭바 ───── */}
      <BottomTabBar currentTab={currentTab} onTabPress={handleTabPress} />
    </View>
  );
}
