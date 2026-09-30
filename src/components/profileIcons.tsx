/** Icon cho màn Tôi — vẽ giản lược theo ảnh app MoMo; thay bằng asset UI Kit khi đọc được Figma. */
import React from 'react';
import Svg, { Circle, Path, Rect } from 'react-native-svg';
import { colors } from '../theme';

type P = { size?: number; color?: string };
const INK = colors.textPrimary;
const line = (color: string, w = 1.7) => ({ stroke: color, strokeWidth: w, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, fill: 'none' });

// ---------- Hàng 4 lối tắt ----------
export function IconAccountSettings({ size = 34, color = INK }: P) {
  return (
    <Svg width={size} height={size} viewBox="0 0 34 34">
      <Circle cx={15} cy={15} r={12} {...line(color)} />
      <Circle cx={15} cy={12} r={4} {...line(color)} />
      <Path d="M7.5 23.5c1.6-3.2 4.3-4.8 7.5-4.8 1.6 0 3 .4 4.2 1.1" {...line(color)} />
      <Circle cx={25} cy={25} r={5} {...line(color)} fill={colors.surface} />
      <Path d="M23.3 23.5v3M26.7 23.5v3M23.3 25h3.4" {...line(color, 1.4)} />
    </Svg>
  );
}

export function IconPaymentLink({ size = 34, color = INK }: P) {
  return (
    <Svg width={size} height={size} viewBox="0 0 34 34">
      <Rect x={3} y={6} width={25} height={18} rx={3} {...line(color)} />
      <Path d="M3 11.5h25M7 16h6M7 19.5h9" {...line(color)} />
      <Circle cx={25.5} cy={24.5} r={5.5} {...line(color)} fill={colors.surface} />
      <Circle cx={25.5} cy={24.5} r={1.8} {...line(color, 1.4)} />
    </Svg>
  );
}

export function IconPersonalData({ size = 34, color = INK }: P) {
  return (
    <Svg width={size} height={size} viewBox="0 0 34 34">
      <Rect x={3} y={6} width={28} height={22} rx={3} {...line(color)} />
      <Circle cx={11.5} cy={14.5} r={3} {...line(color)} />
      <Path d="M6.5 23c.9-2.6 2.8-4 5-4s4.1 1.4 5 4M19.5 13h7M19.5 17h7M19.5 21h5" {...line(color)} />
    </Svg>
  );
}

export function IconAntiFraud({ size = 34, color = INK }: P) {
  return (
    <Svg width={size} height={size} viewBox="0 0 34 34">
      <Path d="M5 15h24M9 15l2-8c.3-1.2 1.4-1.8 2.5-1.4L17 7l3.5-1.4c1.1-.4 2.2.2 2.5 1.4l2 8" {...line(color)} />
      <Rect x={7} y={18} width={8} height={6} rx={3} {...line(color)} />
      <Rect x={19} y={18} width={8} height={6} rx={3} {...line(color)} />
      <Path d="M15 21h4M11 28.5c3.8 1.6 8.2 1.6 12 0" {...line(color)} />
    </Svg>
  );
}

/** QR ở góc thẻ hồ sơ — ngoặc 4 góc + 4 ô QR, nét đậm. */
export function IconQrCorner({ size = 28, color = INK }: P) {
  return (
    <Svg width={size} height={size} viewBox="0 0 28 28">
      <Path d="M2 8V4.5A2.5 2.5 0 014.5 2H8M20 2h3.5A2.5 2.5 0 0126 4.5V8M26 20v3.5a2.5 2.5 0 01-2.5 2.5H20M8 26H4.5A2.5 2.5 0 012 23.5V20" {...line(color, 1.8)} />
      <Rect x={7} y={7} width={5.5} height={5.5} rx={1.2} {...line(color, 1.6)} />
      <Rect x={15.5} y={7} width={5.5} height={5.5} rx={1.2} {...line(color, 1.6)} />
      <Rect x={7} y={15.5} width={5.5} height={5.5} rx={1.2} {...line(color, 1.6)} />
      <Path d="M15.5 15.5h2.5v2.5h-2.5zM19 19h2v2h-2z" fill={color} />
    </Svg>
  );
}

// ---------- Ô Quản lý tiện ích ----------
export function TileQr({ size = 26 }: P) {
  return (
    <Svg width={size} height={size} viewBox="0 0 26 26">
      <Rect x={0} y={0} width={26} height={26} rx={7} fill="#FDE1EE" />
      <Rect x={5} y={5} width={6.5} height={6.5} rx={1.5} {...line(colors.primary, 1.6)} />
      <Rect x={14.5} y={5} width={6.5} height={6.5} rx={1.5} {...line(colors.primary, 1.6)} />
      <Rect x={5} y={14.5} width={6.5} height={6.5} rx={1.5} {...line(colors.primary, 1.6)} />
      <Path d="M14.5 14.5h2.5v2.5M21 14.5v2.5M14.5 21h2.5M19.5 19.5H21V21" {...line(colors.primary, 1.6)} />
    </Svg>
  );
}

