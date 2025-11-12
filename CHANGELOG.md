# Changelog

All notable changes to WhoisExtractor: Email Tool will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.1] - 2025-11-12

### Added

- **Multi-Language Support** - Added support for 10 languages:
  - English (EN)
  - Spanish (ES)
  - French (FR)
  - German (DE)
  - Portuguese (PT)
  - Russian (RU)
  - Arabic (AR)
  - Hindi (HI)
  - Japanese (JA)
  - Chinese Simplified (ZH)
- **Language Switcher** - Added language selector in the tool page UI
- **Review Request System** - Smart review prompts:
  - After 2-3 days of usage
  - After successful extraction (configurable)
  - Option to review directly from the tool page
  - "Don't ask again" option for users who decline
- **Usage Tracking** - Local tracking for review prompt logic (privacy-first, no external analytics)
- **Theme Persistence** - Dark/light mode preference now persists across sessions

### Changed

- Improved translation quality with more natural phrasing
- Reduced over-transliteration in Hindi translations
- Fixed TypeScript type conflicts in translation files

### Fixed

- Fixed duplicate type export error in Hindi translation file
- Ensured all translation files compile without errors

## [1.0.0] - 2025-11-10

### Added

- **Initial Release** - First public version
- **100% Local Processing** - All email extraction happens in your browser
- **Web Worker Architecture** - Non-blocking processing for large files
- **Smart Deduplication** - Automatic removal of duplicate email addresses
- **Keyword Filtering** - Filter results by specific keywords or patterns
- **Multiple Input Methods**:
  - Direct text paste
  - File upload (.txt, .csv, etc.)
- **Export Options**:
  - Copy to clipboard
  - Export as .txt
  - Export as .csv
- **Configurable Options**:
  - Sort alphabetically
  - Remove duplicates
  - Choose output separator (newline, comma, semicolon, pipe, space)
  - Remove numeric domains
  - Convert to lowercase
  - Advanced string removal filters
- **Modern UI**:
  - Clean, intuitive interface
  - Real-time progress bar
  - Live email count
  - Streaming results display
- **Performance Optimizations**:
  - 256 KB chunk size (default)
  - 1000 emails per batch
  - Smart sorting threshold (50,000 emails)
  - Memory safety with pause at 200,000 emails
- **Privacy Features**:
  - No data uploaded to servers
  - No tracking or analytics
  - No external CDN dependencies
  - Content Security Policy enforced
- **Accessibility**:
  - Full keyboard navigation
  - Screen reader support
  - ARIA labels on all controls
- **Chrome Extension Features**:
  - Manifest V3 compliance
  - Service worker background script
  - Offscreen page for Web Worker hosting
  - Keyboard shortcut (Ctrl+Shift+E)
- **Technology Stack**:
  - Plasmo Framework
  - React 18
  - TypeScript
  - TailwindCSS
  - Web Workers for heavy processing

### Security

- Implemented strict Content Security Policy
- No external resource loading
- Local-only data processing
- Manifest V3 security standards

---

## Release Links

- [v1.0.1 on Chrome Web Store](https://chromewebstore.google.com/detail/whoisextractor-email-tool/hlkfbiaphhmngdlcfgfagfjicbadomnj)
- [v1.0.0 Initial Release](https://github.com/ProgrammerNomad/WhoisExtractor-Email-Tool/releases/tag/v1.0.0)

## Feedback & Support

- [Report a Bug](https://github.com/ProgrammerNomad/WhoisExtractor-Email-Tool/issues)
- [Request a Feature](https://github.com/ProgrammerNomad/WhoisExtractor-Email-Tool/issues)
- [Leave a Review](https://chromewebstore.google.com/detail/whoisextractor-email-tool/hlkfbiaphhmngdlcfgfagfjicbadomnj/reviews)
