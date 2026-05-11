import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

export const SectionHeader = React.memo(({ title, subtitle }: SectionHeaderProps) => {
  const { colors } = useTheme();

  return (
    <View style={{ marginBottom: 16, paddingHorizontal: 16 }}>
      <Text
        style={{
          fontSize: 18,
          fontWeight: '700',
          color: colors.text,
          marginBottom: subtitle ? 4 : 0,
        }}
      >
        {title}
      </Text>
      {subtitle && (
        <Text style={{ fontSize: 13, color: colors.textSecondary }}>
          {subtitle}
        </Text>
      )}
    </View>
  );
});

SectionHeader.displayName = 'SectionHeader';
