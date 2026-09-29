import React from 'react';
import { Text, View } from 'react-native';
import Svg, { Path, Rect, Circle } from 'react-native-svg';
import { colors } from '../theme';

type IconProps = { size?: number; color?: string };

export function IconArrowLeft({ size = 20, color = colors.textPrimary }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M19 12H5M11 6l-6 6 6 6" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function IconHeadset({ size = 18, color = colors.textPrimary }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M4 14v-2a8 8 0 0116 0v2" stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Rect x={3} y={13} width={4} height={6} rx={1.5} stroke={color} strokeWidth={2} />
      <Rect x={17} y={13} width={4} height={6} rx={1.5} stroke={color} strokeWidth={2} />
      <Path d="M19 19c0 1.5-2 2.5-5 2.5" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

export function IconHome({ size = 18, color = colors.textPrimary }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M4 10.5L12 4l8 6.5V20a1 1 0 01-1 1h-4v-6h-6v6H5a1 1 0 01-1-1v-9.5z" stroke={color} strokeWidth={2} strokeLinejoin="round" />
    </Svg>
  );
}

/** Ngân hàng + mũi tên nạp — dùng cho "Chuyển khoản từ ngân hàng". */
export function IconBankTransfer({ size = 28, color = colors.bankIcon }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <Path d="M3 10L14 4l11 6H3z" stroke={color} strokeWidth={1.8} strokeLinejoin="round" />
      <Path d="M5 10v12M23 10v12M3 23h22" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
      <Path d="M14 12v7M11 16l3 3 3-3" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

/** Mark MoMo — dùng cho "Nạp từ ngân hàng liên kết". */
export function MoMoMark({ size = 28 }: { size?: number }) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: 6,
        backgroundColor: colors.momoBrand,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text style={{ color: '#fff', fontSize: size * 0.3, fontWeight: '800', lineHeight: size * 0.34 }}>mo</Text>
      <Text style={{ color: '#fff', fontSize: size * 0.3, fontWeight: '800', lineHeight: size * 0.34 }}>mo</Text>
    </View>
  );
}

export function RadioMark({ selected, size = 22 }: { selected: boolean; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 22 22">
      <Circle cx={11} cy={11} r={9.5} fill="#fff" stroke={selected ? colors.primary : colors.textPrimary} strokeWidth={2} />
      {selected && <Circle cx={11} cy={11} r={5} fill={colors.primary} />}
    </Svg>
  );
}
