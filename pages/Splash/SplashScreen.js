import React, { useEffect } from 'react';
import { View, Text, StatusBar } from 'react-native';
import styles from './SplashScreen.styles';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Text style={styles.slogan}>차근차근 시작하는{'\n'}나만의 루틴</Text>
      <Text style={styles.appName}>모두잇</Text>
    </View>
  );
}
