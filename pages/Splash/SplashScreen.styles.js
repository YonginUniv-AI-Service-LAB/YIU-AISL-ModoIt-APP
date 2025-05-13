import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        width: 390,
        height: 844,
        backgroundColor: '#FFFFFF',
        position: 'relative',
        alignItems: 'center',
    },
    slogan: {
        position: 'absolute',
        top: 182,
        fontFamily: 'Pretendard',
        fontWeight: '700',
        fontSize: 26,
        lineHeight: 36,
        color: '#5F49EB',
        textAlign: 'center',
    },
    appName: {
        position: 'absolute',
        top: 422,
        fontFamily: 'Pretendard',
        fontWeight: '600',
        fontSize: 26,
        lineHeight: 36,
        color: '#5F49EB',
    },
});

export default styles;
