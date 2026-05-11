import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../../src/hooks/useTheme';
import { useDataStore } from '../../src/store/useDataStore';
import { useAppStore } from '../../src/store/useAppStore';
import { useHaptics } from '../../src/hooks/useHaptics';
import { translations } from '../../src/constants/translations';
import { MetricCard } from '../../src/components/shared/MetricCard';
import { StatusBadge } from '../../src/components/shared/StatusBadge';
import { SectionHeader } from '../../src/components/shared/SectionHeader';
import { formatDistanceToNow } from 'date-fns';

const AlertsScreen = () => {
  const { colors } = useTheme();
  const { medium, heavy, notification } = useHaptics();
  const language = useAppStore((state) => state.language);
  const t = translations[language];
  const alerts = useDataStore((state) => state.alerts);
  const acknowledgeAlert = useDataStore((state) => state.acknowledgeAlert);
  const deployAlert = useDataStore((state) => state.deployAlert);

  const [severityFilter, setSeverityFilter] = useState<'all' | 'critical' | 'high' | 'moderate'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'acknowledged' | 'deployed' | 'resolved'>('all');

  const filteredAlerts = useMemo(() => {
    return alerts.filter((alert) => {
      const severityMatch = severityFilter === 'all' || alert.severity === severityFilter;
      const statusMatch = statusFilter === 'all' || alert.status === statusFilter;
      return severityMatch && statusMatch;
    });
  }, [alerts, severityFilter, statusFilter]);

  const summaryMetrics = {
    active: alerts.filter((a) => a.status !== 'resolved').length,
    responseRate: Math.round((alerts.filter((a) => a.responseHours !== null).length / alerts.length) * 100),
    avgResponse: (alerts.filter((a) => a.responseHours).reduce((sum, a) => sum + (a.responseHours || 0), 0) / alerts.filter((a) => a.responseHours).length).toFixed(1),
  };

  const renderAlertCard = ({ item }: { item: typeof alerts[0] }) => (
    <View
      style={{
        backgroundColor: colors.surface,
        borderRadius: 12,
        padding: 12,
        marginBottom: 12,
        borderLeftWidth: 4,
        borderLeftColor:
          item.severity === 'critical'
            ? '#DC2626'
            : item.severity === 'high'
            ? '#D97706'
            : '#2563EB',
      }}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
        <Text style={{ fontSize: 10, color: colors.textMuted, fontFamily: 'monospace' }}>
          {item.id}
        </Text>
        <StatusBadge type="alert" value={item.severity} size="small" />
      </View>

      <Text style={{ fontSize: 14, fontWeight: '600', color: colors.text, marginBottom: 4 }}>
        {item.wardName}
      </Text>

      <Text
        style={{ fontSize: 12, color: colors.textSecondary, marginBottom: 8, lineHeight: 18 }}
        numberOfLines={2}
      >
        {item.triggerReason}
      </Text>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 12,
          paddingBottom: 12,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        }}
      >
        <View>
          <Text style={{ fontSize: 10, color: colors.textMuted }}>
            {item.officer} • {formatDistanceToNow(new Date(item.issuedAt), { addSuffix: true })}
          </Text>
          {item.responseHours && (
            <Text style={{ fontSize: 10, color: colors.textSecondary, marginTop: 2 }}>
              Response: {item.responseHours}h
            </Text>
          )}
        </View>
        <StatusBadge type="alert" value={item.status} size="small" />
      </View>

      <View style={{ flexDirection: 'row', gap: 8 }}>
        {item.status !== 'resolved' && item.status !== 'deployed' && (
          <TouchableOpacity
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: '#1A6B3A',
              padding: 8,
              borderRadius: 6,
            }}
            onPress={() => {
              medium();
              acknowledgeAlert(item.id);
            }}
          >
            <Text
              style={{
                fontWeight: '600',
                color: '#1A6B3A',
                fontSize: 12,
                textAlign: 'center',
              }}
            >
              {t.acknowledge}
            </Text>
          </TouchableOpacity>
        )}
        {item.status !== 'resolved' && item.status !== 'deployed' && (
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: '#1A6B3A',
              padding: 8,
              borderRadius: 6,
            }}
            onPress={() => {
              heavy();
              notification('Success');
              deployAlert(item.id);
            }}
          >
            <Text
              style={{
                fontWeight: '600',
                color: '#FFFFFF',
                fontSize: 12,
                textAlign: 'center',
              }}
            >
              {t.deployVectorControl}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Header */}
      <SectionHeader title={t.alertCentre} />

      {/* Summary Metrics */}
      <View style={{ paddingHorizontal: 16, marginBottom: 20, gap: 12 }}>
        <MetricCard icon="alert" label={t.active} value={summaryMetrics.active} color="#DC2626" size="medium" />
        <MetricCard icon="percent" label={t.responseRate} value={`${summaryMetrics.responseRate}%`} color="#1A6B3A" size="medium" />
        <MetricCard icon="clock" label={t.avgResponse} value={`${summaryMetrics.avgResponse}h`} color="#2563EB" size="medium" />
      </View>

      {/* Filters */}
      <View style={{ paddingHorizontal: 16, marginBottom: 16 }}>
        <Text style={{ fontSize: 12, fontWeight: '600', color: colors.textSecondary, marginBottom: 8 }}>
          Severity
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {(['all', 'critical', 'high', 'moderate'] as const).map((sev) => (
            <TouchableOpacity
              key={sev}
              onPress={() => setSeverityFilter(sev)}
              style={{
                backgroundColor:
                  severityFilter === sev
                    ? sev === 'critical'
                      ? '#DC2626'
                      : sev === 'high'
                      ? '#D97706'
                      : sev === 'moderate'
                      ? '#2563EB'
                      : '#1A6B3A'
                    : colors.surfaceAlt,
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 6,
                marginRight: 8,
              }}
            >
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: '600',
                  color: severityFilter === sev ? '#FFFFFF' : colors.text,
                }}
              >
                {sev.charAt(0).toUpperCase() + sev.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Alert List */}
      <View style={{ paddingHorizontal: 16, marginBottom: 24 }}>
        <FlatList
          data={filteredAlerts}
          renderItem={renderAlertCard}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
        />
      </View>
    </ScrollView>
  );
};

export default AlertsScreen;
