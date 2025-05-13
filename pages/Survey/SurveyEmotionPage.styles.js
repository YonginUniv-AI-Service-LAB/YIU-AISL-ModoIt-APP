// SurveyEmotionPage.styles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: 390,
    height: 844,
    backgroundColor: '#FFFFFF',
    position: 'relative',
    alignItems: 'center',
  },
  title: {
    position: 'absolute',
    top: 180,
    fontWeight: '700',
    fontSize: 30,
    lineHeight: 31,
    color: '#5F49EB',
    textAlign: 'center',
    width: 300,
  },
  optionsWrapper: {
    position: 'absolute',
    top: 290,
    width: 300,
  },
  optionButton: {
    width: 300,
    height: 45,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#5F49EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 26,
    backgroundColor: '#FFFFFF',
  },
  selectedButton: {
    backgroundColor: '#5F49EB',
  },
  optionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#5F49EB',
  },
  selectedText: {
    color: '#FFFFFF',
  },
  nextbutton: {
    position: 'absolute',
    bottom: 70,
    width: 300,
    height: 50,
    backgroundColor: '#5F49EB',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default styles;
