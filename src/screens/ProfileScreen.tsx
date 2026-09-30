import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';
import { BottomNav, NavTab } from '../components/BottomNav';
import { BottomSheet } from '../components/BottomSheet';
import { IconHeadset } from '../components/icons';
import { Chevron, ListItem } from '../components/ListItem';
import {
  IconAccountSettings,
  IconAntiFraud,
  IconCamera,
  IconInvite,
  IconMalwareScan,
  IconQrCorner,
  IconVerified,
  IconPaymentLink,
  IconPersonalData,
  IconShieldCheck,
  IconSupport,
  SheetMovie,
  SheetPayQr,
  SheetReceiveQr,
  SheetTravel,
  TileBill,
  TileQr,
  TileSim,
  TileTicket,
  TileVoucher,
} from '../components/profileIcons';
import { PROFILE, UTILITY_SHEETS, UtilityId } from '../mocks/profile';
import { colors, radius, spacing, typography } from '../theme';

const SHORTCUTS = [
  { label: 'Cài đặt\ntài khoản', Icon: IconAccountSettings },
  { label: 'Thanh toán\nvà liên kết', Icon: IconPaymentLink },
  { label: 'Quản lý dữ\nliệu cá nhân', Icon: IconPersonalData },
  { label: 'Chống lừa\nđảo', Icon: IconAntiFraud },
];

const UTILITIES: { id: UtilityId; label: string; Icon: typeof TileQr }[] = [
  { id: 'offers', label: 'Ưu đãi &\nthành viên', Icon: TileVoucher },
  { id: 'tickets', label: 'Vé & đặt chỗ', Icon: TileTicket },
  { id: 'bills', label: 'Hóa đơn &\nhợp đồng', Icon: TileBill },
  { id: 'sim', label: 'SIM & thẻ nạp', Icon: TileSim },
];

const SHEET_ICONS: Record<string, React.ReactNode> = {
  receive: <SheetReceiveQr />,
  pay: <SheetPayQr />,
  movie: <SheetMovie />,
  travel: <SheetTravel />,
};

/**
 * Phương án đặt lối vào "Mã QR của tôi":
 * - 'tile':   ô riêng trong Quản lý tiện ích (A)
 * - 'corner': nút QR ở góc phải thẻ hồ sơ (B)
 * - 'pill':   pill "Mã QR" thay chỗ pill Số tài khoản dưới tên (C)
 */
export type QrEntry = 'tile' | 'corner' | 'pill';

