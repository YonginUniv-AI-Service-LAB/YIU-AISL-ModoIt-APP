import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const CARD_WIDTH = width * 0.79;
const CARD_MARGIN = 11;

const styles = StyleSheet.create({
  container: {
    width,
    height,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    position: 'relative',
  },
  titleText: {
    marginTop: height * 0.14,
    width: width * 0.8,
    textAlign: 'center',
    fontSize: width * 0.07,
    fontWeight: '700',
    color: '#1A1A1A',
    lineHeight: height * 0.04,
  },
  cardList: {
    paddingTop: height * 0.04,
    paddingHorizontal: (width - CARD_WIDTH) / 2, // ✅ 중앙 정렬
  },
  routineCard: {
    width: CARD_WIDTH,
    height: height * 0.47,
    backgroundColor: '#F0F0FF',
    borderRadius: 15,
    paddingTop: 30,
    paddingHorizontal: width * 0.06,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginHorizontal: CARD_MARGIN,
  },
  routineCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: height * 0.025,
  },
  routineCardTitle: {
    fontSize: width * 0.055,
    fontWeight: '700',
    color: '#7A73FF',
  },
  checkCircle: {
    width: width * 0.1,
    height: width * 0.1,
    borderRadius: 999,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkImage: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },
  routineList: {
    width: '100%',
  },
  routineItem: {
    width: '100%',
    height: 43,
    backgroundColor: '#FFFFFF',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  routineItemText: {
    fontSize: width * 0.044,
    fontWeight: '500',
    color: '#1A1A1A',
  },
  startButton: {
    position: 'absolute',
    bottom: height * 0.08,
    width: width * 0.77,
    height: 50,
    borderRadius: 100,
    backgroundColor: '#7A73FF',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: width * 0.049,
    fontWeight: '600',
  },
  skipButton: {
    position: 'absolute',
    top: height * 0.815,
    width: 56,
    height: 19,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  skipText: {
    fontSize: width * 0.038,
    lineHeight: width * 0.045,
    fontWeight: '500',
    color: '#ABABAB',
  },
  skipUnderline: {
    position: 'absolute',
    top: height * 0.841,
    width: 62,
    height: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#ABABAB',
    alignSelf: 'center',
  },
});

export default styles;
