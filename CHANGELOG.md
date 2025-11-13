# Changelog

All notable changes to WhoisExtractor: Email Tool will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.2] - 2025-11-13

### Fixed

- **Keyword Filtering** - Fixed critical issues with Advanced Keyword Filter:
  - TLD pattern matching now works correctly (.pk, .ru, .za, .in, .com.br, .com.bd)
  - Changed "protc" to "protection" for better matching
  - Fixed domain suffix matching logic (keywords starting with dot now use endsWith check)
  - All 94 keywords now filter correctly with 100% accuracy

### Added

- **Persistent Filter State** - Advanced Keyword Filter toggle state now persists across sessions:
  - Toggle remains enabled/disabled after page refresh
  - State saved to chrome.storage.local
  - Restored automatically on extension load
- **Enhanced Keyword List** - Updated default keywords from 83 to 94 with improved patterns:
  - Added missing TLD patterns (.pk, .ru, .ra, .za, .in)
  - Added composite TLDs (.com.br, .com.bd)
  - Added more service prefixes (billing@, accounts@, accounting@, etc.)
  - Added international keywords (kontakt, contacto, destek, amministrazione@, supporto@)

### Changed

- **Filter Pattern Logic** - Improved keyword matching algorithm:
  - Pattern 1: Prefix match (keywords ending with @)
  - Pattern 2: Suffix match (keywords starting with @)
  - Pattern 3: Domain/TLD match (keywords with dots, including TLD-only patterns)
  - Pattern 4: Generic substring match (any other keyword)

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
- **Web Worker Architecture** - Fully activated for large file processing:
  - Automatic detection: inputs ≥256 KB processed via Web Worker
  - Small inputs (<256 KB) use direct extraction (faster for small data)
  - Non-blocking UI for files up to 300 MB
  - Streaming batch results (1000 emails per batch)
  - Real-time progress updates with percentage
  - Memory-safe processing with automatic monitoring
- **File Reading Progress** - Real-time progress bar during file loading:
  - Shows "Reading file: X%" with live updates
  - Smooth transition from file reading to extraction
  - No UI freeze even with very large files
  - FileReader API with progress events
- **Memory-Efficient File Handling** - Smart memory management:
  - File content NOT displayed in textarea (saves ~50% memory)
  - Placeholder message shows file name and size
  - Direct processing without textarea storage
  - Enables processing of files up to 300 MB (3x previous limit)
- **Auto-Clear on New File** - Automatic cleanup when selecting new files:
  - Previous results automatically cleared
  - Smooth workflow for processing multiple files
  - No manual "Clear" button needed between files

### Changed

- **Improved Translation Quality** - More natural phrasing across all languages
- **Reduced Over-Transliteration** - Better balance in Hindi translations
- **Optimized Keyword List** - Removed redundant patterns (single digits, duplicate entries with @)
- **Review Button Styling** - Aligned "Leave a Review" button with footer link style for consistency
- **Language Persistence** - Selected language is saved and restored across sessions
- **Document Attributes** - HTML `lang` and `dir` attributes update automatically with language changes
- **Extraction Architecture**:
  - Replaced setTimeout client-side extraction with Port messaging system
  - Tool page → Background Service Worker → Offscreen Page → Web Worker
  - Bi-directional streaming communication via chrome.runtime.Port
  - Session-based extraction tracking with unique IDs
- **Email Cleaning**:
  - Automatic removal of trailing dots and hyphens from emails
  - Improved word boundary detection in regex
  - Better handling of edge cases in email format
- **Options Application**:
  - Moved filtering logic to `applyOptions()` utility function
  - Centralized option processing for consistency
  - Final option application after all chunks processed
- **File Size Limit Increased**:
  - From 100 MB to 300 MB (3x improvement)
  - Thanks to memory-efficient textarea handling
- **Offscreen Connection Reliability**:
  - Detects and recreates stale offscreen connections
  - Automatic cleanup on disconnection
  - Prevents connection timeout errors

### Fixed

- **Language Switching Without Refresh** - Language changes now apply immediately without manual page reload
  - Added chrome.storage.onChanged listener to sync language across all components
  - All text updates instantly when language is changed
  - RTL/LTR direction changes immediately
