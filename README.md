# WhoisExtractor: Email Tool

A powerful, **privacy-first** Chrome extension for extracting email addresses from text and files. Built with Plasmo, React, and TailwindCSS.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Chrome Web Store](https://img.shields.io/badge/Chrome-Web%20Store-brightgreen.svg)](https://chromewebstore.google.com/detail/whoisextractor-email-tool/hlkfbiaphhmngdlcfgfagfjicbadomnj)
[![Version](https://img.shields.io/badge/version-1.0.1-blue.svg)](CHANGELOG.md)

## Install from Chrome Web Store

**[Download WhoisExtractor: Email Tool](https://chromewebstore.google.com/detail/whoisextractor-email-tool/hlkfbiaphhmngdlcfgfagfjicbadomnj)**

If you find this useful, please [leave a review](https://chromewebstore.google.com/detail/whoisextractor-email-tool/hlkfbiaphhmngdlcfgfagfjicbadomnj/reviews) on the Chrome Web Store!

## Features

- **100% Local Processing** - Your data never leaves your device
- **Fast & Non-Blocking** - Web Worker-based extraction prevents UI freezing
- **Smart Deduplication** - Case-insensitive, automatic duplicate removal
- **Keyword Filtering** - Filter results by specific keywords
- **Multiple Input Methods** - Paste text or upload files (.txt, .csv, etc.)
- **Flexible Export** - Copy to clipboard or export as .txt/.csv
- **Modern UI** - Clean, intuitive interface with real-time progress
- **Configurable** - Adjust chunk sizes, batch sizes, and sorting thresholds
- **Accessible** - Full keyboard navigation and screen reader support
- **Multi-Language Support** - Available in 10 languages (EN, ES, FR, DE, PT, RU, AR, HI, JA, ZH)

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

1. Click the extension icon to open the popup
2. Choose input method:
   - **Paste Text**: Copy and paste text containing emails
   - **Upload File**: Upload a .txt, .csv, or other text file
3. Configure options (optional):
   - Sort alphabetically
   - Remove duplicates (default: ON)
   - Choose output separator
   - Add keyword filters
4. Click "Extract Emails"
5. View results in real-time
6. Export via Copy, .txt, or .csv

### Advanced Options

- **Grouping**: Group results by domain
- **Keywords**: Filter emails containing specific keywords
- **Sorting**: Auto-sort with smart threshold (default: 50,000 emails)
- **Memory Safety**: Auto-pause if memory threshold exceeded

## Architecture

```
┌─────────────┐     (Port)     ┌──────────────────┐
│  Popup UI   │◄───────────────►│ Background Worker│
│(popup/tsx)  │                 │  (service worker)│
└─────────────┘                 └──────────────────┘
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

- **Popup UI** - User interface for input, options, and results
- **Background Service Worker** - Message broker and offscreen lifecycle manager
- **Offscreen Page** - Hosts Web Worker and handles direct extraction for small inputs
- **Web Worker** - Heavy parsing in background thread with chunking and batching

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
