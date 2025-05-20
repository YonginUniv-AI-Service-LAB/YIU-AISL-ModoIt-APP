import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styles from './MainPage.styles';
import WeeklyHeader from '../../components/WeeklyHeader/WeeklyHeader';
import WhiteRoundedContainer from '../../components/common/WhiteRoundedContainer';
import FloatingActionButton from '../../components/FloatingActionButton/FloatingActionButton';
import BottomTabBar from '../../components/common/BottomTabBar';

export default function MainPage() {
  const [selectedTab, setSelectedTab] = useState('routine');

  // 오늘 날짜 기준
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // 오늘이 포함된 주의 월요일 계산
  const getStartOfWeek = (date) => {
    const d = new Date(date);
    const day = d.getDay(); // 0 = 일
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // 월요일 기준
    d.setDate(diff);
    d.setHours(0, 0, 0, 0);
    return d;
  };

  const baseDate = getStartOfWeek(today);

  // 월요일부터 7일 생성
  const dateList = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(baseDate);
    d.setDate(d.getDate() + i);
    return d;
  });

  const currentMonth = baseDate.getMonth() + 1;

  const renderContent = () => {
    switch (selectedTab) {
      case 'routine':
        return <Text style={styles.pageText}>🏠 나의 루틴 (메인 페이지)</Text>;
      case 'feedback':
        return <Text style={styles.pageText}>💬 피드백 카드 (준비 중)</Text>;
      case 'sample':
        return <Text style={styles.pageText}>🍕 맛보기 루틴 (준비 중)</Text>;
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

      <WhiteRoundedContainer>
        {renderContent()}
      </WhiteRoundedContainer>

      <FloatingActionButton onPress={() => console.log('플로팅 버튼 클릭됨')} />
      <BottomTabBar currentTab={selectedTab} onTabPress={setSelectedTab} />
    </View>
  );
}