import { View } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { AppProvider } from '../src/context/AppContext';
import WelcomeBackBanner from '../src/components/WelcomeBackBanner';

export default function RootLayout() {
  return (
    <AppProvider>
      <StatusBar style="dark" />
      <View style={{ flex: 1 }}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
        </Stack>
        <WelcomeBackBanner />
      </View>
    </AppProvider>
  );
}
