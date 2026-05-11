import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  Modal,
} from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../src/hooks/useTheme';
import { useDataStore } from '../../src/store/useDataStore';
import { useAppStore } from '../../src/store/useAppStore';
import { useHaptics } from '../../src/hooks/useHaptics';
import { translations } from '../../src/constants/translations';
import { MetricCard } from '../../src/components/shared/MetricCard';
import { StatusBadge } from '../../src/components/shared/StatusBadge';
import { SectionHeader } from '../../src/components/shared/SectionHeader';

const RiskMapScreen = () => {
  const { colors } = useTheme();
  const { light, medium } = useHaptics();
  const language = useAppStore((state) => state.language);
  const t = translations[language];
  const wards = useDataStore((state) => state.wards);
  const refreshData = useDataStore((state) => state.refreshData);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedWardId, setSelectedWardId] = useState<string | null>(null);
  const [city, setCity] = useState<'dhaka' | 'chattogram' | 'sylhet'>('dhaka');

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      refreshData();
      setRefreshing(false);
    }, 1500);
  }, [refreshData]);

  const selectedWard = wards.find((w) => w.id === selectedWardId);
  const criticalCount = wards.filter((w) => w.riskLevel === 'critical').length;
  const highCount = wards.filter((w) => w.riskLevel === 'high').length;

  const renderWardCard = useCallback(
    ({ item }: { item: typeof wards[0] }) => (
      <TouchableOpacity
        style={{
          flex: 0.5,
          margin: 8,
          borderRadius: 12,
          overflow: 'hidden',
          backgroundColor: colors.surface,
          borderLeftWidth: 4,
          borderLeftColor:
            item.riskLevel === 'critical'
              ? '#DC2626'
              : item.riskLevel === 'high'
              ? '#D97706'
              : item.riskLevel === 'moderate'
              ? '#2563EB'
              : '#16A34A',
        }}
        onPress={() => {
          light();
          setSelectedWardId(item.id);
        }}
        activeOpacity={0.85}
      >
        <View style={{ padding: 12 }}>
          <Text
            style={{
              fontSize: 12,
              fontWeight: '600',
              color: colors.text,
              marginBottom: 8,
            }}
          >
            {item.name}
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '700',
              color:
                item.riskLevel === 'critical'
                  ? '#DC2626'
                  : item.riskLevel === 'high'
                  ? '#D97706'
                  : item.riskLevel === 'moderate'
                  ? '#2563EB'
                  : '#16A34A',
            }}
          >
            {item.riskScore}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 8,
            }}
          >
            <View
              style={{
                backgroundColor:
                  item.riskLevel === 'critical'
                    ? '#FEE2E2'
                    : item.riskLevel === 'high'
                    ? '#FEF3C7'
                    : item.riskLevel === 'moderate'
                    ? '#DBEAFE'
                    : '#DCFCE7',
                paddingHorizontal: 6,
                paddingVertical: 2,
                borderRadius: 4,
              }}
            >
              <Text style={{ fontSize: 10, fontWeight: '600', color: colors.text }}>
                {item.casesThisWeek} cases
              </Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialCommunityIcons
                name={
                  item.trend === 'rising'
                    ? 'trending-up'
                    : item.trend === 'falling'
                    ? 'trending-down'
                    : 'minus'
                }
                size={14}
                color={
                  item.trend === 'rising'
                    ? '#DC2626'
                    : item.trend === 'falling'
                    ? '#16A34A'
                    : '#6B7280'
                }
              />
              <Text style={{ fontSize: 10, color: colors.textSecondary, marginLeft: 4 }}>
                {item.trend}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    ),
    [colors, light]
  );

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={{ flex: 1, backgroundColor: colors.background }}
    >
      {/* Header */}
      <View style={{ padding: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <MaterialCommunityIcons name="hospital-box" size={28} color="#1A6B3A" />
          <Text
            style={{
              fontSize: 20,
              fontWeight: '700',
              color: colors.text,
            }}
          >
            {t.appName}
          </Text>
        </View>
        <TouchableOpacity onPress={() => light()}>
          <Ionicons name="notifications" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* City Selector */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ paddingHorizontal: 16, marginBottom: 16 }}
      >
        {(['dhaka', 'chattogram', 'sylhet'] as const).map((c) => (
          <TouchableOpacity
            key={c}
            onPress={() => setCity(c)}
            style={{
              backgroundColor: city === c ? '#1A6B3A' : colors.surfaceAlt,
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderRadius: 20,
              marginRight: 8,
            }}
          >
            <Text
              style={{
                color: city === c ? '#FFFFFF' : colors.text,
                fontWeight: '600',
                fontSize: 12,
              }}
            >
              {c === 'dhaka' ? t.dhaka : c === 'chattogram' ? t.chattogram : t.sylhet}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Summary Metrics */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingHorizontal: 16, marginBottom: 20 }}>
        <View style={{ flexDirection: 'row', gap: 12 }}>
          <MetricCard
            icon="map-marker"
            label={t.monitored}
            value={wards.length}
            color="#1A6B3A"
            size="small"
          />
          <MetricCard icon="alert-circle" label={t.critical} value={criticalCount} color="#DC2626" size="small" />
          <MetricCard icon="alert" label={t.high} value={highCount} color="#D97706" size="small" />
          <MetricCard icon="chart-line" label={t.auroc} value="0.91" color="#2563EB" size="small" />
        </View>
      </ScrollView>

      {/* Ward Grid */}
      <SectionHeader title={t.riskMap} subtitle="All 48 wards" />
      <FlatList
        data={wards}
        renderItem={renderWardCard}
        keyExtractor={(item) => item.id}
        numColumns={2}
        scrollEnabled={false}
        contentContainerStyle={{ paddingHorizontal: 8, paddingBottom: 24 }}
      />

      {/* Ward Detail Modal */}
      <Modal visible={selectedWardId !== null} animationType="slide" transparent>
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: colors.surface,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              padding: 20,
              maxHeight: '80%',
            }}
          >
            <TouchableOpacity
              onPress={() => setSelectedWardId(null)}
              style={{ marginBottom: 16 }}
            >
              <Ionicons name="close" size={24} color={colors.text} />
            </TouchableOpacity>

            {selectedWard && (
              <ScrollView>
                <View style={{ marginBottom: 16 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                    <Text style={{ fontSize: 18, fontWeight: '700', color: colors.text }}>
                      {selectedWard.name}
                    </Text>
                    <StatusBadge type="risk" value={selectedWard.riskLevel} />
                  </View>
                </View>

                <MetricCard
                  icon="virus"
                  label={t.casesThisWeek}
                  value={selectedWard.casesThisWeek}
                  color="#DC2626"
                  size="large"
                />
                <View style={{ marginVertical: 12 }} />
                <MetricCard
                  icon="chart-line"
                  label={t.casesLastWeek}
                  value={selectedWard.casesLastWeek}
                  color="#D97706"
                  size="large"
                />
                <View style={{ marginVertical: 12 }} />
                <MetricCard
                  icon="people"
                  label={t.population}
                  value={`${(selectedWard.population / 1000).toFixed(0)}K`}
                  color="#2563EB"
                  size="large"
                />
                <View style={{ marginVertical: 12 }} />
                <MetricCard
                  icon="account-multiple"
                  label={t.activeCHWs}
                  value={selectedWard.chwCount}
                  color="#1A6B3A"
                  size="large"
                />

                <Text
                  style={{
                    fontSize: 12,
                    color: colors.textSecondary,
                    marginVertical: 12,
                  }}
                >
                  Model Confidence: {selectedWard.confidence.toFixed(1)}%
                </Text>

                <View style={{ flexDirection: 'row', gap: 12, marginTop: 16 }}>
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      backgroundColor: '#DC2626',
                      padding: 12,
                      borderRadius: 8,
                    }}
                    onPress={() => {
                      medium();
                      setSelectedWardId(null);
                    }}
                  >
                    <Text style={{ color: '#FFFFFF', fontWeight: '600', textAlign: 'center' }}>
                      {t.triggerAlert}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      backgroundColor: '#1A6B3A',
                      padding: 12,
                      borderRadius: 8,
                    }}
                    onPress={() => {
                      medium();
                      setSelectedWardId(null);
                    }}
                  >
                    <Text style={{ color: '#FFFFFF', fontWeight: '600', textAlign: 'center' }}>
                      {t.scheduleForgging}
                    </Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default RiskMapScreen;
