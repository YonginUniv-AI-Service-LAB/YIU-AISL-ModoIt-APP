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
    top: 273,
    fontWeight: '700',
    fontSize: 30,
    lineHeight: 31,
    color: '#5F49EB',
  },
  description: {
    position: 'absolute',
    top: 402,
    width: 300,
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 20,
    lineHeight: 32,
    color: '#5F49EB',
  },
  button: {
    position: 'absolute',
    top: 715,
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
