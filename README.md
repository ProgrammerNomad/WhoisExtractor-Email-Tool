# WhoisExtractor: Email Tool

A powerful, **privacy-first** Chrome extension for extracting email addresses from text and files. Built with Plasmo, React, and TailwindCSS.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Chrome Web Store](https://img.shields.io/badge/Chrome-Web%20Store-brightgreen.svg)](https://chromewebstore.google.com/detail/whoisextractor-email-tool/hlkfbiaphhmngdlcfgfagfjicbadomnj)
[![Version](https://img.shields.io/badge/version-1.0.1-blue.svg)](CHANGELOG.md)

## Install from Chrome Web Store

**[Download WhoisExtractor: Email Tool](https://chromewebstore.google.com/detail/whoisextractor-email-tool/hlkfbiaphhmngdlcfgfagfjicbadomnj)**

If you find this useful, please [leave a review](https://chromewebstore.google.com/detail/whoisextractor-email-tool/hlkfbiaphhmngdlcfgfagfjicbadomnj/reviews) on the Chrome Web Store!

## Features

### Core Functionality
- **100% Local Processing** - Your data never leaves your device
- **Web Worker Architecture** - Non-blocking processing for files up to 300 MB
- **Smart Deduplication** - Case-insensitive, automatic duplicate removal
- **Advanced Keyword Filtering** - 94 pre-configured keywords with smart pattern matching
- **Multiple Input Methods** - Paste text or upload files (.txt, .csv, etc.)
- **Flexible Export** - Copy to clipboard or export as .txt/.csv
- **Real-Time Progress** - Live count, file reading progress, and streaming results
- **Full-Page Experience** - Opens in a new tab, not a cramped popup
- **Memory Efficient** - Files displayed as placeholders (not in textarea) to save memory

### Advanced Features
- **Multi-Language Support** - 10 languages with instant switching:
  - English, Spanish, French, German, Portuguese
  - Russian, Arabic, Hindi, Japanese, Chinese
- **RTL Support** - Full right-to-left language support (Arabic, Hebrew)
- **Dark/Light Mode** - Theme toggle with automatic persistence
- **Smart Review System** - Intelligent review prompts based on usage patterns
- **Update Notifications** - Automatic Chrome Web Store update detection
- **Grand Total Tracking** - Lifetime email extraction counter across all sessions
- **Keyboard Shortcut** - Quick access via Ctrl+Shift+E
- **Smart Pattern Matching** - Domain, prefix, suffix, and generic keyword filtering
- **File Reading Progress** - Real-time progress bar during file loading (no freeze)
- **Auto-Clear on New File** - Automatic cleanup when selecting new files

### Performance & Capacity
- **Small files (< 2 MB)**: Instant processing
- **Medium files (2-100 MB)**: Background Web Worker processing
- **Large files (100-300 MB)**: Memory-efficient processing with progress tracking
- **Very large files (> 300 MB)**: Clear error with split instructions

### Privacy & Performance
- **No Data Upload** - All processing happens in your browser
- **No Tracking** - Zero analytics or external calls
- **No CDNs** - All assets bundled locally
- **Memory Safe** - Smart thresholds prevent browser freezing
- **Stale Connection Recovery** - Automatic reconnection on errors
- **Accessible** - Full keyboard navigation and screen reader support

## Quick Start

### For Users

**[Install from Chrome Web Store](https://chromewebstore.google.com/detail/whoisextractor-email-tool/hlkfbiaphhmngdlcfgfagfjicbadomnj)** - One-click installation

### For Developers

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ProgrammerNomad/WhoisExtractor-Email-Tool.git
   cd WhoisExtractor-Email-Tool
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Load extension in Chrome:**
   - Open `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the `build/chrome-mv3-dev` folder

### Production Build

```bash
# Build for production
npm run build

# Package for distribution
npm run package
```

## 📖 Usage

### Basic Extraction

1. Click the extension icon to open the tool page in a new tab (or use keyboard shortcut **Ctrl+Shift+E**)
2. Choose input method:
   - **Paste Text**: Copy and paste text containing emails
   - **Upload File**: Upload a .txt, .csv, or other text file (up to 300 MB)
     - Files are processed with progress tracking (no UI freeze)
     - Large files display as placeholders to save memory
3. Configure options (optional):
   - Sort alphabetically (auto-disabled for 50k+ emails)
   - Remove duplicates (default: ON)
   - Choose output separator
   - Add keyword filters (94 pre-configured keywords available)
4. Click "Extract Emails"
   - Small files (< 2 MB): Instant extraction
   - Large files (2-300 MB): Web Worker with progress bar
5. View results in real-time with streaming updates
6. Export via Copy, .txt, or .csv

### Advanced Options

- **Keyword Filtering**: 94 pre-configured keywords with smart pattern matching:
  - **Domain patterns**: `qq.com`, `yahoo.com` (exact domain match)
  - **Prefix patterns**: `admin@`, `support@` (must start with)
  - **Suffix patterns**: `@contact`, `@gmail` (appears anywhere)
  - **Generic keywords**: `admin`, `webmaster` (matches anywhere in email)
- **Grouping**: Group results by domain
- **Sorting**: Auto-sort with smart threshold (default: 50,000 emails)
- **Memory Safety**: Auto-pause if memory threshold exceeded (200,000 emails)
- **Multi-Language**: Switch between 10 languages instantly
- **Dark Mode**: Toggle dark/light theme with persistence
- **File Size Limits**: 
  - < 2 MB: Instant processing
  - 2-300 MB: Web Worker with progress tracking
  - \> 300 MB: Error with split instructions

## Architecture

### Web Worker Architecture (Fully Implemented)

The extension uses a **hybrid approach** that automatically selects the best processing method based on file size:

**Small Files (< 2 MB)**: Direct client-side extraction (instant)

```
┌──────────────────┐     (click icon)     ┌──────────────────┐
│  Extension Icon  │────────────────────►│   Tool Page      │
│                  │  Opens new tab       │   (tabs/tsx)     │
└──────────────────┘                      └──────────────────┘
                                                  │
                                                  │
                                          (client-side)
                                          extraction with
                                          regex matching
                                                  │
                                                  ▼
                                          ┌──────────────────┐
                                          │  Results Display │
                                          │  (streaming UI)  │
                                          └──────────────────┘
```

**Large Files (2-300 MB)**: Full Web Worker with progress tracking

```
┌──────────────────┐     (click icon)     ┌──────────────────┐
│  Extension Icon  │────────────────────►│   Tool Page      │
│                  │  Opens new tab       │   (tabs/tsx)     │
└──────────────────┘                      └──────────────────┘
                                                  │
                                                  │
                                            (Port messages)
                                                  │
                                                  ▼
                                          ┌──────────────────┐
                                          │ Background Worker│
                                          │  (service worker)│
                                          └──────────────────┘
                                                  │
                                                  │
                                          (orchestration)
                                                  │
                                                  ▼
                                          ┌──────────────────┐
                                          │  Offscreen Page  │
                                          │  (offscreen/)    │
                                          └──────────────────┘
                                                  │
                                                  │
                                            (spawns worker)
                                                  │
                                                  ▼
                                          ┌──────────────────┐
                                          │  Web Worker      │
                                          │ (parser.worker)  │
                                          └──────────────────┘
```

### Component Responsibilities

| Component | Role | Status |
|-----------|------|--------|
| **Tool Page UI** | Full-page interface for input, options, results display | ✅ Active |
| **Extension Icon** | Opens/focuses tool page tab (Ctrl+Shift+E shortcut) | ✅ Active |
| **Language Switcher** | Instant language switching (10 languages) | ✅ Active |
| **Theme Switcher** | Dark/light mode toggle with persistence | ✅ Active |
| **Review System** | Smart review prompts based on usage | ✅ Active |
| **Update Notifications** | Auto-detection of Chrome Web Store updates | ✅ Active |
| **File Reader** | Progress-tracked file loading (no UI freeze) | ✅ Active |
| **Background Service Worker** | Opens/focuses tabs, manages offscreen page, forwards messages | ✅ Active |
| **Offscreen Page** | Hosts Web Worker, relays messages to background | ✅ Active (2-300 MB files) |
| **Web Worker** | Heavy parsing with chunking, batching, deduplication | ✅ Active (2-300 MB files) |
| **Client-Side Extraction** | Fast regex-based extraction for small inputs | ✅ Active (< 2 MB files) |

### Processing Flow (Large Files)

1. **User uploads file** → FileReader reads with progress events (no freeze)
2. **File size check** → < 2 MB: direct extraction | 2-300 MB: Web Worker | > 300 MB: error
3. **Large file path**:
   - Tool page → Background (Port) → Offscreen page
   - Offscreen spawns Web Worker with inline code
   - Worker processes in 256 KB chunks with 1 KB overlap
   - Worker sends batches (1000 emails) back to UI
   - Results stream to display (no blocking)
4. **Filtering** → Applied on each batch (dedup, sort, keywords, domain grouping)
5. **Memory safety** → Auto-pause at 200k emails threshold
6. **Cancellation** → User can stop anytime; worker terminates immediately

### Stale Connection Recovery

Background service worker detects dead Port connections and recreates offscreen document automatically. This prevents "Receiving end does not exist" errors on subsequent extractions.

## Development

### Scripts

```bash
# Development
npm run dev          # Start dev server with hot reload
npm run lint         # Run ESLint
npm run format       # Format code with Prettier

# Building
npm run build        # Production build
npm run package      # Create distributable package

# Testing
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
```

## Privacy & Security

- **No data upload**: All processing happens locally
- **No tracking**: Zero analytics or telemetry
- **No CDNs**: All assets bundled locally
- **Content Security Policy**: Strict CSP prevents external resources
- **Manifest V3**: Latest Chrome security standards

See [PRIVACY.md](PRIVACY.md) for full privacy policy.

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for version history and updates.

## Contributing

Contributions are welcome! Open an issue or submit a PR.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Feedback & Support

- Bug Reports: [Open an issue](https://github.com/ProgrammerNomad/WhoisExtractor-Email-Tool/issues)
- Feature Requests: [Open an issue](https://github.com/ProgrammerNomad/WhoisExtractor-Email-Tool/issues)
- Review: [Leave a review on Chrome Web Store](https://chromewebstore.google.com/detail/whoisextractor-email-tool/hlkfbiaphhmngdlcfgfagfjicbadomnj/reviews)
- Discussions: [GitHub Discussions](https://github.com/ProgrammerNomad/WhoisExtractor-Email-Tool/discussions)

---

**WhoisExtractor: Email Tool** - Privacy-first email extraction, locally on your device.

Made with love by [ProgrammerNomad](https://github.com/ProgrammerNomad)

If you find this useful, please [star the repo](https://github.com/ProgrammerNomad/WhoisExtractor-Email-Tool) and [leave a review](https://chromewebstore.google.com/detail/whoisextractor-email-tool/hlkfbiaphhmngdlcfgfagfjicbadomnj/reviews)!
