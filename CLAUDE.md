# bank-balance-prototype

Prototype luồng **Liên kết số dư ngân hàng (Bank Balance Link)** trong Personal Finance / FinHub của MoMo — thúc đẩy user chia sẻ số dư ngân hàng với MoMo. Dùng để demo và test nhanh ý tưởng UX, **không phải code production**.

Owner: Tri Chung (Senior Manager, Payment Services — Social Payment, MoMo). Không phải engineer: giải thích ngắn gọn, ưu tiên cho xem kết quả trên điện thoại hơn là giải thích code.

## Quy ước

- **Mọi thay đổi làm trên branch `fund-bank-balance`.** Không commit thẳng vào `main`.
- Commit nhỏ, message tiếng Anh ngắn gọn; push sau mỗi mốc chạy được.
- Ngôn ngữ giao tiếp với user: **tiếng Việt**. Text trong UI: tiếng Việt như app MoMo thật.

## Stack

- **Expo** (SDK mới nhất) + **Expo Router** (file-based routing trong `app/`), TypeScript.
- Chạy trên điện thoại bằng **Expo Go** — tránh thư viện cần native build riêng (không dùng thứ bắt buộc development build).
- Không backend: dữ liệu ngân hàng, số dư, danh sách tài khoản là **mock** trong `src/mocks/`.

## Figma

- Design system: **MoMo UI Kit**, fileKey `faeeq4CO4mQ9wkORJiLI5a`. Component đã xác nhận có: Button, ButtonIcon, Template_ButtonFooter, BottomSheet, SettingsListItem, Icon/Default.
- Account Figma: `Product3` (full seat trên plan Product Team) — có quyền đọc UI Kit.
- Luồng design cụ thể: user sẽ gửi link có `node-id`. Dùng `get_design_context` + `get_screenshot` cho từng frame; output của Figma là **tham chiếu**, chuyển sang React Native (`View`/`Text`/`Pressable`, StyleSheet), không copy HTML/Tailwind.
- Đưa màu, spacing, typography vào `src/theme/` (lấy từ `get_variable_defs`), dùng lại xuyên suốt thay vì hard-code.
- Dựng component dùng chung (Button, BottomSheet, ListItem...) trong `src/components/` bám theo UI Kit trước, rồi mới ghép màn hình.

## Chạy app

```bash
npm install
npx expo start --tunnel
```

Quét QR bằng Expo Go trên điện thoại. Khi user muốn xem, chủ động chạy dev server và nhắc họ quét QR; sau đó chỉ cần save là hot-reload.

## MCP

`.mcp.json` ở gốc repo khai báo Figma MCP và Expo MCP (remote, đăng nhập OAuth lần đầu qua `/mcp` trong Claude Code). GitHub: dùng git credential trên máy, không cần MCP.

## Bảo mật

Không paste token/PAT vào chat hay commit vào repo. Không đưa dữ liệu khách hàng thật vào mock.