export default function ProfileScreen({
  onNavigate,
  qrEntry = 'tile',
}: {
  onNavigate?: (tab: NavTab) => void;
  qrEntry?: QrEntry;
}) {
  const insets = useSafeAreaInsets();
  const [sheet, setSheet] = useState<UtilityId | null>(null);
  const current = sheet ? UTILITY_SHEETS[sheet] : undefined;
  const openUtility = (id: UtilityId) => {
    if (UTILITY_SHEETS[id]) setSheet(id);
  };

  return (
    <View style={styles.root}>
      {/* Nền hồng phía trên */}
      <Svg style={[StyleSheet.absoluteFill, { height: 260 }]} width="100%" height={260} preserveAspectRatio="none" viewBox="0 0 1 1">
        <Defs>
          <LinearGradient id="pf" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={colors.headerGradientTop} />
            <Stop offset="1" stopColor={colors.background} />
          </LinearGradient>
        </Defs>
        <Rect x="0" y="0" width="1" height="1" fill="url(#pf)" />
      </Svg>

      <ScrollView contentContainerStyle={[styles.content, { paddingTop: insets.top + spacing.sm }]}>
        <View style={styles.topBar}>
          <Pressable style={styles.support} accessibilityLabel="Hỗ trợ">
            <IconHeadset size={17} />
          </Pressable>
        </View>

        {/* Hồ sơ */}
        <Pressable style={[styles.card, styles.profile]}>
          <View>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{PROFILE.initials}</Text>
            </View>
            <View style={styles.camera}>
              <IconCamera />
            </View>
          </View>
          <View style={{ flex: 1, gap: 6 }}>
            {qrEntry === 'pill' ? (
              <>
                <View style={styles.nameRow}>
                  <Text style={styles.name}>{PROFILE.name}</Text>
                  <IconVerified />
                </View>
                <Pressable
                  style={({ pressed }) => [styles.qrPill, pressed && { opacity: 0.7 }]}
                  onPress={() => openUtility('my_qr')}
                  hitSlop={6}
                  accessibilityRole="button"
                  accessibilityLabel="Mã QR của tôi"
                >
                  <Text style={styles.qrPillText}>Mã QR</Text>
                  <IconQrCorner size={17} />
                </Pressable>
              </>
            ) : (
              <Text style={styles.name}>{PROFILE.name}</Text>
            )}
            {qrEntry !== 'pill' && PROFILE.biometricVerified ? (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>Đã sinh trắc học</Text>
              </View>
            ) : null}
          </View>
          {qrEntry === 'corner' ? (
            <Pressable
              style={styles.qrCorner}
              onPress={() => openUtility('my_qr')}
              hitSlop={6}
              accessibilityRole="button"
              accessibilityLabel="Mã QR của tôi"
            >
              <IconQrCorner />
            </Pressable>
          ) : (
            <Chevron size={18} color={colors.textPrimary} />
          )}
        </Pressable>

        {/* Bảo mật */}
        <Pressable style={[styles.card, styles.securityRow]}>
          <IconShieldCheck />
          <Text style={styles.securityText}>Tài khoản an toàn nâng cao</Text>
          <Chevron size={18} color={colors.textPrimary} />
        </Pressable>

        {/* Lối tắt */}
        <View style={[styles.card, styles.shortcuts]}>
          {SHORTCUTS.map(({ label, Icon }) => (
            <Pressable key={label} style={styles.shortcut}>
              <Icon />
              <Text style={styles.shortcutText}>{label}</Text>
            </Pressable>
          ))}
        </View>

        {/* Quản lý tiện ích */}
        <View style={[styles.card, { padding: spacing.md, gap: spacing.sm }]}>
          <Text style={styles.sectionTitle}>Quản lý tiện ích</Text>

          {/* Phương án A: Mã QR của tôi */}
          {qrEntry === 'tile' ? (
          <Pressable style={[styles.tile, styles.qrTile]} onPress={() => openUtility('my_qr')} accessibilityRole="button">
            <TileQr size={30} />
            <View style={{ flex: 1 }}>
              <Text style={styles.tileText}>Mã QR của tôi</Text>
              <Text style={styles.qrHint}>Mã nhận tiền, mã thanh toán</Text>
            </View>
            <View style={styles.newTag}>
              <Text style={styles.newTagText}>Mới</Text>
            </View>
          </Pressable>
          ) : null}

          <View style={styles.grid}>
            {UTILITIES.map(({ id, label, Icon }) => (
              <Pressable key={id} style={[styles.tile, styles.gridTile]} onPress={() => openUtility(id)} accessibilityRole="button">
                <Icon />
                <Text style={styles.tileText}>{label}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Quét phần mềm độc hại */}
        <View style={[styles.card, styles.scan]}>
          <View style={{ flex: 1, gap: 4 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <IconMalwareScan />
              <Text style={typography.bodyStrong}>Quét phần mềm độc hại</Text>
            </View>
            <Text style={[typography.caption, { lineHeight: 19 }]}>
              Công cụ giúp rà soát và ngăn chặn rủi ro từ phần mềm độc hại
            </Text>
          </View>
          <Pressable style={styles.scanBtn}>
            <Text style={styles.scanBtnText}>Quét ngay</Text>
          </Pressable>
        </View>

        <View style={[styles.card, { overflow: 'hidden' }]}>
          <ListItem icon={<IconInvite />} title="Mời bạn bè" subtitle="Nhận thưởng cho mỗi lượt mời thành công" />
        </View>
        <View style={[styles.card, { overflow: 'hidden' }]}>
          <ListItem icon={<IconSupport />} title="Trung tâm trợ giúp" subtitle="Giúp bạn giải quyết mọi vấn đề" />
        </View>
      </ScrollView>

      <BottomNav
        active="me"
        centerLabel={qrEntry === 'pill' ? 'QR ngân hàng' : 'Mã VietQR'}
        onPress={(t) => onNavigate?.(t)}
      />

      <BottomSheet visible={!!current} title={current?.title ?? ''} onClose={() => setSheet(null)}>
        <View style={{ paddingTop: spacing.xs }}>
          {current?.items.map((it, i) => (
            <ListItem
              key={it.id}
              icon={SHEET_ICONS[it.id]}
              title={it.title}
              subtitle={it.subtitle}
              divider={i < current.items.length - 1}
              onPress={() => setSheet(null)}
            />
          ))}
        </View>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: spacing.md, paddingBottom: spacing.xl, gap: 10 },
  topBar: { flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 4 },
  support: {
    width: 34,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255,255,255,0.85)',
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: { backgroundColor: colors.surface, borderRadius: radius.md },
  profile: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, padding: spacing.md },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#FBD3E4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { fontSize: 18, fontWeight: '700', color: colors.primary },
  camera: { position: 'absolute', right: -3, bottom: -2 },
  name: { fontSize: 16, fontWeight: '700', color: colors.textPrimary },
  badge: { alignSelf: 'flex-start', backgroundColor: '#34B24A', borderRadius: radius.pill, paddingHorizontal: 9, paddingVertical: 3 },
  badgeText: { fontSize: 13, fontWeight: '600', color: '#fff' },
  securityRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, paddingHorizontal: spacing.md, height: 48 },
  securityText: { flex: 1, fontSize: 14, fontWeight: '600', color: '#2E9E42' },
  shortcuts: { flexDirection: 'row', paddingVertical: spacing.lg, paddingHorizontal: spacing.xs },
  shortcut: { flex: 1, alignItems: 'center', gap: 6 },
  shortcutText: { fontSize: 13, lineHeight: 18, textAlign: 'center', color: colors.textPrimary },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: colors.textPrimary, marginBottom: 2 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  tile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: spacing.md,
    minHeight: 52,
  },
  gridTile: { flexBasis: '47%', flexGrow: 1 },
  tileText: { flexShrink: 1, fontSize: 14, lineHeight: 19, color: colors.textPrimary },
  qrTile: { borderColor: colors.primaryBorder, backgroundColor: colors.primarySoft, paddingVertical: 10 },
  qrHint: { fontSize: 12, color: colors.textSecondary, marginTop: 1 },
  newTag: { backgroundColor: colors.primary, borderRadius: radius.pill, paddingHorizontal: 8, paddingVertical: 2 },
  newTagText: { fontSize: 11, fontWeight: '700', color: colors.onPrimary },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  qrPill: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.divider,
    borderRadius: radius.sm,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  qrPillText: { fontSize: 14, fontWeight: '600', color: colors.textPrimary },
  qrCorner: {
    width: 44,
    height: 44,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
  },
  scan: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, padding: spacing.md },
  scanBtn: { borderWidth: 1.5, borderColor: colors.primary, borderRadius: radius.sm, paddingHorizontal: 10, paddingVertical: 6 },
  scanBtnText: { fontSize: 14, fontWeight: '700', color: colors.primary },
});
