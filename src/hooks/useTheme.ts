import { useColorScheme } from 'react-native';
import { colors } from '../constants/colors';

export function useTheme() {
  const systemColorScheme = useColorScheme();
  const isDark = systemColorScheme === 'dark';

  return {
    isDark,
    colors: {
      primary: colors.primary,
      primaryLight: colors.primaryLight,
      primaryMuted: colors.primaryMuted,
      critical: colors.critical,
      criticalMuted: colors.criticalMuted,
      high: colors.high,
      highMuted: colors.highMuted,
      moderate: colors.moderate,
      moderateMuted: colors.moderateMuted,
      low: colors.low,
      lowMuted: colors.lowMuted,
      background: isDark ? colors.dark.background : colors.light.background,
      surface: isDark ? colors.dark.surface : colors.light.surface,
      surfaceAlt: isDark ? colors.dark.surfaceAlt : colors.light.surfaceAlt,
      border: isDark ? colors.dark.border : colors.light.border,
      text: isDark ? colors.dark.text : colors.light.text,
      textSecondary: isDark ? colors.dark.textSecondary : colors.light.textSecondary,
      textMuted: isDark ? colors.dark.textMuted : colors.light.textMuted,
    },
  };
}
