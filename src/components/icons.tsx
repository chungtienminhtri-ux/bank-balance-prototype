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

/** Logo VCB (giản lược) — khiên xanh lá trên nền trắng. */
export function VcbMark({ size = 28 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 28 28">
      <Rect x={0.5} y={0.5} width={27} height={27} rx={6} fill="#fff" stroke="#E3E3E8" />
      <Path d="M7 8c2.5-1 4.7-1.4 7-1.4S18.5 7 21 8c0 6.5-2.6 10.8-7 13.4C9.6 18.8 7 14.5 7 8z" fill="#00854A" />
      <Path d="M10.5 10.5l3.5 6.5 3.5-6.5" stroke="#fff" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

/** Icon Túi Thần Tài (giản lược) — túi vàng trên nền hồng nhạt. */
export function TuiThanTaiMark({ size = 28 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 28 28">
      <Rect x={0} y={0} width={28} height={28} rx={6} fill="#FDE3EE" />
      <Path d="M10 8.5l1.6-2.5h4.8L18 8.5" fill="#F7A600" />
      <Path d="M9 10.5h10l-.6-1.8H9.6z" fill="#E65C00" />
      <Path d="M9.2 11c-2.6 2.3-3.7 5-3.2 7.5.5 2.3 2.6 3.5 8 3.5s7.5-1.2 8-3.5c.5-2.5-.6-5.2-3.2-7.5z" fill="#FFB800" />
      <Circle cx={14} cy={16.5} r={2.6} fill="#E65C00" />
      <Circle cx={14} cy={16.5} r={1.2} fill="#FFD76A" />
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
