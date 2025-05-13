import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from './pages/Splash/SplashScreen';
import LoginPage from './pages/Login/LoginPage';
import SurveyIntroPage from './pages/Survey/SurveyIntroPage';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="SurveyIntro" component={SurveyIntroPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}