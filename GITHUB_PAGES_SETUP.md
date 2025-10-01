# 🌐 GitHub Pages 設定完全ガイド

## 🎯 目標
**固定URL**: `https://subc2025.github.io/subcHP/`

## 📋 設定手順（詳細版）

### ステップ1: GitHub リポジトリにアクセス

**リポジトリURL**: https://github.com/subc2025/subcHP

### ステップ2: Settings ページにアクセス

以下のURL を**順番に**試してください：

#### 2-1. メイン設定ページ
```
https://github.com/subc2025/subcHP/settings
```

#### 2-2. Pages設定直接リンク
```
https://github.com/subc2025/subcHP/settings/pages
```

### ステップ3: 権限確認

もしも上記URLで**404エラー**や**アクセス拒否**が出る場合：

#### 確認事項:
- GitHubアカウント `subc2025` でログインしているか
- リポジトリの所有者権限があるか
- リポジトリが**Public**になっているか

### ステップ4: GitHub Pages設定

アクセスできた場合の設定：

#### 4-1. Source設定
- **Source**: `Deploy from a branch` を選択

#### 4-2. Branch設定  
- **Branch**: `main` を選択
- **Folder**: `/ (root)` を選択

#### 4-3. 保存
- **Save** ボタンをクリック

### ステップ5: デプロイ確認

設定後、以下をチェック：

#### 5-1. Actions タブ確認
```
https://github.com/subc2025/subcHP/actions
```

#### 5-2. デプロイ状況確認
- 緑のチェックマーク ✅ が表示されるまで待機（通常1-5分）

#### 5-3. 固定URLアクセス
```
https://subc2025.github.io/subcHP/
```

## 🛠️ トラブルシューティング

### 問題1: 404エラー（Settings にアクセスできない）

**解決策**:
1. リポジトリの可視性を確認
2. ブラウザのキャッシュクリア
3. 別ブラウザで試行
4. GitHub アカウントの再ログイン

### 問題2: Pages設定が見つからない

**解決策**:
1. リポジトリが**Public**であることを確認
2. **Actions** タブで Pages が有効化されていることを確認

### 問題3: デプロイエラー

**解決策**:
1. `index.html` ファイルがルートにあることを確認
2. Actions ログでエラー詳細を確認

## 📱 結果確認

成功した場合の表示：
- GitHub Pages設定画面に緑色のチェックマーク
- 「Your site is live at https://subc2025.github.io/subcHP/」

## 🎯 代替手段

GitHub Pages設定できない場合：
1. **Netlify** (既にデプロイ済み)
2. **Vercel** での追加デプロイ
3. **Firebase Hosting**