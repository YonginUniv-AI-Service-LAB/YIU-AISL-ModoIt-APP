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
  slogan: {
    position: 'absolute',
    top: height * 0.22,
    fontWeight: '700',
    fontSize: width * 0.07,
    lineHeight: width * 0.09,
    color: '#5F49EB',
    textAlign: 'center',
  },
  appName: {
    position: 'absolute',
    top: height * 0.50,
    fontWeight: '600',
    fontSize: width * 0.07,
    lineHeight: width * 0.09,
    color: '#5F49EB',
  },
});

export default styles;