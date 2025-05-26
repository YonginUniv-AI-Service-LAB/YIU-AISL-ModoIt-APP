import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Figma 기준 390px 너비, 844px 높이로 환산
const px = (value) => (width / 390) * value;
const py = (value) => (height / 844) * value;

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
    top: py(278),             // height * 0.33 = 844 * 0.33 ≈ 278
    fontWeight: '700',
    fontSize: px(31),         // width * 0.08 ≈ 390 * 0.08
    lineHeight: px(35),       // width * 0.09
    color: '#1A1A1A',
  },
  description: {
    position: 'absolute',
    top: py(380),             // height * 0.45 ≈ 844 * 0.45
    width: px(300),           // width * 0.77
    textAlign: 'center',
    fontWeight: '500',
    fontSize: px(20),         // width * 0.052
    lineHeight: px(31),       // width * 0.08
    color: '#7E7E7E',
  },
  button: {
    position: 'absolute',
    top: py(717),             // height * 0.85 ≈ 844 * 0.85
    width: px(300),           // width * 0.77
    height: py(50),
    backgroundColor: '#7A73FF',
    borderRadius: px(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: px(20),         // width * 0.051
    fontWeight: '600',
  },
});

export default styles;
