import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './RoutineItem.styles';

export default function RoutineItem({ item, onToggle, onPressItem }) {
  return (
    <View style={styles.itemRow}>
      {/* 터치하면 편집 모달 열기 */}
      <TouchableOpacity
        style={styles.routineBox}
        activeOpacity={0.7}
        onPress={onPressItem} // ← 추가
      >
        <View style={styles.itemTextContainer}>
          <Text style={styles.itemTime}>{item.time}</Text>
          <Text style={styles.itemTitle}>{item.title}</Text>
        </View>
      </TouchableOpacity>

      {/* 체크박스 */}
      <TouchableOpacity onPress={() => onToggle(item.id)}>
        <View
          style={[styles.itemCircle, item.checked && styles.itemCircleChecked]}
        />
      </TouchableOpacity>
    </View>
  );
}
