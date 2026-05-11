import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Switch,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '../src/hooks/useTheme';
import { useAppStore } from '../src/store/useAppStore';
import { useHaptics } from '../src/hooks/useHaptics';
import { translations } from '../src/constants/translations';
import { SectionHeader } from '../src/components/shared/SectionHeader';

const SettingsScreen = () => {
  const router = useRouter();
  const { colors } = useTheme();
  const { light, medium } = useHaptics();
  const language = useAppStore((state) => state.language);
  const setLanguage = useAppStore((state) => state.setLanguage);
  const t = translations[language];

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [dataSourcesEnabled, setDataSourcesEnabled] = useState<Record<string, boolean>>({
    satellite: true,
    chw: true,
    weather: true,
  });
  const [showRetraining, setShowRetraining] = useState(false);
  const [retrainingProgress, setRetrainingProgress] = useState(0);

  const handleLanguageChange = (lang: 'en' | 'bn') => {
    light();
    setLanguage(lang);
  };

  const handleRetrain = () => {
    medium();
    setShowRetraining(true);
    setRetrainingProgress(0);

    const interval = setInterval(() => {
      setRetrainingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setShowRetraining(false), 500);
          return 100;
        }
        return prev + Math.random() * 20;
      });
    }, 600);
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
            marginBottom: 8,
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
            {t.settings}
          </Text>
        </View>

        {/* Data Sources */}
        <SectionHeader title={t.dataSources} />
        <View style={{ paddingHorizontal: 16, marginBottom: 24 }}>
          {[
            { key: 'satellite', label: 'Satellite Data' },
            { key: 'chw', label: 'CHW Reports' },
            { key: 'weather', label: 'Weather Data' },
          ].map((source) => (
            <View
              key={source.key}
              style={{
                backgroundColor: colors.surface,
                borderRadius: 8,
                padding: 12,
                marginBottom: 8,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Text style={{ fontSize: 13, color: colors.text, fontWeight: '500' }}>
                {source.label}
              </Text>
              <Switch
                value={dataSourcesEnabled[source.key]}
                onValueChange={(val) => {
                  light();
                  setDataSourcesEnabled({
                    ...dataSourcesEnabled,
                    [source.key]: val,
                  });
                }}
              />
            </View>
          ))}
        </View>

        {/* Notifications */}
        <SectionHeader title={t.notifications} />
        <View style={{ paddingHorizontal: 16, marginBottom: 24 }}>
          <View
            style={{
              backgroundColor: colors.surface,
              borderRadius: 8,
              padding: 12,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: 13, color: colors.text, fontWeight: '500' }}>
              {t.pushNotifications}
            </Text>
            <Switch
              value={notificationsEnabled}
              onValueChange={(val) => {
                light();
                setNotificationsEnabled(val);
              }}
            />
          </View>
        </View>

        {/* Language Selection */}
        <SectionHeader title={t.language} />
        <View style={{ paddingHorizontal: 16, marginBottom: 24, gap: 12 }}>
          <TouchableOpacity
            onPress={() => handleLanguageChange('en')}
            style={{
              backgroundColor: language === 'en' ? '#1A6B3A' : colors.surface,
              borderRadius: 8,
              padding: 16,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: '600',
                color: language === 'en' ? '#FFFFFF' : colors.text,
                textAlign: 'center',
              }}
            >
              {t.english}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleLanguageChange('bn')}
            style={{
              backgroundColor: language === 'bn' ? '#1A6B3A' : colors.surface,
              borderRadius: 8,
              padding: 16,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: '600',
                color: language === 'bn' ? '#FFFFFF' : colors.text,
                textAlign: 'center',
              }}
            >
              {t.bengali}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Model Management */}
        <SectionHeader title={t.modelManagement} />
        <View style={{ paddingHorizontal: 16, marginBottom: 24 }}>
          <TouchableOpacity
            onPress={handleRetrain}
            style={{
              backgroundColor: '#1A6B3A',
              borderRadius: 8,
              padding: 16,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <Ionicons name="refresh" size={18} color="#FFFFFF" />
            <Text style={{ fontSize: 13, fontWeight: '600', color: '#FFFFFF' }}>
              {t.triggerRetraining}
            </Text>
          </TouchableOpacity>
          <Text style={{ fontSize: 10, color: colors.textMuted, marginTop: 8 }}>
            Last retrain: 3 days ago
          </Text>
        </View>

        {/* App Info */}
        <SectionHeader title="App Information" />
        <View style={{ paddingHorizontal: 16, marginBottom: 24 }}>
          <View
            style={{
              backgroundColor: colors.surface,
              borderRadius: 8,
              padding: 12,
            }}
          >
            <View style={{ marginBottom: 8 }}>
              <Text style={{ fontSize: 11, color: colors.textSecondary }}>
                Version
              </Text>
              <Text style={{ fontSize: 13, fontWeight: '600', color: colors.text }}>
                1.0.0
              </Text>
            </View>
            <View style={{ marginBottom: 8, borderTopWidth: 1, borderTopColor: colors.border, paddingTop: 8 }}>
              <Text style={{ fontSize: 11, color: colors.textSecondary }}>
                Build
              </Text>
              <Text style={{ fontSize: 13, fontWeight: '600', color: colors.text }}>
                denguesense-bd-1.0.0
              </Text>
            </View>
            <View style={{ borderTopWidth: 1, borderTopColor: colors.border, paddingTop: 8 }}>
              <Text style={{ fontSize: 11, color: colors.textSecondary }}>
                API
              </Text>
              <Text style={{ fontSize: 13, fontWeight: '600', color: colors.text }}>
                ST-GNN Model v2.1
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Retraining Modal */}
      <Modal visible={showRetraining} transparent animationType="fade">
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.7)',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              backgroundColor: colors.surface,
              borderRadius: 16,
              padding: 24,
              width: '80%',
              alignItems: 'center',
            }}
          >
            <ActivityIndicator size="large" color="#1A6B3A" />
            <Text
              style={{
                fontSize: 16,
                fontWeight: '700',
                color: colors.text,
                marginTop: 16,
              }}
            >
              {retrainingProgress < 100 ? 'Retraining Model' : 'Complete ✓'}
            </Text>

            <View
              style={{
                width: '100%',
                height: 6,
                backgroundColor: colors.surfaceAlt,
                borderRadius: 3,
                marginTop: 16,
                overflow: 'hidden',
              }}
            >
              <View
                style={{
                  height: '100%',
                  backgroundColor: '#1A6B3A',
                  width: `${Math.min(retrainingProgress, 100)}%`,
                }}
              />
            </View>

            <Text
              style={{
                fontSize: 12,
                color: colors.textSecondary,
                marginTop: 12,
              }}
            >
              {Math.min(Math.round(retrainingProgress), 100)}%
            </Text>

            {retrainingProgress >= 100 && (
              <TouchableOpacity
                onPress={() => setShowRetraining(false)}
                style={{
                  marginTop: 16,
                  backgroundColor: '#1A6B3A',
                  paddingHorizontal: 24,
                  paddingVertical: 8,
                  borderRadius: 6,
                }}
              >
                <Text style={{ color: '#FFFFFF', fontWeight: '600', fontSize: 12 }}>
                  Close
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default SettingsScreen;
