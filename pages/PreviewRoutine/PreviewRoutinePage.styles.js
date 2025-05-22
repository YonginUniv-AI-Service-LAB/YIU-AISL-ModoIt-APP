import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// 반응형 스케일링 함수
const scale = (size) => (width / 375) * size;
const verticalScale = (size) => (height / 812) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

// 카드 설정 - 좌우 비율 동일하게 수정 및 스냅 효과
const CARD_WIDTH = width * 0.8; // 카드 너비 (화면의 80%)
const CARD_SPACING = scale(20); // 카드 간 간격
const SNAP_WIDTH = CARD_WIDTH + CARD_SPACING; // 스냅 간격 (카드 너비 + 간격)

const styles = StyleSheet.create({
  container: {
    width,
    height,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    position: 'relative',
  },
  titleText: {
    marginTop: verticalScale(114),
    width: width * 0.85,
    textAlign: 'center',
    fontSize: moderateScale(26),
    fontWeight: '700',
    color: '#1A1A1A',
    lineHeight: verticalScale(32),
    letterSpacing: -0.3,
  },
  cardList: {
    paddingTop: verticalScale(32),
    // 첫 번째 카드가 화면 중앙에 올 수 있도록 왼쪽 패딩 설정
    paddingLeft: (width - CARD_WIDTH) / 2,
    // 마지막 카드가 화면 중앙에 올 수 있도록 오른쪽 패딩 설정
    paddingRight: (width - CARD_WIDTH) / 2,
  },
  routineCard: {
    width: CARD_WIDTH,
    height: verticalScale(380),
    backgroundColor: '#F0F0FF',
    borderRadius: moderateScale(15),
    paddingTop: verticalScale(24),
    paddingHorizontal: scale(20),
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginRight: CARD_SPACING, // 카드 간 간격
    // 그림자 효과 추가
    shadowColor: '#7A73FF',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  routineCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: verticalScale(20),
    paddingHorizontal: scale(4),
  },
  routineCardTitle: {
    fontSize: moderateScale(20),
    fontWeight: '700',
    color: '#7A73FF',
    flex: 1,
    letterSpacing: -0.2,
  },
  checkCircle: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: scale(8),
    // 체크 원에 미세한 그림자
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  checkImage: {
    width: scale(18),
    height: scale(18),
    resizeMode: 'contain',
  },
  routineList: {
    width: '100%',
    flex: 1,
  },
  routineItem: {
    width: '100%',
    height: verticalScale(43),
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(21.5),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(12),
    // 루틴 아이템에 미세한 그림자
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  routineItemText: {
    fontSize: moderateScale(16),
    fontWeight: '500',
    color: '#1A1A1A',
    textAlign: 'center',
    letterSpacing: -0.1,
  },
  startButton: {
    position: 'absolute',
    bottom: verticalScale(65),
    width: width * 0.8,
    height: verticalScale(50),
    borderRadius: moderateScale(25),
    backgroundColor: '#7A73FF',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    // 버튼 그림자 효과
    shadowColor: '#7A73FF',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: moderateScale(18),
    fontWeight: '600',
    letterSpacing: -0.1,
  },
  skipButton: {
    position: 'absolute',
    bottom: verticalScale(130), // startButton 위에 적절한 간격으로 배치
    height: verticalScale(24),
    paddingHorizontal: scale(12), // 터치 영역 확대
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  skipText: {
    fontSize: moderateScale(14),
    fontWeight: '500',
    color: '#ABABAB',
    letterSpacing: -0.1,
  },
  skipUnderline: {
    position: 'absolute',
    bottom: verticalScale(125), // skipButton 바로 아래
    width: scale(56),
    height: 1,
    backgroundColor: '#ABABAB',
    alignSelf: 'center',
  },

  // 디바이스별 추가 스타일
  ...(width < 375 && {
    // 작은 화면용
    titleTextSmall: {
      fontSize: moderateScale(22),
      lineHeight: verticalScale(28),
    },
    routineCardSmall: {
      height: verticalScale(340),
      paddingTop: verticalScale(20),
    },
  }),

  ...(width > 414 && {
    // 큰 화면용
    titleTextLarge: {
      fontSize: moderateScale(28),
      lineHeight: verticalScale(36),
    },
    routineCardLarge: {
      height: verticalScale(420),
      paddingTop: verticalScale(28),
    },
  }),
});

export default styles;
