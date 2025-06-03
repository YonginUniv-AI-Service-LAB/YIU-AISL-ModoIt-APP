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
    const [h, m] = timeStr.split(':').map((n) => parseInt(n, 10));
    return h * 60 + m;
  };

  const handleAddRoutine = () => {
    const hh = hour.padStart(2, '0');
    const mm = minute.padStart(2, '0');
    const newItem = {
      id: Date.now().toString(),
      time: `${hh}:${mm}`,
      title: routineText.trim() || '제목 없음',
      checked: false,
    };
    setRoutines((prev) =>
      [...prev, newItem].sort((a, b) => toMins(a.time) - toMins(b.time))
    );
    setHour('07');
    setMinute('30');
    setRoutineText('');
    setAddModalVisible(false);
  };

  const handleSaveEdited = (updated) => {
    setRoutines((prev) =>
      prev.map((item) => (item.id === updated.id ? updated : item))
    );
    setSelectedRoutine(null);
    setEditModalVisible(false);
  };

  const toggleCheck = (id) => {
    setRoutines((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
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

  const onPressRoutine = (item) => {
    setSelectedRoutine(item);
    setEditModalVisible(true);
  };

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
            onPress={() => {
              // 수정된 부분: 체크되지 않은 루틴만 필터링하여 첫 번째 피드백 화면으로 전달
              const unchecked = routines.filter((item) => !item.checked);
              const checked = routines.filter((item) => item.checked);
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

      <BottomTabBar
        currentTab="routine"
        onTabPress={(tab) => {
          if (tab === 'feedback') navigation.navigate('FeedbackCalendar');
          else if (tab === 'sample') navigation.navigate('SampleRoutine');
        }}
      />
    </View>
  );
}
