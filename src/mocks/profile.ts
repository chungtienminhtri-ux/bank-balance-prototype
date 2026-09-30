/** Mock dữ liệu màn Tôi. */
export const PROFILE = {
  name: 'Chung Tiến Minh Trí',
  initials: 'MT',
  biometricVerified: true,
};

export type UtilityId = 'my_qr' | 'offers' | 'tickets' | 'bills' | 'sim';

/** Bottom sheet mở ra từ từng ô Quản lý tiện ích. Ô không có ở đây thì chưa làm trong prototype. */
export const UTILITY_SHEETS: Partial<
  Record<UtilityId, { title: string; items: { id: string; title: string; subtitle?: string }[] }>
> = {
  my_qr: {
    title: 'Mã QR của tôi',
    items: [
      { id: 'receive', title: 'Mã nhận tiền', subtitle: 'Chia sẻ mã này để nhận tiền từ những người xung quanh' },
      { id: 'pay', title: 'Mã thanh toán', subtitle: 'Đưa mã này cho thu ngân cửa hàng để thanh toán' },
    ],
  },
  tickets: {
    title: 'Vé & đặt chỗ',
    items: [
      { id: 'movie', title: 'Vé xem phim' },
      { id: 'travel', title: 'Du lịch, đi lại' },
    ],
  },
};
