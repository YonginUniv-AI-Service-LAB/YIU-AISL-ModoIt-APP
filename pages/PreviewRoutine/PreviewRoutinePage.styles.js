import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    backgroundColor: '#FFFFFF',
    position: 'relative',
  },
  titleText: {
    position: 'absolute',
    top: height * 0.145,
    width: width * 0.8,
    textAlign: 'center',
    fontSize: width * 0.07,
    fontWeight: '700',
    color: '#1A1A1A',
    lineHeight: height * 0.04,
    alignSelf: 'center',
  },
  routineCard: {
    position: 'absolute',
    top: height * 0.295,
    width: width * 0.77,
    height: height * 0.47,
    backgroundColor: '#F0F0FF',
    borderRadius: 15,
    alignSelf: 'center',
    paddingTop: 40,
    alignItems: 'center',
  },
  routineCardHeader: {
    flexDirection: 'row',   // 타이틀과 체크박스를 가로로 배치
    justifyContent: 'space-between',
    width: '100%',
  },
  routineCardTitle: {
    fontSize: width * 0.059,
    fontWeight: '700',
    color: '#7A73FF',
    marginTop: -height * 0.005,
    marginBottom: height * 0.036,
    alignSelf: 'flex-start', 
    marginLeft: width * 0.098,
  },
  checkCircle: {
  width: width * 0.1,
  height: width * 0.1,
  top: -height * 0.03,
  borderRadius: 20,
  backgroundColor: '#FFFFFF',
  justifyContent: 'center',
  alignItems: 'center',
  alignSelf: 'flex-end',
  marginRight: width * 0.065,
},
checkImage: {
  width: 18,
  height: 18,
  resizeMode: 'contain',
},
  routineList: {
    gap: 15,
  },
  routineItem: {
    width: width * 0.62,
    height: 43,
    backgroundColor: '#FFFFFF',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
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
    justifyContent: 'center', // 글씨 버튼 가운데 정렬
    alignItems: 'center',   // 글씨 가운데 정렬
    alignSelf: 'center',    // 버튼 가운데 정렬
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
