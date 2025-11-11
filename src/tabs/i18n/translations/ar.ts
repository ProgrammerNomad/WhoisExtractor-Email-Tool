import type { Translation } from "./en"

/**
 * Arabic Translations
 * الترجمات العربية (مصححة ومحسّنة)
 */

export const ar: Translation = {
  // Header
  header: {
    title: "أداة استخراج عناوين البريد الإلكتروني",
    subtitle: "استخرج عناوين البريد الإلكتروني من أي نص أو ملف بسرعة مع فلاتر متقدمة وسهلة الاستخدام",
    emailCount: "{{count}} بريد إلكتروني",
  },

  // Input Section
  input: {
    title: "النص المدخل",
    placeholder: "ألصق هنا النص الذي يحتوي على عناوين البريد الإلكتروني...",
    fileUpload: "أو قم برفع ملف",
    chooseFile: "اختر ملفًا",
    selectedFile: "الملف المحدد:",
    size: "الحجم:",
    largeFileWarning: "⚠ ملف كبير — تتم معالجته في الخلفية",
    extractButton: "استخراج البريد الإلكتروني",
    resetButton: "إعادة تعيين",
    extracting: "جارٍ الاستخراج...",
  },

  // Results Section
  results: {
    title: "عناوين البريد الإلكتروني المستخرجة",
    count: "تم العثور على {{count}} عنوان بريد إلكتروني",
    noResults: "لم يتم العثور على أي عنوان بريد إلكتروني. حاول لصق نص أو رفع ملف.",
    placeholder: "ستظهر عناوين البريد الإلكتروني المستخرجة هنا...",
    copyButton: "نسخ الكل",
    exportTxt: "تصدير .TXT",
    exportCsv: "تصدير .CSV",
    copied: "تم النسخ إلى الحافظة!",
    exported: "تم التصدير بنجاح!",
  },

  // Options Panel
  options: {
    title: "خيارات الاستخراج",

    extractionType: {
      label: "نوع الاستخراج",
      email: "عناوين البريد الإلكتروني",
    },

    basicOptions: {
      label: "الخيارات الأساسية",
      deduplicate: "إزالة التكرارات",
      deduplicateHelp: "إزالة عناوين البريد الإلكتروني المكررة",
      lowercase: "تحويل إلى أحرف صغيرة",
      lowercaseHelp: "تحويل جميع عناوين البريد الإلكتروني إلى أحرف صغيرة",
      removeNumeric: "إزالة النطاقات الرقمية",
      removeNumericHelp: "إزالة عناوين البريد الإلكتروني التي تحتوي على نطاقات رقمية فقط",
      sort: "ترتيب أبجدي",
      sortHelp: "ترتيب النتائج أبجديًا",
    },

    outputOptions: {
      label: "خيارات الإخراج",
      separator: "الفاصل",
      groupByLabel: "تجميع البريد الإلكتروني",
      separators: {
        newline: "سطر جديد",
        comma: "فاصلة",
        semicolon: "فاصلة منقوطة",
        pipe: "شريط عمودي (|)",
        space: "مسافة",
      },
    },

    advancedFilters: {
      label: "خيارات التصفية المتقدمة",
      filterMode: "وضع التصفية",
      removeStrings: "إزالة النصوص",
      removeStringsPlaceholder: "أدخل النصوص المراد إزالتها (واحد في كل سطر)",
      removeStringsHelp: "إزالة عناوين البريد الإلكتروني التي تحتوي على هذه النصوص",
    },

    keywordFilter: {
      label: "تصفية الكلمات الرئيسية المتقدمة",
      enable: "تفعيل تصفية الكلمات الرئيسية",
      placeholder: "أدخل الكلمات الرئيسية (واحدة في كل سطر)",
      description: "إزالة عناوين البريد الإلكتروني غير المرغوبة التي تحتوي على كلمات أو أنماط معينة",
      inputLabel: "إزالة عناوين البريد الإلكتروني التي تحتوي على هذه الكلمات (مفصولة بفواصل)",
      requestLink: "طلب كلمات جديدة ←",
      helpEnabled: "سيتم استخراج عناوين البريد الإلكتروني التي تحتوي على هذه الكلمات فقط",
      helpDisabled: "فعّل الخيار لتصفية البريد الإلكتروني حسب الكلمات الرئيسية",
    },
  },

  // Footer
  footer: {
    about: {
      title: "حول الأداة",
      description: "أداة مجانية ومفتوحة المصدر لاستخراج البريد الإلكتروني تعمل محليًا في متصفحك. لا يتم رفع أي بيانات إلى أي خادم.",
      opensource: "مجانية ومفتوحة المصدر | مرخصة بموجب ترخيص MIT",
      message: "استخدم وعدّل ووزّع هذه الأداة بحرية لأي غرض!",
    },
    quickLinks: {
      title: "روابط سريعة",
      github: "مستودع GitHub",
      issues: "الإبلاغ عن مشكلة",
      privacy: "سياسة الخصوصية",
      website: "WhoisExtractor",
    },
    support: {
      title: "الدعم",
      description: "إذا وجدت هذه الأداة مفيدة، فكر في دعمها عبر:",
      star: "منح نجمة على GitHub",
      fork: "استنساخ المشروع",
      contribute: "المساهمة في التطوير",
    },
  },

  // Privacy Notice
  privacy: {
    title: "إشعار الخصوصية",
    message:
      "تتم معالجة جميع عمليات استخراج البريد الإلكتروني محليًا داخل متصفحك، ولا يتم تحميل أي بيانات إلى أي خادم.\n\n" +
      "تظل بياناتك خاصة وآمنة تمامًا على جهازك.\n\n" +
      "يمكنك تمكين المعالجة عبر الخادم من الإعدادات إذا لزم الأمر (الميزة غير متوفرة بعد).",
    understood: "لقد فهمت",
  },

  // Toast Messages
  toast: {
    extractionStarted: "بدأ الاستخراج...",
    extractionComplete: "اكتمل الاستخراج! تم العثور على {{count}} بريد إلكتروني",
    copied: "تم نسخ {{count}} بريد إلكتروني إلى الحافظة",
    exportSuccess: "تم تصدير {{count}} بريد إلكتروني إلى {{format}}",
    fileUploaded: "تم رفع الملف: {{filename}}",
    settingsSaved: "تم حفظ الإعدادات بنجاح",
    error: "خطأ: {{message}}",
    cleared: "تم مسح جميع البيانات",
  },

  // Common
  common: {
    loading: "جارٍ التحميل...",
    cancel: "إلغاء",
    close: "إغلاق",
    save: "حفظ",
    reset: "إعادة تعيين",
    clear: "مسح",
    export: "تصدير",
    import: "استيراد",
    settings: "الإعدادات",
    help: "مساعدة",
    language: "اللغة",
  },
}