- **Review Button Alignment** - Fixed alignment issue in footer to match other links
- **TypeScript Type Conflicts** - Fixed duplicate type export error in Hindi translation file
- **Translation File Compilation** - Ensured all translation files compile without errors
- **Large File Freeze Issue** - 300 MB files no longer freeze the UI
  - Web Worker processes in background thread
  - UI remains fully responsive during extraction
  - Cancel button works during processing
- **File Reading Freeze** - Eliminated 3-4 second freeze when selecting large files
  - FileReader with progress events provides immediate feedback
  - Smooth progress display from 0% to 100%
  - No perceived hanging or blocking
- **TypeScript Type Import** - Fixed verbatimModuleSyntax error in storage.ts
  - Changed to type-only import for Settings interface
- **Memory Management**:
  - Worker checks memory usage periodically
  - Automatic pause/warning at memory thresholds
  - Proper cleanup on cancellation or completion
- **Stale Offscreen Connection** - Fixed random connection timeouts
  - Detects dead port connections
  - Automatically closes and recreates offscreen document
  - Reliable connection on every extraction
- **Multiple File Upload Issue** - Fixed problem where second file wouldn't process
  - Auto-clears previous results on new file selection
  - Resets all extraction states properly
  - Smooth workflow for batch file processing

### Performance

- **Real-time Language Updates** - Optimized language switching with storage listeners
- **Reduced Bundle Size** - Optimized keyword list from 96 to 83 entries (13.5% reduction)
- **Faster UI Updates** - Language changes propagate instantly to all components
- **Extraction Speed**:
  - Small inputs (<256 KB): Instant results (< 100ms)
  - Medium inputs (1-10 MB): 0.5-2 seconds (non-blocking)
  - Large inputs (50-300 MB): 8-30 seconds (non-blocking)
  - All processing remains non-blocking (UI fully responsive)
- **Memory Efficiency**:
  - Set-based deduplication (O(1) lookup)
  - Chunked processing prevents memory spikes
  - Worker isolation protects main thread memory
  - Automatic garbage collection on worker termination
  - ~50% memory reduction by not storing files in textarea
- **File Reading Performance**:
  - Immediate progress feedback (no freeze)
  - Smooth 0-100% progress display
  - FileReader async with progress events

### Technical

- **Offscreen Document**:
  - Automatic creation via background service worker
  - Hosts Web Worker instances
  - Relays messages between tool page and Worker
  - Proper lifecycle management (creation/cleanup)
  - Stale connection detection and recovery
- **Message Protocol**:
  - `start` - Tool page initiates extraction
  - `batch` - Worker sends email batches (1000 each)
  - `complete` - Extraction finished
  - `cancel` - User cancels extraction
  - `error` - Error occurred during processing
  - `memoryWarning` - Memory threshold reached
- **Input Size Routing**:
  - Background worker calculates input byte size
  - < 256 KB → Direct extraction (offscreen page only)
  - ≥ 256 KB → Web Worker extraction (background thread)
- **File Processing Strategy**:
  - < 2 MB: Process without confirmation
  - 2-300 MB: Show confirmation, process with Worker
  - > 300 MB: Show error with split instructions

### Security & Privacy

- **Privacy Policy Updated**:
  - Added "Performance Processing with Web Workers" section
  - Clarified that Workers run entirely in browser (local)
  - No data transmission to external servers
  - Web Workers explained as standard browser feature (like setTimeout)
- **Chrome Store Compliance**:
  - `offscreen` permission justified: "Run Web Worker for email extraction"
  - All processing remains 100% local
  - No new permissions required
  - Fully compliant with Chrome Web Store policies

### Developer Notes

- **Architecture Change**:
  - useExtractor.ts now uses Port connections instead of setTimeout
  - background/index.ts manages offscreen document lifecycle
  - offscreen/index.ts spawns and manages Web Worker
  - parser.worker.ts handles heavy extraction in background thread
- **Build System**:
  - Plasmo automatically bundles Web Worker
  - Offscreen document properly registered in manifest
  - No manual webpack configuration needed
- **Testing Recommendations**:
  - Test small inputs (<100 KB) for instant results
  - Test medium inputs (1-10 MB) for streaming behavior
  - Test large inputs (50-300 MB) for non-blocking UI
  - Verify cancel works during processing
  - Check memory usage during large extractions
  - Test multiple file uploads in succession

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
