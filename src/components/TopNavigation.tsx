import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';
import { colors, spacing, typography } from '../theme';
import { IconArrowLeft, IconHeadset, IconHome } from './icons';

/** MoMo UI Kit › Top Navigation — back + title + cụm action (hỗ trợ | về Home). */
export function TopNavigation({ title, onBack }: { title: string; onBack?: () => void }) {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ paddingTop: insets.top, overflow: 'hidden' }}>
      <Svg style={StyleSheet.absoluteFill} width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 1 1">
        <Defs>
          <LinearGradient id="hdr" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={colors.headerGradientTop} />
            <Stop offset="1" stopColor={colors.headerGradientBottom} />
          </LinearGradient>
        </Defs>
        <Rect x="0" y="0" width="1" height="1" fill="url(#hdr)" />
      </Svg>
      <View style={styles.bar}>
        <Pressable onPress={onBack} hitSlop={8} style={styles.circleBtn} accessibilityLabel="Quay lại">
          <IconArrowLeft size={16} />
        </Pressable>
        <Text style={[typography.header, styles.title]}>{title}</Text>
        <View style={styles.actions}>
          <Pressable hitSlop={6} accessibilityLabel="Hỗ trợ">
            <IconHeadset size={17} />
          </Pressable>
          <View style={styles.sep} />
          <Pressable hitSlop={6} accessibilityLabel="Về trang chủ">
            <IconHome size={17} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
  },
  circleBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { flex: 1, marginLeft: spacing.sm },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 16,
    paddingHorizontal: 10,
    height: 30,
    gap: 8,
  },
  sep: { width: 1, height: 14, backgroundColor: colors.border },
});
