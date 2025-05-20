import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './BottomTabBar.styles'; // 스타일 분리

// 하단 탭에 표시될 항목 목록 정의
const tabs = [
  { label: '나의 루틴', key: 'routine' },    // 메인 페이지
  { label: '피드백 카드', key: 'feedback' }, // TODO: 피드백 카드 화면 구현 예정
  { label: '맛보기', key: 'sample' },        // TODO: 맛보기 루틴 화면 구현 예정
];

// 하단 탭바 컴포넌트
export default function BottomTabBar({ currentTab, onTabPress }) {
  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = currentTab === tab.key;

        return (
          <TouchableOpacity
            key={tab.key}
            style={styles.tabItem}
            onPress={() => onTabPress(tab.key)} // 탭 클릭 시 상위 상태 변경 요청
          >
            <View
              style={[
                styles.circle,
                { backgroundColor: isActive ? '#7A73FF' : '#ABABAB' }, // 선택된 탭만 보라색
              ]}
            />
            <Text
              style={[
                styles.label,
                { color: isActive ? '#7A73FF' : '#ABABAB' }, // 텍스트 색상도 선택 여부에 따라 변경
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
