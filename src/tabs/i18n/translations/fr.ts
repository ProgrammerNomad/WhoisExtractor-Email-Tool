import type { Translation } from "./en"

/**
 * French Translations
 * Traductions françaises (corrigées et harmonisées)
 */

export const fr: Translation = {
  // Header
  header: {
    title: "Extracteur d'adresses e-mail",
    subtitle: "Extrayez des adresses e-mail à partir de n'importe quel texte ou fichier grâce à des filtres avancés et faciles à utiliser",
    emailCount: "{{count}} e-mails",
  },

  // Input Section
  input: {
    title: "Texte d’entrée",
    placeholder: "Collez ici votre texte contenant des adresses e-mail...",
    fileUpload: "Ou importer un fichier",
    chooseFile: "Choisir un fichier",
    selectedFile: "Fichier sélectionné :",
    size: "Taille :",
    largeFileWarning: "⚠ Fichier volumineux — traitement en arrière-plan",
    extractButton: "Extraire les e-mails",
    resetButton: "Réinitialiser",
    extracting: "Extraction en cours...",
  },

  // Results Section
  results: {
    title: "Adresses e-mail extraites",
    count: "{{count}} adresses e-mail trouvées",
    noResults: "Aucune adresse e-mail trouvée. Essayez de coller du texte ou d’importer un fichier.",
    placeholder: "Les adresses e-mail extraites apparaîtront ici...",
    copyButton: "Tout copier",
    exportTxt: "Exporter .TXT",
    exportCsv: "Exporter .CSV",
    copied: "Copié dans le presse-papiers !",
    exported: "Exporté avec succès !",
  },

  // Options Panel
  options: {
    title: "Options d’extraction",

    extractionType: {
      label: "Type d’extraction",
      email: "Adresses e-mail",
    },

    basicOptions: {
      label: "Options de base",
      deduplicate: "Supprimer les doublons",
      deduplicateHelp: "Supprimer les adresses e-mail en double",
      lowercase: "Convertir en minuscules",
      lowercaseHelp: "Convertir toutes les adresses e-mail en minuscules",
      removeNumeric: "Supprimer les domaines numériques",
      removeNumericHelp: "Supprimer les adresses e-mail dont le domaine est uniquement numérique",
      sort: "Trier par ordre alphabétique",
      sortHelp: "Trier les résultats par ordre alphabétique",
    },

    outputOptions: {
      label: "Options de sortie",
      separator: "Séparateur",
      groupByLabel: "Regrouper les e-mails",
      separators: {
        newline: "Nouvelle ligne",
        comma: "Virgule",
        semicolon: "Point-virgule",
        pipe: "Barre verticale (|)",
        space: "Espace",
      },
    },

    advancedFilters: {
      label: "Filtres avancés",
      filterMode: "Mode de filtrage",
      removeStrings: "Supprimer des chaînes",
      removeStringsPlaceholder: "Entrez les chaînes à supprimer (une par ligne)",
      removeStringsHelp: "Supprime les adresses e-mail contenant ces chaînes",
    },

    keywordFilter: {
      label: "Filtre de mots-clés avancé",
      enable: "Activer le filtre de mots-clés",
      placeholder: "Entrez les mots-clés (un par ligne)",
      description: "Supprime les adresses e-mail indésirables contenant des mots-clés ou motifs spécifiques",
      inputLabel: "Supprimer les adresses e-mail contenant ces mots-clés (séparés par des virgules)",
      requestLink: "Demander de nouveaux mots-clés →",
      helpEnabled: "Seules les adresses e-mail contenant ces mots-clés seront extraites",
      helpDisabled: "Activez cette option pour filtrer les e-mails par mots-clés",
    },
  },

  // Footer
  footer: {
    about: {
      title: "À propos",
      description:
        "Un outil gratuit et open source d’extraction d’adresses e-mail qui traite vos données localement dans votre navigateur. Aucune donnée n’est envoyée à un serveur.",
      opensource: "Gratuit et open source | Sous licence MIT",
      message: "Vous êtes libre d’utiliser, de modifier et de distribuer cet outil à toute fin !",
    },
    quickLinks: {
      title: "Liens rapides",
      github: "Dépôt GitHub",
      issues: "Signaler un problème",
      privacy: "Politique de confidentialité",
      website: "WhoisExtractor",
    },
    support: {
      title: "Soutien",
      description: "Si vous trouvez cet outil utile, vous pouvez :",
      star: "Ajouter une étoile sur GitHub",
      fork: "Dupliquer le projet",
      contribute: "Contribuer",
    },
  },

  // Privacy Notice
  privacy: {
    title: "Avis de confidentialité",
    message:
      "Toutes les opérations d’extraction d’e-mails sont effectuées localement dans votre navigateur et ne sont PAS envoyées vers un serveur.\n\n" +
      "Vos données restent entièrement privées et sécurisées sur votre appareil.\n\n" +
      "Vous pourrez activer le traitement sur serveur dans les paramètres si nécessaire (fonctionnalité à venir).",
    understood: "J’ai compris",
  },

  // Toast Messages
  toast: {
    extractionStarted: "Extraction démarrée...",
    extractionComplete: "Extraction terminée ! {{count}} e-mails trouvés",
    copied: "{{count}} e-mails copiés dans le presse-papiers",
    exportSuccess: "{{count}} e-mails exportés vers {{format}}",
    fileUploaded: "Fichier importé : {{filename}}",
    settingsSaved: "Paramètres enregistrés avec succès",
    error: "Erreur : {{message}}",
    cleared: "Toutes les données ont été effacées",
  },

  // Review Prompt
  review: {
    title: "Vous appréciez WhoisExtractor ?",
    message: "Vous utilisez WhoisExtractor depuis {{days}} jours avec {{count}} extractions réussies. Pourriez-vous laisser un avis ?",
    rateNow: "Évaluer sur Chrome Web Store",
    later: "Peut-être plus tard",
    dontAsk: "Ne plus demander",
    thankYou: "Merci pour vos commentaires !",
  },

  // Update Notification
  update: {
    title: "Mise à jour disponible",
    message: "La version {{version}} est maintenant disponible.",
    description: "Rechargez l'extension pour mettre à jour vers la dernière version avec de nouvelles fonctionnalités et améliorations.",
    updateNow: "Mettre à jour maintenant",
    later: "Plus tard",
  },

  // Common
  common: {
    loading: "Chargement...",
    cancel: "Annuler",
    close: "Fermer",
    save: "Enregistrer",
    reset: "Réinitialiser",
    clear: "Effacer",
    export: "Exporter",
    import: "Importer",
    settings: "Paramètres",
    help: "Aide",
    language: "Langue",
    review: "Laisser un avis",
  },
}