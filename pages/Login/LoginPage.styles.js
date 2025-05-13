import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        width: 390,
        height: 844,
        backgroundColor: '#fff',
        position: 'relative',
    },
    logoBox: {
        position: 'absolute',
        top: 123,
        left: 131,
        width: 129,
        height: 129,
        backgroundColor: '#E3DDFF',
    },
    label: {
        position: 'absolute',
        left: 44,
        fontSize: 16,
        fontWeight: '600',
        color: '#826AFD',
    },
    input: {
        position: 'absolute',
        left: 44,
        width: 303,
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#826AFD',
        fontSize: 16,
        color: '#000',
    },
    loginButton: {
        position: 'absolute',
        top: 561,
        left: 45,
        width: 300,
        height: 50,
        backgroundColor: '#5F49EB',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 17,
        fontWeight: '600',
    },
    footer: {
        position: 'absolute',
        top: 640,
        left: 124,
        width: 168,
        height: 19,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    footerText: {
        fontSize: 14,
        color: '#292929',
        marginHorizontal: 12,
    },
    divider: {
        width: 1,
        height: 14,
        backgroundColor: '#292929',
    },
});

export default styles;
