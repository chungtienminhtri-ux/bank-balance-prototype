import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radius, spacing, typography } from '../theme';

/** MoMo UI Kit › Template_ButtonFooter — nút chính full-width, ghim đáy màn. */
export function ButtonFooter({
  label,
  disabled,
  onPress,
  accessory,
}: {
  label: string;
  disabled?: boolean;
  onPress: () => void;
  /** Nội dung phía trên nút (vd. chip số tiền nhanh). */
  accessory?: React.ReactNode;
}) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.wrap, { paddingBottom: Math.max(insets.bottom, spacing.md) }]}>
      {accessory}
      <Pressable
        disabled={disabled}
        onPress={onPress}
        accessibilityRole="button"
        accessibilityState={{ disabled }}
        style={({ pressed }) => [
          styles.btn,
          { backgroundColor: disabled ? colors.buttonDisabledBg : colors.primary },
          pressed && !disabled && { opacity: 0.85 },
        ]}
      >
        <Text style={[typography.button, { color: disabled ? colors.textDisabled : colors.onPrimary }]}>{label}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.divider,
  },
  btn: {
    height: 48,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
