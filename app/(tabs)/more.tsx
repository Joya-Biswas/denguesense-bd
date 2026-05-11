import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '../../src/hooks/useTheme';
import { useAppStore } from '../../src/store/useAppStore';
import { useHaptics } from '../../src/hooks/useHaptics';
import { translations } from '../../src/constants/translations';
import { SectionHeader } from '../../src/components/shared/SectionHeader';
import { useDataStore } from '../../src/store/useDataStore';

const MoreScreen = () => {
  const router = useRouter();
  const { colors } = useTheme();
  const { light } = useHaptics();
  const language = useAppStore((state) => state.language);
  const t = translations[language];
  const pipelineStages = useDataStore((state) => state.pipelineStages);

  const menuItems = [
    {
      label: t.satelliteData,
      icon: 'satellite-variant',
      route: '/satellite',
    },
    {
      label: t.interventionTracker,
      icon: 'spray-bottle',
      route: '/interventions',
    },
    {
      label: t.analyticsReports,
      icon: 'chart-box-multiple-outline',
      route: '/analytics',
    },
    {
      label: t.settings,
      icon: 'cog',
      route: '/settings',
    },
  ];

  const handleNavigation = (route: string) => {
    light();
    router.push(route as any);
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Header */}
      <SectionHeader title={t.more} />

      {/* Menu Items */}
      <View style={{ paddingHorizontal: 16, marginBottom: 24, gap: 12 }}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.route}
            onPress={() => handleNavigation(item.route)}
            style={{
              backgroundColor: colors.surface,
              borderRadius: 12,
              padding: 16,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 8,
                  backgroundColor: colors.primaryMuted,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <MaterialCommunityIcons name={item.icon as any} size={20} color="#1A6B3A" />
              </View>
              <Text style={{ fontSize: 14, fontWeight: '600', color: colors.text }}>
                {item.label}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
          </TouchableOpacity>
        ))}
      </View>

      {/* System Health */}
      <SectionHeader title="System Health" />
      <View style={{ paddingHorizontal: 16, marginBottom: 24 }}>
        {pipelineStages.map((stage) => (
          <View
            key={stage.name}
            style={{
              backgroundColor: colors.surface,
              borderRadius: 8,
              padding: 12,
              marginBottom: 8,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <View
              style={{
                width: 12,
                height: 12,
                borderRadius: 6,
                backgroundColor:
                  stage.status === 'healthy'
                    ? '#16A34A'
                    : stage.status === 'warning'
                    ? '#D97706'
                    : '#9CA3AF',
              }}
            />
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 12, fontWeight: '600', color: colors.text }}>
                {stage.name}
              </Text>
              <Text style={{ fontSize: 10, color: colors.textMuted, marginTop: 2 }}>
                Last run: {stage.lastRun} • {stage.latency}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default MoreScreen;
