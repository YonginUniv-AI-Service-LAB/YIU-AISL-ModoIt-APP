import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    height: '58%',
    width: '85%',
    backgroundColor: '#FFFFFF',
    borderRadius: width * 0.03,
    padding: width * 0.06,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: height * 0.02,
  },
  modalTitle: {
    fontSize: width * 0.05,
    fontWeight: '600',
    color: '#1A1A1A',
    marginTop: height * 0.02,
  },
  modalClose: {
    fontSize: width * 0.05,
    color: '#999999',
    marginTop: height * 0.02,
  },
  modalLabel: {
    fontSize: width * 0.045,
    color: '#333333',
    marginBottom: height * 0.015,
    marginTop: height * 0.015,
  },
  timePicker: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#8E6BFF',
    borderRadius: width * 0.02,
    overflow: 'hidden',
    width: '90%',
    height: height * 0.1,
    alignSelf: 'center',
    marginBottom: height * 0.03,
  },
  timeBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeBoxSelected: {
    backgroundColor: '#8E6BFF',
  },
  timeBoxUnselected: {
    backgroundColor: '#F1F0FF',
  },
  timeText: {
    fontSize: width * 0.13,
    fontWeight: '400',
  },
  timeTextSelected: {
    color: '#FFFFFF',
  },
  timeTextUnselected: {
    color: '#8E6BFF',
  },
  timeColon: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: [
      { translateX: -(width * 0.08) / 4 },
      { translateY: -(height * 0.08) / 4 },
    ],
    fontSize: width * 0.08,
    fontWeight: '600',
    color: '#8E6BFF',
  },
  modalInput: {
    width: '100%',
    height: height * 0.065,
    borderWidth: 1,
    borderColor: '#8E6BFF',
    borderRadius: height * 0.1,
    justifyContent: 'center',
    paddingHorizontal: width * 0.05,
    marginBottom: height * 0.04,
  },
  modalAddButton: {
    width: '100%',
    backgroundColor: '#8E6BFF',
    height: height * 0.065,
    borderRadius: height * 0.037,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.02,
  },
  modalAddButtonText: {
    color: '#FFFFFF',
    fontSize: width * 0.045,
    fontWeight: '600',
  },
});
