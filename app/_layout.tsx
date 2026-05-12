import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as SplashScreen from 'expo-splash-screen';
import { Stack } from 'expo-router';
import { useTheme } from '../src/hooks/useTheme';
import { useDataLoader } from '../src/hooks/useDataLoader';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { colors } = useTheme();

  // Fetch live data from backend (Open-Meteo + NASA POWER + ML model)
  useDataLoader();

  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="satellite" />
        <Stack.Screen name="interventions" />
        <Stack.Screen name="analytics" />
        <Stack.Screen name="settings" />
      </Stack>
    </GestureHandlerRootView>
  );
}
