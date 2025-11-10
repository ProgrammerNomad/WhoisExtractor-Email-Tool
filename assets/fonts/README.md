# Fonts Directory

## Required Fonts

To use custom fonts locally (no CDN), download the Inter font family from Google Fonts:

### Download Instructions

1. Visit: https://fonts.google.com/specimen/Inter
2. Click "Get font" → "Download all"
3. Extract the downloaded ZIP file
4. Copy the following WOFF2 files to this directory:
   - `Inter-Regular.woff2` (400 weight)
   - `Inter-Medium.woff2` (500 weight)
   - `Inter-SemiBold.woff2` (600 weight)
   - `Inter-Bold.woff2` (700 weight)

### Alternative: Use Variable Font

For better performance, you can use the variable font version:
- `Inter-VariableFont.woff2`

### Current Fallback

The extension currently uses system fonts as fallback:
- `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`

Once you add the WOFF2 files, uncomment the `@font-face` declarations in `src/popup/index.css`.

## File Structure

```
assets/fonts/
├── Inter-Regular.woff2        (Download from Google Fonts)
├── Inter-Medium.woff2         (Download from Google Fonts)
├── Inter-SemiBold.woff2       (Download from Google Fonts)
├── Inter-Bold.woff2           (Download from Google Fonts)
└── README.md                  (This file)
```

## License

Inter font is licensed under the SIL Open Font License 1.1
https://github.com/rsms/inter/blob/master/LICENSE.txt
