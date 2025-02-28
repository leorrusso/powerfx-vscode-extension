# Changelog

All notable changes to the "Power FX Interpreter" extension will be documented in this file.

## [1.0.13] - 2025-02-28

### Fixed
- Improved syntax highlighting for interpolated strings (`$("...")`), making the embedded expressions properly visible with any theme
- Added proper highlighting for block comments (`/* ... */`)
- Removed mandatory theme requirement - syntax highlighting now works with all VS Code themes
- Completely reviewed and standardized TextMate grammar patterns for better compatibility:
  - Updated scope names to match VS Code standards
  - Improved function highlighting
  - Enhanced operator recognition
  - Fixed string interpolation

### Changed
- Made the Power FX theme optional instead of required
- Updated TextMate grammar to use standard scope naming conventions

## [1.0.12] - Previous release

- Initial features and functionality