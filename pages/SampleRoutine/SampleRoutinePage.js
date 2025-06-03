import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';

import styles from './SampleRoutinePage.styles';
import RoutinePreviewCard from '../../components/Card/RoutinePreviewCard';
import AddButton from '../../components/Button/AddButton';
import BottomTabBar from '../../components/common/BottomTabBar';

const { width } = Dimensions.get('window');

// TODO: 태그 목록도 API에서 가져오는 경우에는 API 연결 시 수정 필요
const TAGS = ['우울', '불안', '무기력', '초조함', '짜증'];

export default function SampleRoutinePage({ navigation }) {
  const [selectedTag, setSelectedTag] = useState(TAGS[0]); // 첫 번째 태그 기본 선택
  const [loading, setLoading] = useState(true); // 로딩 상태

  // 루틴 카드에 들어갈 임시 루틴 목록
  // TODO: API 연결 시 수정 필요 - 더미 데이터 제거하고 실제 API 호출로 대체
  const dummyRoutines = [
    '이불 정리하기',
    '스트레칭',
    '산책하기',
    '양치하기',
    '마음 다잡기',
  ];

  // 임시로 로딩 시뮬레이션 (API 연결 전까지 사용)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // 1초 후 로딩 완료

    return () => clearTimeout(timer);
  }, []);

  // 태그 변경 시 로딩 시뮬레이션
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); // 0.5초 후 로딩 완료

    return () => clearTimeout(timer);
  }, [selectedTag]);

  // TODO: API 연결 시 수정 필요 - 선택된 태그에 따른 루틴 데이터 API 호출
  // useEffect(() => {
  //   fetchRoutinesByTag(selectedTag);
  // }, [selectedTag]);

  // TODO: API 연결 시 수정 필요 - state 추가
  // const [routines, setRoutines] = useState([]);
  // const [loading, setLoading] = useState(false);

  // TODO: API 연결 시 수정 필요 - API 호출 함수 구현
  // const fetchRoutinesByTag = async (tag) => {
  //   try {
  //     setLoading(true);
  //     const response = await fetch(`/api/routines?tag=${tag}`);
  //     const data = await response.json();
  //     setRoutines(data.routines || []);
  //   } catch (error) {
  //     console.error('루틴 데이터 로딩 실패:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // TODO: API 연결 시 수정 필요 - routines state 사용으로 변경
  // const routineData = {
  //   title: selectedTag + ' 개선 루틴',
  //   routines: routines,
  // };

  // RoutinePreviewCard용 데이터(API 연결 전까지 사용)
  const routineData = {
    title: selectedTag + ' 개선 루틴',
    routines: dummyRoutines,
  };

  return (
    <View style={styles.container}>
      {/* 제목 */}
      <Text style={styles.titleText}>루틴 태그</Text>

      {/* 태그 리스트 */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tagListContainer}
      >
        {TAGS.map((tag, index) => {
          const isSelected = selectedTag === tag;
          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.tagButton,
                isSelected ? styles.selectedTag : styles.unselectedTag,
              ]}
              onPress={() => setSelectedTag(tag)}
            >
              <Text
                style={[
                  styles.tagText,
                  isSelected ? styles.selectedText : styles.unselectedText,
                ]}
              >
                {tag}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* 루틴 프리뷰 카드 */}
      {loading ? (
        <View style={{ marginTop: 70, alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#7A73FF" />
        </View>
      ) : (
        <View style={styles.routinePreviewContainer}>
          <RoutinePreviewCard item={routineData} index={0} currentIndex={0} />
        </View>
      )}

      {/* 추가하기 버튼 */}
      <AddButton
        onPress={() => {
          console.log('추가하기 버튼 눌림');
          // TODO: API 연결 시 수정 필요 - 실제 루틴 추가 API 호출
        }}
      />

      {/* 하단 탭 */}
      <BottomTabBar
        currentTab="sample"
        onTabPress={(tab) => {
          if (tab === 'routine') navigation.navigate('Main');
          else if (tab === 'feedback') navigation.navigate('FeedbackCalendar');
        }}
      />
    </View>
  );
}
