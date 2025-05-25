import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const px = (value) => (width / 390) * value;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // 기본 배경은 흰색
  },
  purpleHeader: {
    height: px(210),
    width: '100%',
    backgroundColor: '#E8E6FF',
  },
  headerText: {
    position: 'absolute',
    width: '100%',
    top: px(75),
    fontSize: px(24),
    fontWeight: '700',
    color: '#7A73FF',
    textAlign: 'center',
    letterSpacing: -0.5,
   },
});

export default styles;
