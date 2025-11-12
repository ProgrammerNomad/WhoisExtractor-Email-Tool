import type { Translation } from "./en";

/**
 * Spanish Translations
 * Traducciones al Español
 */

export const es: Translation = {
  // Header
  header: {
    title: "Email Address Extractor",
    subtitle: "Obtenga emails de cualquier texto o archivo con filtros avanzados fáciles",
    emailCount: "{{count}} Emails",
  },

  // Input Section
  input: {
    title: "Texto de Entrada",
    placeholder: "Pegue su texto con direcciones de email aquí...",
    fileUpload: "O Cargar Archivo",
    chooseFile: "Elegir archivo",
    selectedFile: "Archivo seleccionado:",
    size: "Tamaño:",
    largeFileWarning: "⚠ Archivo grande - procesamiento en segundo plano",
    extractButton: "Extraer Emails",
    resetButton: "Reiniciar",
    extracting: "Extrayendo...",
  },

  // Results Section
  results: {
    title: "Emails Extraídos",
    count: "{{count}} direcciones de email encontradas",
    noResults: "No se encontraron direcciones de email. Intente pegar texto o cargar un archivo.",
    placeholder: "Las direcciones de email extraídas aparecerán aquí...",
    copyButton: "Copiar Todo",
    exportTxt: "Exportar .TXT",
    exportCsv: "Exportar .CSV",
    copied: "¡Copiado al portapapeles!",
    exported: "¡Exportado exitosamente!",
  },

  // Options Panel
  options: {
    title: "Opciones de Extracción",
    
    extractionType: {
      label: "Tipo de Extracción",
      email: "Direcciones de Email",
    },

    basicOptions: {
      label: "Opciones Básicas",
      deduplicate: "Eliminar Duplicados",
      deduplicateHelp: "Eliminar direcciones de email duplicadas",
      lowercase: "Convertir a Minúsculas",
      lowercaseHelp: "Convertir todos los emails a minúsculas",
      removeNumeric: "Eliminar Dominios Numéricos",
      removeNumericHelp: "Eliminar emails con dominios solo numéricos",
      sort: "Ordenar Alfabéticamente",
      sortHelp: "Ordenar resultados en orden alfabético",
    },

    outputOptions: {
      label: "Opciones de Salida",
      separator: "Separador",
      groupByLabel: "Agrupar emails",
      separators: {
        newline: "Nueva Línea",
        comma: "Coma",
        semicolon: "Punto y Coma",
        pipe: "Barra (|)",
        space: "Espacio",
      },
    },

    advancedFilters: {
      label: "Opciones de Filtro Avanzadas",
      filterMode: "Modo de Filtro",
      removeStrings: "Eliminar Cadenas",
      removeStringsPlaceholder: "Ingrese cadenas a eliminar (una por línea)",
      removeStringsHelp: "Eliminar emails que contengan estas cadenas",
    },

    keywordFilter: {
      label: "Filtro Avanzado de Palabras Clave",
      enable: "Habilitar Filtro de Palabras Clave",
      placeholder: "Ingrese palabras clave (una por línea)",
      description: "Eliminar emails no deseados que contengan palabras clave o patrones específicos",
      inputLabel: "Eliminar emails que contengan estas palabras clave (separadas por comas)",
      requestLink: "Solicitar nuevas palabras clave →",
      helpEnabled: "Solo se extraerán emails que contengan estas palabras clave",
      helpDisabled: "Habilitar para filtrar emails por palabras clave",
    },
  },

  // Footer
  footer: {
    about: {
      title: "Acerca de",
      description: "Una herramienta gratuita y de código abierto para extracción de emails que procesa datos localmente en su navegador. Ningún dato se carga a ningún servidor.",
      opensource: "Gratuito y de Código Abierto | Licencia MIT",
      message: "¡Siéntase libre de usar, modificar y distribuir esta herramienta para cualquier propósito!",
    },
    quickLinks: {
      title: "Enlaces Rápidos",
      github: "Repositorio GitHub",
      issues: "Reportar Problemas",
      privacy: "Política de Privacidad",
      website: "WhoisExtractor",
    },
    support: {
      title: "Apoyo",
      description: "Si encuentra esta herramienta útil, por favor considere:",
      star: "Estrella en GitHub",
      fork: "Bifurcar Proyecto",
      contribute: "Contribuir",
    },
  },

  // Privacy Notice
  privacy: {
    title: "Aviso de Privacidad",
    message:
      "Toda la extracción de emails se procesa localmente en su navegador y NO se carga a ningún servidor.\n\n" +
      "Sus datos permanecen completamente privados y seguros en su dispositivo.\n\n" +
      "Puede optar por el procesamiento en servidor en Configuración si es necesario (función aún no disponible).",
    understood: "Entendido",
  },

  // Toast Messages
  toast: {
    extractionStarted: "Extracción iniciada...",
    extractionComplete: "¡Extracción completa! Se encontraron {{count}} emails",
    copied: "{{count}} emails copiados al portapapeles",
    exportSuccess: "{{count}} emails exportados a {{format}}",
    fileUploaded: "Archivo cargado: {{filename}}",
    settingsSaved: "Configuración guardada exitosamente",
    error: "Error: {{message}}",
    cleared: "Todos los datos eliminados",
  },

  // Review Prompt
  review: {
    title: "¿Disfrutando WhoisExtractor?",
    message: "Has estado usando WhoisExtractor durante {{days}} días con {{count}} extracciones exitosas. ¿Te importaría dejar una reseña?",
    rateNow: "Calificar en Chrome Web Store",
    later: "Quizás más tarde",
    dontAsk: "No preguntar de nuevo",
    thankYou: "¡Gracias por tus comentarios!",
  },

  // Update Notification
  update: {
    title: "Actualización disponible",
    message: "La versión {{version}} ya está disponible.",
    description: "Recarga la extensión para actualizar a la última versión con nuevas funciones y mejoras.",
    updateNow: "Actualizar ahora",
    later: "Más tarde",
  },

  // Common
  common: {
    loading: "Cargando...",
    cancel: "Cancelar",
    close: "Cerrar",
    save: "Guardar",
    reset: "Reiniciar",
    clear: "Limpiar",
    export: "Exportar",
    import: "Importar",
    settings: "Configuración",
    help: "Ayuda",
    language: "Idioma",
    review: "Dejar una reseña",
  },
};
