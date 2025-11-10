# Privacy Policy - WhoisExtractor: Email Tool

**Last Updated:** November 10, 2025

## Overview

WhoisExtractor: Email Tool is a Chrome extension designed to extract email addresses from text and files **locally on your device**. We take your privacy seriously and are committed to transparency about how your data is handled.

## Data Processing

### Local Processing (Default)

- **All email extraction happens locally** in your browser
- **No data is sent to external servers** by default
- **No data is uploaded** to our servers or third parties
- Text and files you process **remain on your device**
- Extraction is performed using Web Workers in an isolated environment

### Storage

- Settings are stored locally using `chrome.storage.local`
- Storage is **encrypted** and **isolated** to this extension
- No personally identifiable information is collected
- Settings include:
  - Extraction preferences (sort, dedupe, separator)
  - Chunk size and performance thresholds
  - Keyword filters (if you choose to save them)
  - Privacy notice acknowledgment

## What We Do NOT Collect

- ❌ Email addresses you extract
- ❌ Text content you paste or upload
- ❌ File names or file contents
- ❌ Browsing history
- ❌ Personal information
- ❌ Analytics or usage tracking
- ❌ IP addresses

## Permissions Explained

### Required Permissions

- **`storage`** - Store your settings and preferences locally
- **`clipboardWrite`** - Allow you to copy extracted emails to clipboard

### Optional Permissions

- **`contextMenus`** - (Optional) Add "Extract selected text" to right-click menu
  - Only activated if you enable this feature
  - Only processes text you explicitly select and trigger

- **`nativeMessaging`** - (Optional) For future native helper for very large files
  - Only used if you explicitly opt-in to this feature
  - Requires separate native application installation

## User Control

### You Control Your Data

- **Extract locally** - Default mode, all processing in browser
- **Cancel anytime** - Stop processing and release memory immediately
- **Clear settings** - Reset all preferences to defaults
- **No account required** - No login, no user tracking

### Opt-In Features (Future)

If we add optional features that involve external processing:

- **Explicit opt-in required** - Clear consent requested before activation
- **Privacy modal** - Detailed explanation shown before first use
- **Clear retention policy** - Told exactly how long data is kept
- **OAuth authentication** - If cloud export is added, secure authentication
- **Consent stored** - Your opt-in preferences saved locally

## Third-Party Services

- **No third-party trackers** - No analytics services
- **No advertisements** - No ad networks
- **No external CDNs** - All assets bundled locally
- **No data sharing** - We never share your data

## Data Retention

- **Settings** - Stored until you uninstall the extension or clear data
- **Extracted emails** - Only displayed in session, never stored permanently
- **No logs** - We don't log your extraction activities

## Security

- **Content Security Policy** - Strict CSP prevents inline scripts and external resources
- **Isolated execution** - Web Workers run in isolated threads
- **No network requests** - Extension makes no network calls by default
- **Manifest V3** - Uses latest Chrome extension security model

## Children's Privacy

This extension is not directed at children under 13. We do not knowingly collect information from children under 13.

## Changes to This Policy

We may update this privacy policy to reflect:

- New optional features (with opt-in required)
- Changes in Chrome extension APIs
- User feedback and requests

We will notify you of significant changes via:

- Extension update notes
- In-app notification on first launch after update

## Your Rights

You have the right to:

- **Access** - View all settings stored locally
- **Delete** - Clear all data by uninstalling extension
- **Port** - Export your keyword filters and preferences
- **Object** - Choose not to use opt-in features

## Contact

For privacy questions or concerns:

- **GitHub Issues:** [https://github.com/ProgrammerNomad/WhoisExtractor-Email-Tool/issues](https://github.com/ProgrammerNomad/WhoisExtractor-Email-Tool/issues)
- **Email:** [Your contact email here]

## Open Source

This extension is open source. You can:

- **Review the code** on GitHub
- **Audit** how data is processed
- **Contribute** improvements
- **Fork** and modify for your needs

**Repository:** [https://github.com/ProgrammerNomad/WhoisExtractor-Email-Tool](https://github.com/ProgrammerNomad/WhoisExtractor-Email-Tool)

## Compliance

- **GDPR** - No personal data collected; local processing
- **CCPA** - No data sold or shared with third parties
- **Chrome Web Store Policies** - Fully compliant with extension policies

---

## Summary (TL;DR)

**100% local processing** - Your data never leaves your device  
**No tracking** - Zero analytics or telemetry  
**No accounts** - No login required  
**Open source** - Code is auditable  
**You control** - Cancel, clear, or export anytime  

**Questions?** Open an issue on GitHub or contact us directly.

---

**WhoisExtractor: Email Tool** - Privacy-First Email Extraction
