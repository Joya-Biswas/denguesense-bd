import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Modal,
  ActivityIndicator,
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
import { StatusBadge } from '../src/components/shared/StatusBadge';

const InterventionsScreen = () => {
  const router = useRouter();
  const { colors } = useTheme();
  const { light, medium } = useHaptics();
  const language = useAppStore((state) => state.language);
  const t = translations[language];
  const interventions = useDataStore((state) => state.interventions);
  const addIntervention = useDataStore((state) => state.addIntervention);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const renderInterventionCard = ({ item }: { item: typeof interventions[0] }) => (
    <View
      style={{
        backgroundColor: colors.surface,
        borderRadius: 12,
        padding: 12,
        marginBottom: 12,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 8,
        }}
      >
        <Text style={{ fontSize: 11, color: colors.textMuted, fontFamily: 'monospace' }}>
          {item.id}
        </Text>
        <StatusBadge type="intervention" value={item.status} size="small" />
      </View>

      <Text style={{ fontSize: 13, fontWeight: '600', color: colors.text, marginBottom: 4 }}>
        {item.ward}
      </Text>

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
            {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
          </Text>
        </View>
        <Text style={{ fontSize: 10, color: colors.textSecondary }}>
          {item.date}
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 8,
        }}
      >
        <Text style={{ fontSize: 10, color: colors.textMuted }}>
          {item.areaCovered} km² • {item.coveragePercent}%
        </Text>
        <Text style={{ fontSize: 10, fontWeight: '600', color: colors.text }}>
          ৳{item.costBDT.toLocaleString()}
        </Text>
      </View>

      <Text style={{ fontSize: 10, color: colors.textSecondary }}>
        Est. {item.casesAvertedEst} cases averted
      </Text>
    </View>
  );

  const handleScheduleOp = () => {
    light();
    setShowModal(true);
  };

  const confirmOperation = () => {
    medium();
    setLoading(true);
    setTimeout(() => {
      const newIntervention = {
        id: `intervention-${Date.now()}`,
        ward: 'Mirpur-10',
        date: new Date().toISOString().split('T')[0],
        type: 'fogging' as const,
        status: 'scheduled' as const,
        areaCovered: 2.5,
        coveragePercent: 75,
        team: 'Team Alpha',
        costBDT: 125000,
        casesAvertedEst: 25,
      };
      addIntervention(newIntervention);
      setLoading(false);
      setShowModal(false);
    }, 1500);
  };

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
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={{ fontSize: 20, fontWeight: '700', color: colors.text }}>
            {t.interventionTracker}
          </Text>
        </View>

        {/* Summary Metrics */}
        <View style={{ paddingHorizontal: 16, marginBottom: 20, gap: 12 }}>
          <MetricCard
            icon="spray-bottle"
            label="Ops This Month"
            value={interventions.length}
            color="#D97706"
            size="medium"
          />
          <MetricCard
            icon="currency-usd"
            label="Total Cost"
            value="৳4.8L"
            color="#2563EB"
            size="medium"
          />
        </View>

        {/* Coverage Bars */}
        <SectionHeader title="Type Coverage" />
        <View style={{ paddingHorizontal: 16, marginBottom: 20 }}>
          {[
            { type: 'Fogging', coverage: 68 },
            { type: 'Larvicide', coverage: 45 },
            { type: 'Awareness', coverage: 82 },
          ].map((item, idx) => (
            <View key={idx} style={{ marginBottom: 12 }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 6,
                }}
              >
                <Text style={{ fontSize: 12, color: colors.text, fontWeight: '500' }}>
                  {item.type}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '600',
                    color: colors.primary,
                  }}
                >
                  {item.coverage}%
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
                    backgroundColor: '#1A6B3A',
                    width: `${item.coverage}%`,
                  }}
                />
              </View>
            </View>
          ))}
        </View>

        {/* Operations List */}
        <SectionHeader title="Recent Operations" />
        <View style={{ paddingHorizontal: 16, marginBottom: 24 }}>
          <FlatList
            data={interventions.slice(0, 8)}
            renderItem={renderInterventionCard}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>

      {/* FAB - Schedule Operation */}
      <TouchableOpacity
        onPress={handleScheduleOp}
        style={{
          position: 'absolute',
          bottom: 24,
          right: 24,
          width: 56,
          height: 56,
          borderRadius: 28,
          backgroundColor: '#1A6B3A',
          justifyContent: 'center',
          alignItems: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 4,
          elevation: 5,
        }}
      >
        <Ionicons name="add" size={28} color="#FFFFFF" />
      </TouchableOpacity>

      {/* Schedule Modal */}
      <Modal visible={showModal} animationType="fade" transparent>
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }}>
          <View
            style={{
              backgroundColor: colors.surface,
              borderRadius: 12,
              padding: 20,
              width: '85%',
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: '700', color: colors.text, marginBottom: 16 }}>
              {t.scheduleOperation}
            </Text>

            {loading && (
              <View style={{ alignItems: 'center', paddingVertical: 20 }}>
                <ActivityIndicator size="large" color="#1A6B3A" />
                <Text style={{ color: colors.textSecondary, marginTop: 12, fontSize: 12 }}>
                  Scheduling operation...
                </Text>
              </View>
            )}

            {!loading && (
              <>
                <Text style={{ fontSize: 12, color: colors.textSecondary, marginBottom: 16 }}>
                  Select ward, type, date, and team to schedule a new vector control operation.
                </Text>

                <View
                  style={{
                    flexDirection: 'row',
                    gap: 12,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => setShowModal(false)}
                    style={{
                      flex: 1,
                      borderWidth: 1,
                      borderColor: colors.border,
                      padding: 12,
                      borderRadius: 8,
                    }}
                  >
                    <Text
                      style={{
                        color: colors.text,
                        fontWeight: '600',
                        textAlign: 'center',
                        fontSize: 12,
                      }}
                    >
                      {t.cancel}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={confirmOperation}
                    style={{
                      flex: 1,
                      backgroundColor: '#1A6B3A',
                      padding: 12,
                      borderRadius: 8,
                    }}
                  >
                    <Text
                      style={{
                        color: '#FFFFFF',
                        fontWeight: '600',
                        textAlign: 'center',
                        fontSize: 12,
                      }}
                    >
                      {t.confirm}
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default InterventionsScreen;
