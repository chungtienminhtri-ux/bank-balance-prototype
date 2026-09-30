import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../theme';
import { NavHistory, NavMe, NavMoMo, NavOffers, NavQr } from './profileIcons';

export type NavTab = 'home' | 'offers' | 'qr' | 'history' | 'me';

const TABS: { key: Exclude<NavTab, 'qr'>; label: string; Icon: typeof NavMe; dot?: boolean }[] = [
  { key: 'home', label: 'MoMo', Icon: NavMoMo },
  { key: 'offers', label: 'Ưu đãi', Icon: NavOffers, dot: true },
  { key: 'history', label: 'Giao dịch', Icon: NavHistory },
  { key: 'me', label: 'Tôi', Icon: NavMe },
];

/** Thanh tab dưới cùng của app MoMo, nút Mã VietQR nổi ở giữa. */
export function BottomNav({ active, onPress }: { active: NavTab; onPress: (t: NavTab) => void }) {
  const insets = useSafeAreaInsets();
  const renderTab = (t: (typeof TABS)[number]) => {
    const on = t.key === active;
    const c = on ? colors.primary : colors.textSecondary;
    return (
      <Pressable key={t.key} style={styles.tab} onPress={() => onPress(t.key)} accessibilityRole="tab" accessibilityState={{ selected: on }}>
        {on ? <View style={styles.indicator} /> : null}
        <View>
          <t.Icon size={25} color={c} />
          {t.dot ? <View style={styles.dot} /> : null}
        </View>
        <Text style={[styles.label, { color: c }, on && { fontWeight: '700' }]}>{t.label}</Text>
      </Pressable>
    );
  };
  return (
    <View style={[styles.bar, { paddingBottom: Math.max(insets.bottom, 8) }]}>
      {renderTab(TABS[0])}
      {renderTab(TABS[1])}
      <Pressable style={styles.tab} onPress={() => onPress('qr')} accessibilityRole="button">
        <View style={styles.qrBtn}>
          <NavQr size={28} />
        </View>
        <View style={styles.qrLabel}>
          <Text style={styles.qrLabelText}>Mã VietQR</Text>
        </View>
      </Pressable>
      {renderTab(TABS[2])}
      {renderTab(TABS[3])}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
    paddingTop: 8,
  },
  tab: { flex: 1, alignItems: 'center', gap: 3 },
  indicator: {
    position: 'absolute',
    top: -8,
    width: 36,
    height: 3,
    borderRadius: 2,
    backgroundColor: colors.primary,
  },
  label: { fontSize: 11, color: colors.textSecondary },
  dot: {
    position: 'absolute',
    top: -2,
    right: -4,
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: '#F23B30',
    borderWidth: 1.5,
    borderColor: colors.surface,
  },
  qrBtn: {
    marginTop: -26,
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: colors.surface,
  },
  qrLabel: { backgroundColor: colors.primary, borderRadius: 8, paddingHorizontal: 7, paddingVertical: 1, marginTop: -8 },
  qrLabelText: { fontSize: 10, fontWeight: '700', color: colors.onPrimary },
});
