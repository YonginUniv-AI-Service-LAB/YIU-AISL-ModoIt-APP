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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';
import { fetchRecommendedRoutines } from '../../api/recommendationApi';

const { width } = Dimensions.get('window');

export default function PreviewRoutinePage({ navigation }) {
  const route = useRoute();
  console.log('받은 route.params:', route.params); // 디버깅용
  // const { emotion, intensity, category } = route.params;
  const emotion = route.params?.emotion;
  const intensity = route.params?.intensity;
  const category = route.params?.category;
  console.log('구조분해할당 후:', { emotion, intensity, category }); // 디버깅용

  const [routineCards, setRoutineCards] = useState([]); // 루틴 카드 배열
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [userName, setUserName] = useState('회원'); // 사용자 이름
  const [currentIndex, setCurrentIndex] = useState(1); // 현재 카드 인덱스
  const flatListRef = useRef(null); // FlatList 참조

  // 사용자 이름 불러오기
  useEffect(() => {
    const loadUserName = async () => {
      try {
        const fullName = await AsyncStorage.getItem('userName');
        if (fullName) {
          // 성을 제외한 이름만 추출: 2글자 이상일 경우 뒤쪽 2글자 사용
          const trimmedName =
            fullName.length > 1 ? fullName.slice(-2) : fullName;
          setUserName(trimmedName);
        } else {
          setUserName('회원');
        }
      } catch (e) {
        console.error('이름 불러오기 실패:', e);
        setUserName('회원');
      }
    };

    loadUserName();
  }, []);

  // 추천 루틴 불러오기
  useEffect(() => {
    const fetchData = async () => {
      // 파라미터 검증을 먼저 실행
      if (!emotion || !intensity || !category) {
        console.log('파라미터 누락 - API 호출 중단:', { emotion, intensity, category });
        setLoading(false);
        return;
      }

      try {
        console.log('API 호출 파라미터:', { emotion, intensity, category }); // 디버깅용

        const response = await fetchRecommendedRoutines({
          emotion,
          intensity,
          category,
        });

        const data = response.data; // [{ id, content, ... }, ...]
        console.log('백엔드에서 받은 data:', data);

        // content만 뽑아서 카드에 넣기 (카드 3장 생성)
        const formatted = data.map((routineGroup, idx) => ({
          id: `${idx}`,
          title: '추천 루틴',
          routines: routineGroup.map((item) => item.content), // 여기서 item은 {content: "..."}
        }));

        setRoutineCards(formatted);
        setLoading(false);
      } catch (error) {
        console.error('루틴 불러오기 실패:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [emotion, intensity, category]);

  const handleStart = () => {
    // TODO: 현재 화면에 있는 루틴을 MainPage에 전달해야 함
    // 지금은 페이지 전환만 처리
    navigation.navigate('MainPage', { routines: routineCards });
  };

  const handleSkip = () => {
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
        {userName}님을 위한{'\n'}맛보기 루틴이 준비되었어요!{'\n'}이제 시작해볼까요?
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
