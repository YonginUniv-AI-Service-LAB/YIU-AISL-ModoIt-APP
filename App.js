import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from './pages/Splash/SplashScreen';
import LoginPage from './pages/Login/LoginPage';
import SurveyIntroPage from './pages/Survey/SurveyIntroPage';
import SurveyEmotionPage from './pages/Survey/SurveyEmotionPage';
import SurveyImprovementPage from './pages/Survey/SurveyImprovementPage';
import SurveyStrengthPage from './pages/Survey/SurveyStrengthPage';
import MainPage from './pages/Main/MainPage';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="SurveyIntro" component={SurveyIntroPage} />
        <Stack.Screen name="SurveyEmotion" component={SurveyEmotionPage} />
        <Stack.Screen
          name="SurveyImprovement"
          component={SurveyImprovementPage}
        />
        <Stack.Screen name="SurveyStrength" component={SurveyStrengthPage} />
        <Stack.Screen name="MainPage" component={MainPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
