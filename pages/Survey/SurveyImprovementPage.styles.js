import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width,
    height,
    backgroundColor: '#FFFFFF',
    position: 'relative',
    alignItems: 'center',
  },
  title: {
    position: 'absolute',
    top: height * 0.21,
    width: width * 0.77,
    fontWeight: '700',
    fontSize: width * 0.08,
    lineHeight: width * 0.09,
    color: '#5F49EB',
    textAlign: 'center',
  },
  optionsWrapper: {
    position: 'absolute',
    top: height * 0.34,
    width: width * 0.77,
  },
  optionButton: {
    width: width * 0.77,
    height: 45,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#5F49EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.03,
    backgroundColor: '#FFFFFF',
  },
  selectedButton: {
    backgroundColor: '#5F49EB',
  },
  optionText: {
    fontSize: width * 0.04,
    fontWeight: '500',
    color: '#5F49EB',
  },
  selectedText: {
    color: '#FFFFFF',
  },
  nextbutton: {
    position: 'absolute',
    bottom: height * 0.08,
    width: width * 0.77,
    height: 50,
    backgroundColor: '#5F49EB',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: width * 0.05,
    fontWeight: '600',
  },
});

export default styles;