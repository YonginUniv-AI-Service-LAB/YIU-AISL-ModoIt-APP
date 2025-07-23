import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 40,
  },

  logo: {
    width: width * 0.33,
    height: width * 0.33 * (195.53 / 148), // 원본 비율 유지
    marginBottom: 50,
  },

  inputGroup: {
    width: '100%',
    marginBottom: 50,
  },

  label: {
    fontSize: width * 0.045,
    fontWeight: '600',
    color: '#ABABAB',
    marginTop: 20,
    marginBottom: 5,
  },

  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ABABAB',
    fontSize: width * 0.04,
    color: '#000',
    paddingVertical: 8,
  },

  loginButton: {
    width: '100%',
    height: height * 0.065,
    backgroundColor: '#7A73FF',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },

  loginButtonText: {
    color: '#fff',
    fontSize: width * 0.048,
    fontWeight: '600',
  },

  footer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  footerText: {
    fontSize: width * 0.042,
    color: '#ABABAB',
    marginHorizontal: 12,
  },

  divider: {
    width: 1,
    height: 14,
    backgroundColor: '#ABABAB',
  },
});

export default styles;
