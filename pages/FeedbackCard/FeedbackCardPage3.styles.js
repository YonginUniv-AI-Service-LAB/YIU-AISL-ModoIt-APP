import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const px = (value) => (width / 390) * value;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
    marginTop: -px(80),
    paddingTop: px(120),
    paddingHorizontal: px(20),
    flex: 1,
    alignItems: 'center', // 컨테이너 수평 중앙 정렬
  },

  optionsWrapper: {
    width: '100%',
    marginTop: px(4), // ProgressCircle 아래 간격
    alignItems: 'center',
  },
  optionButton: {
    width: width * 0.77,
    height: px(49),
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#ABABAB',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: px(20),
    backgroundColor: '#FFFFFF',
  },
  selectedButton: {
    backgroundColor: '#F0F0FF',
    borderColor: '#7A73FF',
  },
  optionText: {
    fontSize: px(17),
    fontWeight: '500',
    color: '#ABABAB',
  },
  selectedText: {
    color: '#7A73FF',
  },

  endButtonWrapper: {
    marginTop: px(17), // NextButton 위치 상향
    alignItems: 'center',
  },
  endButtonText: {
    color: '#FFFFFF',
    fontSize: px(16),
    fontWeight: '600',
  },
});
