import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { colors, spacing, typography } from '../theme';

export function Chevron({ size = 16, color = colors.textSecondary }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <Path d="M6 3.5L10.5 8 6 12.5" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

/** MoMo UI Kit › SettingsListItem — icon + tiêu đề (+ mô tả) + chevron. */
export function ListItem({
  icon,
  title,
  subtitle,
  onPress,
  divider,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  divider?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => [styles.row, pressed && { backgroundColor: colors.background }]}
    >
      <View style={styles.icon}>{icon}</View>
      <View style={[styles.body, divider && styles.divider]}>
        <View style={{ flex: 1, minWidth: 0 }}>
          <Text style={typography.bodyStrong}>{title}</Text>
          {subtitle ? <Text style={[typography.caption, styles.subtitle]}>{subtitle}</Text> : null}
        </View>
        <Chevron />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', paddingLeft: spacing.lg },
  icon: { width: 28, alignItems: 'center', marginRight: spacing.md },
  body: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: 14,
    paddingRight: spacing.lg,
  },
  divider: { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.border },
  subtitle: { marginTop: 2, lineHeight: 18 },
});
