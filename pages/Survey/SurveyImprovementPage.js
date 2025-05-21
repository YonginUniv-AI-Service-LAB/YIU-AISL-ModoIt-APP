import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import styles from './SurveyImprovementPage.styles';
import ProgressIndicator from '../../components/ProgressIndicator/ProgressIndicator';

export default function SurveyImprovementPage({ navigation }) {
  const [selected, setSelected] = useState(null);

  const options = [
    '건강 챙기기',
    '일상 정비하기',
    '감정 다스리기',
    '목표 달성하기',
  ];

  const handleNext = () => {
    navigation.navigate('PreviewRoutine', { selectedOption: selected });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ProgressIndicator step={3} />
      <Text style={styles.title}>어떠한 자기계발을{'\n'}원하시나요?</Text>
      <View style={styles.optionsWrapper}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              selected === option && styles.selectedButton,
            ]}
            onPress={() => setSelected(option)}
          >
            <Text
              style={[
                styles.optionText,
                selected === option && styles.selectedText,
              ]}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={styles.skipButton}
        onPress={() => {
          navigation.navigate('MainPage');
        }}
      >
        <Text style={styles.skipText}>건너뛰기</Text>
      </TouchableOpacity>

      <View style={styles.skipUnderline} />

      <TouchableOpacity
        style={styles.nextbutton}
        onPress={handleNext}
        disabled={!selected}
      >
        <Text style={styles.buttonText}>다음</Text>
      </TouchableOpacity>
    </View>
  );
}
