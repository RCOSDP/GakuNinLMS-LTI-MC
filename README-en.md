# ViLOG

[English](README-en.md) | 日本語

## What kind of program is it?

ViLOG is an open-source program for analyzing video viewing logs. This program allows you to compile video contents already existing on Wowza, YouTube, and Vimeo into easy-to-use contents for learners and to collect and visualize video viewing logs. This system is an LTI tool provider and can be used in conjunction with LMS such as Moodle and BlackBoard.

<!--- わかりやすい動画例を添付する。 --- LTI リンクを起点とする操作例 Gif か mp4 へのリンク-->

## How to Use ViLOG

Please read the installation guide (INSTALL-ja.md).

### Learning Analytics

Instructors or administrators can download CSV files (with BOM) as learning analytics data.
The details of each column in the CSV file are as follows.

| CSV                | RDB                        | 説明                                                                    |
| ------------------ | -------------------------- | ----------------------------------------------------------------------- |
| `User ID`          | `users.id`                 | 学習者 - 識別子                                                         |
| `Username`         | `users.name`               | 学習者 - 氏名                                                           |
| `Email address`    | `users.email`              | 学習者 - メールアドレス ("" は無効値)                                   |
| `Course ID`        | -                          | LTI - 短縮されたコース名称                                              |
| `Course name`          | -                          | LTI - コース名称                                                        |
| `Book ID`         | `books.id`                 | ブック - 識別子                                                         |
| `Book name`         | `books.name`               | ブック - 題名                                                           |
| `Topic ID`       | `topics.id`                | トピック - 識別子                                                       |
| `Topic name`       | `topics.name`              | トピック - トピック名称                                                 |
| `Video length`       | `topics.time_required`     | トピック - 学習所要時間 (秒)                                            |
| `Viewing time` | `activities.total_time_ms` | 学習活動 - 合計時間 (ms)                                                |
| `Status of Learning`         | -                          | 学習状況 - 完了: "completed", 未完了: "incompleted", 未開封: "unopened" |
| `Learning completion rate`       | -                          | 学習完了率 - ユニーク視聴時間が動画の長さを占める割合 (パーセント)      |
| `First access`     | `activities.created_at`    | 学習活動 - 作成日                                                       |
| `Last access`     | `activities.updated_at`    | 学習活動 - 更新日                                                       |

## アーキテクチャ

[アーキテクチャの概要](ARCHITECTURE.md)を参照してください。

## ドキュメント

インストールしたあと、下記の URL から操作方法を学んでください。

<!--## 貢献方法

contributing.md を参考にしてください。著作権が発生するほどのコードやドキュメントを貢献していただいた方々には、Authors.rst にお名前と連絡用のメールアドレスを記載します。-->

## ライセンス

MIT
