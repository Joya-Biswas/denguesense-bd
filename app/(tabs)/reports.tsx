import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  TextInput,
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

const ReportsScreen = () => {
  const { colors } = useTheme();
  const { medium } = useHaptics();
  const language = useAppStore((state) => state.language);
  const t = translations[language];
  const chwReports = useDataStore((state) => state.chwReports);
  const addCHWReport = useDataStore((state) => state.addCHWReport);
  const [searchText, setSearchText] = useState('');

  const filteredReports = useMemo(() => {
    return chwReports.filter((report) =>
      report.ward.toLowerCase().includes(searchText.toLowerCase()) ||
      report.chwName.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [chwReports, searchText]);

  const stats = {
    total: chwReports.length,
    submitted: chwReports.filter((r) => r.status === 'submitted').length,
    pending: chwReports.filter((r) => r.status === 'pending').length,
    overdue: chwReports.filter((r) => r.status === 'overdue').length,
    alerts: chwReports.filter((r) => r.alertTriggered).length,
  };

  const simulateNewReport = () => {
    medium();
    const newReport = {
      id: `report-${Date.now()}`,
      chwName: 'New CHW',
      ward: 'Mirpur-10',
      timestamp: new Date().toISOString(),
      feverCases: Math.floor(Math.random() * 20) + 1,
      dengueSuspect: Math.floor(Math.random() * 8),
      status: 'submitted' as const,
      alertTriggered: Math.random() > 0.7,
    };
    addCHWReport(newReport);
  };

  const renderReportRow = ({ item }: { item: typeof chwReports[0] }) => (
    <View
      style={{
        backgroundColor: colors.surface,
        padding: 12,
        borderRadius: 8,
        marginBottom: 8,
        borderLeftWidth: 3,
        borderLeftColor: item.alertTriggered ? '#DC2626' : colors.border,
      }}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
        <View>
          <Text style={{ fontSize: 12, fontWeight: '600', color: colors.text }}>
            {item.chwName}
          </Text>
          <Text style={{ fontSize: 11, color: colors.textSecondary, marginTop: 2 }}>
            {item.ward}
          </Text>
        </View>
        <View>
          <Text style={{ fontSize: 10, color: colors.textMuted, textAlign: 'right' }}>
            {formatDistanceToNow(new Date(item.timestamp), { addSuffix: true })}
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          gap: 12,
          marginBottom: 8,
          paddingBottom: 8,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        }}
      >
        <View
          style={{
            backgroundColor: colors.surfaceAlt,
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 4,
          }}
        >
          <Text style={{ fontSize: 10, color: colors.text, fontWeight: '500' }}>
            {t.fever}: {item.feverCases}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: colors.surfaceAlt,
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 4,
          }}
        >
          <Text style={{ fontSize: 10, color: colors.text, fontWeight: '500' }}>
            {t.dengue}: {item.dengueSuspect}
          </Text>
        </View>
        {item.alertTriggered && (
          <View
            style={{
              backgroundColor: '#FEE2E2',
              paddingHorizontal: 8,
              paddingVertical: 4,
              borderRadius: 4,
            }}
          >
            <Text style={{ fontSize: 10, color: '#DC2626', fontWeight: '600' }}>
              Alert
            </Text>
          </View>
        )}
      </View>

      <StatusBadge type="chw" value={item.status} size="small" />
    </View>
  );

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Header */}
      <SectionHeader title={t.chwReports} />

      {/* Summary Metrics */}
      <View style={{ paddingHorizontal: 16, marginBottom: 20, gap: 12 }}>
        <MetricCard
          icon="account-multiple"
          label="Total Reports"
          value={stats.total}
          color="#1A6B3A"
          size="medium"
        />
        <MetricCard
          icon="check"
          label="Submitted"
          value={stats.submitted}
          color="#16A34A"
          size="medium"
        />
        <MetricCard icon="alert" label="Alerts" value={stats.alerts} color="#DC2626" size="medium" />
      </View>

      {/* Search Bar */}
      <View style={{ paddingHorizontal: 16, marginBottom: 16 }}>
        <View
          style={{
            backgroundColor: colors.surface,
            borderRadius: 8,
            paddingHorizontal: 12,
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: colors.border,
          }}
        >
          <MaterialCommunityIcons name="magnify" size={18} color={colors.textMuted} />
          <TextInput
            placeholder="Search CHW or ward..."
            value={searchText}
            onChangeText={setSearchText}
            style={{
              flex: 1,
              paddingVertical: 10,
              paddingHorizontal: 8,
              color: colors.text,
            }}
            placeholderTextColor={colors.textMuted}
          />
        </View>
      </View>

      {/* Report List */}
      <View style={{ paddingHorizontal: 16, marginBottom: 24 }}>
        <FlatList
          data={filteredReports}
          renderItem={renderReportRow}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
        />
      </View>

      {/* Simulate New Report Button */}
      <TouchableOpacity
        onPress={simulateNewReport}
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
        <MaterialCommunityIcons name="plus" size={20} color="#FFFFFF" />
        <Text style={{ color: '#FFFFFF', fontWeight: '600', fontSize: 14 }}>
          {t.simulateNewReport}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ReportsScreen;
