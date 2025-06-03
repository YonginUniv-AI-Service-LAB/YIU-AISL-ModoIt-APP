// FeedbackModal.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import styles from './FeedbackModal.styles';
import LevelSelector from '../../components/Feedback/LevelSelector';
import CircularProgressWithIcon from '../../components/Graph/CircularProgressWithIcon';

export default function FeedbackModal({
  visible,
  onClose,
  selectedDate, // 새로 받은 prop
}) {
  const [emotionLevel, setEmotionLevel] = useState(null);
  const [situationLevel, setSituationLevel] = useState(null);

  // 예시: progress 값을 100으로 고정
  const progressValue = 100;

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.content}>
          {/* 상단 닫기 버튼 */}
          <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
            <Text style={styles.closeIconText}>×</Text>
          </TouchableOpacity>

          {/* ─── 날짜 텍스트 (selectedDate prop으로부터) ─── */}
          <Text style={styles.dateText}>
            {selectedDate ? selectedDate : ''}
          </Text>

          {/* 보라색 타이틀 */}
          <Text style={styles.title}>이대로만 하면 돼요!</Text>

          {/* ─── 원 + 아이콘 + 퍼센트 ─── */}
          <View style={styles.progressWrapper}>
            <CircularProgressWithIcon
              progress={progressValue}
              iconSource={require('../../assets/images/emotion_happy.png')}
            />
          </View>

          {/* LevelSelector: 감정 선택 */}
          <View style={styles.selectorWrapper}>
            <View style={{ transform: [{ scale: 0.8 }] }}>
              <LevelSelector
                title="감정"
                selectedLevel={emotionLevel}
                onSelect={setEmotionLevel}
              />
            </View>
          </View>

          {/* LevelSelector: 상황 선택 */}
          <View style={styles.selectorWrapper}>
            <View style={{ transform: [{ scale: 0.8 }] }}>
              <LevelSelector
                title="상황"
                selectedLevel={situationLevel}
                onSelect={setSituationLevel}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}
