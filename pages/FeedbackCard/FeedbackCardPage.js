import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import styles from './FeedbackCardPage.styles';
import WhiteRoundedContainer from '../../components/common/WhiteRoundedContainer';
import NextButton from '../../components/Button/NextButton';
import BottomTabBar from '../../components/common/BottomTabBar';

const { width } = Dimensions.get('window');
const px = (value) => (width / 390) * value;

export default function FeedbackCardPage({ navigation }) {
  return (
    <View style={styles.container}>
      {/* 상단 연보라색 배경 */}
      <View style={styles.purpleHeader} />
        <Text style={styles.headerText}>오늘 너무 잘했어요!</Text>

      {/* 아래 카드 영역 */}
      <WhiteRoundedContainer>
        {/* 카드 안 내용 */}
        <NextButton onPress={() => navigation.navigate('FeedbackCard2')} />
      </WhiteRoundedContainer>

      <BottomTabBar currentTab="routine" onTabPress={() => {}} />

    </View>
  );
}