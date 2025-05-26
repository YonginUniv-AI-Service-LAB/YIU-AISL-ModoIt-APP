import React from 'react';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import styles from './SurveyIntroPage.styles';

export default function SurveyIntroPage({ navigation }) {
  const handleNext = () => {
    navigation.navigate('SurveyEmotion');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <Text style={styles.title}>안녕하세요!</Text>
      {/* TODO: 사용자의 이름을 동적으로 가져와서 표시 */}
      <Text style={styles.description}>
        지금부터 우민님에게 맞는{'\n'}최적의 루틴을 찾기 위한{'\n'}몇 가지
        질문을 드릴게요!
      </Text>

      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>다음</Text>
      </TouchableOpacity>
    </View>
  );
}
