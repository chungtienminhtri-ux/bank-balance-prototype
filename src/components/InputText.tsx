import React, { useState } from 'react';
import { Platform, StyleSheet, Text, TextInput, TextInputProps, TextStyle, View } from 'react-native';
import { colors, radius, spacing, typography } from '../theme';

/**
 * MoMo UI Kit › InputText — ô nhập viền, label nằm trên viền (notch).
 * Viền chuyển primary khi focus.
 */
export function InputText({
  label,
  required,
  inputStyle,
  ...props
}: TextInputProps & { label: string; required?: boolean; inputStyle?: TextStyle }) {
  const [focused, setFocused] = useState(false);
  return (
    <View style={[styles.box, focused && { borderColor: colors.primary }]}>
      <View style={styles.labelWrap} pointerEvents="none">
        <Text style={[typography.label, focused && { color: colors.primary }]}>
          {label}
          {required ? <Text style={{ color: colors.danger }}>*</Text> : null}
        </Text>
      </View>
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
        style={[styles.input, Platform.OS === 'web' && ({ outlineStyle: 'none' } as unknown as TextStyle), inputStyle]}
      />
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
  input: {
    ...typography.body,
    paddingVertical: 12,
  },
});
