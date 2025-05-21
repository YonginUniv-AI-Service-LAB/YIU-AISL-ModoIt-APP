// src/components/Routine/RoutineItem.styles.js

import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: height * 0.015, // 화면 높이의 1.5%
  },
  routineBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E1DFFF',
    borderRadius: width * 0.04, // 화면 너비의 4%
    borderLeftWidth: width * 0.008, // 화면 너비의 0.8%
    borderLeftColor: '#8E6BFF',
    paddingVertical: height * 0.025, // 화면 높이의 2.5%
    paddingHorizontal: width * 0.04, // 화면 너비의 4%
  },
  itemTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
  },
  itemTime: {
    fontSize: width * 0.04, // 화면 너비의 4%
    fontWeight: '500',
    color: '#333333',
    marginRight: width * 0.03, // 화면 너비의 3%
  },
  itemTitle: {
    fontSize: width * 0.04, // 화면 너비의 4%
    color: '#333333',
    flexShrink: 1,
  },
  itemCircle: {
    width: width * 0.06, // 화면 너비의 6%
    height: width * 0.06, // 화면 너비의 6%
    borderWidth: 2,
    borderColor: '#8E6BFF',
    borderRadius: (width * 0.06) / 2, // 반원 형태
    backgroundColor: '#FFFFFF',
    marginLeft: width * 0.04, // 화면 너비의 4%
  },
  itemCircleChecked: {
    backgroundColor: '#8E6BFF',
  },
});
