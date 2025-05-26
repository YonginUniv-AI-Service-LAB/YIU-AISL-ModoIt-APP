import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import styles from './FeedbackCardPage.styles';
import WhiteRoundedContainer from '../../components/common/WhiteRoundedContainer';
import NextButton from '../../components/Button/NextButton';
import BottomTabBar from '../../components/common/BottomTabBar';
import ProgressCircle from '../../components/Graph/ProgressCircle';

const { width, height } = Dimensions.get('window');

export default function FeedbackCardPage({ navigation, route }) {
  // 수정된 부분: MainPage에서 전달된 체크되지 않은 루틴 받기
  const { unchecked } = route.params;

  return (
    <View style={styles.container}>
      {/* 상단 연보라색 배경 */}
      <View style={styles.purpleHeader} />
      {/* 상단 텍스트 */}
      <Text style={styles.headerText}>오늘 너무 잘했어요!</Text>

      {/* 아래 카드 영역 */}
      <WhiteRoundedContainer>
        {/* 퍼센트 그래프 추가 */}
        <View style={localStyles.progressWrapper}>
          <ProgressCircle />
        </View>
        {/* 카드 안 내용 */}
        <Text style={styles.feedbackTitle}>
          오늘 루틴을 진행할 때 어땠나요?
        </Text>

        <NextButton
          onPress={() =>
            // 수정된 부분: 체크되지 않은 루틴을 다음 화면으로 전달
            navigation.navigate('FeedbackCard2', { unchecked })
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
