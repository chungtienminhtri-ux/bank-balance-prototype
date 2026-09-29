import React, { useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, TextInput, TextInputProps, TextStyle, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { colors, radius, spacing, typography } from '../theme';

/**
 * MoMo UI Kit › InputText — ô nhập viền, label nằm trên viền (notch).
 * Viền chuyển primary khi focus, đỏ khi có `error`. `onClear` hiện nút xoá khi có giá trị.
 */
export function InputText({
  label,
  required,
  inputStyle,
  error,
  onClear,
  ...props
}: TextInputProps & {
  label: string;
  required?: boolean;
  inputStyle?: TextStyle;
  error?: string;
  onClear?: () => void;
}) {
  const [focused, setFocused] = useState(false);
  const accent = error ? colors.danger : focused ? colors.primary : undefined;
  return (
    <View>
      <View style={[styles.box, accent && { borderColor: accent }]}>
        <View style={styles.labelWrap} pointerEvents="none">
          <Text style={[typography.label, accent && { color: accent }]}>
            {label}
            {required ? <Text style={{ color: colors.danger }}>*</Text> : null}
          </Text>
        </View>
        <View style={styles.row}>
          <TextInput
            placeholderTextColor={colors.textHint}
            {...props}
            onFocus={(e) => {
              setFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setFocused(false);
              props.onBlur?.(e);
            }}
            style={[
              styles.input,
              Platform.OS === 'web' && ({ outlineStyle: 'none' } as unknown as TextStyle),
              inputStyle,
            ]}
          />
          {onClear && props.value ? (
            <Pressable onPress={onClear} hitSlop={10} accessibilityLabel="Xoá">
              <Svg width={18} height={18} viewBox="0 0 18 18">
                <Circle cx={9} cy={9} r={8} fill={colors.textSecondary} />
                <Path d="M6.2 6.2l5.6 5.6M11.8 6.2l-5.6 5.6" stroke="#fff" strokeWidth={1.6} strokeLinecap="round" />
              </Svg>
            </Pressable>
          ) : null}
        </View>
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.md,
    minHeight: 54,
    justifyContent: 'center',
    marginTop: 8,
  },
  labelWrap: {
    position: 'absolute',
    top: -9,
    left: 10,
    paddingHorizontal: 6,
    backgroundColor: colors.surface,
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  input: {
    ...typography.body,
    flex: 1,
    minWidth: 0,
    paddingVertical: 12,
  },
  error: { fontSize: 12, color: colors.danger, marginTop: 4, marginLeft: 2 },
});
