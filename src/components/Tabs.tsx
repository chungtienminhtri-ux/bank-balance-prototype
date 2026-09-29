import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, typography } from '../theme';

/** MoMo UI Kit › Tabs — 2 tab chia đều, underline màu primary cho tab đang chọn. */
export function Tabs<T extends string>({
  items,
  value,
  onChange,
}: {
  items: { key: T; label: string }[];
  value: T;
  onChange: (key: T) => void;
}) {
  return (
    <View style={styles.row} accessibilityRole="tablist">
      {items.map((it) => {
        const active = it.key === value;
        return (
          <Pressable
            key={it.key}
            style={styles.tab}
            onPress={() => onChange(it.key)}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
          >
            <Text style={[typography.tab, { color: active ? colors.primary : colors.textPrimary }]}>{it.label}</Text>
            <View style={[styles.indicator, active && { backgroundColor: colors.primary }]} />
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', backgroundColor: colors.surface },
  tab: { flex: 1, alignItems: 'center', paddingTop: 14 },
  indicator: { marginTop: 12, height: 2, width: '96%', borderRadius: 1, backgroundColor: 'transparent' },
});
