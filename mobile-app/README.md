# 🔒 Anonymous Tips - Mobile App

Privacy-first anonymous tipping platform for content creators. Available for Android and iOS.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Platform](https://img.shields.io/badge/platform-Android%20%7C%20iOS-green)
![License](https://img.shields.io/badge/license-MIT-orange)

## Features

- 🔐 **Complete Privacy** - No tracking, no analytics, zero data collection
- 💰 **Multiple Payment Methods** - Bitcoin, Monero, Lightning, Venmo, CashApp, PayPal
- 🔗 **Anonymous Token Links** - Unique URLs with no identifying information
- 📱 **Easy Sharing** - One-tap sharing to X (Twitter), Instagram, etc.
- 🎨 **Beautiful UI** - Modern dark theme, intuitive design
- 📲 **QR Codes** - Generate QR codes for all payment methods
- 💾 **Secure Storage** - Save and manage multiple tip pages
- ⚡ **Fast & Lightweight** - Optimized performance

## Screenshots

[Add screenshots here]

## Download

### Android
- **Google Play Store**: [Coming Soon]
- **Direct APK**: [Download Link]

### iOS
- **App Store**: [Coming Soon]
- **TestFlight**: [Beta Link]

## Quick Start

### For Users

1. **Download & Install** the app
2. **Create Tip Page** - Enter your display name and payment methods
3. **Get Your Link** - Receive a unique anonymous URL
4. **Share on X/Twitter** - Post your link anywhere
5. **Receive Tips** - 100% private, no personal info exposed

### For Developers

See **[BUILD-GUIDE.md](./BUILD-GUIDE.md)** for complete build instructions.

#### Quick Setup

```bash
# Clone repo
cd mobile-app

# Install dependencies
npm install

# Start development server
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios

# Build APK (requires EAS CLI)
eas build -p android --profile preview
```

## Technology Stack

- **Framework**: React Native with Expo
- **Navigation**: React Navigation
- **Storage**: Expo SecureStore
- **QR Codes**: react-native-qrcode-svg
- **HTTP**: Axios
- **Backend**: Node.js REST API

## Project Structure

```
mobile-app/
├── App.js                 # Main app entry point
├── app.json               # Expo configuration
├── eas.json               # EAS Build configuration
├── package.json           # Dependencies
├── screens/               # App screens
│   ├── HomeScreen.js      # Landing page
│   ├── SetupScreen.js     # Create tip page
│   ├── TipPageScreen.js   # Show created link
│   ├── ViewTipScreen.js   # View tip page
│   └── MyLinksScreen.js   # Manage saved links
├── utils/                 # Utilities
│   └── api.js             # Backend API client
├── components/            # Reusable components
└── assets/                # Images, icons, etc.
```

## Configuration

### Backend URL

Edit `utils/api.js` to point to your backend:

```javascript
// Local testing (Android emulator)
const API_BASE_URL = 'http://10.0.2.2:3000';

// Production
const API_BASE_URL = 'https://your-domain.com';
```

### App Branding

Edit `app.json` to customize:
- App name
- Bundle identifier
- Icon and splash screen
- Color scheme
- Permissions

## Building

### Android APK

```bash
# Install EAS CLI
npm install -g eas-cli

# Login
eas login

# Build APK
eas build -p android --profile preview
```

### iOS App

```bash
# Build for TestFlight
eas build -p ios --profile preview

# Build for App Store
eas build -p ios --profile production
```

See [BUILD-GUIDE.md](./BUILD-GUIDE.md) for detailed instructions.

## Features in Detail

### 1. Create Anonymous Tip Pages

- Enter display name (pseudonym)
- Choose payment methods
- Enable/disable each method individually
- Add custom message

### 2. Privacy Levels

**High Privacy 🟢**
- Monero (XMR) - Untraceable transactions
- Bitcoin (BTC) - Pseudonymous
- Lightning Network - Off-chain privacy

**Low Privacy 🔴**
- Venmo - Exposes real name
- CashApp - Shows username
- PayPal - Links to email

### 3. Token-Based System

- Each tip page gets a unique token
- Tokens are cryptographically secure (128-bit)
- No personal data in URL
- Stored securely on device

### 4. Secure Storage

- Uses Expo SecureStore
- Encrypted key-value storage
- Survives app updates
- Per-device storage

## Privacy & Security

### What We DON'T Collect
- ❌ No personal information
- ❌ No tracking or analytics
- ❌ No IP addresses
- ❌ No usage statistics
- ❌ No device identifiers

### What We Store Locally
- ✅ Your created tip page tokens
- ✅ Display names you entered
- ✅ Creation dates

### Network Security
- ✅ HTTPS enforced for API calls
- ✅ No third-party SDKs
- ✅ Minimal permissions
- ✅ Secure credential storage

## Permissions

### Android
- `INTERNET` - Required for API calls
- `CAMERA` - Optional, for scanning QR codes

### iOS
- Camera Usage - Optional, for QR code scanning
- Photo Library - Optional, for saving QR codes

## Troubleshooting

### App Won't Start
```bash
# Clear cache
npm start --clear

# Reinstall dependencies
rm -rf node_modules
npm install
```

### Can't Connect to Backend
1. Check `API_BASE_URL` in `utils/api.js`
2. Ensure backend server is running
3. Use correct IP address for physical devices
4. Check firewall settings

### Build Failures
1. Run `eas build:configure` again
2. Check `app.json` for errors
3. Verify Expo account is set up
4. Review EAS build logs

## Development

### Prerequisites
- Node.js 16+
- Expo CLI
- EAS CLI (for builds)
- Android Studio (optional)
- Xcode (for iOS, macOS only)

### Setup Development Environment

```bash
# Install global tools
npm install -g expo-cli eas-cli

# Install dependencies
npm install

# Start development server
npm start
```

### Running on Device

#### Android
```bash
# Via USB
npm run android

# Via Expo Go
# 1. Install "Expo Go" from Play Store
# 2. Scan QR code from terminal
```

#### iOS
```bash
# Via USB (macOS only)
npm run ios

# Via Expo Go
# 1. Install "Expo Go" from App Store
# 2. Scan QR code from terminal
```

## Testing

### Manual Testing
1. Create tip page with all payment methods
2. Verify QR code generation
3. Test copy-to-clipboard
4. Test share functionality
5. Verify secure storage
6. Test offline behavior
7. Test on multiple devices

### Automated Testing
```bash
# Run tests (when implemented)
npm test
```

## Deployment

### App Store Checklist
- [ ] App icon (1024x1024)
- [ ] Screenshots for all device sizes
- [ ] Privacy policy URL
- [ ] Terms of service
- [ ] App description
- [ ] Keywords
- [ ] Age rating
- [ ] Contact information
- [ ] Support URL

### Pre-Launch
- [ ] Test on real devices
- [ ] Test all payment methods
- [ ] Verify backend connectivity
- [ ] Test error handling
- [ ] Check performance
- [ ] Review privacy policy
- [ ] Prepare marketing materials

## Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Roadmap

### v1.1 (Planned)
- [ ] Dark/light theme toggle
- [ ] Custom colors
- [ ] Payment amount suggestions
- [ ] Tipper messages
- [ ] Push notifications

### v2.0 (Future)
- [ ] Multi-language support
- [ ] Wallet integration
- [ ] Payment verification
- [ ] Analytics dashboard
- [ ] Team accounts

## Known Issues

None currently. Please report any issues on GitHub.

## License

MIT License - See LICENSE file for details

## Support

- **Documentation**: [BUILD-GUIDE.md](./BUILD-GUIDE.md)
- **Issues**: GitHub Issues
- **Email**: support@anonymoustips.com

## Credits

Built with:
- [React Native](https://reactnative.dev)
- [Expo](https://expo.dev)
- [React Navigation](https://reactnavigation.org)

---

**Made with ❤️ for privacy-conscious creators** 🔒

