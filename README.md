# Good Moning Typing  
<img src="front/src/assets/logo.png">

## サービス概要  
朝起きた時に元気がない、仕事前に気分が上がらないなどの困り事ありませんか？  
そんな人を対象に社会人として安定したパフォーマンスを発揮するために朝の状態を把握し、行動に反映させることができるアプリです。

## ゲームのやり方  
* ゲームにアクセスしたらSTARTを押す  
* ログインをする  
  * アカウントがある場合  
    ログイン情報を入力してLog Inを押す  
  * アカウントがない場合  
    CREATE NEW ACCOUNTを押す  
    登録するユーザー名とパスワードを入力してCREATEを押す
* タイピングに出題される単語のジャンルを選択
* 昨晩寝た時間と今朝起きた時間を選択
* GAME STARTを押す
* ゲームが開始されるのでランダムに出題される単語をタイピング
* 正しくタイピングされると次の問題が出力される
* ゲームが終了するとタイピングのスコアと睡眠時間、その月の結果をグラフで確認可能  
* AIがその月の結果を元にアドバイスをくれます  
* スピーカーのボタンを押すと、アドバイスの読み上げを開始  
  
  1日1回しかスコアの登録はできません！！！

## 使用技術  
### バックエンド  
* Express ^5.1.0  
* JavaScript  
* Knex

### フロントエンド  
* React
* JavaScript
* YamadaUI  

### データベース  
* Postgresql  
 


## Setup
0. データベースの作成  
   * snoppyという名前のデータベースをPostgersqlに作成してください  
   
1. リポジトリをローカル環境にCloneする  
```bash
git clone git@github.com:Team3-snoppy/wake_up_typing.git
```  

2. serverディレクトリでバックエンドのライブラリをインストールする  
```bash
cd server
npm install
```

3. frontディレクトリでフロントエンドのライブラリをインストールする
```bash
cd ..
cd front
npm install
```  

4. serverディレクトリに.envファイルを作成する
```js
NOVE_ENV="development"
```
5. ビルドする
```bash
cd ..
cd server
npm run build
```