export function TileVoucher({ size = 26 }: P) {
  return (
    <Svg width={size} height={size} viewBox="0 0 26 26">
      <Rect x={2} y={3} width={17} height={14} rx={2.5} fill="#BFE7FF" transform="rotate(-8 10 10)" />
      <Rect x={6} y={8} width={17} height={14} rx={2.5} fill="#FFE27A" />
      <Path d="M10 13.5h9M10 17h6" stroke="#E0A800" strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
}

export function TileTicket({ size = 26 }: P) {
  return (
    <Svg width={size} height={size} viewBox="0 0 26 26">
      <Rect x={3} y={3} width={13} height={19} rx={2.5} fill="#8FA8FF" transform="rotate(-12 9 12)" />
      <Rect x={9} y={4} width={13} height={19} rx={2.5} fill="#F2508C" transform="rotate(8 15 13)" />
      <Path d="M13 10.5h6M13 14h4" stroke="#fff" strokeWidth={1.5} strokeLinecap="round" transform="rotate(8 15 13)" />
    </Svg>
  );
}

export function TileBill({ size = 26 }: P) {
  return (
    <Svg width={size} height={size} viewBox="0 0 26 26">
      <Path d="M6 3h11l4 4v16l-2.5-1.5L16 23l-2.5-1.5L11 23l-2.5-1.5L6 23z" fill="#FF7FA8" />
      <Path d="M9.5 10h8M9.5 13.5h8M9.5 17h5" stroke="#fff" strokeWidth={1.5} strokeLinecap="round" />
      <Circle cx={5.5} cy={8} r={3} fill="#FFC2D6" />
    </Svg>
  );
}

export function TileSim({ size = 26 }: P) {
  return (
    <Svg width={size} height={size} viewBox="0 0 26 26">
      <Path d="M6 3h10l5 5v14a1.5 1.5 0 01-1.5 1.5h-13A1.5 1.5 0 015 22V4.5A1.5 1.5 0 016 3z" fill="#FF9A3C" />
      <Rect x={9} y={11} width={8} height={8} rx={1.5} fill="#FFD9A8" />
      <Path d="M13 11v8M9 15h8" stroke="#FF9A3C" strokeWidth={1.2} />
    </Svg>
  );
}

// ---------- Bottom sheet ----------
export function SheetReceiveQr({ size = 26, color = colors.primary }: P) {
  return (
    <Svg width={size} height={size} viewBox="0 0 26 26">
      <Rect x={2.5} y={2.5} width={21} height={21} rx={5} {...line(color)} />
      <Path d="M13 7.5v11M15.8 9.6c-.6-.9-1.6-1.4-2.8-1.4-1.6 0-2.8.9-2.8 2.2 0 3 5.8 1.7 5.8 4.8 0 1.4-1.3 2.3-3 2.3-1.3 0-2.4-.6-3-1.6" {...line(color)} />
    </Svg>
  );
}

export function SheetPayQr({ size = 26, color = colors.primary }: P) {
  return (
    <Svg width={size} height={size} viewBox="0 0 26 26">
      <Path d="M3 8V5a2 2 0 012-2h3M18 3h3a2 2 0 012 2v3M23 18v3a2 2 0 01-2 2h-3M8 23H5a2 2 0 01-2-2v-3" {...line(color)} />
      <Rect x={7.5} y={7.5} width={4} height={4} rx={1} {...line(color, 1.5)} />
      <Rect x={14.5} y={7.5} width={4} height={4} rx={1} {...line(color, 1.5)} />
      <Rect x={7.5} y={14.5} width={4} height={4} rx={1} {...line(color, 1.5)} />
      <Path d="M14.5 14.5h4v4h-4z" {...line(color, 1.5)} />
    </Svg>
  );
}

export function SheetMovie({ size = 26 }: P) {
  const c = '#F59A23';
  return (
    <Svg width={size} height={size} viewBox="0 0 26 26">
      <Circle cx={7.5} cy={7} r={3.5} {...line(c)} />
      <Circle cx={15} cy={7} r={3.5} {...line(c)} />
      <Rect x={3} y={11.5} width={15} height={10} rx={2} {...line(c)} />
      <Path d="M18 15l5-2.5v8L18 18" {...line(c)} />
    </Svg>
  );
}

export function SheetTravel({ size = 26 }: P) {
  const c = '#3D7BFF';
  return (
    <Svg width={size} height={size} viewBox="0 0 26 26">
      <Rect x={6} y={6.5} width={14} height={15.5} rx={3} {...line(c)} />
      <Path d="M10 6.5V4h6v2.5M10.5 11v7M15.5 11v7M9 22v1.5M17 22v1.5" {...line(c)} />
    </Svg>
  );
}

// ---------- Khác ----------
export function IconShieldCheck({ size = 20 }: P) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20">
      <Path d="M10 1.5l7 2.8v5c0 4.3-3 7.6-7 9.2-4-1.6-7-4.9-7-9.2v-5z" fill="#34B24A" />
      <Path d="M6.5 10l2.4 2.4L13.8 7.5" stroke="#fff" strokeWidth={1.8} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function IconMalwareScan({ size = 22 }: P) {
  const c = colors.primary;
  return (
    <Svg width={size} height={size} viewBox="0 0 22 22">
      <Path d="M11 2l7 2.8v5c0 4.3-3 7.6-7 9.2-4-1.6-7-4.9-7-9.2v-5z" {...line(c, 1.6)} />
      <Path d="M8.5 9.5a2.5 2.5 0 015 0v2a2.5 2.5 0 01-5 0zM11 9.5v4M7 10.5h1.5M13.5 10.5H15M7.5 13.5l1.2-.5M14.5 13.5l-1.2-.5" {...line(c, 1.3)} />
    </Svg>
  );
}

export function IconInvite({ size = 30 }: P) {
  return (
    <Svg width={size} height={size} viewBox="0 0 30 30">
      <Circle cx={15} cy={15} r={14} fill="#FF4F8B" />
      <Path d="M8 17c2.2 3 11.8 3 14 0" stroke="#fff" strokeWidth={2} fill="none" strokeLinecap="round" />
      <Circle cx={11} cy={12} r={1.8} fill="#fff" />
      <Circle cx={19} cy={12} r={1.8} fill="#fff" />
    </Svg>
  );
}

export function IconSupport({ size = 26, color = INK }: P) {
  return (
    <Svg width={size} height={size} viewBox="0 0 26 26">
      <Path d="M5 15v-3a8 8 0 0116 0v3" {...line(color)} />
      <Rect x={3.5} y={14} width={4.5} height={6} rx={1.8} {...line(color)} />
      <Rect x={18} y={14} width={4.5} height={6} rx={1.8} {...line(color)} />
      <Path d="M20 20c0 1.6-2.2 2.7-5.5 2.7" {...line(color)} />
    </Svg>
  );
}

export function IconCamera({ size = 14 }: P) {
  return (
    <Svg width={size} height={size} viewBox="0 0 14 14">
      <Rect x={0.5} y={0.5} width={13} height={13} rx={3} fill="#fff" stroke={colors.border} />
      <Path d="M3 5h1.6l.8-1.2h3.2L9.4 5H11v5.2H3z" {...line(colors.textSecondary, 1)} />
      <Circle cx={7} cy={7.5} r={1.5} {...line(colors.textSecondary, 1)} />
    </Svg>
  );
}

// ---------- Bottom tab bar ----------
export function NavMoMo({ size = 26, color = INK }: P) {
  return (
    <Svg width={size} height={size} viewBox="0 0 26 26">
      <Rect x={2.5} y={2.5} width={21} height={21} rx={4} {...line(color, 1.6)} />
      <Path d="M7 12V8.5l2 2.2 2-2.2V12M15 8.5h4v3.5h-4zM7 18v-3.5l2 2.2 2-2.2V18M15 14.5h4V18h-4z" {...line(color, 1.3)} />
    </Svg>
  );
}

export function NavOffers({ size = 26, color = INK }: P) {
  return (
    <Svg width={size} height={size} viewBox="0 0 26 26">
      <Rect x={3} y={9} width={20} height={14} rx={2} {...line(color, 1.6)} />
      <Path d="M2 9h22M13 9v14M13 9c-1.5-4-6-5-6-2s6 2 6 2c0 0 6 1 6-2s-4.5-2-6 2" {...line(color, 1.6)} />
      <Path d="M9.5 18.5l7-6" {...line(color, 1.3)} />
    </Svg>
  );
}

export function NavQr({ size = 30, color = '#fff' }: P) {
  return (
    <Svg width={size} height={size} viewBox="0 0 30 30">
      <Path d="M4 10V7a3 3 0 013-3h3M20 4h3a3 3 0 013 3v3M26 20v3a3 3 0 01-3 3h-3M10 26H7a3 3 0 01-3-3v-3M4 15h22" {...line(color, 2.2)} />
    </Svg>
  );
}

export function NavHistory({ size = 26, color = INK }: P) {
  return (
    <Svg width={size} height={size} viewBox="0 0 26 26">
      <Path d="M18 11V4.5a1.5 1.5 0 00-1.5-1.5h-11A1.5 1.5 0 004 4.5v17A1.5 1.5 0 005.5 23H12" {...line(color, 1.6)} />
      <Path d="M8 8h6M8 12h4" {...line(color, 1.6)} />
      <Circle cx={18.5} cy={18.5} r={5} {...line(color, 1.6)} />
      <Path d="M18.5 16v2.7l1.8 1.1" {...line(color, 1.4)} />
    </Svg>
  );
}

export function NavMe({ size = 26, color = INK }: P) {
  return (
    <Svg width={size} height={size} viewBox="0 0 26 26">
      <Circle cx={13} cy={13} r={10.5} {...line(color, 1.8)} />
      <Circle cx={13} cy={10.5} r={3.5} {...line(color, 1.8)} />
      <Path d="M6.5 20c1.5-2.8 3.8-4.2 6.5-4.2s5 1.4 6.5 4.2" {...line(color, 1.8)} />
    </Svg>
  );
}
