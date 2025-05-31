// RoutineDeletePage.js

import React, { useState, useEffect, useRef } from 'react';
import {
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  View,
} from 'react-native';
import {
  Swipeable,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import styles from './RoutineDeletePage.styles';
import NextButton from '../../components/Button/FinishButton';

const { width, height } = Dimensions.get('window');

export default function RoutineDeletePage({ navigation, route }) {
  const { unchecked = [], checked = [], selected = [] } = route.params || {};

  // 문자열 배열(string) → { id, time, title } 형식으로 변환
  const normalize = (list) =>
    list.map((it, idx) => {
      if (typeof it === 'string') {
        return { id: `opt-${idx}`, time: '', title: it };
      }
      return {
        id: it.id?.toString() ?? `${idx}`,
        time: it.time ?? '',
        title: it.title ?? '',
      };
    });

  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState(new Set()); // 선택된 아이템 관리

  useEffect(() => {
    // MainPage에서 넘어온 두 그룹을 합쳐서 렌더링
    const normalizedItems = normalize([...unchecked, ...checked, ...selected]);
    setItems(normalizedItems);
    setSelectedItems(new Set());
  }, [unchecked, checked, selected]);

  const toMins = (t) => {
    const [h, m] = (t || '').split(':').map((n) => parseInt(n, 10) || 0);
    return h * 60 + m;
  };

  // 시간대별 그룹핑 (아침, 점심, 저녁)
  const grouped = { morning: [], lunch: [], evening: [] };
  items.forEach((it) => {
    const mins = toMins(it.time);
    if (mins <= 12 * 60) grouped.morning.push(it);
    else if (mins <= 16 * 60) grouped.lunch.push(it);
    else grouped.evening.push(it);
  });

  // 선택 토글 함수
  const toggleSelection = (id) => {
    setSelectedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return newSet;
    });
  };

  // 삭제 함수
  const remove = (id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
    setSelectedItems((prev) => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  };

  // 각 루틴 아이템 컴포넌트
  const Item = ({ item }) => {
    const isSelected = selectedItems.has(item.id);

    // Swipeable ref: 문턱 넘었을 때 상태 업데이트용
    const swipeableRef = useRef(null);

    return (
      <View style={styles.swipeContainer}>
        <GestureHandlerRootView
          style={{ flex: 1, backgroundColor: 'transparent' }}
        >
          <Swipeable
            ref={swipeableRef}
            friction={2}
            // 왼쪽으로 당겨 문턱(threshold)을 넘어 “열릴 준비” 단계에 진입했을 때
            onSwipeableRightWillOpen={() => {
              if (!isSelected) {
                toggleSelection(item.id);
              }
            }}
            // 오른쪽으로 당겨 문턱을 넘어 “열릴 준비” 단계에 진입했을 때
            onSwipeableLeftWillOpen={() => {
              if (isSelected) {
                toggleSelection(item.id);
              }
            }}
            // 액션을 실제로 보여주는 영역(너비 만큼만 두고, 추가 아이콘 같은 내용은 없음)
            renderRightActions={() => <View style={{ width: width * 0.15 }} />}
            renderLeftActions={() => <View style={{ width: width * 0.15 }} />}
            // 사용자가 손을 떼면 자동으로 닫아 줌(원래 위치로 복귀)
            onSwipeableOpen={() => {
              swipeableRef.current?.close();
            }}
          >
            {/* 터치로는 선택되지 않도록 View로 감쌈 */}
            <View
              style={[
                styles.routineBox,
                isSelected && styles.routineBoxSelected,
              ]}
            >
              <View style={styles.itemTextContainer}>
                {!!item.time && (
                  <Text
                    style={[
                      styles.itemTime,
                      isSelected && styles.itemTimeSelected,
                    ]}
                  >
                    {item.time}
                  </Text>
                )}
                <Text
                  style={[
                    styles.itemTitle,
                    isSelected && styles.itemTitleSelected,
                  ]}
                >
                  {item.title}
                </Text>
              </View>
            </View>
          </Swipeable>
        </GestureHandlerRootView>

        {/* 선택된 상태일 때만 삭제 버튼 노출 */}
        {isSelected && (
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => remove(item.id)}
            activeOpacity={0.7}
          >
            <Text style={styles.deleteButtonText}>–</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const renderSection = (label, data) =>
    data.length > 0 && (
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>{label}</Text>
        <View style={styles.sectionContainer}>
          {data.map((it) => (
            <Item key={it.id} item={it} />
          ))}
        </View>
      </View>
    );

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>루틴 조정</Text>
      <View style={styles.whiteContainer}>
        {items.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>삭제할 루틴이 없습니다.</Text>
          </View>
        ) : (
          <ScrollView contentContainerStyle={styles.scrollContent}>
            {renderSection('아침', grouped.morning)}
            {renderSection('점심', grouped.lunch)}
            {renderSection('저녁', grouped.evening)}
            <View style={styles.endButtonWrapper}>
              <NextButton onPress={() => navigation.navigate('MainPage')}>
                <Text style={styles.endButtonText}>완료</Text>
              </NextButton>
            </View>
          </ScrollView>
        )}
      </View>
    </View>
  );
}

const localStyles = StyleSheet.create({
  progressWrapper: {
    marginTop: -height * 0.125, // 약 -105px → 844 기준
    marginBottom: height * 0.018, // 약 15px
  },
});
