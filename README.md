# Colbert & Crystal's Wedding 婚禮邀請 & RSVP 網站

一個中英雙語、手機優先的婚禮邀請網站：開場是一本可以打開的「護照」動畫，翻頁後帶出活動資訊與賓客回覆表單，送出後彙整到 Google Sheet，並引導賓客加入 LINE / WhatsApp 群組。

A bilingual (Traditional Chinese + English), mobile-first wedding invitation site: an animated "passport" cover opens into stamped pages, then reveals event details and an RSVP form. Submissions are collected into a Google Sheet, and guests are guided to join a LINE / WhatsApp group afterward.

## 開發 Development

```bash
npm install
npm run dev      # 本機開發 http://localhost:5173
npm run build    # 產出 dist/ 供部署
npm run preview  # 預覽 build 結果
```

## 專案結構 Project structure

```
src/
  content.ts        所有中英文文案 (bilingual copy)
  config.ts         外部連結 / API 端點設定 (reads from .env)
  components/
    PassportCover.tsx   護照封面 + 打開按鈕
    PassportBook.tsx    護照內頁翻頁動畫 (相識/相守 印章 + 照片)
    IntroSection.tsx    感謝文字 + 兩個活動卡片
    RSVPForm.tsx         賓客回覆表單
    ThankYou.tsx         送出後的 LINE / WhatsApp 導引
  lib/
    submit.ts        呼叫 Google Apps Script 送出表單
    image.ts         上傳照片前的壓縮處理
apps-script/
  Code.gs           Google Apps Script 後端（寫入 Google Sheet / Drive）
```

## 1. 串接 Google Sheet（收賓客回覆）

表單送出的資料是透過 **Google Apps Script Web App** 寫入 Google Sheet，不需要另外架設伺服器。

1. 開一個新的 Google Sheet（例如命名「婚禮賓客回覆」）。
2. 上方選單 **擴充功能 Extensions → Apps Script**。
3. 把 [`apps-script/Code.gs`](./apps-script/Code.gs) 的內容整個貼進去，取代預設的 `Code.gs`。
4. 點右上角 **部署 Deploy → New deployment**：
   - Select type：**Web app**
   - Execute as：**Me**
   - Who has access：**Anyone**
5. 部署後會拿到一組網址，結尾是 `/exec`，複製起來。
6. 在專案根目錄複製一份 `.env.example` 改名為 `.env`，貼上：
   ```
   VITE_GAS_ENDPOINT=https://script.google.com/macros/s/xxxxxxxx/exec
   ```
7. 重新啟動 `npm run dev` 即可生效。之後每次表單送出，都會自動在 Sheet 裡新增一列（時間、姓名、人數、參加活動、照片連結）；若賓客有上傳照片，照片會存進一個叫「Wedding RSVP Photos」的 Google Drive 資料夾，並把分享連結記錄在 Sheet 裡。

> 之後如果要修改 Apps Script 程式碼，記得改完要重新 **Deploy → Manage deployments → Edit → 版本選 New version** 才會生效。

## 2. 設定 LINE / WhatsApp 群組連結

本機開發用 `.env`；**部署到 GitHub Pages 用的是 `.env.production`**（這個檔案有進版控，直接改了 push 上去就會生效）：

```
VITE_LINE_URL=https://line.me/ti/g/你的邀請碼
VITE_WHATSAPP_URL=https://chat.whatsapp.com/你的邀請碼
```

沒有設定的話會顯示佔位連結，記得部署前要換成真的邀請連結。這兩個連結跟 Apps Script 網址一樣都不是機密資料（本來就會顯示在網頁上給賓客點），所以直接寫進 `.env.production` 提交是安全的。

## 3. 更換護照內頁的照片

目前「相識」「相守」兩頁的右頁是照片佔位框。等照片準備好後：

1. 把照片放進 `src/assets/`（例如 `met.jpg`、`together.jpg`）。
2. 打開 `src/components/PassportBook.tsx`，在檔案頂端 `import` 圖片，並填入對應 spread 的 `photoSrc`：
   ```ts
   import metPhoto from '../assets/met.jpg';
   import togetherPhoto from '../assets/together.jpg';

   const spreads: Spread[] = [
     { stamp: content.stamps.met, photoSrc: metPhoto, ... },
     { stamp: content.stamps.together, photoSrc: togetherPhoto, ... },
   ];
   ```

## 4. 部署 Deployment

### GitHub Pages（已內建自動部署）

repo 裡已經有 `.github/workflows/deploy.yml`，每次 push 到這個分支或 `main` 都會自動 build 並發布到 GitHub Pages。**第一次使用前，你只需要手動開一次開關：**

1. 到 GitHub repo 頁面 → **Settings → Pages**
2. **Build and deployment → Source** 選擇 **GitHub Actions**
3. 存好後回到 **Actions** 分頁，確認 workflow 有跑成功（綠勾勾）
4. 幾分鐘後網站會上線在：
   `https://<你的GitHub帳號>.github.io/colbert-crystal_wedidng/`

之後只要 push 新的 commit，網站就會自動重新部署，不用再手動操作。

> 如果之後 repo 改名或帳號不同，記得同步修改 `vite.config.ts` 裡的 `base` 路徑，否則圖片/樣式會讀不到。

### 其他選擇

也可以改用 Vercel、Netlify、Cloudflare Pages：`npm run build` 產出 `dist/` 後上傳即可，並在該平台的環境變數設定加上 `VITE_GAS_ENDPOINT`、`VITE_LINE_URL`、`VITE_WHATSAPP_URL`（此時不需要 `base` 路徑，可把 `vite.config.ts` 的 `base` 拿掉或設為 `/`）。

## 5. 修改文案

所有中英文文字都集中在 [`src/content.ts`](./src/content.ts)，包含活動時間地點、表單標籤、感謝文字等，改這個檔案就能同步更新頁面上的中英文內容。
