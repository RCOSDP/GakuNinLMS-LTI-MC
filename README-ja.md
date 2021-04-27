# CHiBi-CHiLO

[English](README-en.md) | 日本語

## これは何をするプログラムか

Moodle や BlackBoard などの LTI と連携して、Wowza, YouTube, Vimeo 上に存在する動画コンテンツを、学習者が利用しやすいコンテンツにまとめ上げるシステムです。

下記のような画面を提供します。

--- わかりやすい動画例を添付する。 --- LTI リンクを起点とする操作例 Gif か mp4 へのリンク

## 使い方

[インストール方法](INSTALL-ja.md)を読んでください。

### 学習分析

教員または管理者は、学習分析データとして CSV ファイル(BOM 付き)をダウンロードできます。
CSV ファイルの各カラムの詳細は次のとおりです。

| CSV            | RDB                        | 説明                                                                    |
| -------------- | -------------------------- | ----------------------------------------------------------------------- |
| `learner.id`   | `users.id`                 | 学習者 - 識別子                                                         |
| `learner.name` | `users.name`               | 学習者 - 氏名                                                           |
| `topic.id`     | `topics.id`                | トピック - 識別子                                                       |
| `topic.name`   | `topics.name`              | トピック - トピック名称                                                 |
| `status`       | -                          | 学習状況 - 完了: "completed", 未完了: "incompleted", 未開封: "unopened" |
| `totalTimeMs`  | `activities.total_time_ms` | 学習活動 - 合計時間 (ms)                                                |
| `createdAt`    | `activities.created_at`    | 学習活動 - 作成日                                                       |
| `updatedAt`    | `activities.update_at`     | 学習活動 - 更新日                                                       |
| `book.id`      | `books.id`                 | ブック - 識別子                                                         |
| `book.name`    | `books.name`               | ブック - 題名                                                           |

## アーキテクチャ

[アーキテクチャの概要](ARCHITECTURE.md)を参照してください。

## ドキュメント

インストールしたあと、下記の URL から操作方法を学んでください。

## 貢献方法

contributing.md を参考にしてください。著作権が発生するほどのコードやドキュメントを貢献していただいた方々には、Authors.rst にお名前と連絡用のメールアドレスを記載します。

## ライセンス

MIT

## funding

永続的な開発を続けるために、寄付を歓迎します。
