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
- **Fast Client-Side Extraction** - Instant regex-based email extraction
- **Smart Deduplication** - Case-insensitive, automatic duplicate removal
- **Keyword Filtering** - 83 pre-configured keywords to filter out generic/privacy emails
- **Multiple Input Methods** - Paste text or upload files (.txt, .csv, etc.)
- **Flexible Export** - Copy to clipboard or export as .txt/.csv
- **Real-Time Progress** - Live count and streaming results display
- **Full-Page Experience** - Opens in a new tab, not a cramped popup

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
- **Configurable** - Adjust sorting thresholds and filtering options

### Privacy & Performance
- **No Data Upload** - All processing happens in your browser
- **No Tracking** - Zero analytics or external calls
- **No CDNs** - All assets bundled locally
- **Memory Safe** - Smart thresholds prevent browser freezing
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
   - **Upload File**: Upload a .txt, .csv, or other text file
3. Configure options (optional):
   - Sort alphabetically
   - Remove duplicates (default: ON)
   - Choose output separator
   - Add keyword filters (83 pre-configured keywords available)
4. Click "Extract Emails"
5. View results in real-time with streaming updates
6. Export via Copy, .txt, or .csv

### Advanced Options

- **Keyword Filtering**: 83 pre-configured keywords to filter out generic/privacy-protected emails
- **Grouping**: Group results by domain
- **Sorting**: Auto-sort with smart threshold (default: 50,000 emails)
- **Memory Safety**: Auto-pause if memory threshold exceeded
- **Multi-Language**: Switch between 10 languages instantly
- **Dark Mode**: Toggle dark/light theme with persistence

## Architecture

**Note**: Current implementation uses **client-side extraction** directly in the tool page. The full Web Worker architecture described below is available in the codebase but currently disabled for simplicity.

### Current Architecture (Simplified)

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

### Planned Architecture (Full Worker Implementation)

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

### Key Components

- **Tool Page (Full Tab)** - User interface that opens in a new browser tab (not a popup)
- **Extension Icon** - Opens/focuses tool page tab (keyboard shortcut: Ctrl+Shift+E)
- **Language Switcher** - Instant language switching with 10 language support
- **Theme Switcher** - Dark/light mode toggle with persistence
- **Review System** - Smart review prompts based on usage and extraction count
- **Update Notifications** - Automatic detection of Chrome Web Store updates
- **Client-Side Extraction** - Fast regex-based email extraction (current implementation)
- **Background Service Worker** - Manages update notifications and review tracking (message broker ready for future worker implementation)
- **Offscreen Page** - Available for hosting Web Worker (future enhancement)
- **Web Worker** - Heavy parsing with chunking and batching (code ready, currently disabled)

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
