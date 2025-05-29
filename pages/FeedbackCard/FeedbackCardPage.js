import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import styles from './FeedbackCardPage.styles';
import WhiteRoundedContainer from '../../components/common/WhiteRoundedContainer';
import NextButton from '../../components/Button/NextButton';
import BottomTabBar from '../../components/common/BottomTabBar';
import ProgressCircle from '../../components/Graph/ProgressCircle';
import LevelSelector from '../../components/Feedback/LevelSelector';

const { width, height } = Dimensions.get('window');

export default function FeedbackCardPage({ navigation, route }) {
  // 수정된 부분: MainPage에서 전달된 체크되지 않은 루틴 받기
  const { unchecked, checked } = route.params;
  const [emotionLevel, setEmotionLevel] = useState(null);
  const [situationLevel, setSituationLevel] = useState(null);

  return (
    <View style={styles.container}>
      {/* 상단 연보라색 배경 */}
      <View style={styles.purpleHeader} />
      {/* 상단 텍스트 */}
      <Text style={styles.headerText}>오늘 너무 잘했어요!</Text>

      {/* 아래 카드 영역 */}
      <WhiteRoundedContainer>
        {/* 퍼센트 그래프 추가 */}
        <View style={{ marginTop: -110, marginBottom: 15 }}>
          <ProgressCircle />
        </View>
        {/* 카드 안 내용 */}
        <Text style={styles.feedbackTitle}>
          오늘 루틴을 진행할 때 어땠나요?
        </Text>

        {/* 감정 선택 */}
        <LevelSelector
          title="감정"
          selectedLevel={emotionLevel}
          onSelect={setEmotionLevel}
        />

        {/* 상황 선택 */}
        <LevelSelector
          title="상황"
          selectedLevel={situationLevel}
          onSelect={setSituationLevel}
        />

        {/* 다음 버튼 */}
        <NextButton
          onPress={() =>
            // 수정된 부분: 체크되지 않은 루틴을 다음 화면으로 전달
            navigation.navigate('FeedbackCard2', { unchecked, checked })
          }
        />
      </WhiteRoundedContainer>

      <BottomTabBar currentTab="routine" onTabPress={() => {}} />
    </View>
  );
}

const localStyles = StyleSheet.create({
  progressWrapper: {
    marginTop: -height * 0.125, // 약 -105px → 844 기준
    marginBottom: height * 0.018, // 약 15px
  },
});
