## エージェント
日本語で絵文字を使って返答する
ユーザーからデザインの指定が無ければ、モダンなライトデザインをデフォルトにする
AGENTS.mdの内容はプロダクトの要件に変更がある度に適宜修正する

# 静的サイト 実装仕様

## 確認方法
- ユーザーはCドライブのパスをブラウザに直接入力して確認する
- Dockerなどの仮想環境は利用しない

## 実装方針
- CSS・JS等の他ファイルを参照するときは必ず相対パスを使う

## 画像
- AIエージェントによる画像生成は実行しない
- 画像はユーザーが用意する



## ⚠ 文字コード設定（PowerShell 環境）
**必須:** ファイル読み書きは UTF-8 を明示的に指定する。

- スクリプト先頭で必ず以下を実行する:
$OutputEncoding = [System.Text.Encoding]::UTF8
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

- ファイル書き込みには `-Encoding UTF8` を必ず付ける:
Set-Content -Path 'output.txt' -Value $data -Encoding UTF8

- Python の `open()` には `encoding="utf-8"` を必ず指定する:
with open("file.txt", "r", encoding="utf-8") as f:
    content = f.read()

### PowerShell環境では文字化けが発生しやすいため厳守