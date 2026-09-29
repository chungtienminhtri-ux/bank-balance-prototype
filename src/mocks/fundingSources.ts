/** Mock nguồn tiền cho màn Góp quỹ — không phải dữ liệu thật. */
export type FundingSourceId = 'vcb' | 'momo_wallet' | 'tui_than_tai' | 'tich_luy' | 'bank_transfer';

export type FundingSource = {
  id: FundingSourceId;
  label: string;
  /** Số dư (VND). Không có = nguồn ngoài MoMo, không kiểm tra số dư. */
  balance?: number;
  /** Ngân hàng liên kết: chỉ hiện số dư khi user đã cho phép chia sẻ số dư. */
  requiresBalanceConsent?: boolean;
};

const ALL: Record<FundingSourceId, FundingSource> = {
  vcb: { id: 'vcb', label: 'VCB', balance: 1_000_000, requiresBalanceConsent: true },
  momo_wallet: { id: 'momo_wallet', label: 'Ví MoMo', balance: 500_000 },
  tui_than_tai: { id: 'tui_than_tai', label: 'Túi Thần Tài', balance: 5_000_000 },
  tich_luy: { id: 'tich_luy', label: 'Tích Luỹ', balance: 200_000 },
  bank_transfer: { id: 'bank_transfer', label: 'Chuyển khoản từ ngân hàng' },
};

/** Nguồn tiền khi Góp quỹ. */
export const FUNDING_SOURCES: FundingSource[] = [
  ALL.vcb,
  ALL.momo_wallet,
  ALL.tui_than_tai,
  ALL.tich_luy,
  ALL.bank_transfer,
];

export const DEFAULT_FUNDING_SOURCE: FundingSourceId = 'momo_wallet';

/** Nơi nhận tiền khi Rút quỹ. */
export const WITHDRAW_DESTINATIONS: FundingSource[] = [ALL.vcb, ALL.momo_wallet, ALL.tich_luy];

export const DEFAULT_WITHDRAW_DESTINATION: FundingSourceId = 'momo_wallet';

export const WITHDRAW_QUICK_AMOUNTS = [50_000, 100_000, 200_000];

export const FUND_BALANCE = 2_470_177;

/** Trạng thái mặc định khi mở app: user CHƯA cho phép chia sẻ số dư VCB. */
export const DEFAULT_VCB_BALANCE_SHARED = false;
