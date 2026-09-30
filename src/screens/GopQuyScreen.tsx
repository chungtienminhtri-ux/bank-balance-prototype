import React, { useState } from 'react';
import { KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ButtonFooter } from '../components/ButtonFooter';
import { FundingSourceItem } from '../components/FundingSourceItem';
import { IconBankTransfer, MoMoMark, QuyMark, TuiThanTaiMark, VcbMark } from '../components/icons';
import { InputText } from '../components/InputText';
import { Tabs } from '../components/Tabs';
import { TopNavigation } from '../components/TopNavigation';
import {
  DEFAULT_FUNDING_SOURCE,
  DEFAULT_VCB_BALANCE_SHARED,
  DEFAULT_WITHDRAW_DESTINATION,
  FUND_BALANCE,
  FUNDING_SOURCES,
  FundingSource,
  FundingSourceId,
  WITHDRAW_DESTINATIONS,
  WITHDRAW_QUICK_AMOUNTS,
} from '../mocks/fundingSources';
import { colors, radius, spacing, typography } from '../theme';

type Mode = 'gop' | 'rut';

const NOTE_MAX = 200;

const SOURCE_ICONS: Record<FundingSourceId, React.ReactNode> = {
  vcb: <VcbMark />,
  momo_wallet: <MoMoMark />,
  tui_than_tai: <TuiThanTaiMark />,
  tich_luy: <QuyMark />,
  bank_transfer: <IconBankTransfer />,
};

/** Khác biệt giữa Góp và Rút gom về một chỗ. */
const MODE_CONFIG: Record<
  Mode,
  {
    amountLabel: string;
    sectionTitle: string;
    sourceLabel: string;
    cta: string;
    sources: FundingSource[];
    defaultSource: FundingSourceId;
    quickAmounts?: number[];
    showLimitLink?: boolean;
  }
> = {
  gop: {
    amountLabel: 'Cần góp',
    sectionTitle: 'Chọn nguồn tiền',
    sourceLabel: 'Nguồn tiền',
    cta: 'Góp quỹ',
    sources: FUNDING_SOURCES,
    defaultSource: DEFAULT_FUNDING_SOURCE,
    showLimitLink: true,
  },
  rut: {
    amountLabel: 'Cần rút',
    sectionTitle: 'Chọn nơi nhận tiền',
    sourceLabel: 'Rút về',
    cta: 'Rút quỹ',
    sources: WITHDRAW_DESTINATIONS,
    defaultSource: DEFAULT_WITHDRAW_DESTINATION,
    quickAmounts: WITHDRAW_QUICK_AMOUNTS,
  },
};

export const formatVnd = (n: number) => `${n.toLocaleString('vi-VN').replace(/,/g, '.')}đ`;

