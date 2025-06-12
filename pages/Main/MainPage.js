// MainPage.js
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import styles from './MainPage.styles';
import WeeklyHeader from '../../components/WeeklyHeader/WeeklyHeader';
import WhiteRoundedContainer from '../../components/common/WhiteRoundedContainer';
import FloatingActionButton from '../../components/FloatingActionButton/FloatingActionButton';
import BottomTabBar from '../../components/common/BottomTabBar';
import AddRoutineModal from '../../components/Modal/AddRoutineModal';
import EditRoutineModal from '../../components/Modal/EditRoutineModal';
import RoutineSection from '../../components/Routine/RoutineSection';
import {
  addRoutine,
  checkRoutine,
  getRoutineDetail,
  editRoutine,
  getRoutinesByDate,
} from '../../api/authApi';

export default function MainPage({ navigation }) {
  const [selectedTab, setSelectedTab] = useState('routine');
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [hour, setHour] = useState('07');
  const [minute, setMinute] = useState('30');
  const [routineText, setRoutineText] = useState('');
  const [routines, setRoutines] = useState([]);
  const [selectedRoutine, setSelectedRoutine] = useState(null);

  const toMins = (timeStr) => {
    if (!timeStr || !timeStr.includes(':')) return 0;
    const [h, m] = timeStr.split(':').map((n) => parseInt(n, 10));
    return h * 60 + m;
  };

  const handleAddRoutine = async () => {
    const hh = hour.padStart(2, '0');
    const mm = minute.padStart(2, '0');
    const newRoutine = {
      timeSlot: `${hh}:${mm}`,
      content: routineText.trim() || '제목 없음',
    };

    try {
      await addRoutine(newRoutine); // API 호출

      // 로컬에도 반영
      const newItem = {
        id: Date.now().toString(),
        ...newRoutine,
        checked: false,
      };

      setRoutines((prev) =>
        [...prev, newItem].sort((a, b) => toMins(a.time) - toMins(b.time))
      );
      setHour('07');
      setMinute('30');
      setRoutineText('');
      setAddModalVisible(false);
    } catch (error) {
      console.error('루틴 추가 실패:', error);
    }
  };

  const handleSaveEdited = async (updated) => {
    try {
      await editRoutine({
        id: updated.id,
        time: updated.time,
        title: updated.title,
      });

      setRoutines((prev) =>
        prev.map((item) => (item.id === updated.id ? updated : item))
      );
    } catch (error) {
      console.error('루틴 수정 실패:', error);
    } finally {
      setSelectedRoutine(null);
      setEditModalVisible(false);
    }
  };

  const toggleCheck = async (id) => {
    setRoutines((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
    // 해당 루틴을 찾아서 현재 체크 상태 확인
    const routineToUpdate = routines.find((item) => item.id === id);
    if (!routineToUpdate) return;

    try {
      await checkRoutine({
        routineId: id,
        checked: !routineToUpdate.checked,
      });
    } catch (error) {
      console.error('루틴 체크 업데이트 실패:', error);
    }
  };

  // 날짜 및 주간 헤더 준비
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const getStartOfWeek = (date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    d.setDate(diff);
    return d;
  };
  const baseDate = getStartOfWeek(today);
  const dateList = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(baseDate);
    d.setDate(d.getDate() + i);
    return d;
  });
  const currentMonth = today.getMonth() + 1;

  // 시간별 그룹핑
  const grouped = { morning: [], lunch: [], evening: [] };
  routines.forEach((item) => {
    const m = toMins(item.time);
    if (m <= 12 * 60) grouped.morning.push(item);
    else if (m <= 16 * 60) grouped.lunch.push(item);
    else grouped.evening.push(item);
  });

  const onPressRoutine = async (item) => {
    try {
      const res = await getRoutineDetail(item.id);
      const { id, time, title } = res.data;

      setSelectedRoutine({ id, time, title }); // 서버로부터 받은 데이터로 초기화
      setEditModalVisible(true);
    } catch (error) {
      console.error('루틴 상세 조회 실패:', error);
    }
  };

  useEffect(() => {
    const fetchRoutines = async () => {
      try {
        const todayStr = today.toISOString().split('T')[0]; // 예: '2025-06-11'
        const res = await getRoutinesByDate(todayStr);
        setRoutines(res.data);
      } catch (error) {
        console.error('루틴 불러오기 실패:', error);
      }
    };

    fetchRoutines();
  }, []);

  const renderRoutineTab = () => (
    <View style={styles.routineWrapper}>
      <WhiteRoundedContainer style={styles.whiteContainer}>
        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
          <RoutineSection
            title="아침"
            data={grouped.morning}
            onToggle={toggleCheck}
            onPressItem={onPressRoutine}
            onPress={onPressRoutine}
          />
          <RoutineSection
            title="점심"
            data={grouped.lunch}
            onToggle={toggleCheck}
            onPressItem={onPressRoutine}
            onPress={onPressRoutine}
          />
          <RoutineSection
            title="저녁"
            data={grouped.evening}
            onToggle={toggleCheck}
            onPressItem={onPressRoutine}
            onPress={onPressRoutine}
          />
          <TouchableOpacity
            style={styles.endButton}
            onPress={async () => {
              // 수정된 부분: 체크되지 않은 루틴만 필터링하여 첫 번째 피드백 화면으로 전달
              const unchecked = routines.filter((item) => !item.checked);
              const checked = routines.filter((item) => item.checked);

              try {
                await finishRoutine({
                  checked: checked.map((item) => item.id),
                  unchecked: unchecked.map((item) => item.id),
                });
              } catch (error) {
                console.error('루틴 끝내기 실패:', error);
              }

              navigation.navigate('FeedbackCard', { unchecked, checked });
              /* 기존 코드
              navigation.navigate('FeedbackCard');
              */
            }}
          >
            <Text style={styles.endButtonText}>끝내기</Text>
          </TouchableOpacity>
        </ScrollView>
      </WhiteRoundedContainer>
    </View>
  );

  const renderEmpty = (text) => (
    <WhiteRoundedContainer style={styles.emptyContainer}>
      <Text style={styles.pageText}>{text}</Text>
    </WhiteRoundedContainer>
  );

  const renderContent = () => {
    switch (selectedTab) {
      case 'routine':
        return renderRoutineTab();
      case 'feedback':
        return renderEmpty('💬 피드백 카드 (준비 중)');
      case 'sample':
        return renderEmpty('🍕 맛보기 루틴 (준비 중)');
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <WeeklyHeader
        dateList={dateList}
        currentMonth={currentMonth}
        today={today}
      />
      {renderContent()}
      <AddRoutineModal
        visible={addModalVisible}
        onClose={() => setAddModalVisible(false)}
        hour={hour}
        minute={minute}
        setHour={setHour}
        setMinute={setMinute}
        routine={routineText}
        setRoutine={setRoutineText}
        onAdd={handleAddRoutine}
      />

      {/* 편집 모달 */}
      <EditRoutineModal
        visible={editModalVisible}
        routineItem={selectedRoutine}
        onSave={handleSaveEdited}
        onClose={() => {
          setEditModalVisible(false);
          setSelectedRoutine(null);
        }}
      />
      <FloatingActionButton onPress={() => setAddModalVisible(true)} />
      {/* 하단 탭 */}
      <BottomTabBar
        currentTab="routine"
        onTabPress={(tab) => {
          if (tab === 'sample') navigation.navigate('SampleRoutine');
          else if (tab === 'feedback') navigation.navigate('FeedbackCalendar');
        }}
      />
    </View>
  );
}
