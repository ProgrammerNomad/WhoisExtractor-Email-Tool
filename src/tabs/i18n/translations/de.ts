import type { Translation } from "./en";

/**
 * German Translations
 * Deutsche Übersetzungen
 */

export const de: Translation = {
  // Header
  header: {
    title: "Email Address Extractor",
  subtitle: "Ziehe E-Mail-Adressen aus jedem Text oder Dateiinhalt, mit leicht einstellbaren Pro-Filtern",
    emailCount: "{{count}} E-Mails",
  },

  // Input Section
  input: {
    title: "Eingabetext",
    placeholder: "Fügen Sie Ihren Text mit E-Mail-Adressen hier ein...",
    fileUpload: "Oder Datei Hochladen",
    chooseFile: "Datei auswählen",
    selectedFile: "Ausgewählte Datei:",
    size: "Größe:",
    largeFileWarning: "⚠ Große Datei - Hintergrundverarbeitung",
    extractButton: "E-Mails Extrahieren",
    resetButton: "Zurücksetzen",
    extracting: "Extrahiere...",
  },

  // Results Section
  results: {
    title: "Extrahierte E-Mails",
    count: "{{count}} E-Mail-Adressen gefunden",
    noResults: "Keine E-Mail-Adressen gefunden. Versuchen Sie, Text einzufügen oder eine Datei hochzuladen.",
    placeholder: "Extrahierte E-Mail-Adressen werden hier angezeigt...",
    copyButton: "Alle Kopieren",
    exportTxt: ".TXT Exportieren",
    exportCsv: ".CSV Exportieren",
    copied: "In Zwischenablage kopiert!",
    exported: "Erfolgreich exportiert!",
  },

  // Options Panel
  options: {
    title: "Extraktionsoptionen",
    
    extractionType: {
      label: "Extraktionstyp",
      email: "E-Mail-Adressen",
    },

    basicOptions: {
      label: "Grundlegende Optionen",
      deduplicate: "Duplikate Entfernen",
      deduplicateHelp: "Doppelte E-Mail-Adressen entfernen",
      lowercase: "In Kleinbuchstaben Umwandeln",
      lowercaseHelp: "Alle E-Mails in Kleinbuchstaben umwandeln",
      removeNumeric: "Numerische Domains Entfernen",
      removeNumericHelp: "E-Mails mit nur numerischen Domains entfernen",
      sort: "Alphabetisch Sortieren",
      sortHelp: "Ergebnisse in alphabetischer Reihenfolge sortieren",
    },

    outputOptions: {
      label: "Ausgabeoptionen",
      separator: "Trennzeichen",
      groupByLabel: "E-Mails Gruppieren",
      separators: {
        newline: "Neue Zeile",
        comma: "Komma",
        semicolon: "Semikolon",
        pipe: "Senkrechter Strich (|)",
        space: "Leerzeichen",
      },
    },

    advancedFilters: {
      label: "Erweiterte Filteroptionen",
      filterMode: "Filtermodus",
      removeStrings: "Zeichenfolgen Entfernen",
      removeStringsPlaceholder: "Geben Sie zu entfernende Zeichenfolgen ein (eine pro Zeile)",
      removeStringsHelp: "E-Mails mit diesen Zeichenfolgen entfernen",
    },

    keywordFilter: {
      label: "Erweiterter Schlüsselwortfilter",
      enable: "Schlüsselwortfilter Aktivieren",
      placeholder: "Geben Sie Schlüsselwörter ein (eines pro Zeile)",
      description: "Unerwünschte E-Mails mit bestimmten Schlüsselwörtern oder Mustern entfernen",
      inputLabel: "E-Mails mit diesen Schlüsselwörtern entfernen (durch Kommas getrennt)",
      requestLink: "Neue Schlüsselwörter Anfordern →",
      helpEnabled: "Nur E-Mails mit diesen Schlüsselwörtern werden extrahiert",
      helpDisabled: "Aktivieren, um E-Mails nach Schlüsselwörtern zu filtern",
    },
  },

  // Footer
  footer: {
    about: {
      title: "Über",
      description: "Ein kostenloses Open-Source-Tool zur E-Mail-Extraktion, das Daten lokal in Ihrem Browser verarbeitet. Es werden keine Daten auf einen Server hochgeladen.",
      opensource: "Kostenlos & Open Source | MIT-Lizenz",
      message: "Verwenden, ändern und verteilen Sie dieses Tool für jeden Zweck!",
    },
    quickLinks: {
      title: "Schnelllinks",
      github: "GitHub Repository",
      issues: "Probleme Melden",
      privacy: "Datenschutzrichtlinie",
      website: "WhoisExtractor",
    },
    support: {
      title: "Unterstützung",
      description: "Wenn Sie dieses Tool hilfreich finden, erwägen Sie bitte:",
      star: "Stern auf GitHub",
      fork: "Projekt Forken",
      contribute: "Beitragen",
    },
  },

  // Privacy Notice
  privacy: {
    title: "Datenschutzhinweis",
    message:
      "Die gesamte E-Mail-Extraktion wird lokal in Ihrem Browser verarbeitet und NICHT auf einen Server hochgeladen.\n\n" +
      "Ihre Daten bleiben vollständig privat und sicher auf Ihrem Gerät.\n\n" +
      "Sie können in den Einstellungen die Serververarbeitung aktivieren, falls erforderlich (Funktion noch nicht verfügbar).",
    understood: "Verstanden",
  },

  // Toast Messages
  toast: {
    extractionStarted: "Extraktion gestartet...",
    extractionComplete: "Extraktion abgeschlossen! {{count}} E-Mails gefunden",
    copied: "{{count}} E-Mails in Zwischenablage kopiert",
    exportSuccess: "{{count}} E-Mails nach {{format}} exportiert",
    fileUploaded: "Datei hochgeladen: {{filename}}",
    settingsSaved: "Einstellungen erfolgreich gespeichert",
    error: "Fehler: {{message}}",
    cleared: "Alle Daten gelöscht",
  },

  // Review Prompt
  review: {
    title: "WhoisExtractor gefällt Ihnen?",
    message: "Sie verwenden WhoisExtractor seit {{days}} Tagen mit {{count}} erfolgreichen Extraktionen. Würden Sie eine Bewertung abgeben?",
    rateNow: "Im Chrome Web Store bewerten",
    later: "Vielleicht später",
    dontAsk: "Nicht mehr fragen",
    thankYou: "Vielen Dank für Ihr Feedback!",
  },

  // Update Notification
  update: {
    title: "Update verfügbar",
    message: "Version {{version}} ist jetzt verfügbar.",
    description: "Laden Sie die Erweiterung neu, um auf die neueste Version mit neuen Funktionen und Verbesserungen zu aktualisieren.",
    updateNow: "Jetzt aktualisieren",
    later: "Später",
  },

  // Common
  common: {
    loading: "Laden...",
    cancel: "Abbrechen",
    close: "Schließen",
    save: "Speichern",
    reset: "Zurücksetzen",
    clear: "Löschen",
    export: "Exportieren",
    import: "Importieren",
    settings: "Einstellungen",
    help: "Hilfe",
    language: "Sprache",
    review: "Bewertung abgeben",
  },
};
