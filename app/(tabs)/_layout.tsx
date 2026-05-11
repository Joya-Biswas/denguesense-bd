import React from 'react';
import { Tabs } from 'expo-router';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../src/hooks/useTheme';
import { useDataStore } from '../../src/store/useDataStore';
import { translations } from '../../src/constants/translations';
import { useAppStore } from '../../src/store/useAppStore';

export default function TabsLayout() {
  const { colors } = useTheme();
  const language = useAppStore((state) => state.language);
  const t = translations[language];
  const activeAlerts = useDataStore((state) => state.alerts.filter(a => a.status === 'pending').length);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: 'rgba(255,255,255,0.5)',
        tabBarStyle: {
          backgroundColor: '#1A6B3A',
          borderTopWidth: 0,
          height: 64,
          paddingBottom: 8,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t.riskMap,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="map-marker-radius" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="forecast"
        options={{
          title: t.forecast,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="chart-line" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="alerts"
        options={{
          title: t.alerts,
          tabBarIcon: ({ color }) => (
            <Ionicons name="notifications" size={24} color={color} />
          ),
          tabBarBadge: activeAlerts > 0 ? activeAlerts : undefined,
        }}
      />
      <Tabs.Screen
        name="reports"
        options={{
          title: t.chwReports,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account-group" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: t.more,
          tabBarIcon: ({ color }) => (
            <Ionicons name="grid" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
