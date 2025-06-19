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
import { useRoute } from '@react-navigation/native';

export default function MainPage({ navigation }) {
  const [selectedTab, setSelectedTab] = useState('routine');
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [hour, setHour] = useState('07');
  const [minute, setMinute] = useState('30');
  const [routineText, setRoutineText] = useState('');
  const [routines, setRoutines] = useState([]);
  const [selectedRoutine, setSelectedRoutine] = useState(null);
  const route = useRoute();

  // "HH:mm" → 분 환산
  const toMins = (timeStr) => {
    if (!timeStr || !timeStr.includes(':')) return 0;
    const [h, m] = timeStr.split(':').map((n) => parseInt(n, 10));
    return h * 60 + m;
  };

  // ─ 루틴 추가 ─────────────────────────────────────────────────────────
  const handleAddRoutine = async () => {
    const hh = hour.padStart(2, '0');
    const mm = minute.padStart(2, '0');
    const newRoutine = {
      timeSlot: `${hh}:${mm}`,
      content: routineText.trim() || '제목 없음',
    };

    try {
      const res = await addRoutine(newRoutine);
      const newItem = {
        id: res.data.id.toString(),
        time: newRoutine.timeSlot,
        title: newRoutine.content,
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

  // ─ 루틴 수정 저장 ───────────────────────────────────────────────────
  const handleSaveEdited = async (updated) => {
    try {
      await editRoutine({
        id: updated.id,
        timeSlot: updated.time,
        content: updated.title,
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

  // ─ 체크 토글 ─────────────────────────────────────────────────────────
  const toggleCheck = async (id) => {
    setRoutines((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
    const target = routines.find((i) => i.id === id);
    if (!target) return;
    try {
      await checkRoutine({ routineId: id, checked: !target.checked });
    } catch (error) {
      console.error('체크 업데이트 실패:', error);
    }
  };

  // ─ 날짜별 루틴 불러오기 ───────────────────────────────────────────────
  useEffect(() => {
    const fetchRoutines = async () => {
      try {
        const todayStr = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
        const res = await getRoutinesByDate(todayStr);
        const mapped = res.data.map((item) => {
          const rawTime = item.timeSlot ?? item.time_slot;
          const time =
            typeof rawTime === 'string' && rawTime.length >= 5
              ? rawTime.substring(0, 5)
              : '00:00';
          return {
            id: item.id.toString(),
            time,
            title: item.content,
            checked: !!item.isCompleted,
          };
        });
        setRoutines(mapped);
      } catch (error) {
        console.error('루틴 불러오기 실패:', error);
      }
    };
    fetchRoutines();
  }, []);

  // ─ 추천 프리셋 합치기 ────────────────────────────────────────────────
  useEffect(() => {
    const passed = route.params?.routines || [];
    if (passed.length) {
      const preset = passed.map((item, idx) => {
        const rawTime = item.time_slot ?? item.timeSlot;
        const time =
          typeof rawTime === 'string' && rawTime.length >= 5
            ? rawTime.substring(0, 5)
            : '00:00';
        return {
          id: `preset-${item.id ?? idx}`,
          time,
          title: item.content ?? '제목 없음',
          checked: false,
        };
      });
      setRoutines((prev) => [...preset, ...prev]);
    }
  }, [route.params]);

  // ─ 주간 헤더용 날짜 계산 ─────────────────────────────────────────────
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const getStartOfWeek = (d) => {
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    const start = new Date(d);
    start.setDate(diff);
    return start;
  };
  const baseDate = getStartOfWeek(today);
  const dateList = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(baseDate);
    d.setDate(d.getDate() + i);
    return d;
  });
  const currentMonth = today.getMonth() + 1;

  // ─ 시간대별 그룹핑 ──────────────────────────────────────────────────
  const grouped = { morning: [], lunch: [], evening: [] };
  routines.forEach((item) => {
    const mins = toMins(item.time);
    if (mins <= 720) grouped.morning.push(item);
    else if (mins <= 960) grouped.lunch.push(item);
    else grouped.evening.push(item);
  });

  // ─ 루틴 상세 조회 (편집) ─────────────────────────────────────────────
  const onPressRoutine = async (item) => {
    try {
      const res = await getRoutineDetail(item.id);
      const raw = res.data.timeSlot ?? '';
      const time =
        typeof raw === 'string' && raw.length >= 5
          ? raw.substring(0, 5)
          : '00:00';
      setSelectedRoutine({
        id: res.data.id.toString(),
        time,
        title: res.data.content,
      });
      setEditModalVisible(true);
    } catch (error) {
      console.error('상세 조회 실패:', error);
    }
  };

  // ─ 렌더링 ───────────────────────────────────────────────────────────
  const renderRoutineTab = () => (
    <View style={styles.routineWrapper}>
      <WhiteRoundedContainer style={styles.whiteContainer}>
        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
          <RoutineSection
            title="아침"
            data={grouped.morning}
            onToggle={toggleCheck}
            onPressItem={onPressRoutine}
          />
          <RoutineSection
            title="점심"
            data={grouped.lunch}
            onToggle={toggleCheck}
            onPressItem={onPressRoutine}
          />
          <RoutineSection
            title="저녁"
            data={grouped.evening}
            onToggle={toggleCheck}
            onPressItem={onPressRoutine}
          />
          <TouchableOpacity
            style={styles.endButton}
            onPress={() => {
              const unchecked = routines.filter((i) => !i.checked);
              const checked = routines.filter((i) => i.checked);
              navigation.navigate('FeedbackCard', { unchecked, checked });
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
    if (selectedTab === 'routine') return renderRoutineTab();
    if (selectedTab === 'feedback')
      return renderEmpty('💬 피드백 카드 (준비 중)');
    if (selectedTab === 'sample')
      return renderEmpty('🍕 맛보기 루틴 (준비 중)');
    return null;
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
