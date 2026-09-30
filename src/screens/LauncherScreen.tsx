import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Chevron } from '../components/ListItem';
import { colors, radius, spacing, typography } from '../theme';

export type ScreenId = 'launcher' | 'gop-quy' | 'profile' | 'profile-qr-corner';

const ITEMS: { id: Exclude<ScreenId, 'launcher'>; title: string; subtitle: string }[] = [
  { id: 'gop-quy', title: 'Góp/Rút quỹ', subtitle: 'Chọn nguồn tiền, nơi nhận tiền, chia sẻ số dư VCB' },
  { id: 'profile', title: 'Tôi · Phương án A', subtitle: 'Mã QR của tôi là một ô trong Quản lý tiện ích' },
  { id: 'profile-qr-corner', title: 'Tôi · Phương án B', subtitle: 'Nút QR ở góc phải thẻ hồ sơ' },
];

/** Màn chọn prototype để demo — không phải màn thật của app. */
export default function LauncherScreen({ onOpen }: { onOpen: (id: ScreenId) => void }) {
  const insets = useSafeAreaInsets();
  return (
    <ScrollView style={styles.root} contentContainerStyle={[styles.content, { paddingTop: insets.top + spacing.xl }]}>
      <Text style={styles.eyebrow}>PROTOTYPE · FINANCIAL HEALTH</Text>
      <Text style={styles.title}>Chọn màn để xem</Text>
      <View style={styles.card}>
        {ITEMS.map((it, i) => (
          <Pressable
            key={it.id}
            onPress={() => onOpen(it.id)}
            style={({ pressed }) => [styles.row, i > 0 && styles.divider, pressed && { backgroundColor: colors.background }]}
          >
            <View style={{ flex: 1 }}>
              <Text style={typography.bodyStrong}>{it.title}</Text>
              <Text style={[typography.caption, { marginTop: 2 }]}>{it.subtitle}</Text>
            </View>
            <Chevron />
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, gap: spacing.sm },
  eyebrow: { fontSize: 12, fontWeight: '700', letterSpacing: 1, color: colors.primary },
  title: { fontSize: 24, fontWeight: '700', color: colors.textPrimary, marginBottom: spacing.md },
  card: { backgroundColor: colors.surface, borderRadius: radius.md, overflow: 'hidden' },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, padding: spacing.lg },
  divider: { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: colors.border },
});
