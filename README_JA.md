# 病気図鑑（Web）

Android版 `byoki_zukan` と同じ内容の Web アプリです。

## 機能

- ぶいからみる（体のマップ＋部位解説）
- げんいんからみる
- すべてのびょうき
- びょうめいクイズ（5問）
- ふりがなのオン／オフ

## 開発

```powershell
cd byoki_zukan_web
npm install
npm run dev
```

ブラウザ: http://localhost:5177/#/

## ビルド

```powershell
npm run build
```

`diseases.json` は `byoki_zukan/app/src/main/assets/diseases.json` を `public/assets/` にコピーして同期してください。

## 本番

https://byoki-zukan-web.vercel.app/#/

## デプロイ

`main` に push すると Vercel でビルドされます。コンテンツ更新時は `scripts/sync-content.ps1` で JSON を同期してください。
