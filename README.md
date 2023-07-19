# SkyWay Vue

## 概要

SkyWay のチュートリアルを元にして作成したVueプロジェクトです。  
https://github.com/skyway/js-sdk/tree/main/examples/tutorial

チュートリアルから変更した点は以下の通りです。  

- Vue で実装  
- Amazon Cognito による認証を追加  
- バックエンドで生成した SkyWay Auth Token を取得する  

全体的な構成についてはこちらのQiita記事をご参照ください。  
https://qiita.com/falya128/items/71d5a092a6119f8fad02

なお、動作するためにはバックエンドのAPIを作成する必要があります。  
別リポジトリにてAWS CDKプロジェクトを用意しておりますので、必要に応じてご利用ください。  
https://github.com/falya128/skyway-vue-cdk

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
