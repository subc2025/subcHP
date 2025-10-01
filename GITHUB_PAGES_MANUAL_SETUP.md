# 🔧 GitHub Pages 手動設定ガイド

## 問題の原因
- GitHub App トークンの制限
- リポジトリ設定ページへのアクセス権限不足
- API経由での設定も制限されている状態

## ✅ 確実な解決方法

### 方法1: リポジトリオーナーによる直接操作

#### 👤 subc2025アカウント本人が実行する手順:

1. **GitHub.com に個人アカウントでログイン**
   - https://github.com
   - subc2025 アカウントでログイン
   - 組織アカウントではなく**個人アカウント**で操作

2. **リポジトリにアクセス**
   ```
   https://github.com/subc2025/subcHP
   ```

3. **Settings タブをクリック**
   - リポジトリページの上部タブ「Settings」

4. **Pages 設定を有効化**
   - 左サイドバー「Pages」をクリック
   - Source: "Deploy from a branch"
   - Branch: "main" 
   - Folder: "/ (root)"
   - **Save** をクリック

5. **確認**
   - 数分後に https://subc2025.github.io/subcHP/ にアクセス

### 方法2: リポジトリの可視性確認

#### リポジトリが Private になっている場合:

1. **Settings → General**
2. **「Change repository visibility」**
3. **「Make public」**を選択
4. **確認後、上記のPages設定を実行**

### 方法3: 組織設定の確認

#### 組織アカウントの制限がある場合:

1. **Organization Settings**
2. **Member privileges**
3. **Pages creation** を有効化

### 方法4: 権限の再付与

#### GitHub App の権限を確認:

1. **Settings → Developer settings**
2. **Personal access tokens**
3. **新しいトークンを作成**（Pages権限付き）

## 🎯 最も確実な方法

**リポジトリオーナー（subc2025本人）**による直接操作が最も確実です。

### 代替手段
GitHub Pages設定が困難な場合は、既存の固定URL解決策を利用:
- ✅ **Netlify**: 既にデプロイ済み
- ✅ **Vercel**: 追加デプロイ可能
- ✅ **Firebase**: 代替ホスティング

## 📞 サポートが必要な場合

GitHub Pages設定でお困りの場合は、以下の情報をGitHubサポートに問い合わせ:
- リポジトリ: subc2025/subcHP
- 問題: Settings/Pages ページに404エラー
- アカウント種別: 個人/組織