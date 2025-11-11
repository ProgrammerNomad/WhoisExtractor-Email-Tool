/**
 * English Translations
 */

export const en = {
  // Header
  header: {
    title: "Email Address Extractor",
    subtitle: "Extract email addresses from any raw text data with advanced filtering options",
    emailCount: "{{count}} Emails",
  },

  // Input Section
  input: {
    title: "Input Text",
    placeholder: "Paste your text containing email addresses here...",
    fileUpload: "Or Upload File",
    chooseFile: "Choose file",
    selectedFile: "Selected file:",
    size: "Size:",
    largeFileWarning: "⚠ Large file - background processing",
    extractButton: "Extract Emails",
    resetButton: "Reset",
    extracting: "Extracting...",
  },

  // Results Section
  results: {
    title: "Extracted Emails",
    count: "{{count}} email addresses found",
    noResults: "No email addresses found. Try pasting text or uploading a file.",
    placeholder: "Extracted email addresses will appear here...",
    copyButton: "Copy All",
    exportTxt: "Export .TXT",
    exportCsv: "Export .CSV",
    copied: "Copied to clipboard!",
    exported: "Exported successfully!",
  },

  // Options Panel
  options: {
    title: "Extraction Options",
    
    extractionType: {
      label: "Extraction Type",
      email: "Email Addresses",
    },

    basicOptions: {
      label: "Basic Options",
      deduplicate: "Remove Duplicates",
      deduplicateHelp: "Remove duplicate email addresses",
      lowercase: "Convert to Lowercase",
      lowercaseHelp: "Convert all emails to lowercase",
      removeNumeric: "Remove Numeric Domains",
      removeNumericHelp: "Remove emails with numeric-only domains",
      sort: "Sort Alphabetically",
      sortHelp: "Sort results in alphabetical order",
    },

    outputOptions: {
      label: "Output Options",
      separator: "Separator",
      groupByLabel: "Group emails",
      separators: {
        newline: "New Line",
        comma: "Comma",
        semicolon: "Semicolon",
        pipe: "Pipe (|)",
        space: "Space",
      },
    },

    advancedFilters: {
      label: "Advanced Filter Options",
      filterMode: "Filter Mode",
      removeStrings: "Remove Strings",
      removeStringsPlaceholder: "Enter strings to remove (one per line)",
      removeStringsHelp: "Remove emails containing these strings",
    },

    keywordFilter: {
      label: "Advanced Keyword Filter",
      enable: "Enable Keyword Filter",
      placeholder: "Enter keywords (one per line)",
      description: "Remove unwanted emails containing specific keywords or patterns",
      inputLabel: "Remove emails containing these keywords (comma-separated)",
      requestLink: "Request new keywords →",
      helpEnabled: "Only emails containing these keywords will be extracted",
      helpDisabled: "Enable to filter emails by keywords",
    },
  },

  // Footer
  footer: {
    about: {
      title: "About",
      description: "A free, open-source email extraction tool that processes data locally in your browser. No data is uploaded to any server.",
      opensource: "Free & Open Source | Licensed under MIT License",
      message: "Feel free to use, modify, and distribute this tool for any purpose!",
    },
    quickLinks: {
      title: "Quick Links",
      github: "GitHub Repository",
      issues: "Report Issues",
      privacy: "Privacy Policy",
      website: "WhoisExtractor",
    },
    support: {
      title: "Support",
      description: "If you find this tool helpful, please consider:",
      star: "Star on GitHub",
      fork: "Fork Project",
      contribute: "Contribute",
    },
  },

  // Privacy Notice
  privacy: {
    title: "Privacy Notice",
    message:
      "All email extraction is processed locally in your browser and is NOT uploaded to any server.\n\n" +
      "Your data remains completely private and secure on your device.\n\n" +
      "You may opt-in to server processing in Settings if needed (feature not yet available).",
    understood: "I Understand",
  },

  // Toast Messages
  toast: {
    extractionStarted: "Extraction started...",
    extractionComplete: "Extraction complete! Found {{count}} emails",
    copied: "Copied {{count}} emails to clipboard",
    exportSuccess: "Exported {{count}} emails to {{format}}",
    fileUploaded: "File uploaded: {{filename}}",
    settingsSaved: "Settings saved successfully",
    error: "Error: {{message}}",
    cleared: "All data cleared",
  },

  // Common
  common: {
    loading: "Loading...",
    cancel: "Cancel",
    close: "Close",
    save: "Save",
    reset: "Reset",
    clear: "Clear",
    export: "Export",
    import: "Import",
    settings: "Settings",
    help: "Help",
    language: "Language",
  },
};

export type Translation = typeof en;
