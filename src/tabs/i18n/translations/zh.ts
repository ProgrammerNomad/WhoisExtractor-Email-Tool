import type { Translation } from "./en";

/**
 * Chinese Translations (Simplified)
 * 简体中文翻译
 */

export const zh: Translation = {
  // Header
  header: {
    title: "Email Address Extractor",
    subtitle: "从任意文本或文件快速提取邮箱地址，配合好用的高级过滤",
    emailCount: "{{count}} 个邮箱",
  },

  // Input Section
  input: {
    title: "输入文本",
    placeholder: "在此粘贴包含电子邮件地址的文本...",
    fileUpload: "或上传文件",
    chooseFile: "选择文件",
    selectedFile: "已选择文件：",
    size: "大小：",
    largeFileWarning: "⚠ 大文件 - 后台处理",
    extractButton: "提取邮箱",
    resetButton: "重置",
    extracting: "提取中...",
  },

  // Results Section
  results: {
    title: "已提取的邮箱",
    count: "找到 {{count}} 个电子邮件地址",
    noResults: "未找到电子邮件地址。请尝试粘贴文本或上传文件。",
    placeholder: "提取的电子邮件地址将显示在此处...",
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
      email: "电子邮件地址",
    },

    basicOptions: {
      label: "基本选项",
      deduplicate: "删除重复项",
      deduplicateHelp: "删除重复的电子邮件地址",
      lowercase: "转换为小写",
      lowercaseHelp: "将所有邮箱转换为小写",
      removeNumeric: "删除数字域名",
      removeNumericHelp: "删除仅含数字域名的邮箱",
      sort: "按字母排序",
      sortHelp: "按字母顺序排序结果",
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
      label: "高级过滤选项",
      filterMode: "过滤模式",
      removeStrings: "删除字符串",
      removeStringsPlaceholder: "输入要删除的字符串（每行一个）",
      removeStringsHelp: "删除包含这些字符串的邮箱",
    },

    keywordFilter: {
      label: "高级关键词过滤",
      enable: "启用关键词过滤",
      placeholder: "输入关键词（每行一个）",
      description: "删除包含特定关键词或模式的不需要的邮箱",
      inputLabel: "删除包含这些关键词的邮箱（逗号分隔）",
      requestLink: "请求新关键词 →",
      helpEnabled: "仅提取包含这些关键词的邮箱",
      helpDisabled: "启用以按关键词过滤邮箱",
    },
  },

  // Footer
  footer: {
    about: {
      title: "关于",
      description: "一个免费的开源电子邮件提取工具，在您的浏览器中本地处理数据。不会将任何数据上传到服务器。",
      opensource: "免费开源 | MIT 许可证",
      message: "欢迎自由使用、修改和分发此工具！",
    },
    quickLinks: {
      title: "快速链接",
      github: "GitHub 仓库",
      issues: "报告问题",
      privacy: "隐私政策",
      website: "WhoisExtractor",
    },
    support: {
      title: "支持",
      description: "如果您觉得此工具有用，请考虑：",
      star: "在 GitHub 上加星",
      fork: "Fork 项目",
      contribute: "贡献代码",
    },
  },

  // Privacy Notice
  privacy: {
    title: "隐私声明",
    message:
      "所有电子邮件提取均在您的浏览器中本地处理，不会上传到任何服务器。\n\n" +
      "您的数据在您的设备上完全私密和安全。\n\n" +
      "如需要，您可以在设置中选择服务器处理（该功能尚未推出）。",
    understood: "我明白了",
  },

  // Toast Messages
  toast: {
    extractionStarted: "开始提取...",
    extractionComplete: "提取完成！找到 {{count}} 个邮箱",
    copied: "已复制 {{count}} 个邮箱到剪贴板",
    exportSuccess: "已导出 {{count}} 个邮箱到 {{format}}",
    fileUploaded: "文件已上传：{{filename}}",
    settingsSaved: "设置已成功保存",
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
};
