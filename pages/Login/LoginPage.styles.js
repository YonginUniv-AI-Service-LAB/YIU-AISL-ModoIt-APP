import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width,
    height,
    backgroundColor: '#fff',
    position: 'relative',
  },
  logoBox: {
    position: 'absolute',
    top: height * 0.15,
    left: width * 0.34,
    width: width * 0.33,
    height: width * 0.33,
    backgroundColor: '#E3DDFF',
  },
  label: {
    position: 'absolute',
    top: height * 0.32,
    left: width * 0.11,
    fontSize: width * 0.04,
    fontWeight: '600',
    color: '#826AFD',
  },
  input: {
    position: 'absolute',
    top: height * 0.36,
    left: width * 0.11,
    width: width * 0.78,
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#826AFD',
    fontSize: width * 0.04,
    color: '#000',
  },
  loginButton: {
    position: 'absolute',
    top: height * 0.66,
    left: width * 0.12,
    width: width * 0.77,
    height: 50,
    backgroundColor: '#5F49EB',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: width * 0.05,
    fontWeight: '600',
  },
  footer: {
    position: 'absolute',
    top: height * 0.76,
    left: width * 0.32,
    width: width * 0.43,
    height: 19,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: width * 0.04,
    color: '#292929',
    marginHorizontal: 12,
  },
  divider: {
    width: 1,
    height: 14,
    backgroundColor: '#292929',
  },
});

export default styles;