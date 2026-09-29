/**
 * Design tokens — MoMo UI Kit (Quỹ theme).
 * Giá trị hiện lấy theo ảnh màn Góp/Rút & Túi Thần Tài vì Figma MCP hết quota;
 * khi đọc được variables từ MoMo UI Kit thì chỉ cần thay số ở file này.
 */
export const colors = {
  // Brand / Quỹ
  primary: '#E5328C',
  primarySoft: '#FDF0F6',
  primaryBorder: '#F5A3C8',
  headerGradientTop: '#F9CFE2',
  headerGradientBottom: '#FBE4EE',

  // Surface
  background: '#F2F2F6',
  surface: '#FFFFFF',
  border: '#E3E3E8',
  divider: '#EDEDF2',

  // Text
  textPrimary: '#303233',
  textSecondary: '#727578',
  textHint: '#9A9CA0',
  textDisabled: '#C3C3CC',
  danger: '#E53935',

  // Tag
  tagBg: '#F05A2A',
  tagText: '#FFFFFF',

  // Button
  buttonDisabledBg: '#E8E8EF',
  onPrimary: '#FFFFFF',

  // Icon
  bankIcon: '#F5A623',
  momoBrand: '#A50064',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
} as const;

export const radius = {
  sm: 8,
  md: 12,
  pill: 999,
} as const;

export const typography = {
  header: { fontSize: 17, fontWeight: '700' as const, color: colors.textPrimary },
  tab: { fontSize: 15, fontWeight: '500' as const },
  sectionTitle: { fontSize: 17, fontWeight: '700' as const, color: colors.textPrimary },
  label: { fontSize: 13, color: colors.textSecondary },
  body: { fontSize: 15, color: colors.textPrimary },
  bodyStrong: { fontSize: 15, fontWeight: '600' as const, color: colors.textPrimary },
  caption: { fontSize: 13, color: colors.textSecondary },
  amount: { fontSize: 22, fontWeight: '700' as const, color: colors.textPrimary },
  button: { fontSize: 16, fontWeight: '700' as const },
};
