import type { Translation } from "./en";

/**
 * Japanese Translations
 * 日本語翻訳
 */

export const ja: Translation = {
  // Header
  header: {
    title: "Email Address Extractor",
    subtitle: "テキストやファイルからメールアドレスを素早く抽出。使いやすいアドバンスフィルター付き",
    emailCount: "{{count}} メール",
  },

  // Input Section
  input: {
    title: "入力テキスト",
    placeholder: "メールアドレスを含むテキストをここに貼り付けてください...",
    fileUpload: "またはファイルをアップロード",
    chooseFile: "ファイルを選択",
    selectedFile: "選択されたファイル：",
    size: "サイズ：",
    largeFileWarning: "⚠ 大きなファイル - バックグラウンド処理",
    extractButton: "メールを抽出",
    resetButton: "リセット",
    extracting: "抽出中...",
  },

  // Results Section
  results: {
    title: "抽出されたメール",
    count: "{{count}} 件のメールアドレスが見つかりました",
    noResults: "メールアドレスが見つかりませんでした。テキストを貼り付けるか、ファイルをアップロードしてみてください。",
    placeholder: "抽出されたメールアドレスがここに表示されます...",
    copyButton: "すべてコピー",
    exportTxt: ".TXT にエクスポート",
    exportCsv: ".CSV にエクスポート",
    copied: "クリップボードにコピーしました！",
    exported: "正常にエクスポートされました！",
  },

  // Options Panel
  options: {
    title: "抽出オプション",
    
    extractionType: {
      label: "抽出タイプ",
      email: "メールアドレス",
    },

    basicOptions: {
      label: "基本オプション",
      deduplicate: "重複を削除",
      deduplicateHelp: "重複するメールアドレスを削除",
      lowercase: "小文字に変換",
      lowercaseHelp: "すべてのメールを小文字に変換",
      removeNumeric: "数字のドメインを削除",
      removeNumericHelp: "数字のみのドメインを持つメールを削除",
      sort: "アルファベット順に並べ替え",
      sortHelp: "結果をアルファベット順に並べ替え",
    },

    outputOptions: {
      label: "出力オプション",
      separator: "区切り文字",
      groupByLabel: "メールをグループ化",
      separators: {
        newline: "改行",
        comma: "カンマ",
        semicolon: "セミコロン",
        pipe: "パイプ (|)",
        space: "スペース",
      },
    },

    advancedFilters: {
      label: "高度なフィルターオプション",
      filterMode: "フィルターモード",
      removeStrings: "文字列を削除",
      removeStringsPlaceholder: "削除する文字列を入力（1行に1つ）",
      removeStringsHelp: "これらの文字列を含むメールを削除",
    },

    keywordFilter: {
      label: "高度なキーワードフィルター",
      enable: "キーワードフィルターを有効にする",
      placeholder: "キーワードを入力（1行に1つ）",
      description: "特定のキーワードやパターンを含む不要なメールを削除",
      inputLabel: "これらのキーワードを含むメールを削除（カンマ区切り）",
      requestLink: "新しいキーワードをリクエスト →",
      helpEnabled: "これらのキーワードを含むメールのみが抽出されます",
      helpDisabled: "キーワードでメールをフィルタリングするには有効にします",
    },
  },

  // Footer
  footer: {
    about: {
      title: "について",
      description: "ブラウザでローカルにデータを処理する無料のオープンソースメール抽出ツール。データはサーバーにアップロードされません。",
      opensource: "無料＆オープンソース | MIT ライセンス",
      message: "このツールを自由に使用、変更、配布してください！",
    },
    quickLinks: {
      title: "クイックリンク",
      github: "GitHub リポジトリ",
      issues: "問題を報告",
      privacy: "プライバシーポリシー",
      website: "WhoisExtractor",
    },
    support: {
      title: "サポート",
      description: "このツールが役立つと思われる場合は、ぜひご検討ください：",
      star: "GitHub でスター",
      fork: "プロジェクトをフォーク",
      contribute: "貢献する",
    },
  },

  // Privacy Notice
  privacy: {
    title: "プライバシー通知",
    message:
      "すべてのメール抽出はブラウザでローカルに処理され、サーバーにアップロードされません。\n\n" +
      "データは完全にプライベートで安全にデバイスに保存されます。\n\n" +
      "必要に応じて、設定でサーバー処理を選択できます（この機能はまだ利用できません）。",
    understood: "了解しました",
  },

  // Toast Messages
  toast: {
    extractionStarted: "抽出を開始しました...",
    extractionComplete: "抽出完了！{{count}} 件のメールが見つかりました",
    copied: "{{count}} 件のメールをクリップボードにコピーしました",
    exportSuccess: "{{count}} 件のメールを {{format}} にエクスポートしました",
    fileUploaded: "ファイルがアップロードされました：{{filename}}",
    settingsSaved: "設定が正常に保存されました",
    error: "エラー：{{message}}",
    cleared: "すべてのデータがクリアされました",
  },

  // Review Prompt
  review: {
    title: "WhoisExtractorをお楽しみいただけていますか？",
    message: "WhoisExtractorを{{days}}日間使用し、{{count}}回の抽出に成功しました。レビューを残していただけますか？",
    rateNow: "Chrome ウェブストアで評価する",
    later: "後で",
    dontAsk: "今後表示しない",
    thankYou: "フィードバックをありがとうございます！",
  },

  // Update Notification
  update: {
    title: "アップデートが利用可能です",
    message: "バージョン {{version}} が利用可能になりました。",
    description: "拡張機能を再読み込みして、新機能と改善を含む最新バージョンに更新してください。",
    updateNow: "今すぐ更新",
    later: "後で",
  },

  // Common
  common: {
    loading: "読み込み中...",
    cancel: "キャンセル",
    close: "閉じる",
    save: "保存",
    reset: "リセット",
    clear: "クリア",
    export: "エクスポート",
    import: "インポート",
    settings: "設定",
    help: "ヘルプ",
    language: "言語",
    review: "レビューを残す",
  },
};
