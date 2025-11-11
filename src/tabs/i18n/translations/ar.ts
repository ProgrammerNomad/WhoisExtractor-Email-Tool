import type { Translation } from "./en";

/**
 * Arabic Translations
 * الترجمات العربية
 */

export const ar: Translation = {
  // Header
  header: {
    title: "مستخرج عناوين البريد الإلكتروني",
    subtitle: "استخرج عناوين البريد من أي نص أو ملف بسرعة مع فلاتر متقدمة وسهلة",
    emailCount: "{{count}} بريد إلكتروني",
  },

  // Input Section
  input: {
    title: "إدخال النص",
    placeholder: "الصق النص الذي يحتوي على عناوين البريد الإلكتروني هنا...",
    fileUpload: "أو رفع ملف",
    chooseFile: "اختر ملف",
    selectedFile: "الملف المحدد:",
    size: "الحجم:",
    largeFileWarning: "⚠ ملف كبير - معالجة في الخلفية",
    extractButton: "استخراج البريد الإلكتروني",
    resetButton: "إعادة تعيين",
    extracting: "جاري الاستخراج...",
  },

  // Results Section
  results: {
    title: "البريد الإلكتروني المستخرج",
    count: "تم العثور على {{count}} عنوان بريد إلكتروني",
    noResults: "لم يتم العثور على عناوين بريد إلكتروني. حاول لصق نص أو رفع ملف.",
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
      lowercaseHelp: "تحويل جميع رسائل البريد الإلكتروني إلى أحرف صغيرة",
      removeNumeric: "إزالة النطاقات الرقمية",
      removeNumericHelp: "إزالة رسائل البريد الإلكتروني ذات النطاقات الرقمية فقط",
      sort: "ترتيب أبجديًا",
      sortHelp: "ترتيب النتائج بترتيب أبجدي",
    },

    outputOptions: {
      label: "خيارات الإخراج",
      separator: "الفاصل",
      groupByLabel: "تجميع رسائل البريد الإلكتروني",
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
      removeStrings: "إزالة السلاسل",
      removeStringsPlaceholder: "أدخل السلاسل المراد إزالتها (واحدة لكل سطر)",
      removeStringsHelp: "إزالة رسائل البريد الإلكتروني التي تحتوي على هذه السلاسل",
    },

    keywordFilter: {
      label: "تصفية الكلمات الرئيسية المتقدمة",
      enable: "تفعيل تصفية الكلمات الرئيسية",
      placeholder: "أدخل الكلمات الرئيسية (واحدة لكل سطر)",
      description: "إزالة رسائل البريد الإلكتروني غير المرغوب فيها التي تحتوي على كلمات رئيسية أو أنماط محددة",
      inputLabel: "إزالة رسائل البريد الإلكتروني التي تحتوي على هذه الكلمات الرئيسية (مفصولة بفواصل)",
      requestLink: "طلب كلمات رئيسية جديدة ←",
      helpEnabled: "سيتم استخراج رسائل البريد الإلكتروني التي تحتوي على هذه الكلمات الرئيسية فقط",
      helpDisabled: "قم بالتفعيل لتصفية رسائل البريد الإلكتروني حسب الكلمات الرئيسية",
    },
  },

  // Footer
  footer: {
    about: {
      title: "حول",
      description: "أداة مجانية ومفتوحة المصدر لاستخراج البريد الإلكتروني تعالج البيانات محليًا في متصفحك. لا يتم تحميل أي بيانات إلى أي خادم.",
      opensource: "مجاني ومفتوح المصدر | ترخيص MIT",
      message: "لا تتردد في استخدام وتعديل وتوزيع هذه الأداة لأي غرض!",
    },
    quickLinks: {
      title: "روابط سريعة",
      github: "مستودع GitHub",
      issues: "الإبلاغ عن المشاكل",
      privacy: "سياسة الخصوصية",
      website: "WhoisExtractor",
    },
    support: {
      title: "الدعم",
      description: "إذا وجدت هذه الأداة مفيدة، يرجى النظر في:",
      star: "نجمة على GitHub",
      fork: "استنساخ المشروع",
      contribute: "المساهمة",
    },
  },

  // Privacy Notice
  privacy: {
    title: "إشعار الخصوصية",
    message:
      "تتم معالجة جميع عمليات استخراج البريد الإلكتروني محليًا في متصفحك ولا يتم تحميلها إلى أي خادم.\n\n" +
      "تظل بياناتك خاصة وآمنة تمامًا على جهازك.\n\n" +
      "يمكنك اختيار المعالجة على الخادم في الإعدادات إذا لزم الأمر (الميزة غير متوفرة بعد).",
    understood: "فهمت",
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
    loading: "جاري التحميل...",
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
};
