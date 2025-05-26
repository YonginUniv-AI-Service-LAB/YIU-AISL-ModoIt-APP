import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import styles from './FeedbackCardPage3.styles';
import WhiteRoundedContainer from '../../components/common/WhiteRoundedContainer';
import NextButton from '../../components/Button/NextButton';
import BottomTabBar from '../../components/common/BottomTabBar';
import ProgressCircle from '../../components/Graph/ProgressCircle';
import sectionStyles from '../../components/Routine/RoutineSection.styles';

const { width, height } = Dimensions.get('window');

export default function FeedbackCardPage3({ navigation }) {
  // 임시 데이터
  const [options] = useState([
    '2분동안 명상하기',
    '10분동안 달리기',
    '행복회로 돌리기',
    '잠자기 전 핸드폰 꺼두기',
  ]);
  const [selected, setSelected] = useState([]);
  const [loading] = useState(false);
  const [submitting] = useState(false);

  // 여러 개 선택 토글
  const toggleOption = (opt) => {
    const curr = selected || []; //안전장치
    if (curr.includes(opt)) {
      setSelected(curr.filter((o) => o !== opt));
    } else {
      setSelected([...curr, opt]);
    }
  };

  /*
  // 추천 루틴 옵션 API에서 불러오기
  useEffect(() => {
    const fetchOptions = async () => {
      setLoading(true);
      try {
        const response = await feedbackApi.getRecommendations();
        setOptions(response.data);
      } catch (error) {
        console.error('추천 루틴 불러오기 실패:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOptions();
  }, []);
  */

  const handleNext = () => {
    if (selected.length === 0) return;
    /*
    setSubmitting(true);
    try {
      await feedbackApi.submitRecommendation({ recommendation: selected });
    } catch (error) {
      console.error('추천 전송 실패:', error);
    } finally {
      setSubmitting(false);
    }
    */
    navigation.navigate('FeedbackCard4', { recommendation: selected });
  };

  return (
    <View style={styles.container}>
      <View style={styles.purpleHeader} />
      <Text style={styles.headerText}>오늘 너무 잘했어요!</Text>
      {/* 아래 카드 영역 */}
      <WhiteRoundedContainer>
        {/* 퍼센트 그래프 추가 */}
        <View style={localStyles.progressWrapper}>
          <ProgressCircle />
        </View>

        <Text style={sectionStyles.sectionHeader}>다른 루틴 추천</Text>

        {loading ? (
          <ActivityIndicator
            size="large"
            color="#7A73FF"
            style={{ marginTop: px(20) }}
          />
        ) : (
          <View style={styles.optionsWrapper}>
            {options.map((opt, idx) => (
              <TouchableOpacity
                key={idx}
                style={[
                  styles.optionButton,
                  selected.includes(opt) && styles.selectedButton,
                ]}
                onPress={() => toggleOption(opt)}
              >
                <Text
                  style={[
                    styles.optionText,
                    selected.includes(opt) && styles.selectedText,
                  ]}
                >
                  {opt}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View style={styles.endButtonWrapper}>
          <NextButton
            onPress={handleNext}
            disabled={selected.length === 0 || loading || submitting}
          >
            {submitting ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.endButtonText}>다음</Text>
            )}
          </NextButton>
        </View>
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
