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
import { MetricCard } from '../src/components/shared/MetricCard';

const SatelliteScreen = () => {
  const router = useRouter();
  const { colors } = useTheme();
  const { light } = useHaptics();
  const language = useAppStore((state) => state.language);
  const t = translations[language];
  const satelliteData = useDataStore((state) => state.satelliteData);

  const latestData = satelliteData[satelliteData.length - 1];

  const satelliteItems = [
    {
      label: t.lstHeatmap,
      icon: 'thermometer',
      value: `${latestData.lst.toFixed(1)}°C`,
      color: '#DC2626',
      source: 'NASA MODIS MOD11A1',
    },
    {
      label: t.rainfallChart,
      icon: 'cloud-rain',
      value: `${latestData.rainfall.toFixed(0)}mm`,
      color: '#2563EB',
      source: 'TRMM GPM',
    },
    {
      label: t.waterBodyIndex,
      icon: 'water',
      value: latestData.waterBodyIndex.toFixed(2),
      color: '#1A6B3A',
      source: 'JRC GFW',
    },
    {
      label: t.ndvi,
      icon: 'leaf',
      value: latestData.ndvi.toFixed(2),
      color: '#16A34A',
      source: 'NOAA VIIRS',
    },
  ];

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
            {t.satelliteData}
          </Text>
        </View>

        {/* Satellite Data Cards */}
        <View style={{ paddingHorizontal: 16, gap: 12, marginBottom: 24 }}>
          {satelliteItems.map((item, idx) => (
            <View
              key={idx}
              style={{
                backgroundColor: colors.surface,
                borderRadius: 12,
                padding: 16,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: 12,
                }}
              >
                <View>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: '600',
                      color: colors.textSecondary,
                      marginBottom: 4,
                    }}
                  >
                    {item.label}
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: '700',
                      color: item.color,
                    }}
                  >
                    {item.value}
                  </Text>
                </View>
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 8,
                    backgroundColor: item.color + '20',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <MaterialCommunityIcons
                    name={item.icon as any}
                    size={20}
                    color={item.color}
                  />
                </View>
              </View>

              <Text
                style={{
                  fontSize: 10,
                  color: colors.textMuted,
                  marginBottom: 8,
                }}
              >
                Source: {item.source}
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <View
                  style={{
                    backgroundColor: colors.lowMuted,
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    borderRadius: 4,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: '600',
                      color: '#16A34A',
                    }}
                  >
                    {t.live}
                  </Text>
                </View>
                <TouchableOpacity>
                  <MaterialCommunityIcons
                    name="download"
                    size={16}
                    color={colors.primary}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Time Series Data */}
        <SectionHeader title="12-Week Trend" />
        <View style={{ paddingHorizontal: 16, marginBottom: 24 }}>
          <View
            style={{
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
              Chart visualization
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SatelliteScreen;
