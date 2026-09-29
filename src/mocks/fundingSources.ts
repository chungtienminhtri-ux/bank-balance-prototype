/** Mock nguồn tiền cho màn Góp quỹ — không phải dữ liệu thật. */
export type FundingSourceId = 'vcb' | 'momo_wallet' | 'tui_than_tai' | 'bank_transfer';

export type FundingSource = {
  id: FundingSourceId;
  label: string;
  /** Số dư (VND). Không có = nguồn ngoài MoMo, không kiểm tra số dư. */
  balance?: number;
};

export const FUNDING_SOURCES: FundingSource[] = [
  { id: 'vcb', label: 'VCB', balance: 1_000_000 },
  { id: 'momo_wallet', label: 'Ví MoMo', balance: 500_000 },
  { id: 'tui_than_tai', label: 'Túi Thần Tài', balance: 5_000_000 },
  { id: 'bank_transfer', label: 'Chuyển khoản từ ngân hàng' },
];

export const DEFAULT_FUNDING_SOURCE: FundingSourceId = 'momo_wallet';

/** Nơi nhận tiền khi Rút quỹ. */
export const WITHDRAW_DESTINATIONS: FundingSource[] = FUNDING_SOURCES.filter(
  (s) => s.id === 'vcb' || s.id === 'momo_wallet',
);

export const DEFAULT_WITHDRAW_DESTINATION: FundingSourceId = 'momo_wallet';

export const WITHDRAW_QUICK_AMOUNTS = [50_000, 100_000, 200_000];

export const FUND_BALANCE = 2_470_177;
