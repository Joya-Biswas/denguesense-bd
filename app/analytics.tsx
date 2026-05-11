import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '../src/hooks/useTheme';
import { useAppStore } from '../src/store/useAppStore';
import { useDataStore } from '../src/store/useDataStore';
import { useHaptics } from '../src/hooks/useHaptics';
import { translations } from '../src/constants/translations';
import { SectionHeader } from '../src/components/shared/SectionHeader';

const AnalyticsScreen = () => {
  const router = useRouter();
  const { colors } = useTheme();
  const { light } = useHaptics();
  const language = useAppStore((state) => state.language);
  const t = translations[language];
  const demographicData = useDataStore((state) => state.seasonData[0]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView>
        {/* Header with Back Button */}
        <View
          style={{
            padding: 16,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              light();
              router.back();
            }}
          >
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={{ fontSize: 20, fontWeight: '700', color: colors.text }}>
            {t.analyticsReports}
          </Text>
        </View>

        {/* Season Comparison */}
        <SectionHeader title={t.seasonComparison} />
        <View
          style={{
            marginHorizontal: 16,
            marginBottom: 24,
            backgroundColor: colors.surface,
            borderRadius: 12,
            padding: 16,
            height: 220,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <MaterialCommunityIcons
            name="chart-line"
            size={48}
            color={colors.textMuted}
          />
          <Text
            style={{
              color: colors.textSecondary,
              marginTop: 12,
              fontSize: 12,
            }}
          >
            5-year seasonal trend 2022-2026
          </Text>
        </View>

        {/* Contribution Calendar */}
        <SectionHeader title={t.contributionCalendar} />
        <View
          style={{
            marginHorizontal: 16,
            marginBottom: 24,
            backgroundColor: colors.surface,
            borderRadius: 12,
            padding: 16,
            height: 280,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <MaterialCommunityIcons
            name="calendar"
            size={48}
            color={colors.textMuted}
          />
          <Text
            style={{
              color: colors.textSecondary,
              marginTop: 12,
              fontSize: 12,
            }}
          >
            365-day contribution grid
          </Text>
        </View>

        {/* City Comparison */}
        <SectionHeader title={t.cityComparison} />
        <View
          style={{
            marginHorizontal: 16,
            marginBottom: 24,
            backgroundColor: colors.surface,
            borderRadius: 12,
            padding: 16,
            height: 200,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <MaterialCommunityIcons
            name="chart-bar-stacked"
            size={48}
            color={colors.textMuted}
          />
          <Text
            style={{
              color: colors.textSecondary,
              marginTop: 12,
              fontSize: 12,
            }}
          >
            Dhaka vs Chattogram vs Sylhet
          </Text>
        </View>

        {/* Demographic Breakdown */}
        <SectionHeader title={t.demographicDonut} />
        <View
          style={{
            marginHorizontal: 16,
            marginBottom: 24,
            backgroundColor: colors.surface,
            borderRadius: 12,
            padding: 16,
            height: 200,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <MaterialCommunityIcons
            name="chart-donut"
            size={48}
            color={colors.textMuted}
          />
          <Text
            style={{
              color: colors.textSecondary,
              marginTop: 12,
              fontSize: 12,
            }}
          >
            Age group distribution
          </Text>
        </View>

        {/* Model Drift Monitor */}
        <SectionHeader title={t.modelDriftMonitor} />
        <View
          style={{
            marginHorizontal: 16,
            marginBottom: 24,
            backgroundColor: colors.surface,
            borderRadius: 12,
            padding: 16,
            height: 200,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <MaterialCommunityIcons
            name="chart-line"
            size={48}
            color={colors.textMuted}
          />
          <Text
            style={{
              color: colors.textSecondary,
              marginTop: 12,
              fontSize: 12,
            }}
          >
            AUROC trend with retrain threshold
          </Text>
        </View>

        {/* Generate Report */}
        <TouchableOpacity
          style={{
            marginHorizontal: 16,
            marginBottom: 24,
            backgroundColor: '#1A6B3A',
            padding: 16,
            borderRadius: 12,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <MaterialCommunityIcons name="download" size={20} color="#FFFFFF" />
          <Text style={{ color: '#FFFFFF', fontWeight: '600', fontSize: 14 }}>
            {t.generateReport}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AnalyticsScreen;
