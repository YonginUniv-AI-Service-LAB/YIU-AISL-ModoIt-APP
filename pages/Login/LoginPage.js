import React, { useState } from 'react';
import {
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import styles from './LoginPage.styles';
import { login } from '../../api/authApi';

export default function LoginPage({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      alert('이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }

    try {
      const response = await login({ email, password });

      // 로그인 성공 시 처리
      console.log('로그인에 성공:', response.data);

      // TODO: 백엔드에서 isFirstLogin 여부를 반환하지 않는다면, 임시로 SurveyIntro로 이동
      navigation.navigate('SurveyIntro');

      // 만약 메인 페이지로 보내고 싶으면
      // navigation.navigate('Main');
    } catch (error) {
      console.error('로그인 실패:', error.response?.data || error.message);
      alert('로그인 실패: ' + (error.response?.data || '오류가 발생했습니다.'));
    }
  };


  const handleNavigateToSignUp = () => {
    navigation.navigate('SignUp');
  };

  const handleNavigateToResetPassword = () => {
    navigation.navigate('ResetPassword');
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
