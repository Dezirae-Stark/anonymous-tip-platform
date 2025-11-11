# 🔒 Anonymous Tipping Platform

**Privacy-first anonymous tipping platform for content creators**

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Platform](https://img.shields.io/badge/platform-Web%20%7C%20Android%20%7C%20iOS-green)
![License](https://img.shields.io/badge/license-MIT-orange)

---

## 👤 Author & Architect

**Dezirae Stark** ([@Dezirae-Stark](https://github.com/Dezirae-Stark))

*Chief Architect & Developer*

This entire platform was architected and designed by Dezirae Stark, created to solve the privacy problems inherent in traditional payment platforms like Venmo and Cash App.

---

## 🌟 The Problem This Solves

Traditional tipping platforms expose your:
- ❌ Real name
- ❌ Username/handle
- ❌ Transaction history
- ❌ Profile pictures
- ❌ Social connections

**This platform provides complete anonymity** using token-based links and privacy-focused payment methods.

---

## ✨ Features

### 🔐 Complete Privacy
- Zero tracking or analytics
- No personal data collection
- Anonymous token-based links
- No IP logging
- Secure headers enabled

### 💰 Multiple Payment Methods
- **High Privacy**: Bitcoin, Lightning Network, Monero (XMR)
- **Traditional**: Venmo, CashApp, PayPal (with privacy warnings)

### 📱 Cross-Platform
- **Web App**: Create and share tip pages via browser
- **Mobile Apps**: Native Android & iOS apps
- **Token System**: Unique, secure, anonymous URLs

### 🎨 Beautiful UI
- Modern dark theme
- Responsive design
- QR code generation for all payment methods
- Intuitive user experience

---

## 🚀 Quick Start

### Web Application

```bash
# Install dependencies
npm install

# Start server
node server.js

# Visit http://localhost:3000
```

### Mobile Apps

```bash
cd mobile-app

# Setup
./setup.sh

# Start development
npm start

# Build Android APK
./build-android.sh

# Build iOS app
./build-ios.sh
```

See [mobile-app/BUILD-GUIDE.md](mobile-app/BUILD-GUIDE.md) for detailed instructions.

---

## 📂 Project Structure

```
anonymous-tip-platform/
├── 🌐 Web Application
│   ├── server.js              # Node.js backend
│   ├── public/                # Frontend
│   │   ├── setup.html         # Create tip page
│   │   ├── tip.html           # View tip page
│   │   └── index.html         # Legacy page
│   ├── data/                  # Token storage
│   └── config/                # Configuration
│
├── 📱 Mobile Apps (React Native)
│   ├── App.js                 # Main app
│   ├── screens/               # 5 app screens
│   │   ├── HomeScreen.js
│   │   ├── SetupScreen.js
│   │   ├── TipPageScreen.js
│   │   ├── ViewTipScreen.js
│   │   └── MyLinksScreen.js
│   ├── utils/api.js           # Backend API
│   ├── build-android.sh       # Android build
│   ├── build-ios.sh           # iOS build
│   └── BUILD-GUIDE.md         # Build docs
│
└── 📚 Documentation
    ├── README.md              # This file
    ├── TOKEN-SYSTEM.md        # Token architecture
    └── MOBILE-APP-COMPLETE.md # Mobile app docs
```

---

## 🔐 How It Works

### 1. Create Tip Page
User enters their payment details privately (display name + payment methods)

### 2. Generate Token
System creates a unique 128-bit cryptographic token

### 3. Share Anonymous Link
User gets a link like: `yoursite.com/tip/abc123xyz`

### 4. Complete Anonymity
Visitors see ONLY payment methods - zero personal info

---

## 💻 Technology Stack

### Backend
- Node.js
- HTTP Module
- Crypto (token generation)
- File-based storage

### Frontend (Web)
- Vanilla JavaScript
- HTML5/CSS3
- QRCode.js

### Mobile Apps
- React Native
- Expo
- React Navigation
- Expo SecureStore
- Axios

---

## 🎯 Use Cases

### Content Creators
- Share anonymous tip links on X (Twitter)
- Protect your identity while accepting tips
- Support multiple payment methods

### Privacy Advocates
- Maintain complete anonymity
- No surveillance capitalism
- Self-hosted solution

### Crypto Enthusiasts
- Accept Bitcoin, Lightning, Monero
- QR codes for easy payments
- Privacy-focused by design

---

## 🛡️ Security Features

### What We DON'T Collect
❌ Personal information
❌ Analytics or tracking
❌ IP addresses
❌ Device fingerprints
❌ Usage statistics

### What We DO
✅ Secure token generation (crypto.randomBytes)
✅ HTTPS enforcement
✅ Secure headers (no XSS, clickjacking protection)
✅ No third-party scripts
✅ Encrypted storage (mobile)

---

## 📱 Mobile App Features

- **5 Beautiful Screens** - Home, Setup, Tip Page, View Tip, My Links
- **Secure Storage** - Encrypted credential storage
- **QR Codes** - Generate QR for all payment methods
- **Share Function** - Native sharing to any platform
- **Offline Support** - Save and manage links locally
- **Cross-Platform** - Same codebase for Android & iOS

---

## 🎨 Design Philosophy

**Privacy First** - Every design decision prioritizes user privacy

**Simplicity** - Easy to use, no technical knowledge required

**Transparency** - Open source, auditable code

**Self-Hosted** - You control your data

---

## 📦 Deployment

### Web App

#### Local/Development
```bash
node server.js
```

#### Production (with PM2)
```bash
npm install -g pm2
pm2 start server.js --name "anonymous-tips"
pm2 startup
pm2 save
```

#### Cloud Platforms
- **Vercel**: `vercel deploy`
- **Railway**: Connect Git repo
- **Render**: Auto-deploy from GitHub
- **Your VPS**: Use PM2 or systemd

### Mobile Apps

#### Android
- Build APK with EAS Build
- Distribute via Google Play Store
- Or direct APK distribution

#### iOS
- Build with EAS Build
- TestFlight for beta testing
- Submit to App Store

See [BUILD-GUIDE.md](mobile-app/BUILD-GUIDE.md) for complete instructions.

---

## 🌍 Payment Methods

### High Privacy 🟢

**Monero (XMR)** - 🏆 BEST PRIVACY
- Completely anonymous by default
- Untraceable transactions
- No public ledger

**Bitcoin (BTC)** - Good Privacy
- Pseudonymous
- Use new addresses for each payment
- Compatible with privacy wallets

**Lightning Network** - Fast & Private
- Instant payments
- Lower fees
- Enhanced privacy

### Traditional Methods 🔴

**Venmo / CashApp / PayPal** - Lower Privacy
- ⚠️ Exposes personal information
- Convenience vs. privacy tradeoff
- Clearly marked with warnings

---

## 📊 Comparison

| Feature | Venmo/Cash App | This Platform |
|---------|----------------|---------------|
| Exposes real name | ❌ Yes | ✅ No |
| Shows transaction history | ❌ Yes | ✅ No |
| Requires account | ❌ Yes | ✅ No |
| Tracks users | ❌ Yes | ✅ No |
| Anonymous payments | ❌ No | ✅ Yes |
| Self-hosted | ❌ No | ✅ Yes |
| Multiple payment methods | ❌ Limited | ✅ Unlimited |
| Mobile apps | ✅ Yes | ✅ Yes |

---

## 🛠️ API Documentation

### Create Tip Page
```http
POST /api/create-tip-page
Content-Type: application/json

{
  "displayName": "Anonymous Creator",
  "message": "Support my work",
  "paymentMethods": {
    "bitcoin": {
      "enabled": true,
      "address": "bc1..."
    }
  }
}

Response:
{
  "success": true,
  "token": "abc123xyz..."
}
```

### Get Tip Page Data
```http
GET /api/tip/{token}

Response:
{
  "success": true,
  "displayName": "Anonymous Creator",
  "message": "Support my work",
  "paymentMethods": { ... }
}
```

### View Tip Page
```http
GET /tip/{token}

Returns: HTML tip page
```

---

## 🚀 Roadmap

### v1.1 (In Progress)
- [ ] Theme customization (dark/light)
- [ ] Custom brand colors
- [ ] Payment amount suggestions
- [ ] Tipper messages

### v2.0 (Planned)
- [ ] Multi-language support
- [ ] Wallet integrations
- [ ] Payment verification
- [ ] Analytics dashboard (privacy-respecting)
- [ ] Team accounts

### v3.0 (Future)
- [ ] Browser extension
- [ ] Desktop apps
- [ ] API webhooks
- [ ] Advanced customization

---

## 🤝 Contributing

Contributions are welcome! This is an open-source project.

### How to Contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow existing code style
- Add tests for new features
- Update documentation
- Respect privacy-first principles

---

## 📄 License

MIT License - See [LICENSE](LICENSE) file for details

Copyright (c) 2025 Dezirae Stark

---

## 🙏 Acknowledgments

- Built with privacy as the top priority
- Inspired by the need for anonymous tipping on social media
- Designed to protect content creators' identities

---

## 📞 Contact & Support

- **GitHub**: [@Dezirae-Stark](https://github.com/Dezirae-Stark)
- **Issues**: [GitHub Issues](https://github.com/Dezirae-Stark/anonymous-tip-platform/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Dezirae-Stark/anonymous-tip-platform/discussions)

---

## ⭐ Star This Repo

If you find this project useful, please consider giving it a star! It helps others discover this privacy-focused solution.

---

## 🔐 Privacy Commitment

This platform was created with one mission: **Protect creator privacy**

We believe that accepting tips should not require exposing your personal information to the world. This platform enables true anonymous tipping while giving you full control over your data.

---

**Built with ❤️ by Dezirae Stark for privacy-conscious creators** 🔒

