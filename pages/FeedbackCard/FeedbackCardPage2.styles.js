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
});

export default styles;
