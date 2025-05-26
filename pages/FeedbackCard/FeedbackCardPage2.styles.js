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
    fontSize: px(26),
    fontWeight: '700',
    color: '#7A73FF',
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  whiteContainer: {
    // 수정된 부분: MainPage.styles의 whiteContainer 적용
    flex: 1,
  },
  endButtonWrapper: {
    alignSelf: 'center',
    width: width * 0.9,
    marginVertical: height * 0.02,
  },
  endButtonText: {
    color: '#FFFFFF', // MainPage 의 endButtonText
    fontSize: width * 0.045,
    fontWeight: '600',
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
