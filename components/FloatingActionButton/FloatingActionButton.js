import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from './FloatingActionButton.styles';

// 플로팅 액션 버튼 (+)
// TODO: 이후 onPress에 루틴 추가 기능 연결 예정
export default function FloatingActionButton({ onPress }) {
  return (
    <TouchableOpacity style={styles.fab} onPress={onPress}>
      <Text style={styles.fabText}>＋</Text>
    </TouchableOpacity>
  );
}