export default function GopQuyScreen({ onBack }: { onBack?: () => void }) {
  const [tab, setTab] = useState<Mode>('gop');
  // Chia sẻ số dư ngân hàng liên kết — dùng chung cho cả 2 tab.
  const [balanceShared, setBalanceShared] = useState(DEFAULT_VCB_BALANCE_SHARED);
  const [consentOpen, setConsentOpen] = useState(false);
  return (
    <View style={styles.root}>
      <TopNavigation title="Góp/Rút" onBack={onBack} />
      <Tabs
        items={[
          { key: 'gop', label: 'Góp quỹ' },
          { key: 'rut', label: 'Rút quỹ' },
        ]}
        value={tab}
        onChange={setTab}
      />
      <FundTab key={tab} mode={tab} balanceShared={balanceShared} onRequestConsent={() => setConsentOpen(true)} />

      {/* Đăng ký xem số dư VCB (mock) */}
      <Modal transparent visible={consentOpen} animationType="fade" onRequestClose={() => setConsentOpen(false)}>
        <Pressable style={styles.backdrop} onPress={() => setConsentOpen(false)}>
          <Pressable style={styles.sheet} onPress={() => {}}>
            <View style={{ alignItems: 'center' }}>
              <VcbMark size={44} />
            </View>
            <Text style={[typography.sectionTitle, { textAlign: 'center', marginTop: spacing.md }]}>
              Xem số dư VCB ngay trên MoMo
            </Text>
            <Text style={[typography.caption, { textAlign: 'center', marginTop: spacing.sm, lineHeight: 19 }]}>
              Cho phép MoMo hiển thị số dư tài khoản VCB để bạn chọn nguồn tiền nhanh hơn. Bạn có thể tắt bất cứ lúc
              nào trong Cài đặt.
            </Text>
            <Pressable
              style={[styles.sheetBtn, { marginTop: spacing.xl }]}
              onPress={() => {
                setBalanceShared(true);
                setConsentOpen(false);
              }}
            >
              <Text style={[typography.button, { color: colors.onPrimary }]}>Đồng ý</Text>
            </Pressable>
            <Pressable style={styles.sheetBtnGhost} onPress={() => setConsentOpen(false)}>
              <Text style={[typography.button, { color: colors.textSecondary }]}>Để sau</Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

function FundTab({
  mode,
  balanceShared,
  onRequestConsent,
}: {
  mode: Mode;
  balanceShared: boolean;
  onRequestConsent: () => void;
}) {
  const cfg = MODE_CONFIG[mode];
  const [amountDigits, setAmountDigits] = useState('');
  const [note, setNote] = useState('');
  const [source, setSource] = useState<FundingSourceId>(cfg.defaultSource);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [done, setDone] = useState(false);

  const amount = Number(amountDigits || 0);
  const selected = cfg.sources.find((s) => s.id === source)!;
  const needsConsent = (s: FundingSource) => !!s.requiresBalanceConsent && !balanceShared;
  const visibleBalance = (s: FundingSource) => (needsConsent(s) ? undefined : s.balance);

  // Góp: không vượt số dư nguồn tiền. Rút: không vượt số dư quỹ.
  const selectedBalance = visibleBalance(selected);
  const sourceShort = mode === 'gop' && selectedBalance !== undefined && amount > selectedBalance;
  const fundShort = mode === 'rut' && amount > FUND_BALANCE;
  const canSubmit = amount > 0 && !sourceShort && !fundShort;

  const onAmountChange = (text: string) => {
    setAmountDigits(text.replace(/\D/g, '').replace(/^0+/, '').slice(0, 12));
  };
  const reset = () => {
    setConfirmOpen(false);
    setDone(false);
    setAmountDigits('');
    setNote('');
  };

  const quickChips = cfg.quickAmounts ? (
    <View style={styles.chips}>
      {cfg.quickAmounts.map((v) => (
        <Pressable key={v} style={styles.chip} onPress={() => setAmountDigits(String(v))}>
          <Text style={styles.chipText}>{formatVnd(v)}</Text>
        </Pressable>
      ))}
    </View>
  ) : undefined;

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.balanceRow}>
          <Text style={typography.bodyStrong}>Số dư quỹ</Text>
          <Text style={styles.balance}>{formatVnd(FUND_BALANCE)}</Text>
        </View>

        <View style={styles.card}>
          <InputText
            label={cfg.amountLabel}
            required
            value={amountDigits ? formatVnd(amount) : ''}
            onChangeText={onAmountChange}
            onClear={mode === 'rut' ? () => setAmountDigits('') : undefined}
            placeholder="0đ"
            keyboardType="number-pad"
            inputStyle={typography.amount}
            error={fundShort ? `Vượt số dư quỹ (${formatVnd(FUND_BALANCE)})` : undefined}
          />
          <View style={{ height: spacing.md }} />
          <InputText
            label={`Ghi chú (${note.length}/${NOTE_MAX})`}
            value={note}
            onChangeText={setNote}
            maxLength={NOTE_MAX}
            placeholder="Nhập ghi chú"
          />
        </View>

        <View style={styles.sectionHeader}>
          <Text style={typography.sectionTitle}>{cfg.sectionTitle}</Text>
          {cfg.showLimitLink ? (
            <Pressable hitSlop={8}>
              <Text style={styles.link}>Xem hạn mức</Text>
            </Pressable>
          ) : null}
        </View>
        <View style={[styles.card, { gap: spacing.md }]} accessibilityRole="radiogroup">
          {cfg.sources.map((s) => (
            <FundingSourceItem
              key={s.id}
              icon={SOURCE_ICONS[s.id]}
              label={s.label}
              balance={visibleBalance(s) !== undefined ? formatVnd(visibleBalance(s)!) : undefined}
              action={needsConsent(s) ? { label: 'Đăng ký xem số dư', onPress: onRequestConsent } : undefined}
              error={s.id === source && sourceShort ? 'Số dư không đủ, chọn nguồn tiền khác' : undefined}
              selected={source === s.id}
              onPress={() => setSource(s.id)}
            />
          ))}
        </View>
      </ScrollView>

      <ButtonFooter label={cfg.cta} disabled={!canSubmit} onPress={() => setConfirmOpen(true)} accessory={quickChips} />

      {/* Xác nhận (mock) */}
      <Modal transparent visible={confirmOpen} animationType="fade" onRequestClose={() => setConfirmOpen(false)}>
        <Pressable style={styles.backdrop} onPress={() => setConfirmOpen(false)}>
          <Pressable style={styles.sheet} onPress={() => {}}>
            {done ? (
              <>
                <Text style={[typography.sectionTitle, { textAlign: 'center' }]}>{cfg.cta} thành công</Text>
                <Text style={[typography.caption, { textAlign: 'center', marginTop: spacing.sm }]}>
                  {formatVnd(amount)} {mode === 'gop' ? 'từ' : 'về'} {selected.label}
                </Text>
                <Pressable style={[styles.sheetBtn, { marginTop: spacing.xl }]} onPress={reset}>
                  <Text style={[typography.button, { color: colors.onPrimary }]}>Xong</Text>
                </Pressable>
              </>
            ) : (
              <>
                <Text style={typography.sectionTitle}>Xác nhận {cfg.cta.toLowerCase()}</Text>
                <Row k="Số tiền" v={formatVnd(amount)} />
                <Row k={cfg.sourceLabel} v={selected.label} />
                {note ? <Row k="Ghi chú" v={note} /> : null}
                <Pressable style={[styles.sheetBtn, { marginTop: spacing.xl }]} onPress={() => setDone(true)}>
                  <Text style={[typography.button, { color: colors.onPrimary }]}>Xác nhận</Text>
                </Pressable>
              </>
            )}
          </Pressable>
        </Pressable>
      </Modal>
    </KeyboardAvoidingView>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <View style={styles.row}>
      <Text style={typography.caption}>{k}</Text>
      <Text style={[typography.bodyStrong, { flexShrink: 1, textAlign: 'right' }]}>{v}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md, paddingBottom: spacing.xl },
  balanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.xs,
    marginBottom: spacing.md,
  },
  balance: { fontSize: 17, fontWeight: '700', color: colors.primary },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.xl,
    marginBottom: spacing.md,
  },
  link: { fontSize: 14, fontWeight: '600', color: colors.primary },
  chips: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.sm },
  chip: {
    flex: 1,
    height: 32,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.primaryBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipText: { fontSize: 14, fontWeight: '600', color: colors.textPrimary },
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  sheet: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: spacing.lg,
    paddingBottom: spacing.xl + spacing.md,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.md,
    gap: spacing.md,
  },
  sheetBtnGhost: { height: 44, alignItems: 'center', justifyContent: 'center', marginTop: spacing.sm },
  sheetBtn: {
    height: 48,
    borderRadius: radius.sm,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
