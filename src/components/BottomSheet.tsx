import React from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { colors, spacing, typography } from '../theme';

/** MoMo UI Kit › BottomSheet — thanh kéo, tiêu đề giữa, nút đóng, danh sách bên dưới. */
export function BottomSheet({
  visible,
  title,
  onClose,
  children,
}: {
  visible: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const insets = useSafeAreaInsets();
  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose} accessibilityLabel="Đóng">
        <Pressable style={[styles.sheet, { paddingBottom: Math.max(insets.bottom, spacing.lg) }]} onPress={() => {}}>
          <View style={styles.handle} />
          <View style={styles.header}>
            <Text style={[typography.sectionTitle, styles.title]}>{title}</Text>
            <Pressable onPress={onClose} hitSlop={10} style={styles.close} accessibilityLabel="Đóng">
              <Svg width={22} height={22} viewBox="0 0 22 22">
                <Path d="M5 5l12 12M17 5L5 17" stroke={colors.textPrimary} strokeWidth={2} strokeLinecap="round" />
              </Svg>
            </Pressable>
          </View>
          <View style={styles.divider} />
          {children}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'flex-end' },
  sheet: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: spacing.sm,
  },
  handle: {
    alignSelf: 'center',
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.border,
  },
  header: { height: 52, alignItems: 'center', justifyContent: 'center' },
  title: { textAlign: 'center' },
  close: { position: 'absolute', right: spacing.lg, top: 15 },
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: colors.border },
});
