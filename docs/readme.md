# Micro CHiLO (MC)

## 1 将来的なモデル
* 問題意識：現在のOERはレポジトリがあっても，それを簡単に再利用する仕組みがない．
* 将来構想：各機関のLMSに対し，SNSを含むOERリソースを教材として組み立てて再利用する仕組みを提供する．
* 開発プロセス：NII→阪大→TIES版を作成する

![](https://github.com/webdino-butterfly/butterfly/blob/master/docs/images/5.png)

## 2 構成要素
ユーザーが求める多様な仕様に耐えうるためDCRR構造に整理する

* D : Display layer 
* C : Construction layer
* R : Referatry layer
* R : Resource-repository layer

![](https://github.com/webdino-butterfly/butterfly/blob/master/docs/images/1.png)

## 3 3つのモデル
NIIモデルのMCを阪大モデルに改変する。さらにTIESモデルに発展させる。
以下にアプリケーションの違いを示す

![](https://github.com/webdino-butterfly/butterfly/blob/master/docs/images/2.png)

### ダッシュボード
* 教員用ダッシュボード：教員が受講生の学習進捗をグラフ等で確認できる機能．Completed，Attempted，Unopened，視聴率（はやまわし？）

### 学習コンテンツマネージャー
* 学習進捗表示：学習者がビデオ閲覧を完了したかどうか表示される
* Zip書き出し：ZIPあるいはEPUBで学習コンテンツをダウンロードし，他のサイトで再利用できる
* 全件検索(一覧)：現在の学習コンテンツ一覧
* 再利用（LMS連携）：他者が作った学習コンテンツも利用できる機能
* マイページ：自分の学習コンテンツだけが表示できる機能
* 入れ子構造（セクション）：学習コンテンツの中に学習コンテンツを入れられる
* 概要：学習コンテンツの概要が表示できる
* 閲覧許可：学習者に学習コンテンツを閲覧（表示）させるかどうか
* 閲覧期間：〇〇日後に表示する

### ビデオコンテンツ マネージャー
* 全件検索(一覧)：現在のビデオ一覧
* 再利用：他者が作ったビデオコンテンツも利用できる機能
* コンピテンシーDB
* マイページ
* タグ（キーワード）
* LOMの採用

### リソースレポジトリ
* マルチプラットフォーム対応：複数のプラットフォームを利用可能

## 4 UI
### 1) 画面遷移
現在の画面遷移は、どの機能にも飛べて便利な反面、初心者ユーザーにはわかりにくい。
画面遷移を図のように一方向とする。

![](https://github.com/webdino-butterfly/butterfly/blob/master/docs/images/3.png)
![](https://github.com/webdino-butterfly/butterfly/blob/master/docs/images/4.png)

### 2) デザイン
まずは阪大デザインを採用する

## 5 開発の可能性
* コメント機能
* クイズ機能
* 検索の強化
* コンピテンシーDBとの結合

## 6 課題
* 学習ログレポジトリの開発手法
