# 📱 Mobile App Build Guide

Complete guide for building Android APK and iOS app for the Anonymous Tipping Platform.

## Prerequisites

### Required Software

1. **Node.js** (v16 or higher)
   ```bash
   node --version
   ```

2. **Expo CLI** (Installed globally)
   ```bash
   npm install -g expo-cli eas-cli
   ```

3. **Expo Account** (Free)
   - Sign up at: https://expo.dev/signup
   - Required for building with EAS Build

### For Android Development
- Android Studio (optional, for local builds)
- Java JDK 11 or higher

### For iOS Development
- macOS with Xcode 13+ (required)
- Apple Developer Account ($99/year for App Store)

---

## Quick Start

### 1. Install Dependencies

```bash
cd mobile-app
npm install
```

### 2. Configure Backend URL

Edit `utils/api.js` and update the `API_BASE_URL`:

```javascript
// For local testing (Android emulator)
const API_BASE_URL = 'http://10.0.2.2:3000';

// For production
const API_BASE_URL = 'https://your-backend-domain.com';

// For testing on physical device
const API_BASE_URL = 'http://YOUR_COMPUTER_IP:3000';
```

### 3. Start Development Server

```bash
npm start
```

This opens Expo Dev Tools in your browser.

---

## Building Android APK

### Option 1: EAS Build (Recommended - Easiest)

EAS Build handles everything in the cloud. No Android Studio needed!

#### Step 1: Login to Expo
```bash
eas login
```

#### Step 2: Configure Project
```bash
eas build:configure
```

#### Step 3: Build APK
```bash
# Build preview APK (for testing)
eas build -p android --profile preview

# Build production APK
eas build -p android --profile production
```

The build process takes 10-20 minutes. You'll get a download link when complete!

#### Step 4: Download & Install
- Download the APK from the link provided
- Transfer to your Android device
- Enable "Install from Unknown Sources" in Android settings
- Install the APK

### Option 2: Local Build with Android Studio

#### Requirements
- Android Studio installed
- Android SDK configured
- Java JDK 11+

#### Steps

1. **Eject from Expo (if needed)**
   ```bash
   expo eject
   ```

2. **Build APK**
   ```bash
   cd android
   ./gradlew assembleRelease
   ```

3. **Find APK**
   ```
   android/app/build/outputs/apk/release/app-release.apk
   ```

### Option 3: Expo Go (Development Only)

For quick testing without building:

1. Install "Expo Go" app from Play Store
2. Run `npm start`
3. Scan QR code with Expo Go app

**Note:** This is only for development. Final app needs to be built.

---

## Building iOS App

### Prerequisites
- Mac computer with macOS
- Xcode 13 or higher
- Apple Developer Account ($99/year)

### Option 1: EAS Build (Recommended)

#### Step 1: Login to Expo
```bash
eas login
```

#### Step 2: Configure iOS Build
```bash
eas build:configure
```

#### Step 3: Build iOS App
```bash
# Build for internal testing (TestFlight)
eas build -p ios --profile preview

# Build for App Store
eas build -p ios --profile production
```

#### Step 4: Submit to App Store
```bash
eas submit -p ios
```

### Option 2: Local Build with Xcode

1. **Eject from Expo**
   ```bash
   expo eject
   ```

2. **Open in Xcode**
   ```bash
   cd ios
   open AnonymousTips.xcworkspace
   ```

3. **Configure Signing**
   - Select your project in Xcode
   - Go to "Signing & Capabilities"
   - Select your Apple Developer Team
   - Choose Bundle Identifier (e.g., com.anonymoustips.app)

4. **Build & Archive**
   - Product → Archive
   - Upload to App Store Connect

---

## App Store Submission

### Android (Google Play Store)

1. **Create Google Play Console Account** ($25 one-time fee)
   - https://play.google.com/console

2. **Prepare Store Listing**
   - App name: "Anonymous Tips"
   - Short description: "Privacy-first anonymous tipping platform"
   - Full description: (See marketing materials)
   - Screenshots: (1080x1920 recommended)
   - Icon: 512x512 PNG

3. **Upload APK/AAB**
   - Go to Play Console
   - Create new app
   - Upload your APK or App Bundle
   - Fill in all required information
   - Submit for review

4. **Review Process**
   - Usually takes 1-3 days
   - May ask for clarifications

### iOS (Apple App Store)

1. **Create App Store Connect Account**
   - https://appstoreconnect.apple.com
   - Requires Apple Developer Program ($99/year)

