// ProgressIndicator.styles.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  progressContainer: {
    position: 'absolute',
    top: 70,
    width: 300,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
  },
  progressSegment: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    marginHorizontal: 4,
    backgroundColor: '#C4C4C4',
  },
  progressSegmentActive: {
    backgroundColor: '#5F49EB',
  },
});
