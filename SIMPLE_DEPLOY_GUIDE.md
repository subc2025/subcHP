# 🚀 ステップアップバドミントンクラブ - 簡単デプロイガイド

## 問題: GitHubリポジトリが見つからない場合の解決方法

リポジトリが見つからない問題を解決するため、**手動アップロード方式**で固定URLを取得します。

## 🌟 方法1: Netlify Drop（最推奨・超簡単）

### 📋 手順:
1. **Netlifyにアクセス**: https://app.netlify.com/drop
2. **ファイルをドラッグ&ドロップ**:
   - `deploy_ready`フォルダ内の全ファイルを選択
   - ブラウザのNetlify画面にドラッグ&ドロップ
3. **自動デプロイ**: 数秒で完了
4. **固定URL取得**: 自動生成されたURLをコピー

### 📁 アップロードするファイル:
- `index.html`（メインファイル）
- `debug.html`
- `css/`フォルダ（全ファイル）
- `js/`フォルダ（全ファイル）  
- `images/`フォルダ（全ファイル）
- `_headers`
- `_redirects`

## 🌟 方法2: Surge.sh（コマンドライン）

### 📋 手順:
```bash
npm install -g surge
cd deploy_ready
surge
```
- ドメイン名を指定（例: step-up-badminton.surge.sh）
- 即座にデプロイ完了

## 🌟 方法3: Firebase Hosting

### 📋 手順:
1. **Firebase Consoleにアクセス**: https://console.firebase.google.com/
2. **新しいプロジェクト作成**: "ステップアップバドミントン"
3. **Hosting設定**: 静的ファイルをアップロード
4. **固定URL取得**: `https://プロジェクト名.web.app/`

## 🎯 取得予想URL例:

### Netlify:
- `https://wonderful-badminton-club-123456.netlify.app/`
- `https://step-up-badminton-site.netlify.app/`

### Surge.sh:
- `https://step-up-badminton.surge.sh/`
- `https://yokohama-badminton-club.surge.sh/`

### Firebase:
- `https://step-up-badminton.web.app/`
- `https://yokohama-badminton-club.web.app/`

## ✅ 推奨度ランキング:

1. **🥇 Netlify Drop**: 最も簡単、ドラッグ&ドロップのみ
2. **🥈 Surge.sh**: コマンドライン、カスタムドメイン簡単
3. **🥉 Firebase**: Googleサービス、高機能

## 📱 現在のテスト環境:
- **一時URL**: https://8080-iv1rf0bmwyorvp3lgg5cc-6532622b.e2b.dev/

すべて無料で永続的な固定URLが取得できます！