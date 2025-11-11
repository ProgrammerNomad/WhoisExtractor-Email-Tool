import type { Translation } from "./en"

/**
 * Chinese Translations (Simplified)
 * 简体中文翻译（优化版）
 */

export const zh: Translation = {
  // Header
  header: {
    title: "邮箱地址提取器",
    subtitle: "从任意文本或文件中快速提取邮箱地址，支持强大且易用的高级过滤功能",
    emailCount: "{{count}} 个邮箱",
  },

  // Input Section
  input: {
    title: "输入文本",
    placeholder: "请在此粘贴包含邮箱地址的文本...",
    fileUpload: "或上传文件",
    chooseFile: "选择文件",
    selectedFile: "已选择文件：",
    size: "大小：",
    largeFileWarning: "⚠ 文件较大 — 正在后台处理中",
    extractButton: "提取邮箱",
    resetButton: "重置",
    extracting: "正在提取...",
  },

  // Results Section
  results: {
    title: "提取结果",
    count: "共找到 {{count}} 个邮箱地址",
    noResults: "未找到任何邮箱地址，请尝试粘贴文本或上传文件。",
    placeholder: "提取出的邮箱地址将显示在这里...",
    copyButton: "复制全部",
    exportTxt: "导出 .TXT",
    exportCsv: "导出 .CSV",
    copied: "已复制到剪贴板！",
    exported: "导出成功！",
  },

  // Options Panel
  options: {
    title: "提取选项",

    extractionType: {
      label: "提取类型",
      email: "邮箱地址",
    },

    basicOptions: {
      label: "基础选项",
      deduplicate: "去除重复项",
      deduplicateHelp: "删除重复的邮箱地址",
      lowercase: "转换为小写",
      lowercaseHelp: "将所有邮箱地址转换为小写形式",
      removeNumeric: "去除纯数字域名",
      removeNumericHelp: "删除仅包含数字域名的邮箱地址",
      sort: "按字母排序",
      sortHelp: "按字母顺序排列结果",
    },

    outputOptions: {
      label: "输出选项",
      separator: "分隔符",
      groupByLabel: "分组邮箱",
      separators: {
        newline: "换行",
        comma: "逗号",
        semicolon: "分号",
        pipe: "竖线 (|)",
        space: "空格",
      },
    },

    advancedFilters: {
      label: "高级过滤",
      filterMode: "过滤模式",
      removeStrings: "移除字符串",
      removeStringsPlaceholder: "输入要移除的字符串（每行一个）",
      removeStringsHelp: "移除包含这些字符串的邮箱地址",
    },

    keywordFilter: {
      label: "关键词过滤（高级）",
      enable: "启用关键词过滤",
      placeholder: "输入关键词（每行一个）",
      description: "移除包含特定关键词或模式的不需要的邮箱地址",
      inputLabel: "移除包含以下关键词的邮箱（以逗号分隔）",
      requestLink: "请求新关键词 →",
      helpEnabled: "仅提取包含这些关键词的邮箱",
      helpDisabled: "启用此功能以按关键词过滤邮箱",
    },
  },

  // Footer
  footer: {
    about: {
      title: "关于",
      description: "这是一款免费且开源的邮箱提取工具，所有数据均在您的浏览器本地处理，不会上传到任何服务器。",
      opensource: "免费开源 | 基于 MIT 许可证",
      message: "欢迎自由使用、修改和分发本工具！",
    },
    quickLinks: {
      title: "快速链接",
      github: "GitHub 仓库",
      issues: "反馈问题",
      privacy: "隐私政策",
      website: "WhoisExtractor 官网",
    },
    support: {
      title: "支持与反馈",
      description: "如果您觉得本工具对您有帮助，请支持我们：",
      star: "在 GitHub 上点星支持",
      fork: "Fork 本项目",
      contribute: "贡献代码",
    },
  },

  // Privacy Notice
  privacy: {
    title: "隐私声明",
    message:
      "所有邮箱提取操作均在您的浏览器本地进行，不会将任何数据上传至服务器。\n\n" +
      "您的数据完全私密，并安全地存储在您的设备中。\n\n" +
      "如果需要，您可以在设置中选择启用服务器端处理（该功能暂未开放）。",
    understood: "我已了解",
  },

  // Toast Messages
  toast: {
    extractionStarted: "开始提取...",
    extractionComplete: "提取完成！共找到 {{count}} 个邮箱地址",
    copied: "已复制 {{count}} 个邮箱到剪贴板",
    exportSuccess: "成功导出 {{count}} 个邮箱至 {{format}}",
    fileUploaded: "文件已上传：{{filename}}",
    settingsSaved: "设置已保存成功",
    error: "错误：{{message}}",
    cleared: "所有数据已清除",
  },

  // Common
  common: {
    loading: "加载中...",
    cancel: "取消",
    close: "关闭",
    save: "保存",
    reset: "重置",
    clear: "清除",
    export: "导出",
    import: "导入",
    settings: "设置",
    help: "帮助",
    language: "语言",
  },
}