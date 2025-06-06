import React, { useState } from 'react';
import {
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import styles from './LoginPage.styles';

export default function LoginPage({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('이메일:', email);
    console.log('비밀번호:', password);
    // TODO 백엔드 API 연결
    // 지금은 로그인 성공 시 사전조사 시작 페이지로 이동
    navigation.navigate('SurveyIntro');
  };

  const handleNavigateToSignUp = () => {
    navigation.navigate('SignUp'); // 회원가입 페이지로 이동
  };

  const handleNavigateToResetPassword = () => {
    // TODO: 비밀번호 재설정 페이지 구현 후 연결
    navigation.navigate('ResetPassword'); // 추후 해당 페이지 생성 필요
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/logo2.png')}
        style={styles.logo}
      />

      <Text style={[styles.label, { top: 360 }]}>이메일</Text>
      <TextInput
        style={[styles.input, { top: 377 }]}
        value={email}
        onChangeText={setEmail}
        // placeholder="이메일을 입력하세요"
        // placeholderTextColor="#C2C2C2"
        keyboardType="email-address"
      />

      <Text style={[styles.label, { top: 455 }]}>비밀번호</Text>
      <TextInput
        style={[styles.input, { top: 470 }]}
        value={password}
        onChangeText={setPassword}
        // placeholder="비밀번호를 입력하세요"
        // placeholderTextColor="#C2C2C2"
        secureTextEntry
      />

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>로그인</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <TouchableOpacity onPress={handleNavigateToSignUp}>
          <Text style={styles.footerText}>회원가입</Text>
        </TouchableOpacity>

        <View style={styles.divider} />

        <TouchableOpacity onPress={handleNavigateToResetPassword}>
          <Text style={styles.footerText}>비밀번호 재설정</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
