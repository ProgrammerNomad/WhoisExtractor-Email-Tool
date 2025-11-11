import type { Translation } from "./en";

/**
 * Portuguese Translations
 * Traduções em Português
 */

export const pt: Translation = {
  // Header
  header: {
    title: "Extrator de Endereços de Email",
    subtitle: "Extraia emails de qualquer texto ou arquivo com filtros avançados fáceis de usar",
    emailCount: "{{count}} Emails",
  },

  // Input Section
  input: {
    title: "Texto de Entrada",
    placeholder: "Cole seu texto contendo endereços de email aqui...",
    fileUpload: "Ou Enviar Arquivo",
    chooseFile: "Escolher arquivo",
    selectedFile: "Arquivo selecionado:",
    size: "Tamanho:",
    largeFileWarning: "⚠ Arquivo grande - processamento em segundo plano",
    extractButton: "Extrair Emails",
    resetButton: "Redefinir",
    extracting: "Extraindo...",
  },

  // Results Section
  results: {
    title: "Emails Extraídos",
    count: "{{count}} endereços de email encontrados",
    noResults: "Nenhum endereço de email encontrado. Tente colar texto ou enviar um arquivo.",
    placeholder: "Os endereços de email extraídos aparecerão aqui...",
    copyButton: "Copiar Tudo",
    exportTxt: "Exportar .TXT",
    exportCsv: "Exportar .CSV",
    copied: "Copiado para a área de transferência!",
    exported: "Exportado com sucesso!",
  },

  // Options Panel
  options: {
    title: "Opções de Extração",
    
    extractionType: {
      label: "Tipo de Extração",
      email: "Endereços de Email",
    },

    basicOptions: {
      label: "Opções Básicas",
      deduplicate: "Remover Duplicados",
      deduplicateHelp: "Remover endereços de email duplicados",
      lowercase: "Converter para Minúsculas",
      lowercaseHelp: "Converter todos os emails para minúsculas",
      removeNumeric: "Remover Domínios Numéricos",
      removeNumericHelp: "Remover emails com domínios apenas numéricos",
      sort: "Ordenar Alfabeticamente",
      sortHelp: "Ordenar resultados em ordem alfabética",
    },

    outputOptions: {
      label: "Opções de Saída",
      separator: "Separador",
      groupByLabel: "Agrupar emails",
      separators: {
        newline: "Nova Linha",
        comma: "Vírgula",
        semicolon: "Ponto e Vírgula",
        pipe: "Barra Vertical (|)",
        space: "Espaço",
      },
    },

    advancedFilters: {
      label: "Opções de Filtro Avançadas",
      filterMode: "Modo de Filtro",
      removeStrings: "Remover Strings",
      removeStringsPlaceholder: "Digite as strings a remover (uma por linha)",
      removeStringsHelp: "Remover emails contendo estas strings",
    },

    keywordFilter: {
      label: "Filtro Avançado de Palavras-chave",
      enable: "Ativar Filtro de Palavras-chave",
      placeholder: "Digite as palavras-chave (uma por linha)",
      description: "Remover emails indesejados contendo palavras-chave ou padrões específicos",
      inputLabel: "Remover emails contendo estas palavras-chave (separadas por vírgula)",
      requestLink: "Solicitar novas palavras-chave →",
      helpEnabled: "Apenas emails contendo estas palavras-chave serão extraídos",
      helpDisabled: "Ativar para filtrar emails por palavras-chave",
    },
  },

  // Footer
  footer: {
    about: {
      title: "Sobre",
      description: "Uma ferramenta gratuita e de código aberto para extração de emails que processa dados localmente no seu navegador. Nenhum dado é enviado para qualquer servidor.",
      opensource: "Gratuito e de Código Aberto | Licença MIT",
      message: "Sinta-se livre para usar, modificar e distribuir esta ferramenta para qualquer finalidade!",
    },
    quickLinks: {
      title: "Links Rápidos",
      github: "Repositório GitHub",
      issues: "Reportar Problemas",
      privacy: "Política de Privacidade",
      website: "WhoisExtractor",
    },
    support: {
      title: "Suporte",
      description: "Se você achar esta ferramenta útil, por favor considere:",
      star: "Estrela no GitHub",
      fork: "Fork do Projeto",
      contribute: "Contribuir",
    },
  },

  // Privacy Notice
  privacy: {
    title: "Aviso de Privacidade",
    message:
      "Toda extração de email é processada localmente no seu navegador e NÃO é enviada para nenhum servidor.\n\n" +
      "Seus dados permanecem completamente privados e seguros no seu dispositivo.\n\n" +
      "Você pode optar pelo processamento no servidor nas Configurações, se necessário (recurso ainda não disponível).",
    understood: "Entendi",
  },

  // Toast Messages
  toast: {
    extractionStarted: "Extração iniciada...",
    extractionComplete: "Extração completa! Encontrados {{count}} emails",
    copied: "{{count}} emails copiados para a área de transferência",
    exportSuccess: "{{count}} emails exportados para {{format}}",
    fileUploaded: "Arquivo enviado: {{filename}}",
    settingsSaved: "Configurações salvas com sucesso",
    error: "Erro: {{message}}",
    cleared: "Todos os dados removidos",
  },

  // Common
  common: {
    loading: "Carregando...",
    cancel: "Cancelar",
    close: "Fechar",
    save: "Salvar",
    reset: "Redefinir",
    clear: "Limpar",
    export: "Exportar",
    import: "Importar",
    settings: "Configurações",
    help: "Ajuda",
    language: "Idioma",
  },
};
