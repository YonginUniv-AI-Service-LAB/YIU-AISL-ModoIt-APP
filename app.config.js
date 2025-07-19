import 'dotenv/config';

export default {
  expo: {
    name: 'yiu-modoit-app',
    slug: 'yiu-moduit-app',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    newArchEnabled: true,
    splash: {
      image: './assets/splash-icon.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    ios: {
      supportsTablet: true,
    },
    android: {
      package: "com.bswon33.yiumoduitapp", // ✅ 여기에 추가!
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      edgeToEdgeEnabled: true,
    },
    web: {
      favicon: './assets/favicon.png',
    },
    extra: {
      BASE_URL: process.env.EXPO_PUBLIC_BASE_URL, // 배포를 위해 변경 !
      eas: {
        projectId: '0f94382b-79ae-424d-80c7-4cd07bb41ad2', // 새로 추가 !
      },
    },
  },
};
