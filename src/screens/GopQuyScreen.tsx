import React, { useMemo, useState } from 'react';
import { KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ButtonFooter } from '../components/ButtonFooter';
import { IconBankTransfer, MoMoMark } from '../components/icons';
import { InputText } from '../components/InputText';
import { PaymentMethodItem } from '../components/PaymentMethodItem';
import { Tabs } from '../components/Tabs';
import { TopNavigation } from '../components/TopNavigation';
import { colors, radius, spacing, typography } from '../theme';

type Tab = 'gop' | 'rut';
type Method = 'bank_transfer' | 'linked_bank';

const FUND_BALANCE = 2470177;
const NOTE_MAX = 200;

const METHODS: { key: Method; title: string; subtitle: string; tag?: string; icon: React.ReactNode }[] = [
  {
    key: 'bank_transfer',
    title: 'Chuyển khoản từ ngân hàng',
    subtitle: 'Hạn mức nạp mỗi ngày: 3 giao dịch',
    tag: 'Đề xuất',
    icon: <IconBankTransfer />,
  },
  {
    key: 'linked_bank',
    title: 'Nạp từ ngân hàng liên kết',
    subtitle: 'Hạn mức nạp mỗi tháng: 50 triệu',
    icon: <MoMoMark />,
  },
];

export const formatVnd = (n: number) => `${n.toLocaleString('vi-VN').replace(/,/g, '.')}đ`;

export default function GopQuyScreen() {
  const [tab, setTab] = useState<Tab>('gop');
  const [amountDigits, setAmountDigits] = useState('');
  const [note, setNote] = useState('');
  const [method, setMethod] = useState<Method>('linked_bank');
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [done, setDone] = useState(false);

  const amount = Number(amountDigits || 0);
  const canSubmit = amount > 0 && !!method;
  const methodLabel = useMemo(() => METHODS.find((m) => m.key === method)?.title ?? '', [method]);

  const onAmountChange = (text: string) => {
    const digits = text.replace(/\D/g, '').replace(/^0+/, '').slice(0, 12);
    setAmountDigits(digits);
  };

  return (
    <View style={styles.root}>
      <TopNavigation title="Góp/Rút" />
      <Tabs
        items={[
          { key: 'gop', label: 'Góp quỹ' },
          { key: 'rut', label: 'Rút quỹ' },
        ]}
        value={tab}
        onChange={setTab}
      />

      {tab === 'gop' ? (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
            {/* Số dư quỹ */}
            <View style={styles.balanceRow}>
              <Text style={typography.bodyStrong}>Số dư quỹ</Text>
              <Text style={styles.balance}>{formatVnd(FUND_BALANCE)}</Text>
            </View>

            {/* Nhập số tiền + ghi chú — giữ nguyên thao tác màn hiện tại */}
            <View style={styles.card}>
              <InputText
                label="Cần góp"
                required
                value={amountDigits ? formatVnd(amount) : ''}
                onChangeText={onAmountChange}
                placeholder="0đ"
                keyboardType="number-pad"
                inputStyle={typography.amount}
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

            {/* Phương thức nạp tiền — mới */}
            <View style={styles.sectionHeader}>
              <Text style={typography.sectionTitle}>Chọn cách nạp tiền</Text>
              <Pressable hitSlop={8}>
                <Text style={styles.link}>Xem hạn mức</Text>
              </Pressable>
            </View>
            <View style={[styles.card, { gap: spacing.md, paddingTop: spacing.lg }]} accessibilityRole="radiogroup">
              {METHODS.map((m) => (
                <PaymentMethodItem
                  key={m.key}
                  icon={m.icon}
                  title={m.title}
                  subtitle={m.subtitle}
                  tag={m.tag}
                  selected={method === m.key}
                  onPress={() => setMethod(m.key)}
                />
              ))}
            </View>
          </ScrollView>
          <ButtonFooter label="Góp quỹ" disabled={!canSubmit} onPress={() => setConfirmOpen(true)} />
        </KeyboardAvoidingView>
      ) : (
        <View style={styles.placeholder}>
          <Text style={typography.caption}>Rút quỹ — ngoài phạm vi prototype này.</Text>
        </View>
      )}

      {/* Xác nhận (mock) */}
      <Modal transparent visible={confirmOpen} animationType="fade" onRequestClose={() => setConfirmOpen(false)}>
        <Pressable style={styles.backdrop} onPress={() => setConfirmOpen(false)}>
          <Pressable style={styles.sheet} onPress={() => {}}>
            {done ? (
              <>
                <Text style={[typography.sectionTitle, { textAlign: 'center' }]}>Góp quỹ thành công</Text>
                <Text style={[typography.caption, { textAlign: 'center', marginTop: spacing.sm }]}>
                  {formatVnd(amount)} qua {methodLabel.toLowerCase()}
                </Text>
                <Pressable
                  style={[styles.sheetBtn, { marginTop: spacing.xl }]}
                  onPress={() => {
                    setConfirmOpen(false);
                    setDone(false);
                    setAmountDigits('');
                    setNote('');
                  }}
                >
                  <Text style={[typography.button, { color: colors.onPrimary }]}>Xong</Text>
                </Pressable>
              </>
            ) : (
              <>
                <Text style={typography.sectionTitle}>Xác nhận góp quỹ</Text>
                <Row k="Số tiền" v={formatVnd(amount)} />
                <Row k="Nguồn tiền" v={methodLabel} />
                {note ? <Row k="Ghi chú" v={note} /> : null}
                <Pressable style={[styles.sheetBtn, { marginTop: spacing.xl }]} onPress={() => setDone(true)}>
                  <Text style={[typography.button, { color: colors.onPrimary }]}>Xác nhận</Text>
                </Pressable>
              </>
            )}
          </Pressable>
        </Pressable>
      </Modal>
    </View>
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
  placeholder: { flex: 1, alignItems: 'center', justifyContent: 'center' },
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
  sheetBtn: {
    height: 48,
    borderRadius: radius.sm,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
