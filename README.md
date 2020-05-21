# butterfly

## 設定ファイル

各種サービスへの接続情報など config.php によって設定する。
config.php.sample を参考にして config.php を配置し適宜書き換える必要がある。

コマンド:

```sh
cp config.php.sample config.php
```

config.php:

| 定数              | 型         | 説明                        |
| ----------------- | ---------- | --------------------------- |
| `OAUTH_CONSUMERS` | consumer[] | consumer オブジェクトの配列 |
| `DB_HOST`         | string     | RDB ホスト名                |
| `DB_USERNAME`     | string     | RDB ユーザー名              |
| `DB_PASSWORD`     | string     | RDB ユーザーのパスワード    |
| `DB_DATABASE`     | string     | RDB のデータベース名        |

consumer オブジェクト: OAuth の認証情報の連想配列

| キー                 | 値                 | 型     |
| -------------------- | ------------------ | ------ |
| `oauth_consumer_key` | OAuth Consumer Key | string |
| `oauth_signature`    | OAuth Signature    | string |
