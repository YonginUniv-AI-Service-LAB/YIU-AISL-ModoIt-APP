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
import {
  getFeedbackAchievementRate,
  getRecommendations,
  // submitRecommendations, // 나중에 저장용 POST가 필요하면 이걸 사용
} from '../../api/feedbackApi';

const { width, height } = Dimensions.get('window');

export default function FeedbackCardPage3({ navigation, route }) {
  const { unchecked, checked /*, emotion, intensity */ } = route.params;
  const [achievementRate, setAchievementRate] = useState(0);

  // 추천 루틴 목록: { id: number, content: string } 배열
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState([]); // 선택된 id 배열
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // 1) 성취율 조회
  useEffect(() => {
    getFeedbackAchievementRate()
      .then((res) => setAchievementRate(res.data.achievementRate))
      .catch((err) => console.error('피드백카드 호출 실패', err));
  }, []);

  // 2) 오늘 상태 기반 추천 루틴 조회 (4개 무작위)
  useEffect(() => {
    const fetchOptions = async () => {
      setLoading(true);
      try {
        const response = await getRecommendations();
        setOptions(response.data);
      } catch (error) {
        console.error('추천 루틴 불러오기 실패:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOptions();
  }, []);

  // 3) 여러 개 선택 토글 (id 기준)
  const toggleOption = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((o) => o !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  // 4) 다음 버튼 핸들러 (선택된 id 전달)
  const handleNext = () => {
    if (selected.length === 0) return;
    // -- 저장 POST가 필요하면 여기서 submitRecommendations 호출 --
    navigation.navigate('RoutineDelete', { unchecked, checked, selected });
  };

  return (
    <View style={styles.container}>
      <View style={styles.purpleHeader} />
      <Text style={styles.headerText}>오늘 너무 잘했어요!</Text>
      <WhiteRoundedContainer>
        <View style={localStyles.progressWrapper}>
          <ProgressCircle value={achievementRate} />
        </View>
        <Text style={sectionStyles.sectionHeader}>다른 루틴 추천</Text>

        {loading ? (
          <ActivityIndicator
            size="large"
            color="#7A73FF"
            style={{ marginTop: 20 }}
          />
        ) : (
          <View style={styles.optionsWrapper}>
            {options.map((opt) => (
              <TouchableOpacity
                key={opt.id}
                style={[
                  styles.optionButton,
                  selected.includes(opt.id) && styles.selectedButton,
                ]}
                onPress={() => toggleOption(opt.id)}
              >
                <Text
                  style={[
                    styles.optionText,
                    selected.includes(opt.id) && styles.selectedText,
                  ]}
                >
                  {opt.content}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </WhiteRoundedContainer>

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

      <BottomTabBar currentTab="routine" onTabPress={() => {}} />
    </View>
  );
}

const localStyles = StyleSheet.create({
  progressWrapper: {
    marginTop: -height * 0.125,
    marginBottom: height * 0.018,
  },
});
