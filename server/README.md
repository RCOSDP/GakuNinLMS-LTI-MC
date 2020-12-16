# chibichilo-server

## 開発

### 前提条件

2020-10-13 現在、以下の環境で動作確認済み

- Docker v19
- Docker Compose v1.27
- Node v14
- Yarn v1.22

### 手順

データベースを構築します。開発環境は次のコマンドで構築します。

```sh
docker-compose up -d
```

デフォルトでは URL `postgresql://postgres:password@localhost/postgres` で接続可能な PostgreSQL データベースが構築されます。

.env.sample を参照し、書き換えてデータベースへの接続情報を書き込みます。

```sh
cp .env.sample .env
```

依存パッケージ群をインストールします。

```sh
yarn
```

その接続情報をもとにしてデータベースをマイグレートします。

```sh
yarn migrate
```

データベースのビジュアルエディター[Prisma Studio](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-studio)を利用できます。

```sh
yarn prisma studio
```

開発用サーバーを起動します。

```sh
yarn dev
```

開発用サーバーを起動後、`http://localhost:{PORT}{BASE_PATH}/swagger` にアクセスすると API ドキュメントツール[Swagger UI](https://swagger.io/tools/swagger-ui/) を利用できます。

例: http://localhost:8080/api/v2/swagger

### 撤去

データベースを撤去します。**データベースの中身はすべて消去されます。**

```
docker-compose down
```

## 環境変数

| 名称                    | 説明                                                           |
| ----------------------- | -------------------------------------------------------------- |
| `PORT`                  | ポート (デフォルト: `8080`)                                    |
| `API_BASE_PATH`         | ベースとなるパス (例: `/api/v2` )                              |
| `FRONTEND_ORIGIN`       | フロントエンドのオリジン (例: `http://localhost:3000`)         |
| `FRONTEND_PATH`         | フロントエンドのパス (例: `http://localhost:3000/` ならば `/`) |
| `SESSION_SECRET`        | セッションストアの秘密鍵                                       |
| `OAUTH_CONSUMER_KEY`    | LMS に登録されている OAuth Consumer Key                        |
| `OAUTH_CONSUMER_SECRET` | LMS に登録されている OAuth Consumer Secret                     |
| `DATABASE_URL`          | [PostgreSQL 接続 URL][database_connection_url]                 |

[database_connection_url]: https://www.prisma.io/docs/reference/database-connectors/connection-urls/
