import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

const size = width * 0.15; // 버튼 크기: 기기 너비의 15%

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: height * 0.15, // 화면 높이의 12% 정도 (푸터 위 여유)
    right: width * 0.06,   // 화면 너비의 6% 우측 여백
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: '#7A73FF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  fabText: {
    fontSize: size * 0.7,
    color: '#fff',
    textAlign: 'center',
    ...Platform.select({
      android: {
        includeFontPadding: false, // ✅ Android 수직 패딩 제거
        marginBottom: 14,           // ✅ 약간 위로 보정
      },
    }),
  },
});

export default styles;
