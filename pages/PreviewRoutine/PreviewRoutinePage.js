import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import styles from './PreviewRoutinePage.styles';

export default function PreviewRoutinePage({ navigation }) {
  const [routines, setRoutines] = useState([]); // 루틴 목록 상태
  const [loading, setLoading] = useState(true); // 로딩 상태

  useEffect(() => {
    // TODO: 태그 기반으로 추천된 루틴 데이터를 API에서 가져와야 함
    const fetchPreviewRoutines = async () => {
      try {
        // 임시 데이터
        setTimeout(() => {
          setRoutines([
            '아침 이불 정리하기',
            '아침 스트레칭',
            '1000보 이상 걷기',
            '일어나자마자 씻기',
            '2분 달리기',
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

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <Text style={styles.titleText}>
        우민님을 위한{"\n"}맛보기 루틴이 준비되었어요!{"\n"}이제 시작해볼까요?
      </Text>
      <View style={styles.routineCard}>
        <View style={styles.routineCardHeader}>
          <Text style={styles.routineCardTitle}>기력 충전 운동 루틴</Text>
            
          <View style={styles.checkCircle}>
            <Image
              source={require('../../assets/images/check.png')}
              style={styles.checkImage}
            />
          </View>
        </View>
        {/* 목록 로딩 */}
        {loading ? (
          <ActivityIndicator size="large" color="#7A73FF" />
        ) : (
          <ScrollView contentContainerStyle={styles.routineList}>
            {routines.map((routine, index) => (
              <View key={index} style={styles.routineItem}>
                <Text style={styles.routineItemText}>{routine}</Text>
              </View>
            ))}
          </ScrollView>
        )}        
      </View>
      <TouchableOpacity
        style={styles.skipButton}
        onPress={handleSkip}
      >
        <Text style={styles.skipText}>건너뛰기</Text>
      </TouchableOpacity>

      <View style={styles.skipUnderline} />

      <TouchableOpacity
        style={styles.startButton}
        onPress={handleStart}
      >
        <Text style={styles.startButtonText}>시작하기</Text>
      </TouchableOpacity>

    </View>  
  );
}
