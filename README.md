# NEXUS - Ransomware Detection Dashboard

Live Link : https://nexus-nine-coral.vercel.app
Github link: https://github.com/Urcodingbuddy/Nexus

![NEXUS](./public/placeholder-logo.svg)

A professional, full-featured ransomware detection application built with Next.js, React, and TypeScript. NEXUS provides real-time file scanning, threat analysis, and security monitoring with a sleek dark-themed UI.

---

## Table of Contents

- [Features](#features)
- [Quick Start](#quick-start)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [User Guide](#user-guide)
- [Project Structure](#project-structure)
- [Technology Stack](#technology-stack)
- [File Directory & Explanations](#file-directory--explanations)
- [Configuration](#configuration)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

---

## Features

✅ **Real-time File Scanning** - Upload and scan files for ransomware threats instantly  
✅ **Multiple Scan Modes** - Quick Scan for speed, Deep Scan for thorough analysis  
✅ **Signature Detection** - Pattern matching against known ransomware indicators  
✅ **Heuristic Analysis** - Advanced behavioral analysis and threat scoring  
✅ **Scan History** - Persistent history of all scanned files with timestamps  
✅ **Customizable Settings** - Enable auto-scan, notifications, and scan preferences  
✅ **Professional Dashboard** - Dark theme with neon green accents and terminal aesthetic  
✅ **Persistent Storage** - All data saved to browser localStorage for session recovery  
✅ **Threat Notifications** - Custom toast notifications for all scan results and actions  
✅ **Statistics Tracking** - Real-time metrics showing total scans, threats blocked, and clean files  

---

## Quick Start

### Installation

#### Requirements
- **Node.js** 18.17.0 or higher
- **npm** (Node Package Manager) or **pnpm**

#### Step 1: Clone or Download the Project

\`\`\`bash
# If you have Git installed:
git clone <repository-url>
cd ransomware-detection-app

# Or download the ZIP file and extract it
\`\`\`

#### Step 2: Install Dependencies

Using npm:
\`\`\`bash
npm install
\`\`\`

Or using pnpm (faster alternative):
\`\`\`bash
pnpm install
\`\`\`

#### Step 3: Verify Installation

Check that all files are in place:
\`\`\`bash
ls -la
# You should see: app/, components/, lib/, public/, node_modules/, package.json, etc.
\`\`\`

### Running the Application

#### Development Mode (Recommended for Testing)

\`\`\`bash
npm run dev
\`\`\`

The application will start at `http://localhost:3000`

#### Production Build

\`\`\`bash
npm run build
npm start
\`\`\`

#### Stopping the Server

Press `Ctrl+C` in your terminal to stop the development server.

---

## User Guide

### Dashboard Overview

The main dashboard displays:
- **System Status** - Current threat level (LOW, MEDIUM, HIGH)
- **Threat Level Indicator** - Real-time risk assessment
- **Last Scan Time** - Timestamp of most recent file scan

### Scanning Files

#### Method 1: Drag and Drop
1. Go to the **Dashboard** tab
2. Locate the "THREAT ANALYSIS" section
3. Drag your file directly onto the upload area
4. Scanning begins automatically

#### Method 2: Click to Browse
1. Go to the **Dashboard** tab
2. Click the upload icon in the "THREAT ANALYSIS" section
3. Select a file from your computer
4. Click "INITIATE SCAN" button
5. Wait for scan to complete (8-25 seconds depending on scan mode)

#### Supported File Types
- Executables: `.exe`, `.dll`, `.scr`
- Scripts: `.bat`, `.cmd`, `.vbs`, `.js`
- Archives: `.zip`, `.rar`, `.7z`
- Documents: `.pdf`, `.docx`, `.xlsx`
- All other file types

### Understanding Scan Results

After a scan completes, you'll see:
- **Threat Status**: GREEN (Clean) or RED (Threat Detected)
- **Risk Score**: 0-100 scale (0 = safe, 100 = critical)
- **Details**: Specific threats or suspicious patterns found
- **File Information**: File name, size, and scan timestamp

#### Risk Score Interpretation
- **0-20**: Safe - No threats detected
- **21-40**: Low Risk - Minor suspicious indicators
- **41-70**: Medium Risk - Multiple warning signs
- **71-100**: High Risk/Threat - Immediate action recommended

### Using the History Tab

1. Click **History** in the navigation menu
2. View all scanned files with their:
   - Scan timestamp
   - File name
   - Threat status
   - Risk score
   - File size

#### Clear Scanning History

1. Click the **"Clear History"** button at the top
2. A confirmation dialog will appear
3. Click **"Confirm"** to permanently delete all scan records
4. A success notification confirms the action

**Note**: This action cannot be undone. All scan data will be permanently removed.

### Configuring Settings

1. Click **Settings** in the navigation menu
2. Adjust your preferences:

#### Auto-Scan
- **Toggle ON**: Files are scanned immediately when uploaded
- **Toggle OFF**: You must click "INITIATE SCAN" manually
- **Default**: OFF

#### Notification Preferences
- **Toggle ON**: Receive toast notifications for all actions
- **Toggle OFF**: Run silently without notifications
- **Default**: ON

#### Scan Mode Selection
- **Quick Scan**: Fast analysis (8-12 seconds)
  - Basic extension and signature checking
  - Lower system resource usage
  - Recommended for quick checks
  
- **Deep Scan**: Thorough analysis (15-25 seconds)
  - Comprehensive content inspection
  - Heuristic pattern analysis
  - Recommended for critical files

#### Save Settings
- All settings are saved **automatically**
- Settings persist across browser sessions
- A success notification confirms each change

---

## Project Structure
<img width="13939" height="3460" alt="Nexona" src="https://github.com/user-attachments/assets/57a297f6-3683-47d2-b78f-aed7f13f28a5" />


## File Directory & Explanations

### Core Application Files

#### `app/layout.tsx`
- **Purpose**: Root layout component that wraps all pages
- **Contains**: 
  - HTML structure and metadata
  - Theme provider setup
  - Global font configuration
  - All pages inherit this layout
- **Editable**: Only if you need to change site metadata or add global providers

#### `app/globals.css`
- **Purpose**: Global styles and CSS custom properties
- **Contains**:
  - Tailwind CSS imports
  - CSS variables for colors and spacing
  - Theme definitions (dark mode)
  - Animation keyframes
- **Editable**: YES - Update colors, fonts, or add new theme variables here

#### `app/page.tsx`
- **Purpose**: Dashboard/Home page
- **Contains**:
  - System status cards
  - Threat analysis section
  - File upload interface
  - Statistics display
- **Editable**: YES - To customize dashboard layout or add new sections

#### `app/history/page.tsx`
- **Purpose**: Scan history viewing and management page
- **Contains**:
  - List of all previously scanned files
  - Clear history button with confirmation
  - Scan result details (timestamp, risk score, status)
- **Editable**: YES - To modify history display or add filtering

#### `app/settings/page.tsx`
- **Purpose**: User settings and preferences configuration
- **Contains**:
  - Auto-scan toggle
  - Notification preferences
  - Scan mode selection (Quick/Deep)
  - Settings descriptions and explanations
- **Editable**: YES - To add new settings or customize options

---

### Component Files

#### `components/header.tsx`
- **Purpose**: Navigation header with tab switching
- **Features**:
  - Dashboard, History, Settings navigation
  - Active tab highlighting
  - Uses Next.js Link for routing
  - Professional branding with NEXUS logo
- **Props**: None
- **State**: Uses `usePathname()` to track active page

#### `components/threat-analysis.tsx`
- **Purpose**: Main file upload and scanning interface
- **Features**:
  - Drag-and-drop file upload
  - Click-to-browse file selection
  - Real-time scan progress
  - Threat detection display with status
  - SVG upload icon
  - Scan/Reset buttons
- **Props**: None
- **State**: Manages file selection, scanning status, and results

#### `components/scan-history.tsx`
- **Purpose**: Display list of scanned files from history
- **Features**:
  - Renders scan results as cards
  - Shows threat status (GREEN/RED)
  - Risk score visualization
  - Timestamp display
  - File information
- **Props**: None (reads from localStorage)
- **State**: Fetches history on component mount

#### `components/statistics.tsx`
- **Purpose**: Display scanning statistics
- **Features**:
  - Total scans counter
  - Threats blocked counter
  - Clean files counter
  - Real-time updates
- **Props**: None
- **State**: Reads from localStorage stats

#### `components/status-cards.tsx`
- **Purpose**: System status indicators
- **Features**:
  - System Status (ONLINE/OFFLINE)
  - Threat Level (LOW/MEDIUM/HIGH)
  - Last Scan timestamp
  - Real-time indicators
- **Props**: None
- **State**: Reads from localStorage

#### `components/icons.tsx`
- **Purpose**: Custom SVG icon components
- **Exports**:
  - `UploadIcon`: File upload SVG
  - `CheckIcon`: Verification/success checkmark
  - `AlertIcon`: Warning/threat indicator
  - Other utility icons
- **Usage**: Used throughout the app instead of emojis
- **Editable**: YES - To modify icon designs or add new icons

#### `components/notification-popup.tsx`
- **Purpose**: Toast notification system
- **Features**:
  - Custom popup notifications
  - Success/error/warning message types
  - Auto-dismiss after 4 seconds
  - Stacking multiple notifications
  - Custom styling with animations
- **Methods**:
  - `showNotification(message, type, duration)`
- **Usage**: Called when scans complete, settings change, or errors occur

#### `components/confirmation-dialog.tsx`
- **Purpose**: Reusable confirmation modal
- **Features**:
  - Modal dialog with custom message
  - Confirm/Cancel buttons
  - Danger state styling (red for destructive actions)
  - Prevents accidental data loss
- **Props**:
  - `isOpen`: Boolean to control dialog visibility
  - `title`: Dialog title
  - `message`: Confirmation message
  - `isDangerous`: If true, shows red styling
  - `onConfirm`: Callback when confirmed
  - `onCancel`: Callback when cancelled

#### `components/theme-provider.tsx`
- **Purpose**: Dark mode theme configuration
- **Contains**:
  - next-themes provider setup
  - Dark mode initialization
  - Theme context
- **Editable**: Only if changing theme configuration

#### `components/layout-wrapper.tsx`
- **Purpose**: Wraps page content with consistent styling
- **Features**:
  - Consistent padding and spacing
  - Background color
  - Container max-width
- **Usage**: Wraps all page content

---

### Utility & Logic Files

#### `lib/threat-detector.ts`
- **Purpose**: Ransomware detection engine
- **Main Function**: `analyzeFile(file, scanMode)`
  - **Input**: File object, scan mode ("quick" or "deep")
  - **Output**: DetectionResult object with:
    - `threat`: Boolean indicating if file is dangerous
    - `riskScore`: 0-100 risk assessment
    - `details`: Array of detected issues
    - `fileName`: Original file name
    - `fileSize`: File size in bytes

- **Detection Methods**:
  1. **File Extension Analysis**: Checks against dangerous file types (.exe, .dll, .bat, etc.)
  2. **Magic Byte Detection**: Examines file signatures (PE headers, PDF headers, etc.)
  3. **Filename Scanning**: Looks for ransomware-related keywords (ransom, crypt, locked, etc.)
  4. **Deep Content Inspection**: (Only in Deep Scan mode)
     - Scans for PowerShell/command execution patterns
     - Detects encryption routines
     - Identifies code injection attempts
     - Finds payment demand indicators
  5. **Heuristic Analysis**: 
     - Double extension detection
     - Suspicious file size patterns
     - System file access patterns

- **Scan Modes**:
  - **Quick Scan** (8-12 seconds): Extension, signature, and filename checks
  - **Deep Scan** (15-25 seconds): Includes content inspection and heuristics

- **Editable**: YES - To add new detection patterns or refine algorithms

#### `lib/storage.ts`
- **Purpose**: Browser localStorage management
- **Interface**: `StorageManager` object with methods:

  - **Settings Management**:
    - `getSettings()`: Returns current settings object
    - `saveSettings(settings)`: Saves settings to localStorage
  
  - **Scan History Management**:
    - `getScanHistory()`: Returns array of scan results
    - `addScanResult(result)`: Adds new scan to history
    - `clearHistory()`: Deletes all scan history
    - `getStats()`: Returns statistics (total, threats, clean)

- **Storage Structure**:
  - `nexus_settings`: User preferences (auto-scan, notifications, scan mode)
  - `nexus_scan_history`: Array of all scan results (up to 100 kept)

- **Data Persistence**:
  - All data survives browser reload
  - Data persists across multiple sessions
  - Limited to 5-10MB per domain (browser default)

- **Editable**: YES - To add new storage types or change data structure

#### `lib/utils.ts`
- **Purpose**: Utility functions and helpers
- **Contains**:
  - `cn()`: CSS class merging utility
  - File formatting functions
  - Type conversion utilities
- **Usage**: Used throughout components for class names and formatting

#### `hooks/use-toast.ts`
- **Purpose**: Custom hook for toast notifications
- **Methods**: `useToast()` returns notification control methods
- **Usage**: Called in components to show notifications

#### `hooks/use-mobile.ts`
- **Purpose**: Mobile device detection hook
- **Returns**: Boolean indicating if device is mobile
- **Usage**: For responsive UI adjustments

---

### Configuration Files

#### `package.json`
- Lists all project dependencies
- Defines npm scripts (dev, build, start, lint)
- Specifies Node version requirements
- **Key Dependencies**:
  - `next`: React framework
  - `react`: UI library
  - `tailwindcss`: Styling
  - `lucide-react`: Icons
  - `@radix-ui/*`: Accessible UI components

#### `tsconfig.json`
- TypeScript configuration
- Compiler options and type checking rules
- Path aliases for imports
- **Recommended**: Don't modify unless you know TypeScript well

#### `next.config.mjs`
- Next.js configuration
- Build and development settings
- Environment variable configuration
- **Editable**: Only if adding new Next.js features

#### `postcss.config.mjs` & `tailwind.config.js`
- CSS processing configuration
- Tailwind CSS theme and plugins
- **Editable**: To customize Tailwind styles or add plugins

---

## Technology Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| **Next.js** | React framework & routing | 16.0.0 |
| **React** | UI library | 19.2.0 |
| **TypeScript** | Type safety | Latest |
| **Tailwind CSS** | Utility-first CSS | 4.1.9 |
| **Radix UI** | Accessible components | Latest |
| **Lucide React** | Icon library | 0.454.0 |
| **React Hook Form** | Form management | 7.60.0 |
| **Zod** | Data validation | 3.25.76 |

---

## Configuration

### Environment Variables

NEXUS doesn't require environment variables for basic functionality, but you can add them for advanced features.

**Optional Variables** (add to `.env.local` if needed):
\`\`\`
NEXT_PUBLIC_APP_NAME=NEXUS
NEXT_PUBLIC_APP_VERSION=1.0.0
\`\`\`

### localStorage Keys

The application stores data in browser localStorage:
- `nexus_settings` - User settings and preferences
- `nexus_scan_history` - Array of scan results

### Customization

#### Change Color Scheme
Edit `app/globals.css`:
\`\`\`css
:root {
  --primary: #00ff41;      /* Neon green */
  --secondary: #1a1f2e;    /* Dark blue */
  --danger: #ff0055;       /* Red */
}
\`\`\`

#### Adjust Risk Score Thresholds
Edit `lib/threat-detector.ts`:
\`\`\`typescript
// Change threat detection threshold
threat: riskScore > 40,  // Currently 40, can adjust
\`\`\`

#### Add New Ransomware Signatures
Edit `lib/threat-detector.ts` and add to `RANSOMWARE_SIGNATURES` array:
\`\`\`typescript
{ pattern: /your-pattern/i, name: "Your detection name" }
\`\`\`

---

## Troubleshooting

### Issue: Application won't start

**Solution**:
\`\`\`bash
# Clear node modules and reinstall
rm -rf node_modules
npm install

# Then try running again
npm run dev
\`\`\`

### Issue: localStorage not saving data

**Cause**: Private browsing mode or browser storage disabled  
**Solution**:
- Disable private browsing
- Enable localStorage in browser settings
- Check browser console for errors

### Issue: Scans not detecting threats

**Possible Causes**:
- File doesn't match known signatures
- Risk score is below threshold (currently 40)
- Deep Scan is disabled in settings

**Solution**:
- Enable Deep Scan in Settings for more thorough analysis
- Try scanning known malware samples

### Issue: History not appearing

**Cause**: No scans have been performed yet  
**Solution**: Scan a file first, then check History tab

### Issue: Settings not persisting

**Cause**: Browser clearing localStorage on close  
**Solution**:
- Check browser privacy settings
- Don't enable "Clear cache on exit"
- Use a different browser

### Issue: File upload not working

**Solution**:
1. Refresh the page
2. Check file size (should work with files up to 100MB)
3. Try a different file
4. Check browser console for errors

### Getting Help

**For issues**:
1. Check the console for error messages (F12 → Console tab)
2. Clear browser cache and localStorage
3. Try in a different browser
4. Check file permissions and size

---

## Advanced Features (For Developers)

### Adding Custom Detection Rules

Edit `lib/threat-detector.ts`:

\`\`\`typescript
const CUSTOM_SIGNATURES = [
  { pattern: /your-malware-name/i, name: "Custom detection" },
  // Add more patterns...
]

// Then include in analysis:
CUSTOM_SIGNATURES.forEach((sig) => {
  if (sig.pattern.test(fileName)) {
    riskScore += 15
    details.push(sig.name)
  }
})
\`\`\`

### Extending Scan Modes

Add new scan mode in `lib/threat-detector.ts`:

\`\`\`typescript
export type ScanMode = "quick" | "deep" | "extreme"

// Add extreme scan logic...
\`\`\`

### Integration with Backend

To connect to a Python backend or external API:

1. Create API route: `app/api/scan/route.ts`
2. Send file to backend for analysis
3. Return results to frontend

---

## Contributing

Want to improve NEXUS? Great!

1. Create a new branch: `git checkout -b feature/your-feature`
2. Make your changes
3. Test thoroughly
4. Commit with clear messages: `git commit -m "Add feature: description"`
5. Push and create a pull request

---

## License

This project is open source and available under the MIT License.

---

## Support & Feedback

- Found a bug? Report it in the issues section
- Have a feature request? Suggest it!
- Questions? Check the FAQ or documentation

---

**NEXUS v1.0.0** - Professional Ransomware Detection  
Built with ❤️ for cybersecurity professionals
