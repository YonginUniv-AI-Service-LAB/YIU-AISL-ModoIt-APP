import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import styles from './LoginPage.styles';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('이메일:', email);
    console.log('비밀번호:', password);
    // 백엔드 API 연결 예정
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoBox} />

      <Text style={[styles.label, { top: 358 }]}>이메일</Text>
      <TextInput
        style={[styles.input, { top: 380 }]}
        value={email}
        onChangeText={setEmail}
        placeholder="이메일을 입력하세요"
        placeholderTextColor="#C2C2C2"
        keyboardType="email-address"
      />

      <Text style={[styles.label, { top: 450 }]}>비밀번호</Text>
      <TextInput
        style={[styles.input, { top: 470 }]}
        value={password}
        onChangeText={setPassword}
        placeholder="비밀번호를 입력하세요"
        placeholderTextColor="#C2C2C2"
        secureTextEntry
      />

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>로그인</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>회원가입</Text>
        <View style={styles.divider} />
        <Text style={styles.footerText}>비밀번호 찾기</Text>
      </View>
    </View>
  );
}
