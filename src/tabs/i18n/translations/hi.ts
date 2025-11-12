/**
 * Hindi Translations (हिन्दी) — corrected / naturalized
 */

import type { Translation } from "./en";

export const hi: Translation = {
  // Header
  header: {
    title: "ईमेल पता एक्सट्रैक्टर",
    subtitle: "किसी भी टेक्स्ट या फ़ाइल से ईमेल पते निकालें — उन्नत फ़िल्टर विकल्पों के साथ",
    emailCount: "{{count}} ईमेल",
    totalExtracted: "कुल निकाले गए",
    current: "वर्तमान",
  },

  // Input Section
  input: {
    title: "इनपुट टेक्स्ट",
    placeholder: "इहाँ अपना वह टेक्स्ट पेस्ट करें जिसमें ईमेल पते हैं...",
    fileUpload: "या फ़ाइल अपलोड करें",
    chooseFile: "फ़ाइल चुनें",
    selectedFile: "चयनित फ़ाइल:",
    size: "आकार:",
    largeFileWarning: "⚠ बड़ी फ़ाइल — बैकग्राउंड में प्रोसेस किया जा रहा है",
    extractButton: "ईमेल निकालें",
    resetButton: "रीसेट",
    extracting: "निकाला जा रहा है...",
  },

  // Results Section
  results: {
    title: "निकाले गए ईमेल",
    count: "{{count}} ईमेल पते मिले",
    noResults: "कोई ईमेल पता नहीं मिला। कृपया टेक्स्ट पेस्ट करें या फ़ाइल अपलोड करें।",
    placeholder: "निकाले गए ईमेल यहाँ दिखाई देंगे...",
    copyButton: "सभी कॉपी करें",
    exportTxt: "एक्सपोर्ट .TXT",
    exportCsv: "एक्सपोर्ट .CSV",
    copied: "क्लिपबोर्ड पर कॉपी किया गया!",
    exported: "सफलतापूर्वक एक्सपोर्ट हुआ!",
  },

  // Options Panel
  options: {
    title: "निष्कर्षण विकल्प",

    extractionType: {
      label: "निष्कर्षण प्रकार",
      email: "ईमेल पते",
    },

    basicOptions: {
      label: "बुनियादी विकल्प",
      deduplicate: "डुप्लिकेट हटाएँ",
      deduplicateHelp: "दोहराए गए ईमेल पतों को हटाएँ",
      lowercase: "लोअरकेस में बदलें",
      lowercaseHelp: "सभी ईमेल छोटे अक्षरों में बदलें",
      removeNumeric: "न्यूमेरिक डोमेन हटाएँ",
      removeNumericHelp: "केवल अंक-युक्त डोमेन वाले ईमेल हटाएँ",
      sort: "अक्षरानुक्रम में सॉर्ट करें",
      sortHelp: "परिणामों को अक्षरानुक्रम में सॉर्ट करें",
    },

    outputOptions: {
      label: "आउटपुट विकल्प",
      separator: "विभाजक",
      groupByLabel: "ईमेल समूह करें",
      separators: {
        newline: "नई पंक्ति",
        comma: "अल्पविराम",
        semicolon: "अर्धविराम",
        pipe: "पाइप (|)",
        space: "स्पेस",
      },
    },

    advancedFilters: {
      label: "उन्नत फ़िल्टर विकल्प",
      filterMode: "फ़िल्टर मोड",
      removeStrings: "स्ट्रिंग हटाएँ",
      removeStringsPlaceholder: "हटाने के लिए स्ट्रिंग दर्ज करें (प्रति पंक्ति एक)",
      removeStringsHelp: "इन स्ट्रिंग वाले ईमेल पते निकाल दिए जाएँगे",
    },

    keywordFilter: {
      label: "उन्नत कीवर्ड फ़िल्टर",
      enable: "कीवर्ड फ़िल्टर सक्षम करें",
      placeholder: "कीवर्ड दर्ज करें (प्रति पंक्ति एक)",
      description: "विशिष्ट कीवर्ड या पैटर्न वाले अवांछित ईमेल हटाएँ",
      inputLabel: "इन कीवर्ड वाले ईमेल हटाएँ (अल्पविराम से अलग)",
      requestLink: "नए कीवर्ड का अनुरोध करें →",
      helpEnabled: "केवल इन कीवर्ड वाले ईमेल निकाले जाएंगे",
      helpDisabled: "कीवर्ड द्वारा ईमेल फ़िल्टर करने के लिए सक्षम करें",
    },
  },

  // Footer
  footer: {
    about: {
      title: "हमारे बारे में",
      description: "एक निःशुल्क, ओपन-सोर्स ईमेल एक्सट्रैक्शन टूल जो आपके ब्राउज़र में स्थानीय रूप से डेटा प्रोसेस करता है। कोई डेटा किसी सर्वर पर अपलोड नहीं किया जाता।",
      opensource: "फ्री और ओपन सोर्स | MIT लाइसेंस के अंतर्गत",
      message: "किसी भी उद्देश्य के लिए इस टूल का उपयोग, संशोधन और वितरण करने के लिए स्वतंत्र महसूस करें!",
    },
    quickLinks: {
      title: "त्वरित लिंक",
      github: "GitHub रिपॉजिटरी",
      issues: "मुद्दे रिपोर्ट करें",
      privacy: "गोपनीयता नीति",
      website: "WhoisExtractor",
    },
    support: {
      title: "समर्थन",
      description: "यदि यह टूल उपयोगी लगता है, तो कृपया विचार करें:",
      star: "GitHub पर स्टार दें",
      fork: "प्रोजेक्ट फोर्क करें",
      contribute: "योगदान करें",
    },
  },

  // Privacy Notice
  privacy: {
    title: "गोपनीयता सूचना",
    message:
      "सभी ईमेल निष्कर्षण आपके ब्राउज़र में स्थानीय रूप से प्रोसेस किए जाते हैं और किसी भी सर्वर पर अपलोड नहीं होते।\n\n" +
      "आपका डेटा पूर्णतः निजी और आपके डिवाइस पर सुरक्षित रहता है।\n\n" +
      "यदि आवश्यकता हो तो आप सेटिंग्स में सर्वर प्रोसेसिंग के लिए ऑप्ट-इन कर सकते हैं (यह सुविधा अभी उपलब्ध नहीं है)।",
    understood: "मैं समझता/समझती हूँ",
  },

  // Toast Messages
  toast: {
    extractionStarted: "निष्कर्षण शुरू हुआ...",
    extractionComplete: "निष्कर्षण पूर्ण! {{count}} ईमेल मिले",
    copied: "{{count}} ईमेल क्लिपबोर्ड पर कॉपी किए गए",
    exportSuccess: "{{count}} ईमेल {{format}} में एक्सपोर्ट किए गए",
    fileUploaded: "फ़ाइल अपलोड की गई: {{filename}}",
    settingsSaved: "सेटिंग्स सफलतापूर्ण सहेजी गईं",
    error: "त्रुटि: {{message}}",
    cleared: "सभी डेटा साफ़ कर दिया गया",
  },

  // Review Prompt
  review: {
    title: "WhoisExtractor का आनंद ले रहे हैं?",
    message: "आप {{days}} दिनों से WhoisExtractor का उपयोग कर रहे हैं और {{count}} सफल निष्कर्षण किए हैं। क्या आप समीक्षा देना चाहेंगे?",
    totalExtracted: "आपने अब तक {{total}} ईमेल निकाले हैं!",
    rateNow: "Chrome Web Store पर रेटिंग दें",
    later: "शायद बाद में",
    dontAsk: "दोबारा न पूछें",
    thankYou: "आपकी प्रतिक्रिया के लिए धन्यवाद!",
  },

  // Update Notification
  update: {
    title: "अपडेट उपलब्ध है",
    message: "संस्करण {{version}} अब उपलब्ध है।",
    description: "नई सुविधाओं और सुधारों के साथ नवीनतम संस्करण में अपडेट करने के लिए एक्सटेंशन को पुनः लोड करें।",
    updateNow: "अभी अपडेट करें",
    later: "बाद में",
  },

  // Common
  common: {
    loading: "लोड हो रहा है...",
    cancel: "रद्द करें",
    close: "बन्द करें",
    save: "सहेजें",
    reset: "रीसेट",
    clear: "साफ़ करें",
    export: "एक्सपोर्ट",
    import: "इम्पोर्ट",
    settings: "सेटिंग्स",
    help: "सहायता",
    language: "भाषा",
    review: "समीक्षा दें",
  },
};