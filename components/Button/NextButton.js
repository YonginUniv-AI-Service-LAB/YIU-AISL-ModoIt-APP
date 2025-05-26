import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const px = (value) => (width / 390) * value;

export default function NextButton({ onPress }) {
  return (
    <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={onPress}>
      <Text style={styles.text}>다음</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: px(300),
    height: px(50),
    backgroundColor: '#7A73FF',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center', // 가운데 정렬
    marginTop: px(24),   // 필요시 여백 조정
  },
  text: {
    fontSize: px(18),
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
