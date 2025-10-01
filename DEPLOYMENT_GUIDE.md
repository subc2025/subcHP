# 🌐 ステップアップバドミントンクラブ - 固定URL設定ガイド

## 🎯 固定URL取得方法

GitHub Pagesの設定にアクセスできない場合の代替手段として、以下の方法で固定URLを取得できます。

## 方法1: Netlifyを使用（推奨・無料）

### 手順:
1. **Netlifyにアクセス**: https://www.netlify.com/
2. **サインアップ**: GitHubアカウントでログイン
3. **新しいサイト作成**: "Import from Git" を選択
4. **GitHubリポジトリ選択**: `subc2025/subcHP` を選択
5. **ブランチ設定**: `main` ブランチを選択
6. **デプロイ設定**: 
   - Build command: （空欄のまま）
   - Publish directory: `.`（ルートディレクトリ）
7. **デプロイ**: "Deploy site" をクリック

### 取得できる固定URL例:
- `https://amazing-badminton-club.netlify.app/`
- `https://step-up-badminton.netlify.app/`

## 方法2: Vercelを使用（無料）

### 手順:
1. **Vercelにアクセス**: https://vercel.com/
2. **GitHubでサインアップ**
3. **新しいプロジェクト**: "Import Git Repository"
4. **リポジトリ選択**: `subcHP`
5. **デプロイ**: 自動設定でデプロイ

### 取得できる固定URL例:
- `https://subc-hp.vercel.app/`
- `https://step-up-badminton.vercel.app/`

## 方法3: GitHub Pages（リポジトリオーナーが設定）

リポジトリのオーナーに以下を依頼:
1. リポジトリSettings → Pages
2. Source: "Deploy from a branch"
3. Branch: "main", Folder: "/ (root)"
4. Save

### 取得できる固定URL:
- `https://subc2025.github.io/subcHP/`

## 🚀 現在利用可能なURL

- **開発環境**: https://8080-iv1rf0bmwyorvp3lgg5cc-6532622b.e2b.dev/
- **固定URL**: 上記いずれかの方法で取得

## 📝 推奨事項

1. **Netlify**が最も簡単で安定しています
2. **カスタムドメイン**の設定も可能
3. **HTTPS**が自動で有効化されます
4. **CDN**による高速配信

## 🛠️ 技術仕様

- 静的ファイルホスティング
- 自動HTTPS化
- グローバルCDN配信
- 無料プラン利用可能