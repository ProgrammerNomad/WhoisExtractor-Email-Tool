/**
 * Hindi Translations (हिन्दी)
 */

import type { Translation } from "./en";

export const hi: Translation = {
  // Header
  header: {
    title: "Email पता निष्कर्षण उपकरण",
    subtitle: "किसी भी पाठ या फ़ाइल से Email पते निकालें, उन्नत फ़िल्टर के साथ",
    emailCount: "{{count}} Email",
  },

  // Input Section
  input: {
    title: "पाठ दर्ज करें",
    placeholder: "यहां Email पतों वाला अपना पाठ चिपकाएं...",
    fileUpload: "या फ़ाइल अपलोड करें",
    chooseFile: "फ़ाइल चुनें",
    selectedFile: "चयनित फ़ाइल:",
    size: "आकार:",
    largeFileWarning: "⚠ बड़ी फ़ाइल - पृष्ठभूमि में प्रसंस्करण",
    extractButton: "Email निकालें",
    resetButton: "पुनः सेट करें",
    extracting: "निकाला जा रहा है...",
  },

  // Results Section
  results: {
    title: "निकाले गए Email",
    count: "{{count}} Email पते मिले",
    noResults: "कोई Email पता नहीं मिला। पाठ चिपकाने या फ़ाइल अपलोड करने का प्रयास करें।",
    placeholder: "निकाले गए Email पते यहां दिखाई देंगे...",
    copyButton: "सभी प्रतिलिपि करें",
    exportTxt: "निर्यात .TXT",
    exportCsv: "निर्यात .CSV",
    copied: "प्रतिलिपि बना ली गई!",
    exported: "सफलतापूर्वक निर्यात किया गया!",
  },

  // Options Panel
  options: {
    title: "निष्कर्षण विकल्प",
    
    extractionType: {
      label: "निष्कर्षण प्रकार",
      email: "Email पते",
    },

    basicOptions: {
      label: "बुनियादी विकल्प",
      deduplicate: "नकल हटाएं",
      deduplicateHelp: "नकल Email पते हटाएं",
      lowercase: "छोटे अक्षरों में बदलें",
      lowercaseHelp: "सभी Email को छोटे अक्षरों में बदलें",
      removeNumeric: "संख्यात्मक डोमेन हटाएं",
      removeNumericHelp: "केवल संख्यात्मक डोमेन वाले Email हटाएं",
      sort: "वर्णानुक्रम में व्यवस्थित करें",
      sortHelp: "परिणामों को वर्णानुक्रम में व्यवस्थित करें",
    },

    outputOptions: {
      label: "परिणाम विकल्प",
      separator: "विभाजक",
      groupByLabel: "Email समूहित करें",
      separators: {
        newline: "नई पंक्ति",
        comma: "अल्पविराम",
        semicolon: "अर्धविराम",
        pipe: "पाइप (|)",
        space: "रिक्त स्थान",
      },
    },

    advancedFilters: {
      label: "उन्नत फ़िल्टर विकल्प",
      filterMode: "फ़िल्टर मोड",
      removeStrings: "शब्द हटाएं",
      removeStringsPlaceholder: "हटाने के लिए शब्द दर्ज करें (प्रति पंक्ति एक)",
      removeStringsHelp: "इन शब्दों वाले Email हटाएं",
    },

    keywordFilter: {
      label: "उन्नत मुख्य शब्द फ़िल्टर",
      enable: "मुख्य शब्द फ़िल्टर सक्षम करें",
      placeholder: "मुख्य शब्द दर्ज करें (प्रति पंक्ति एक)",
      description: "विशिष्ट मुख्य शब्द या पैटर्न वाले अवांछित Email हटाएं",
      inputLabel: "इन मुख्य शब्दों वाले Email हटाएं (अल्पविराम से अलग)",
      requestLink: "नए मुख्य शब्द का अनुरोध करें →",
      helpEnabled: "केवल इन मुख्य शब्दों वाले Email निकाले जाएंगे",
      helpDisabled: "मुख्य शब्द द्वारा Email छानने के लिए सक्षम करें",
    },
  },

  // Footer
  footer: {
    about: {
      title: "के बारे में",
      description: "एक निःशुल्क, मुक्त स्रोत Email निष्कर्षण उपकरण जो आपके ब्राउज़र में स्थानीय रूप से डेटा संसाधित करता है। कोई डेटा किसी सर्वर पर अपलोड नहीं किया जाता है।",
      opensource: "निःशुल्क और मुक्त स्रोत | MIT लाइसेंस के अंतर्गत",
      message: "किसी भी उद्देश्य के लिए इस उपकरण का उपयोग, संशोधन और वितरण करने के लिए स्वतंत्र हैं!",
    },
    quickLinks: {
      title: "त्वरित लिंक",
      github: "GitHub भंडार",
      issues: "समस्याओं की सूचना दें",
      privacy: "गोपनीयता नीति",
      website: "WhoisExtractor",
    },
    support: {
      title: "समर्थन",
      description: "यदि आप इस उपकरण को उपयोगी पाते हैं, तो कृपया विचार करें:",
      star: "GitHub पर तारांकित करें",
      fork: "परियोजना की प्रतिलिपि बनाएं",
      contribute: "योगदान करें",
    },
  },

  // Privacy Notice
  privacy: {
    title: "गोपनीयता सूचना",
    message:
      "सभी Email निष्कर्षण आपके ब्राउज़र में स्थानीय रूप से संसाधित किया जाता है और किसी भी सर्वर पर अपलोड नहीं किया जाता है।\n\n" +
      "आपका डेटा पूरी तरह से निजी और आपके उपकरण पर सुरक्षित रहता है।\n\n" +
      "यदि आवश्यक हो तो आप सेटिंग्स में सर्वर संसाधन के लिए चयन कर सकते हैं (सुविधा अभी उपलब्ध नहीं है)।",
    understood: "मैं समझ गया/गई",
  },

  // Toast Messages
  toast: {
    extractionStarted: "निष्कर्षण प्रारंभ हुआ...",
    extractionComplete: "निष्कर्षण पूर्ण! {{count}} Email मिले",
    copied: "{{count}} Email प्रतिलिपि बना ली गई",
    exportSuccess: "{{count}} Email {{format}} में निर्यात किए गए",
    fileUploaded: "फ़ाइल अपलोड हुई: {{filename}}",
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
    reset: "पुनः सेट करें",
    clear: "साफ़ करें",
    export: "निर्यात करें",
    import: "आयात करें",
    settings: "सेटिंग्स",
    help: "सहायता",
    language: "भाषा",
  },
};
