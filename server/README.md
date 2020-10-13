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

prisma/.env.sample を参照し、書き換えてデータベースへの接続情報を書き込みます。

```sh
cp prisma/.env.sample prisma/.env
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

### 撤去

データベースを撤去します。**データベースの中身はすべて消去されます。**

```
docker-compose down
```

## 環境変数

| 名称           | 説明                                           |
| -------------- | ---------------------------------------------- |
| `DATABASE_URL` | [PostgreSQL 接続 URL][database_connection_url] |

[database_connection_url]: https://www.prisma.io/docs/reference/database-connectors/connection-urls/
