import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing, typography } from '../theme';
import { RadioMark } from './icons';

/**
 * Một nguồn tiền trong danh sách "Chọn nguồn tiền".
 * - Có `balance`: label xám nhỏ + số dư đậm (VCB, Ví MoMo, Túi Thần Tài).
 * - Không có `balance`: chỉ một dòng tiêu đề (Chuyển khoản từ ngân hàng).
 */
export function FundingSourceItem({
  icon,
  label,
  balance,
  error,
  selected,
  onPress,
}: {
  icon: React.ReactNode;
  label: string;
  balance?: string;
  error?: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="radio"
      accessibilityState={{ checked: selected }}
      style={[styles.item, selected && styles.itemSelected]}
    >
      <View style={styles.icon}>{icon}</View>
      <View style={{ flex: 1 }}>
        {balance !== undefined ? (
          <>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.balance}>{balance}</Text>
          </>
        ) : (
          <Text style={typography.bodyStrong}>{label}</Text>
        )}
        {error ? <Text style={styles.error}>{error}</Text> : null}
      </View>
      <RadioMark selected={selected} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 60,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingVertical: 10,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.surface,
  },
  itemSelected: {
    borderWidth: 2,
    borderColor: colors.primary,
    paddingVertical: 9,
    paddingHorizontal: spacing.md - 1,
  },
  icon: { width: 28, marginRight: spacing.md, alignItems: 'center' },
  label: { fontSize: 13, color: colors.textHint },
  balance: { fontSize: 15, fontWeight: '700', color: colors.textPrimary, marginTop: 1 },
  error: { fontSize: 12, color: colors.danger, marginTop: 2 },
});
