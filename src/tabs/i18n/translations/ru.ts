import type { Translation } from "./en";

/**
 * Russian Translations
 * Русские Переводы
 */

export const ru: Translation = {
  // Header
  header: {
    title: "Email Address Extractor",
  subtitle: "Получайте email-адреса из любого текста или файла с удобными продвинутыми фильтрами",
    emailCount: "{{count}} Emails",
    totalExtracted: "Всего извлечено",
    current: "Текущий",
  },

  // Input Section
  input: {
    title: "Входной Текст",
    placeholder: "Вставьте текст, содержащий адреса электронной почты здесь...",
    fileUpload: "Или Загрузить Файл",
    chooseFile: "Выбрать файл",
    selectedFile: "Выбранный файл:",
    size: "Размер:",
    largeFileWarning: "⚠ Большой файл - фоновая обработка",
    extractButton: "Извлечь Email",
    resetButton: "Сброс",
    extracting: "Извлечение...",
  },

  // Results Section
  results: {
    title: "Извлеченные Email",
    count: "Найдено {{count}} адресов электронной почты",
    noResults: "Адреса электронной почты не найдены. Попробуйте вставить текст или загрузить файл.",
    placeholder: "Извлеченные адреса электронной почты появятся здесь...",
    copyButton: "Копировать Все",
    exportTxt: "Экспорт .TXT",
    exportCsv: "Экспорт .CSV",
    copied: "Скопировано в буфер обмена!",
    exported: "Успешно экспортировано!",
  },

  // Options Panel
  options: {
    title: "Параметры Извлечения",
    
    extractionType: {
      label: "Тип Извлечения",
      email: "Адреса Email",
    },

    basicOptions: {
      label: "Основные Параметры",
      deduplicate: "Удалить Дубликаты",
      deduplicateHelp: "Удалить дублирующиеся адреса электронной почты",
      lowercase: "Преобразовать в Нижний Регистр",
      lowercaseHelp: "Преобразовать все email в нижний регистр",
      removeNumeric: "Удалить Числовые Домены",
      removeNumericHelp: "Удалить email с только числовыми доменами",
      sort: "Сортировать по Алфавиту",
      sortHelp: "Сортировать результаты в алфавитном порядке",
    },

    outputOptions: {
      label: "Параметры Вывода",
      separator: "Разделитель",
      groupByLabel: "Группировать email",
      separators: {
        newline: "Новая Строка",
        comma: "Запятая",
        semicolon: "Точка с Запятой",
        pipe: "Вертикальная Черта (|)",
        space: "Пробел",
      },
    },

    advancedFilters: {
      label: "Расширенные Параметры Фильтрации",
      filterMode: "Режим Фильтрации",
      removeStrings: "Удалить Строки",
      removeStringsPlaceholder: "Введите строки для удаления (по одной на строку)",
      removeStringsHelp: "Удалить email, содержащие эти строки",
    },

    keywordFilter: {
      label: "Расширенный Фильтр по Ключевым Словам",
      enable: "Включить Фильтр по Ключевым Словам",
      placeholder: "Введите ключевые слова (по одному на строку)",
      description: "Удалить нежелательные email, содержащие определенные ключевые слова или шаблоны",
      inputLabel: "Удалить email, содержащие эти ключевые слова (через запятую)",
      requestLink: "Запросить новые ключевые слова →",
      helpEnabled: "Будут извлечены только email, содержащие эти ключевые слова",
      helpDisabled: "Включите для фильтрации email по ключевым словам",
    },
  },

  // Footer
  footer: {
    about: {
      title: "О Программе",
      description: "Бесплатный инструмент с открытым исходным кодом для извлечения email, который обрабатывает данные локально в вашем браузере. Никакие данные не загружаются на сервер.",
      opensource: "Бесплатно и с Открытым Исходным Кодом | Лицензия MIT",
      message: "Свободно используйте, изменяйте и распространяйте этот инструмент для любых целей!",
    },
    quickLinks: {
      title: "Быстрые Ссылки",
      github: "Репозиторий GitHub",
      issues: "Сообщить о Проблемах",
      privacy: "Политика Конфиденциальности",
      website: "WhoisExtractor",
    },
    support: {
      title: "Поддержка",
      description: "Если вы считаете этот инструмент полезным, пожалуйста, рассмотрите:",
      star: "Звезда на GitHub",
      fork: "Форк Проекта",
      contribute: "Внести Вклад",
    },
  },

  // Privacy Notice
  privacy: {
    title: "Уведомление о Конфиденциальности",
    message:
      "Все извлечение email обрабатывается локально в вашем браузере и НЕ загружается на какой-либо сервер.\n\n" +
      "Ваши данные остаются полностью конфиденциальными и безопасными на вашем устройстве.\n\n" +
      "При необходимости вы можете выбрать обработку на сервере в Настройках (функция еще недоступна).",
    understood: "Понятно",
  },

  // Toast Messages
  toast: {
    extractionStarted: "Извлечение начато...",
    extractionComplete: "Извлечение завершено! Найдено {{count}} email",
    copied: "{{count}} email скопировано в буфер обмена",
    exportSuccess: "{{count}} email экспортировано в {{format}}",
    fileUploaded: "Файл загружен: {{filename}}",
    settingsSaved: "Настройки успешно сохранены",
    error: "Ошибка: {{message}}",
    cleared: "Все данные удалены",
  },

  // Review Prompt
  review: {
    title: "Нравится WhoisExtractor?",
    message: "Вы используете WhoisExtractor уже {{days}} дней с {{count}} успешными извлечениями. Не могли бы вы оставить отзыв?",
    totalExtracted: "Вы извлекли {{total}} писем на данный момент!",
    rateNow: "Оценить в Chrome Web Store",
    later: "Может быть позже",
    dontAsk: "Больше не спрашивать",
    thankYou: "Спасибо за ваш отзыв!",
  },

  // Update Notification
  update: {
    title: "Доступно обновление",
    message: "Версия {{version}} теперь доступна.",
    description: "Перезагрузите расширение, чтобы обновиться до последней версии с новыми функциями и улучшениями.",
    updateNow: "Обновить сейчас",
    later: "Позже",
  },

  // Common
  common: {
    loading: "Загрузка...",
    cancel: "Отмена",
    close: "Закрыть",
    save: "Сохранить",
    reset: "Сброс",
    clear: "Очистить",
    export: "Экспорт",
    import: "Импорт",
    settings: "Настройки",
    help: "Помощь",
    language: "Язык",
    review: "Оставить отзыв",
  },
};
