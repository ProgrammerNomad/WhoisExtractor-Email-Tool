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
- **Language Switcher** - Added language selector in the tool page header with native language names
- **Automatic Language Detection** - Browser language is auto-detected on first use
- **RTL Support** - Full right-to-left support for Arabic and other RTL languages
- **Review Request System** - Smart review prompts:
  - After 2-3 days of usage
  - After successful extraction (configurable)
  - Review button permanently available in footer
  - "Don't ask again" option for users who decline
  - Thank you message after user agrees to review
- **Update Notification System** - Automatic update detection:
  - Detects when new version is available on Chrome Web Store
  - Shows modal notification with version details
  - "Update Now" option to reload extension immediately
  - "Later" option to defer update
  - Prevents duplicate notifications for same version
- **Default Keyword Filters** - Pre-configured list of 83 common keywords to filter out:
  - Generic addresses (admin, support, info, etc.)
  - Privacy-protected domains (whois, proxy, etc.)
  - Spam domains (common TLDs and patterns)
  - Service addresses (postmaster, webmaster, etc.)
  - Keywords are pre-filled but disabled by default (user control)
- **Usage Tracking** - Local tracking for review prompt logic (privacy-first, no external analytics)
- **Theme Persistence** - Dark/light mode preference now persists across sessions

### Changed

- **Improved Translation Quality** - More natural phrasing across all languages
- **Reduced Over-Transliteration** - Better balance in Hindi translations
- **Optimized Keyword List** - Removed redundant patterns (single digits, duplicate entries with @)
- **Review Button Styling** - Aligned "Leave a Review" button with footer link style for consistency
- **Language Persistence** - Selected language is saved and restored across sessions
- **Document Attributes** - HTML `lang` and `dir` attributes update automatically with language changes

### Fixed

- **Language Switching Without Refresh** - Language changes now apply immediately without manual page reload
  - Added chrome.storage.onChanged listener to sync language across all components
  - All text updates instantly when language is changed
  - RTL/LTR direction changes immediately
- **Review Button Alignment** - Fixed alignment issue in footer to match other links
- **TypeScript Type Conflicts** - Fixed duplicate type export error in Hindi translation file
- **Translation File Compilation** - Ensured all translation files compile without errors

### Performance

- **Real-time Language Updates** - Optimized language switching with storage listeners
- **Reduced Bundle Size** - Optimized keyword list from 96 to 83 entries (13.5% reduction)
- **Faster UI Updates** - Language changes propagate instantly to all components

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
