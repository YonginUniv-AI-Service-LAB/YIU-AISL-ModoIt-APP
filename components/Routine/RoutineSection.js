import React from 'react';
import { View, Text } from 'react-native';
import RoutineItem from './RoutineItem';
import styles from './RoutineSection.styles';

export default function RoutineSection({ title, data, onToggle, onPressItem }) {
  if (data.length === 0) return null;

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionHeader}>{title}</Text>
      {data.map((item) => (
        <RoutineItem
          key={item.id}
          item={item}
          onToggle={onToggle}
          onPressItem={() => onPressItem(item)} // ← 추가
        />
      ))}
    </View>
  );
}
