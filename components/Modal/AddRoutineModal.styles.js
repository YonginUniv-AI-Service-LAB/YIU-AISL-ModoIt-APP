import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

// 화면 크기별 스케일링 함수
const scale = (size) => (width / 375) * size; // iPhone X 기준
const verticalScale = (size) => (height / 812) * size; // iPhone X 기준
const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

// 화면 크기 구분
const isSmallDevice = width < 375;
const isMediumDevice = width >= 375 && width < 414;
const isLargeDevice = width >= 414;

// 디바이스별 패딩 및 마진
const getSpacing = () => {
  if (isSmallDevice) return { small: 8, medium: 12, large: 16, xlarge: 20 };
  if (isMediumDevice) return { small: 10, medium: 15, large: 20, xlarge: 25 };
  return { small: 12, medium: 18, large: 24, xlarge: 30 };
};

const spacing = getSpacing();

export default StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.medium,
  },
  modalContainer: {
    minHeight: verticalScale(400),
    maxHeight: height * 0.7,
    width: '100%',
    maxWidth: 400, // 최대 너비 제한
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(24),
    padding: spacing.xlarge,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(23),
    paddingTop: spacing.small,
  },
  modalTitle: {
    fontSize: moderateScale(18),
    fontWeight: '600',
    color: '#1A1A1A',
    letterSpacing: -0.2,
  },
  modalClose: {
    fontSize: moderateScale(23),
    color: '#999999',
    fontWeight: '300',
    padding: spacing.small, // 터치 영역 확대
  },
  modalLabel: {
    fontSize: moderateScale(16),
    color: '#333333',
    marginBottom: verticalScale(16),
    marginTop: verticalScale(8),
    fontWeight: '500',
  },
  timePicker: {
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: '#7A73FF',
    borderRadius: moderateScale(16),
    overflow: 'hidden',
    width: '100%',
    height: verticalScale(80),
    alignSelf: 'center',
    marginBottom: verticalScale(32),
    backgroundColor: '#FFFFFF',
  },
  timeBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: verticalScale(16),
    paddingHorizontal: scale(16),
  },
  timeBoxSelected: {
    backgroundColor: '#7A73FF',
    borderRadius: moderateScale(12),
    margin: spacing.small,
  },
  timeBoxUnselected: {
    backgroundColor: '#F0F0FF',
    borderRadius: moderateScale(12),
    margin: spacing.small,
  },
  timeText: {
    fontSize: moderateScale(32),
    fontWeight: '700',
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  timeTextSelected: {
    color: '#FFFFFF',
  },
  timeTextUnselected: {
    color: '#7A73FF',
  },
  timeColon: {
    position: 'absolute',
    left: '49%',
    top: '25%',
    transform: [
      { translateX: -moderateScale(12) },
      { translateY: -moderateScale(16) },
    ],
    fontSize: moderateScale(32),
    fontWeight: '700',
    color: '#7A73FF',
    includeFontPadding: false,
  },
  modalInput: {
    width: '100%',
    height: verticalScale(56),
    borderWidth: 2,
    borderColor: '#7A73FF',
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(16),
    paddingHorizontal: spacing.large,
    marginBottom: verticalScale(32),
    fontSize: moderateScale(16),
    textAlign: 'center',
    color: '#1A1A1A',
    // Focus 상태 스타일 (React Native에서는 별도 처리 필요)
  },
  modalAddButton: {
    width: '100%',
    backgroundColor: '#8B5CF6',
    height: verticalScale(56),
    borderRadius: moderateScale(16),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(8),
    shadowColor: '#8B5CF6',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  modalAddButtonText: {
    color: '#FFFFFF',
    fontSize: moderateScale(18),
    fontWeight: '600',
    letterSpacing: -0.1,
  },

  // 추가: 디바이스별 특별 스타일
  ...(isSmallDevice && {
    modalContainerSmall: {
      padding: spacing.medium,
    },
    modalTitleSmall: {
      fontSize: moderateScale(16),
    },
    timeTextSmall: {
      fontSize: moderateScale(28),
    },
  }),

  // 태블릿용 스타일 (width > 768)
  ...(width > 768 && {
    modalContainerTablet: {
      width: '60%',
      maxWidth: 500,
    },
    timePickerTablet: {
      height: verticalScale(100),
    },
    timeTextTablet: {
      fontSize: moderateScale(40),
    },
  }),
});