2. **Create App Listing**
   - App name: "Anonymous Tips"
   - Subtitle: "Privacy-First Tipping"
   - Privacy Policy URL: Required
   - Screenshots: Various sizes for different devices

3. **Upload Build**
   - Use EAS Build or Xcode
   - Build appears in TestFlight first
   - Move to App Store review

4. **Submit for Review**
   - Fill in App Review Information
   - Explain app functionality
   - Provide test credentials if needed

5. **Review Process**
   - Usually takes 1-7 days
   - More strict than Google Play
   - May require changes

---

## Testing

### On Android Device

1. **Enable Developer Options**
   - Settings → About Phone
   - Tap "Build Number" 7 times

2. **Enable USB Debugging**
   - Settings → Developer Options
   - Enable "USB Debugging"

3. **Connect Device & Run**
   ```bash
   npm run android
   ```

### On iOS Device

1. **Connect iPhone to Mac**

2. **Run on Device**
   ```bash
   npm run ios
   ```

3. **Trust Developer Certificate**
   - Settings → General → Device Management
   - Trust your developer certificate

---

## Troubleshooting

### Build Failures

**Problem:** "Build failed with error"
- Check EAS build logs
- Verify all dependencies are correct
- Ensure app.json configuration is valid

**Problem:** "Could not connect to development server"
- Check backend URL in `utils/api.js`
- Ensure backend server is running
- Try using your computer's IP address

### Runtime Errors

**Problem:** "Network request failed"
- Check API_BASE_URL configuration
- Verify backend is accessible from device
- Check CORS settings on backend

**Problem:** "Secure Store not available"
- Ensure app is built with Expo
- Check permissions in app.json

---

## Configuration Checklist

Before building for production:

- [ ] Update API_BASE_URL to production server
- [ ] Set proper app name and bundle ID
- [ ] Add app icon (1024x1024 PNG)
- [ ] Add splash screen
- [ ] Configure app permissions
- [ ] Test all payment methods
- [ ] Test on multiple devices
- [ ] Enable crash reporting
- [ ] Set up analytics (optional)
- [ ] Create privacy policy
- [ ] Create terms of service

---

## Performance Optimization

### Reducing APK Size

1. **Enable Proguard** (Android)
   ```json
   "android": {
     "enableProguard": true
   }
   ```

2. **Remove Unused Dependencies**
   ```bash
   npm prune
   ```

3. **Optimize Images**
   - Use WebP format
   - Compress images before adding

### Improving Performance

1. **Use Production Builds**
   - Always test with production builds
   - Dev builds are slower

2. **Optimize Images**
   - Use appropriate sizes
   - Lazy load when possible

3. **Minimize Re-renders**
   - Use React.memo for components
   - Optimize state management

---

## Distribution Options

### 1. Direct APK Distribution (Android)
- Host APK on your website
- Users download and install directly
- No Play Store approval needed
- Users must enable "Unknown Sources"

### 2. TestFlight (iOS)
- Beta testing platform
- Up to 10,000 testers
- 90-day testing period
- No App Store approval needed

### 3. App Stores (Recommended)
- Google Play Store
- Apple App Store
- Wider reach
- Better trust
- Automatic updates

### 4. Alternative Stores
- Amazon Appstore
- Samsung Galaxy Store
- F-Droid (for open source)

---

## Continuous Integration

### GitHub Actions Example

Create `.github/workflows/build.yml`:

```yaml
name: Build App

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '16'
      - run: npm install
      - run: eas build --platform android --non-interactive
```

---

## Security Considerations

1. **API Keys**
   - Never commit API keys to Git
   - Use environment variables
   - Use Expo's SecureStore for sensitive data

2. **Code Obfuscation**
   - Enable Proguard (Android)
   - Use code minification

3. **HTTPS Only**
   - Always use HTTPS for API calls
   - Never send sensitive data over HTTP

4. **Input Validation**
   - Validate all user inputs
   - Sanitize data before sending to backend

---

## Resources

- **Expo Documentation**: https://docs.expo.dev
- **EAS Build**: https://docs.expo.dev/build/introduction/
- **React Native**: https://reactnative.dev
- **Play Store Publishing**: https://developer.android.com/distribute
- **App Store Guidelines**: https://developer.apple.com/app-store/review/guidelines/

---

## Support

For issues or questions:
1. Check the documentation above
2. Review Expo forums
3. Check Stack Overflow
4. Open an issue on GitHub

---

**Your mobile app is ready to build!** 🚀📱
