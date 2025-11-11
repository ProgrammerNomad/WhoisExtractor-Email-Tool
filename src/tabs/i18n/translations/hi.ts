/**
 * Hindi Translations (हिन्दी)
 */

import type { Translation } from "./en";

export const hi: Translation = {
  // Header
  header: {
    title: "ईमेल एड्रेस एक्सट्रैक्टर",
    subtitle: "किसी भी टेक्स्ट या फाइल से ईमेल एड्रेस निकालें, एडवांस फ़िल्टर के साथ तुरंत",
    emailCount: "{{count}} ईमेल",
  },

  // Input Section
  input: {
    title: "इनपुट टेक्स्ट",
    placeholder: "यहां ईमेल पतों वाला अपना टेक्स्ट पेस्ट करें...",
    fileUpload: "या फ़ाइल अपलोड करें",
    chooseFile: "फ़ाइल चुनें",
    selectedFile: "चयनित फ़ाइल:",
    size: "आकार:",
    largeFileWarning: "⚠ बड़ी फ़ाइल - बैकग्राउंड प्रोसेसिंग",
    extractButton: "ईमेल निकालें",
    resetButton: "रीसेट करें",
    extracting: "निकाला जा रहा है...",
  },

  // Results Section
  results: {
    title: "निकाले गए ईमेल",
    count: "{{count}} ईमेल पते मिले",
    noResults: "कोई ईमेल पता नहीं मिला। टेक्स्ट पेस्ट करने या फ़ाइल अपलोड करने का प्रयास करें।",
    placeholder: "निकाले गए ईमेल पते यहां दिखाई देंगे...",
    copyButton: "सभी कॉपी करें",
    exportTxt: "एक्सपोर्ट .TXT",
    exportCsv: "एक्सपोर्ट .CSV",
    copied: "क्लिपबोर्ड पर कॉपी किया गया!",
    exported: "सफलतापूर्वक एक्सपोर्ट किया गया!",
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
      deduplicate: "डुप्लिकेट हटाएं",
      deduplicateHelp: "डुप्लिकेट ईमेल पते हटाएं",
      lowercase: "लोअरकेस में बदलें",
      lowercaseHelp: "सभी ईमेल को लोअरकेस में बदलें",
      removeNumeric: "न्यूमेरिक डोमेन हटाएं",
      removeNumericHelp: "केवल-न्यूमेरिक डोमेन वाले ईमेल हटाएं",
      sort: "वर्णानुक्रम में क्रमबद्ध करें",
      sortHelp: "परिणामों को वर्णानुक्रम में क्रमबद्ध करें",
    },

    outputOptions: {
      label: "आउटपुट विकल्प",
      separator: "विभाजक",
      groupByLabel: "ईमेल समूहित करें",
      separators: {
        newline: "नई लाइन",
        comma: "अल्पविराम",
        semicolon: "अर्धविराम",
        pipe: "पाइप (|)",
        space: "स्पेस",
      },
    },

    advancedFilters: {
      label: "उन्नत फ़िल्टर विकल्प",
      filterMode: "फ़िल्टर मोड",
      removeStrings: "स्ट्रिंग्स हटाएं",
      removeStringsPlaceholder: "हटाने के लिए स्ट्रिंग्स दर्ज करें (प्रति पंक्ति एक)",
      removeStringsHelp: "इन स्ट्रिंग्स वाले ईमेल हटाएं",
    },

    keywordFilter: {
      label: "उन्नत कीवर्ड फ़िल्टर",
      enable: "कीवर्ड फ़िल्टर सक्षम करें",
      placeholder: "कीवर्ड दर्ज करें (प्रति पंक्ति एक)",
      description: "विशिष्ट कीवर्ड या पैटर्न वाले अवांछित ईमेल हटाएं",
      inputLabel: "इन कीवर्ड वाले ईमेल हटाएं (अल्पविराम से अलग)",
      requestLink: "नए कीवर्ड का अनुरोध करें →",
      helpEnabled: "केवल इन कीवर्ड वाले ईमेल निकाले जाएंगे",
      helpDisabled: "कीवर्ड द्वारा ईमेल फ़िल्टर करने के लिए सक्षम करें",
    },
  },

  // Footer
  footer: {
    about: {
      title: "के बारे में",
      description: "एक मुफ्त, ओपन-सोर्स ईमेल निष्कर्षण टूल जो आपके ब्राउज़र में स्थानीय रूप से डेटा प्रोसेस करता है। कोई डेटा किसी सर्वर पर अपलोड नहीं किया जाता है।",
      opensource: "मुफ्त और ओपन सोर्स | MIT लाइसेंस के तहत लाइसेंस प्राप्त",
      message: "किसी भी उद्देश्य के लिए इस टूल का उपयोग, संशोधन और वितरण करने के लिए स्वतंत्र महसूस करें!",
    },
    quickLinks: {
      title: "त्वरित लिंक",
      github: "GitHub रिपॉजिटरी",
      issues: "मुद्दों की रिपोर्ट करें",
      privacy: "गोपनीयता नीति",
      website: "WhoisExtractor",
    },
    support: {
      title: "समर्थन",
      description: "यदि आप इस टूल को उपयोगी पाते हैं, तो कृपया विचार करें:",
      star: "GitHub पर स्टार करें",
      fork: "प्रोजेक्ट फोर्क करें",
      contribute: "योगदान करें",
    },
  },

  // Privacy Notice
  privacy: {
    title: "गोपनीयता सूचना",
    message:
      "सभी ईमेल निष्कर्षण आपके ब्राउज़र में स्थानीय रूप से प्रोसेस किया जाता है और किसी भी सर्वर पर अपलोड नहीं किया जाता है।\n\n" +
      "आपका डेटा पूरी तरह से निजी और आपके डिवाइस पर सुरक्षित रहता है।\n\n" +
      "यदि आवश्यक हो तो आप सेटिंग्स में सर्वर प्रोसेसिंग के लिए ऑप्ट-इन कर सकते हैं (सुविधा अभी तक उपलब्ध नहीं है)।",
    understood: "मैं समझता/समझती हूं",
  },

  // Toast Messages
  toast: {
    extractionStarted: "निष्कर्षण शुरू हुआ...",
    extractionComplete: "निष्कर्षण पूर्ण! {{count}} ईमेल मिले",
    copied: "{{count}} ईमेल क्लिपबोर्ड पर कॉपी किए गए",
    exportSuccess: "{{count}} ईमेल {{format}} में एक्सपोर्ट किए गए",
    fileUploaded: "फ़ाइल अपलोड की गई: {{filename}}",
    settingsSaved: "सेटिंग्स सफलतापूर्वक सहेजी गईं",
    error: "त्रुटि: {{message}}",
    cleared: "सभी डेटा साफ़ किया गया",
  },

  // Common
  common: {
    loading: "लोड हो रहा है...",
    cancel: "रद्द करें",
    close: "बंद करें",
    save: "सहेजें",
    reset: "रीसेट करें",
    clear: "साफ़ करें",
    export: "एक्सपोर्ट करें",
    import: "इम्पोर्ट करें",
    settings: "सेटिंग्स",
    help: "सहायता",
    language: "भाषा",
  },
};
