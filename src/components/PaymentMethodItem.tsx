import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing, typography } from '../theme';
import { RadioMark } from './icons';

/** Tag nhỏ góc trên phải (vd. "Đề xuất"). */
export function Tag({ label }: { label: string }) {
  return (
    <View style={styles.tag}>
      <Text style={styles.tagText}>{label}</Text>
    </View>
  );
}

/** Một lựa chọn phương thức nạp — icon + tiêu đề + mô tả hạn mức + radio. */
export function PaymentMethodItem({
  icon,
  title,
  subtitle,
  tag,
  selected,
  onPress,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  tag?: string;
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
        <Text style={typography.bodyStrong}>{title}</Text>
        <Text style={[typography.caption, { marginTop: 2 }]}>{subtitle}</Text>
      </View>
      <RadioMark selected={selected} />
      {tag ? (
        <View style={styles.tagPos}>
          <Tag label={tag} />
        </View>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingVertical: 14,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.surface,
  },
  itemSelected: {
    borderColor: colors.primaryBorder,
    backgroundColor: colors.primarySoft,
  },
  icon: { width: 32, alignItems: 'center', marginRight: spacing.md },
  tagPos: { position: 'absolute', top: -9, right: -1 },
  tag: {
    backgroundColor: colors.tagBg,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    borderTopRightRadius: 8,
    paddingHorizontal: 7,
    paddingVertical: 2,
  },
  tagText: { color: colors.tagText, fontSize: 11, fontWeight: '600' },
});
