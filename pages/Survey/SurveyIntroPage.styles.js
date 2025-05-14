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
    top: height * 0.32,
    fontWeight: '700',
    fontSize: width * 0.08,
    lineHeight: width * 0.08,
    color: '#5F49EB',
  },
  description: {
    position: 'absolute',
    top: height * 0.48,
    width: width * 0.77,
    textAlign: 'center',
    fontWeight: '500',
    fontSize: width * 0.05,
    lineHeight: width * 0.08,
    color: '#5F49EB',
  },
  button: {
    position: 'absolute',
    top: height * 0.85,
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