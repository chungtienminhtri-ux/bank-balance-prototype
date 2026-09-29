# bank-balance-prototype

Prototype màn **Góp quỹ** mới: giữ nguyên nhập số tiền + ghi chú, thêm phần **Chọn nguồn tiền** gồm VCB, Ví MoMo, Túi Thần Tài và Chuyển khoản từ ngân hàng. Nguồn có số dư sẽ báo lỗi và khoá nút khi số tiền góp vượt số dư.

## Chạy thử

```bash
git clone https://github.com/chungtienminhtri-ux/bank-balance-prototype
cd bank-balance-prototype
git checkout fund-bank-balance
npm install
npx expo start --tunnel   # quét QR bằng Expo Go
# hoặc: npm run web
```

## Cấu trúc

- `src/screens/GopQuyScreen.tsx` — màn Góp/Rút (tab Góp quỹ), sheet xác nhận mock
- `src/components/` — đặt tên theo MoMo UI Kit: `TopNavigation`, `Tabs`, `InputText`, `ButtonFooter`, `FundingSourceItem`
- `src/mocks/fundingSources.ts` — mock nguồn tiền và số dư
- `src/theme.ts` — design tokens (màu, spacing, typography). **Tạm lấy theo ảnh màn hiện tại**; thay bằng variables từ MoMo UI Kit khi Figma MCP đọc được.

## Preview

| Mặc định | Không đủ số dư | Xác nhận |
|---|---|---|
| ![](docs/1_empty.png) | ![](docs/4_insufficient.png) | ![](docs/3_confirm.png) |
