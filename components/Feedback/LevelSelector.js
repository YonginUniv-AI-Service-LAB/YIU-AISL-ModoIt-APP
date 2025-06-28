import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './LevelSelector.styles';

export default function LevelSelector({
  title,
  selectedLevel = null,
  onSelect,
}) {
  // 5개의 원: 메인(1), 중간(1), 메인(2), 중간(2), 메인(3)
  const circles = [
    { type: 'main', level: 1 },
    { type: 'between', level: 1 }, // 1-2 사이는 1
    { type: 'main', level: 2 },
    { type: 'between', level: 2 }, // 2-3 사이는 2
    { type: 'main', level: 3 },
  ];

  // 클릭된 원(index)만 하이라이트하기 위한 state
  const [selectedIdx, setSelectedIdx] = useState(null);

  // 레벨별 이미지 매핑 (1,2,3 모두 표시)
  const getEmotionImage = (level, isSelected) => {
    switch (level) {
      case 1:
        return isSelected
          ? require('../../assets/images/emotion_sad2.png')
          : require('../../assets/images/emotion_sad.png');
      case 2:
        return isSelected
          ? require('../../assets/images/emotion_neutral2.png')
          : require('../../assets/images/emotion_neutral.png');
      case 3:
        return isSelected
          ? require('../../assets/images/emotion_happy2.png')
          : require('../../assets/images/emotion_happy.png');
      default:
        return null;
    }
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.selectorContainer}>
        <View style={styles.circleRow}>
          {circles.map((item, idx) => {
            const isMain = item.type === 'main';
            const isActive = selectedIdx === idx;

            return (
              <TouchableOpacity
                key={idx}
                style={[
                  styles.circle,
                  isActive && styles.activeCircle, // 클릭된 인덱스만 하이라이트
                  isMain && styles.largeCircle, // 메인(1,2,3) 원만 크게
                  isMain && styles.circleWithImage, // 메인 원만 이미지 컨테이너
                ]}
                onPress={() => {
                  setSelectedIdx(idx);
                  onSelect(item.level);
                }}
              >
                {isMain && (
                  <Image
                    source={getEmotionImage(item.level, isActive)}
                    style={styles.emotionImage}
                    resizeMode="contain"
                  />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={styles.labelRow}>
          <Text style={styles.bottomLabel}>힘들어요</Text>
          <Text style={styles.bottomLabel}>행복해요</Text>
        </View>
      </View>
    </View>
  );
}
