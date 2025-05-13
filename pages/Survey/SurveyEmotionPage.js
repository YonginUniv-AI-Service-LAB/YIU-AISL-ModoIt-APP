import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import styles from './SurveyEmotionPage.styles';
import ProgressIndicator from './ProgressIndicator';

export default function SurveyEmotionPage({ navigation }) {
  const [selected, setSelected] = useState(null);

  const options = [
    '너무 행복해요',
    '행복해요',
    '그냥 그래요',
    '힘들어요',
    '너무 힘들어요',
  ];

  const handleNext = () => {
    navigation.navigate('SurveyStep2', { selectedOption: selected });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ProgressIndicator step={1} />
      <Text style={styles.title}>우민님의 요즘 감정은 어떤가요?</Text>
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
        style={styles.nextbutton}
        onPress={handleNext}
        disabled={!selected}
      >
        <Text style={styles.buttonText}>다음</Text>
      </TouchableOpacity>
    </View>
  );
}
