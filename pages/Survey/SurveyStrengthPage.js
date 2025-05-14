import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import styles from './SurveyStrengthPage.styles';
import ProgressIndicator from '../../components/ProgressIndicator/ProgressIndicator';

export default function SurveyStrengthPage({ navigation }) {
  const [selected, setSelected] = useState(null);

  const options = [
    '조금은 바쁘게 지내고 싶어요',
    '무난했으면 해요',
    '여유로웠으면 해요',
    '많이 여유로웠으면 해요',
    '천천히 시작하고 싶어요',
  ];

  const handleNext = () => {
    navigation.navigate('Survey1', { selectedOption: selected });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ProgressIndicator step={3} />
      <Text style={styles.title}>루틴의 강도가{'\n'}어땠으면 하나요?</Text>
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
