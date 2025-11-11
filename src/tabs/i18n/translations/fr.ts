import type { Translation } from "./en";

/**
 * French Translations
 * Traductions Françaises
 */

export const fr: Translation = {
  // Header
  header: {
    title: "Email Address Extractor",
    subtitle: "Récupérez vos emails depuis tout texte ou fichier grâce à des filtres avancés simples",
    emailCount: "{{count}} Emails",
  },

  // Input Section
  input: {
    title: "Texte d'Entrée",
    placeholder: "Collez votre texte contenant des adresses email ici...",
    fileUpload: "Ou Télécharger un Fichier",
    chooseFile: "Choisir un fichier",
    selectedFile: "Fichier sélectionné :",
    size: "Taille :",
    largeFileWarning: "⚠ Fichier volumineux - traitement en arrière-plan",
    extractButton: "Extraire les Emails",
    resetButton: "Réinitialiser",
    extracting: "Extraction en cours...",
  },

  // Results Section
  results: {
    title: "Emails Extraits",
    count: "{{count}} adresses email trouvées",
    noResults: "Aucune adresse email trouvée. Essayez de coller du texte ou de télécharger un fichier.",
    placeholder: "Les adresses email extraites apparaîtront ici...",
    copyButton: "Tout Copier",
    exportTxt: "Exporter .TXT",
    exportCsv: "Exporter .CSV",
    copied: "Copié dans le presse-papiers !",
    exported: "Exporté avec succès !",
  },

  // Options Panel
  options: {
    title: "Options d'Extraction",
    
    extractionType: {
      label: "Type d'Extraction",
      email: "Adresses Email",
    },

    basicOptions: {
      label: "Options de Base",
      deduplicate: "Supprimer les Doublons",
      deduplicateHelp: "Supprimer les adresses email en double",
      lowercase: "Convertir en Minuscules",
      lowercaseHelp: "Convertir tous les emails en minuscules",
      removeNumeric: "Supprimer les Domaines Numériques",
      removeNumericHelp: "Supprimer les emails avec des domaines uniquement numériques",
      sort: "Trier par Ordre Alphabétique",
      sortHelp: "Trier les résultats par ordre alphabétique",
    },

    outputOptions: {
      label: "Options de Sortie",
      separator: "Séparateur",
      groupByLabel: "Regrouper les emails",
      separators: {
        newline: "Nouvelle Ligne",
        comma: "Virgule",
        semicolon: "Point-virgule",
        pipe: "Barre (|)",
        space: "Espace",
      },
    },

    advancedFilters: {
      label: "Options de Filtrage Avancées",
      filterMode: "Mode de Filtrage",
      removeStrings: "Supprimer les Chaînes",
      removeStringsPlaceholder: "Entrez les chaînes à supprimer (une par ligne)",
      removeStringsHelp: "Supprimer les emails contenant ces chaînes",
    },

    keywordFilter: {
      label: "Filtre de Mots-clés Avancé",
      enable: "Activer le Filtre de Mots-clés",
      placeholder: "Entrez les mots-clés (un par ligne)",
      description: "Supprimer les emails indésirables contenant des mots-clés ou motifs spécifiques",
      inputLabel: "Supprimer les emails contenant ces mots-clés (séparés par des virgules)",
      requestLink: "Demander de nouveaux mots-clés →",
      helpEnabled: "Seuls les emails contenant ces mots-clés seront extraits",
      helpDisabled: "Activer pour filtrer les emails par mots-clés",
    },
  },

  // Footer
  footer: {
    about: {
      title: "À Propos",
      description: "Un outil gratuit et open source d'extraction d'emails qui traite les données localement dans votre navigateur. Aucune donnée n'est téléchargée vers un serveur.",
      opensource: "Gratuit et Open Source | Licence MIT",
      message: "N'hésitez pas à utiliser, modifier et distribuer cet outil à toutes fins !",
    },
    quickLinks: {
      title: "Liens Rapides",
      github: "Dépôt GitHub",
      issues: "Signaler des Problèmes",
      privacy: "Politique de Confidentialité",
      website: "WhoisExtractor",
    },
    support: {
      title: "Soutien",
      description: "Si vous trouvez cet outil utile, veuillez considérer :",
      star: "Étoile sur GitHub",
      fork: "Bifurquer le Projet",
      contribute: "Contribuer",
    },
  },

  // Privacy Notice
  privacy: {
    title: "Avis de Confidentialité",
    message:
      "Toute l'extraction d'email est traitée localement dans votre navigateur et n'est PAS téléchargée vers un serveur.\n\n" +
      "Vos données restent complètement privées et sécurisées sur votre appareil.\n\n" +
      "Vous pouvez opter pour le traitement sur serveur dans les Paramètres si nécessaire (fonctionnalité pas encore disponible).",
    understood: "J'ai Compris",
  },

  // Toast Messages
  toast: {
    extractionStarted: "Extraction démarrée...",
    extractionComplete: "Extraction terminée ! {{count}} emails trouvés",
    copied: "{{count}} emails copiés dans le presse-papiers",
    exportSuccess: "{{count}} emails exportés vers {{format}}",
    fileUploaded: "Fichier téléchargé : {{filename}}",
    settingsSaved: "Paramètres enregistrés avec succès",
    error: "Erreur : {{message}}",
    cleared: "Toutes les données effacées",
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
  },
};
