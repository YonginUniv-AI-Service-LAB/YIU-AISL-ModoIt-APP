import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './LevelSelector.styles';

export default function LevelSelector({ title, selectedLevel = null, onSelect }) {
  const levels = [1, 2, 3, 4, 5];

  const getEmotionImage = (level, isSelected) => {
    switch (level) {
      case 1:
        return isSelected ? require('../../assets/images/emotion_sad2.png') : require('../../assets/images/emotion_sad.png');
      case 3:
        return isSelected ? require('../../assets/images/emotion_neutral2.png') : require('../../assets/images/emotion_neutral.png');
      case 5:
        return isSelected ? require('../../assets/images/emotion_happy2.png') : require('../../assets/images/emotion_happy.png');
      default:
        return null;
    }
  };

  const shouldShowImage = (level) => {
    return level === 1 || level === 3 || level === 5;
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.selectorContainer}>
        <View style={styles.circleRow}>
          {levels.map((level) => (
            <View key={level} style={styles.circleContainer}>
              <TouchableOpacity
                style={[
                  styles.circle,
                  selectedLevel === level && styles.activeCircle,
                  (level === 1 || level === 3 || level === 5) && styles.largeCircle,
                  styles.circleWithImage, // 중앙 정렬을 위한 스타일 추가
                ]}
                onPress={() => onSelect(level)}
              >
                {shouldShowImage(level) && (
                  <Image
                    source={getEmotionImage(level, selectedLevel === level)}
                    style={styles.emotionImage}
                    resizeMode="contain"
                  />
                )}
              </TouchableOpacity>
            </View>
          ))}
        </View>
        <View style={styles.labelRow}>
          <Text style={styles.bottomLabel}>힘들어요</Text>
          <Text style={styles.bottomLabel}>행복해요</Text>
        </View>
      </View>
    </View>
  );
}