import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import styles from './RoutineDeletePage.styles';
import NextButton from '../../components/Button/FinishButton';

const { width, height } = Dimensions.get('window');

export default function RoutineDeletePage({ navigation, route }) {
  const { unchecked = [], checked = [], selected = [] } = route.params || {};

  // 문자열 배열/string → {id, time, title} 변환
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
  const [openState, setOpenState] = useState({});
  const [selectedItems, setSelectedItems] = useState(new Set()); // 선택된 아이템들을 관리

  useEffect(() => {
    // MainPage에서 넘긴 두 그룹을 합쳐서 렌더링
    const normalizedItems = normalize([...unchecked, ...checked, ...selected]);
    setItems(normalizedItems);
    setOpenState({});
    // 첫 번째 아이템을 기본으로 선택
    if (normalizedItems.length > 0) {
      setSelectedItems(new Set([normalizedItems[0].id]));
    }
  }, [unchecked, checked]);

  const toMins = (t) => {
    const [h, m] = (t || '').split(':').map((n) => parseInt(n, 10) || 0);
    return h * 60 + m;
  };

  // 시간대별 그룹핑
  const grouped = { morning: [], lunch: [], evening: [] };
  items.forEach((it) => {
    const mins = toMins(it.time);
    if (mins <= 12 * 60) grouped.morning.push(it);
    else if (mins <= 16 * 60) grouped.lunch.push(it);
    else grouped.evening.push(it);
  });

  const toggle = (id) => setOpenState((prev) => ({ ...prev, [id]: !prev[id] }));
  const remove = (id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
    setSelectedItems((prev) => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  };

  // 아이템 선택/해제 토글
  const toggleSelection = (id) => {
    setSelectedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const Item = ({ item }) => {
    const isOpen = !!openState[item.id];
    const isSelected = selectedItems.has(item.id);

    return (
      <View style={styles.swipeContainer}>
        <TouchableOpacity
          style={[
            styles.routineBox,
            isSelected && styles.routineBoxSelected,
            isSelected && styles.routineBoxSwiped, // 선택되면 자동으로 스와이프
          ]}
          onPress={() => toggleSelection(item.id)}
          activeOpacity={0.7}
        >
          <View style={styles.itemTextContainer}>
            {!!item.time && (
              <Text
                style={[styles.itemTime, isSelected && styles.itemTimeSelected]}
              >
                {item.time}
              </Text>
            )}
            <Text
              style={[styles.itemTitle, isSelected && styles.itemTitleSelected]}
            >
              {item.title}
            </Text>
          </View>
        </TouchableOpacity>
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
              <NextButton onPress={() => navigation.popToTop()}>
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
