import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import type { RiskLevel, AlertStatus } from '../../types';

interface StatusBadgeProps {
  type: 'risk' | 'alert' | 'chw' | 'intervention';
  value: RiskLevel | AlertStatus | 'submitted' | 'pending' | 'overdue' | 'scheduled' | 'in_progress' | 'completed';
  size?: 'small' | 'medium';
}

export const StatusBadge = React.memo(({ type, value, size = 'medium' }: StatusBadgeProps) => {
  const { colors } = useTheme();

  const getRiskColors = (risk: RiskLevel) => {
    switch (risk) {
      case 'critical':
        return { bg: colors.criticalMuted, text: '#DC2626' };
      case 'high':
        return { bg: colors.highMuted, text: '#D97706' };
      case 'moderate':
        return { bg: colors.moderateMuted, text: '#2563EB' };
      case 'low':
        return { bg: colors.lowMuted, text: '#16A34A' };
      default:
        return { bg: colors.surfaceAlt, text: colors.text };
    }
  };

  const getAlertColors = (status: AlertStatus) => {
    switch (status) {
      case 'pending':
        return { bg: colors.highMuted, text: '#D97706' };
      case 'acknowledged':
        return { bg: colors.moderateMuted, text: '#2563EB' };
      case 'deployed':
        return { bg: colors.lowMuted, text: '#16A34A' };
      case 'resolved':
        return { bg: colors.surfaceAlt, text: colors.textSecondary };
      default:
        return { bg: colors.surfaceAlt, text: colors.text };
    }
  };

  const getChwColors = (status: string) => {
    switch (status) {
      case 'submitted':
        return { bg: colors.lowMuted, text: '#16A34A' };
      case 'pending':
        return { bg: colors.highMuted, text: '#D97706' };
      case 'overdue':
        return { bg: colors.criticalMuted, text: '#DC2626' };
      default:
        return { bg: colors.surfaceAlt, text: colors.text };
    }
  };

  const getInterventionColors = (status: string) => {
    switch (status) {
      case 'scheduled':
        return { bg: colors.moderateMuted, text: '#2563EB' };
      case 'in_progress':
        return { bg: colors.highMuted, text: '#D97706' };
      case 'completed':
        return { bg: colors.lowMuted, text: '#16A34A' };
      default:
        return { bg: colors.surfaceAlt, text: colors.text };
    }
  };

  let colors_pair;
  if (type === 'risk') colors_pair = getRiskColors(value as RiskLevel);
  else if (type === 'alert') colors_pair = getAlertColors(value as AlertStatus);
  else if (type === 'chw') colors_pair = getChwColors(value);
  else colors_pair = getInterventionColors(value);

  const paddingClasses = size === 'small' ? { px: 8, py: 4 } : { px: 12, py: 6 };

  return (
    <View
      style={{
        backgroundColor: colors_pair.bg,
        borderRadius: 6,
        paddingHorizontal: paddingClasses.px,
        paddingVertical: paddingClasses.py,
        alignSelf: 'flex-start',
      }}
    >
      <Text
        style={{
          fontSize: size === 'small' ? 11 : 12,
          fontWeight: '600',
          color: colors_pair.text,
          textTransform: 'capitalize',
        }}
      >
        {value.replace('_', ' ')}
      </Text>
    </View>
  );
});

StatusBadge.displayName = 'StatusBadge';
