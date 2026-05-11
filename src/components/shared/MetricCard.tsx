import React from 'react';
import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';

interface MetricCardProps {
  icon: string;
  label: string;
  value: string | number;
  trend?: 'up' | 'down' | 'stable';
  trendValue?: string;
  color?: string;
  size?: 'small' | 'medium' | 'large';
}

export const MetricCard = React.memo(({
  icon,
  label,
  value,
  trend,
  trendValue,
  color = '#1A6B3A',
  size = 'medium',
}: MetricCardProps) => {
  const { colors } = useTheme();

  const sizeClasses = {
    small: { container: 'px-3 py-2', label: 'text-xs', value: 'text-sm' },
    medium: { container: 'px-4 py-3', label: 'text-sm', value: 'text-lg' },
    large: { container: 'px-5 py-4', label: 'text-base', value: 'text-2xl' },
  };

  const classes = sizeClasses[size];

  return (
    <View
      style={{
        backgroundColor: colors.surfaceAlt,
        borderRadius: 12,
        padding: size === 'small' ? 12 : size === 'medium' ? 16 : 20,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
      }}
    >
      <View
        style={{
          width: size === 'small' ? 32 : size === 'medium' ? 40 : 48,
          height: size === 'small' ? 32 : size === 'medium' ? 40 : 48,
          borderRadius: 8,
          backgroundColor: color + '20',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <MaterialCommunityIcons
          name={icon as any}
          size={size === 'small' ? 16 : size === 'medium' ? 20 : 24}
          color={color}
        />
      </View>
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: size === 'small' ? 11 : size === 'medium' ? 13 : 14,
            color: colors.textSecondary,
            marginBottom: 4,
          }}
        >
          {label}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Text
            style={{
              fontSize: size === 'small' ? 14 : size === 'medium' ? 18 : 24,
              fontWeight: '700',
              color: colors.text,
            }}
          >
            {value}
          </Text>
          {trend && (
            <MaterialCommunityIcons
              name={
                trend === 'up'
                  ? 'trending-up'
                  : trend === 'down'
                  ? 'trending-down'
                  : 'minus'
              }
              size={16}
              color={
                trend === 'up' ? '#DC2626' : trend === 'down' ? '#16A34A' : '#6B7280'
              }
            />
          )}
        </View>
        {trendValue && (
          <Text
            style={{
              fontSize: 11,
              color: colors.textMuted,
              marginTop: 2,
            }}
          >
            {trendValue}
          </Text>
        )}
      </View>
    </View>
  );
});

MetricCard.displayName = 'MetricCard';
