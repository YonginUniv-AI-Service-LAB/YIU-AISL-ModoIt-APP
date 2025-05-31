import React, { useEffect, useState, useRef } from 'react';
import { Dimensions } from 'react-native';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import styles from './PreviewRoutinePage.styles';
import RoutinePreviewCard from '../../components/Card/RoutinePreviewCard';
import { SNAP_WIDTH } from '../../components/Card/RoutinePreviewCard.styles';

const { width } = Dimensions.get('window');

export default function PreviewRoutinePage({ navigation }) {
  const [routineCards, setRoutineCards] = useState([]); // 루틴 카드 배열
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [currentIndex, setCurrentIndex] = useState(1); // 현재 카드 인덱스
  const flatListRef = useRef(null); // FlatList 참조

  useEffect(() => {
    // TODO: 태그 기반으로 추천된 루틴 데이터를 API에서 가져와야 함
    const fetchPreviewRoutines = async () => {
      try {
        // 임시 데이터
        setTimeout(() => {
          const dummyRoutines = [
            '아침 이불 정리하기',
            '아침 스트레칭',
            '1000보 이상 걷기',
            '일어나자마자 씻기',
            '2분 달리기',
          ];

          // 임시로 동일한 카드 3개 생성
          setRoutineCards([
            { id: '1', title: '기력 충전 운동 루틴', routines: dummyRoutines },
            { id: '2', title: '기력 충전 운동 루틴', routines: dummyRoutines },
            { id: '3', title: '기력 충전 운동 루틴', routines: dummyRoutines },
          ]);
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error('루틴 불러오기 실패:', error);
        setLoading(false);
        // TODO: 에러 핸들링 필요
      }
    };

    fetchPreviewRoutines();
  }, []);

  const handleStart = () => {
    // TODO: 현재 화면에 있는 루틴을 MainPage에 전달해야 함
    // 지금은 페이지 전환만 처리
    navigation.navigate('MainPage');
  };

  const handleSkip = () => {
    // TODO: 루틴 전달 없이 MainPage로 이동
    navigation.navigate('MainPage');
  };

  // FlatList에서 현재 보이는 카드 감지
  const viewConfigRef = { viewAreaCoveragePercentThreshold: 50 };

  const onViewRef = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  });

  // 스크롤 끝났을 때 스냅 효과
  const onMomentumScrollEnd = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / SNAP_WIDTH);

    if (flatListRef.current && index >= 0 && index < routineCards.length) {
      flatListRef.current.scrollToOffset({
        offset: index * SNAP_WIDTH,
        animated: true,
      });
      setCurrentIndex(index);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <Text style={styles.titleText}>
        우민님을 위한{'\n'}맛보기 루틴이 준비되었어요!{'\n'}이제 시작해볼까요?
      </Text>

      {loading ? (
        <View style={{ marginTop: 80, alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#7A73FF" />
        </View>
      ) : (
        <FlatList
          ref={flatListRef}
          data={routineCards}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <RoutinePreviewCard
              item={item}
              index={index}
              currentIndex={currentIndex}
            />
          )}
          contentContainerStyle={styles.cardList}
          initialScrollIndex={1}
          getItemLayout={(data, index) => ({
            length: SNAP_WIDTH,
            offset: SNAP_WIDTH * index,
            index,
          })}
          onViewableItemsChanged={onViewRef.current}
          viewabilityConfig={viewConfigRef}
          onMomentumScrollEnd={onMomentumScrollEnd}
          decelerationRate="fast"
          snapToInterval={SNAP_WIDTH}
          snapToAlignment="start"
        />
      )}

      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.skipText}>건너뛰기</Text>
      </TouchableOpacity>

      <View style={styles.skipUnderline} />

      <TouchableOpacity style={styles.startButton} onPress={handleStart}>
        <Text style={styles.startButtonText}>시작하기</Text>
      </TouchableOpacity>
    </View>
  );
}
