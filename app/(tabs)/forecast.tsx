import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../../src/hooks/useTheme';
import { useDataStore } from '../../src/store/useDataStore';
import { useAppStore } from '../../src/store/useAppStore';
import { useHaptics } from '../../src/hooks/useHaptics';
import { translations } from '../../src/constants/translations';
import { MetricCard } from '../../src/components/shared/MetricCard';
import { SectionHeader } from '../../src/components/shared/SectionHeader';

const ForecastScreen = () => {
  const { colors } = useTheme();
  const { light } = useHaptics();
  const language = useAppStore((state) => state.language);
  const t = translations[language];
  const selectedHorizon = useDataStore((state) => state.selectedForecastHorizon);
  const setSelectedHorizon = useDataStore((state) => state.setSelectedForecastHorizon);
  const forecasts = useDataStore((state) => state.forecasts);
  const [loading, setLoading] = useState(false);

  const currentForecast = forecasts[selectedHorizon];

  const runNewForecast = async () => {
    light();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Header */}
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 20, fontWeight: '700', color: colors.text }}>
          {t.aiForcastEngine}
        </Text>
        <Text style={{ fontSize: 13, color: colors.textSecondary, marginTop: 4 }}>
          {t.monsoonSeason2026}
        </Text>
      </View>

      {/* Horizon Selector */}
      <View style={{ paddingHorizontal: 16, marginBottom: 20 }}>
        <View style={{ flexDirection: 'row', gap: 12 }}>
          {(['7day', '14day', '21day'] as const).map((h) => (
            <TouchableOpacity
              key={h}
              onPress={() => {
                light();
                setSelectedHorizon(h);
              }}
              style={{
                flex: 1,
                backgroundColor: selectedHorizon === h ? '#1A6B3A' : colors.surfaceAlt,
                padding: 12,
                borderRadius: 8,
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  fontWeight: '600',
                  color: selectedHorizon === h ? '#FFFFFF' : colors.text,
                  fontSize: 12,
                }}
              >
                {h === '7day' ? t.day7 : h === '14day' ? t.day14 : t.day21}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Forecast Chart Placeholder */}
      <View
        style={{
          marginHorizontal: 16,
          marginBottom: 20,
          backgroundColor: colors.surface,
          borderRadius: 12,
          padding: 16,
          height: 250,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {loading ? (
          <ActivityIndicator size="large" color="#1A6B3A" />
        ) : (
          <View style={{ alignItems: 'center' }}>
            <MaterialCommunityIcons name="chart-line" size={48} color={colors.textMuted} />
            <Text style={{ color: colors.textSecondary, marginTop: 12, fontSize: 12 }}>
              Forecast chart - {selectedHorizon === '7day' ? '7 weeks' : selectedHorizon === '14day' ? '14 weeks' : '21 weeks'}
            </Text>
            <Text style={{ color: colors.textMuted, fontSize: 11, marginTop: 8 }}>
              {currentForecast.data[currentForecast.data.length - 1]?.predicted || 0} predicted cases
            </Text>
          </View>
        )}
      </View>

      {/* Model Performance */}
      <SectionHeader title={t.modelPerformance} />
      <View style={{ paddingHorizontal: 16, gap: 12, marginBottom: 20 }}>
        <MetricCard
          icon="chart-box"
          label="AUROC"
          value={currentForecast.auroc.toFixed(2)}
          color="#1A6B3A"
          size="medium"
        />
        <MetricCard
          icon="eye"
          label={t.sensitivity}
          value={`${currentForecast.sensitivity.toFixed(1)}%`}
          color="#2563EB"
          size="medium"
        />
        <MetricCard
          icon="target"
          label={t.specificity}
          value={`${currentForecast.specificity.toFixed(1)}%`}
          color="#D97706"
          size="medium"
        />
        <MetricCard
          icon="function"
          label={t.f1Score}
          value={currentForecast.f1Score.toFixed(2)}
          color="#16A34A"
          size="medium"
        />
      </View>

      {/* Feature Importance */}
      <SectionHeader title="Feature Importance" />
      <View style={{ paddingHorizontal: 16, marginBottom: 24 }}>
        {[
          { name: 'LST Anomaly', importance: 28 },
          { name: 'Rainfall', importance: 22 },
          { name: 'Population Density', importance: 18 },
          { name: 'CHW Reports', importance: 16 },
          { name: 'NDVI', importance: 10 },
          { name: 'Water Bodies', importance: 6 },
        ].map((feature) => (
          <View key={feature.name} style={{ marginBottom: 12 }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 6,
              }}
            >
              <Text style={{ fontSize: 12, color: colors.text, fontWeight: '500' }}>
                {feature.name}
              </Text>
              <Text style={{ fontSize: 12, fontWeight: '600', color: colors.textSecondary }}>
                {feature.importance}%
              </Text>
            </View>
            <View
              style={{
                height: 6,
                backgroundColor: colors.surfaceAlt,
                borderRadius: 3,
                overflow: 'hidden',
              }}
            >
              <View
                style={{
                  height: '100%',
                  backgroundColor: `rgba(26, 107, 58, ${0.3 + (feature.importance / 100) * 0.7})`,
                  width: `${feature.importance}%`,
                }}
              />
            </View>
          </View>
        ))}
      </View>

      {/* Run New Forecast */}
      <TouchableOpacity
        onPress={runNewForecast}
        disabled={loading}
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
        {loading && <ActivityIndicator color="#FFFFFF" size="small" />}
        <Text style={{ color: '#FFFFFF', fontWeight: '600', fontSize: 14 }}>
          {t.runNewForecast}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ForecastScreen;
