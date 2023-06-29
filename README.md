# SkyWay Vue

## 概要

SkyWay のチュートリアルを元にして作成したプロジェクトです。

https://github.com/skyway/js-sdk/tree/main/examples/tutorial

### 変更点

- Vue で実装
- Amazon Cognito による認証を追加
- バックエンドで生成した SkyWay Auth Token を取得する

## 開始手順

### 各種ライブラリのインストール

```powershell
cd skyway-vue
npm install
```

### 環境設定

```powershell
cp .env.example .env
```

以下の箇所を変更

```
VITE_COGNITO_USER_POOL_ID=[Cognito ユーザープールID]
VITE_COGNITO_CLIENT_ID=[Cognito クライアントID]
VITE_FETCH_TOKEN_URL=[SkyWay Auth Token 取得APIのURL]
```

### 起動

```powershell
npm run dev
```
