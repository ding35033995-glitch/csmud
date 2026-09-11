# 找到你落腳行星｜正式上線版

- 10 題測驗 + 年級/本名
- 八大行星結果
- 8 組，每組最多 11 人
- 第一順位額滿後自動尋找下一順位
- 同分時依序優先順位分配
- 受試者看不到管理員入口
- 管理員頁面：`/admin.html`
- 手機優先版面

## Vercel 環境變數
在 Vercel Project Settings → Environment Variables 設定：

`DATABASE_URL`：Supabase PostgreSQL connection string
`ADMIN_PASSWORD`：管理員密碼

## Supabase
先在 Supabase SQL Editor 執行 `schema.sql`。

## 上線
將此資料夾推到 GitHub，再匯入 Vercel。Build Command 留空，Framework Preset 使用 Other。

部署後：
- 受試者：`https://你的網域/`
- 管理員：`https://你的網域/admin.html`

## 注意
正式上線前請用 3 支不同手機測試提交；確認資料會在 Supabase 的 `submissions` 表出現，且任何行星組別不超過 11 人。
