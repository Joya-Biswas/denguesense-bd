import * as Haptics from 'expo-haptics';
import { useCallback } from 'react';

export function useHaptics() {
  const light = useCallback(async () => {
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch (error) {
      // Haptics may not be available on all devices
    }
  }, []);

  const medium = useCallback(async () => {
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } catch (error) {
      // Haptics may not be available on all devices
    }
  }, []);

  const heavy = useCallback(async () => {
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    } catch (error) {
      // Haptics may not be available on all devices
    }
  }, []);

  const notification = useCallback(async (type: 'Success' | 'Warning' | 'Error' = 'Success') => {
    try {
      await Haptics.notificationAsync(
        type === 'Success'
          ? Haptics.NotificationFeedbackType.Success
          : type === 'Warning'
          ? Haptics.NotificationFeedbackType.Warning
          : Haptics.NotificationFeedbackType.Error
      );
    } catch (error) {
      // Haptics may not be available on all devices
    }
  }, []);

  return { light, medium, heavy, notification };
}
