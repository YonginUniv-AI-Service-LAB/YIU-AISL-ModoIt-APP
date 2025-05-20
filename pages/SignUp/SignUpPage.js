import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar, ScrollView, Dimensions } from 'react-native';
import styles from './SignUpPage.styles';

export default function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRequestVerification = () => {
    console.log('인증요청 클릭됨');
    // TODO: 이메일 인증 요청 API 연동
  };

  const handleVerifyCode = () => {
    console.log('인증확인 클릭됨');
    // TODO: 인증번호 검증 API 연동
  };

  const handleSignUp = () => {
    console.log('회원가입 시도');
    // TODO: 회원가입 API 연동
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Text style={styles.header}>회원가입</Text>

      <ScrollView contentContainerStyle={styles.formContainer} showsVerticalScrollIndicator={false}>
        <Text style={styles.label}>이름</Text>
        <TextInput
          style={styles.input}
          placeholder="이름을 입력하세요"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>이메일</Text>
        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.flexInput]}
            placeholder="이메일을 입력하세요"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TouchableOpacity style={styles.buttonSmall} onPress={handleRequestVerification}>
            <Text style={styles.buttonSmallText}>인증요청</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>인증번호</Text>
        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.flexInput]}
            placeholder="인증번호 입력"
            value={verificationCode}
            onChangeText={setVerificationCode}
            keyboardType="numeric"
          />
          <TouchableOpacity style={styles.buttonSmall} onPress={handleVerifyCode}>
            <Text style={styles.buttonSmallText}>인증확인</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>비밀번호</Text>
        <TextInput
          style={styles.input}
          placeholder="비밀번호 입력"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Text style={styles.label}>비밀번호 확인</Text>
        <TextInput
          style={styles.input}
          placeholder="비밀번호 다시 입력"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.buttonLarge} onPress={handleSignUp}>
          <Text style={styles.buttonLargeText}>가입하기</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
