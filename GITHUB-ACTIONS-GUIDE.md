# 🤖 GitHub Actions - Automated App Builds

This guide shows you how to use GitHub Actions to automatically build Android APKs and iOS apps whenever you create a new release.

---

## ✨ What This Does

When you create a new release (e.g., v1.0.0), GitHub Actions will:

1. ✅ **Build Android APK** automatically
2. ✅ **Build iOS IPA** automatically
3. ✅ **Generate SHA256 checksums** for security
4. ✅ **Attach builds to the release** for download
5. ✅ **Make them publicly available** on your releases page

**Zero manual work needed!** Just create a release and GitHub builds everything.

---

## 🚀 Setup (One-Time)

### Step 1: Get Expo Access Token

1. **Login to Expo:**
   ```bash
   eas login
   ```

2. **Create an access token:**
   ```bash
   eas whoami
   ```
   Then visit: https://expo.dev/accounts/[your-account]/settings/access-tokens

3. **Create a new token:**
   - Name: `GitHub Actions`
   - Scope: Full access
   - Copy the token (you'll only see it once!)

### Step 2: Add Token to GitHub Secrets

1. Go to your GitHub repo:
   https://github.com/Dezirae-Stark/anonymous-tip-platform

2. Click **Settings** → **Secrets and variables** → **Actions**

3. Click **New repository secret**

4. Add secret:
   - Name: `EXPO_TOKEN`
   - Value: [paste your Expo token]
   - Click **Add secret**

### Step 3: Configure EAS Build

Make sure your `mobile-app/eas.json` is configured (already done):

```json
{
  "build": {
    "preview": {
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "android": {
        "buildType": "app-bundle"
      }
    }
  }
}
```

---

## 📱 How to Create a Release with Builds

### Option 1: Create Release via GitHub Web UI

1. Go to your repo: https://github.com/Dezirae-Stark/anonymous-tip-platform

2. Click **Releases** (right sidebar)

3. Click **Create a new release**

4. Fill in:
   - **Tag version**: `v1.0.0` (or any version)
   - **Release title**: `v1.0.0 - Initial Release`
   - **Description**: Release notes

5. Click **Publish release**

6. **GitHub Actions will automatically:**
   - Start building Android APK
   - Start building iOS app
   - Upload both to the release when done (15-25 min)

### Option 2: Create Release via Command Line

```bash
# Create and push a tag
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin v1.0.0

# Create release
gh release create v1.0.0 \
  --title "v1.0.0 - Initial Release" \
  --notes "First public release with Android & iOS apps"
```

GitHub Actions will automatically build and upload the apps!

---

## 🔍 Monitoring Builds

### View Build Progress

1. Go to **Actions** tab in your repo
2. Click on the running workflow
3. Watch the build progress in real-time

### Build Status

- ⏳ **Building:** Yellow spinner (takes 15-25 minutes)
- ✅ **Success:** Green checkmark
- ❌ **Failed:** Red X (check logs)

### Download Builds

After the workflow completes:
1. Go to your release page
2. You'll see:
   - `AnonymousTips-v1.0.0.apk` (Android)
   - `AnonymousTips-v1.0.0.ipa` (iOS)
   - `SHA256SUMS.txt` (Checksums)

---

## 📥 What Users Can Download

### Android APK
```
AnonymousTips-v1.0.0.apk
```
- Direct installation on Android devices
- Users must enable "Install from Unknown Sources"
- Fully functional app

### iOS IPA
```
AnonymousTips-v1.0.0.ipa
```
- For TestFlight distribution
- Or App Store submission
- Requires signing for installation

### Checksums
```
SHA256SUMS.txt
```
- Verify file integrity
- Security verification
- Build authenticity

---

## 🛠️ Manual Builds

You can also trigger builds manually without creating a release:

1. Go to **Actions** tab
2. Click **Build Apps (Manual)**
3. Click **Run workflow**
4. Select platform: Android, iOS, or both
5. Click **Run workflow**

Builds will be available as artifacts (downloadable for 30 days).

---

## 📋 GitHub Actions Workflows

### 1. `build-release.yml`
**Triggers:** When you create/publish a release
**Does:**
- Builds Android APK
- Builds iOS IPA
- Generates checksums
- Attaches all to the release

### 2. `build-manual.yml`
**Triggers:** Manual dispatch
**Does:**
- Builds selected platform(s)
- Saves as artifacts (not attached to release)

---

## 🔐 Security

### SHA256 Checksums

Every release includes a `SHA256SUMS.txt` file:

```
f9a8b7c6d5e4f3a2b1c0...  AnonymousTips-v1.0.0.apk
a1b2c3d4e5f6a7b8c9d0...  AnonymousTips-v1.0.0.ipa
```

Users can verify downloads:
```bash
# Verify APK
sha256sum -c SHA256SUMS.txt
```

### Token Security

- ✅ Expo token stored as GitHub secret
- ✅ Never exposed in logs
- ✅ Can be revoked anytime
- ✅ Scoped access only

---

## 📊 Build Times

Typical build times:

| Platform | Time | Size |
|----------|------|------|
| Android APK | 15-20 min | ~50 MB |
| iOS IPA | 20-25 min | ~40 MB |
| Both | 25-30 min | ~90 MB |

Builds run in parallel when possible.

---

## 🐛 Troubleshooting

### Build Fails: "No EXPO_TOKEN"

**Solution:** Add `EXPO_TOKEN` to GitHub secrets (see Setup Step 2)

### Build Fails: "EAS Build failed"

**Check:**
1. `eas.json` configuration
2. `app.json` has correct bundle ID
3. Build logs in Actions tab

### APK/IPA Not Attached to Release

**Possible causes:**
1. Build still running (wait 15-25 min)
2. Build failed (check Actions logs)
3. Token expired (regenerate Expo token)

### Want to Cancel a Build?

1. Go to Actions tab
2. Click the running workflow
3. Click "Cancel workflow"

---

## 💡 Tips & Best Practices

### Version Numbering

Use semantic versioning:
- `v1.0.0` - Major release
- `v1.1.0` - Minor update
- `v1.0.1` - Patch/bugfix

### Release Notes

Include in your releases:
```markdown
## What's New
- New feature X
- Fixed bug Y
- Improved performance Z

## Downloads
- Android: See APK below
- iOS: See IPA below (TestFlight or App Store)

## Checksums
See SHA256SUMS.txt for verification
```

### Pre-Release Testing

1. Use manual workflow to build test versions
2. Download from Artifacts
3. Test thoroughly
4. Then create official release

---

## 🎯 Example Release Workflow

### 1. Finish Development
```bash
# Commit your changes
git add .
git commit -m "Prepare v1.0.0 release"
git push
```

### 2. Create Release
```bash
# Tag the release
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin v1.0.0

# Create GitHub release
gh release create v1.0.0 \
  --title "v1.0.0 - First Public Release" \
  --notes "Initial release with full features"
```

### 3. Wait for Builds
- GitHub Actions automatically starts
- Builds Android APK (~15 min)
- Builds iOS IPA (~20 min)
- Attaches to release

### 4. Announce Release
```markdown
🎉 Anonymous Tips v1.0.0 is now available!

📱 Download:
- Android APK: https://github.com/Dezirae-Stark/anonymous-tip-platform/releases/tag/v1.0.0
- iOS IPA: https://github.com/Dezirae-Stark/anonymous-tip-platform/releases/tag/v1.0.0

🔒 Complete privacy for content creators
💰 Bitcoin, Lightning, Monero support
📱 Native Android & iOS apps
```

---

## 📱 Distribution Options

### Android APK

**Direct Download:**
1. Users download APK from GitHub releases
2. Enable "Unknown Sources" on Android
3. Install APK
4. ✅ Works immediately

**Google Play Store:**
1. Build with production profile
2. Upload to Play Console
3. Submit for review

### iOS IPA

**TestFlight:**
1. Download IPA from release
2. Upload to App Store Connect
3. Add to TestFlight
4. Send invite links

**App Store:**
1. Use production build
2. Submit via App Store Connect
3. Wait for review

---

## 🔄 Updating the App

When you want to release an update:

```bash
# 1. Update version in app.json
{
  "version": "1.1.0",
  "android": {
    "versionCode": 2
  },
  "ios": {
    "buildNumber": "1.1.0"
  }
}

# 2. Commit changes
git add .
git commit -m "Bump version to 1.1.0"
git push

# 3. Create new release
git tag -a v1.1.0 -m "Release v1.1.0"
git push origin v1.1.0

gh release create v1.1.0 \
  --title "v1.1.0 - Feature Update" \
  --notes "Added new features and bug fixes"

# 4. GitHub Actions builds automatically!
```

---

## 📈 Monitoring Usage

### Download Statistics

GitHub provides analytics for releases:
- View count
- Download count per asset
- Geographic distribution

Access via: **Insights** → **Traffic**

---

## 🎓 Advanced Usage

### Custom Build Profiles

Edit `eas.json` to add custom profiles:

```json
{
  "build": {
    "development": {
      "developmentClient": true
    },
    "staging": {
      "distribution": "internal"
    },
    "production": {
      "distribution": "store"
    }
  }
}
```

### Conditional Builds

Modify workflow to build only when certain files change:

```yaml
on:
  release:
    types: [published]
  push:
    paths:
      - 'mobile-app/**'
```

---

## ✅ Checklist

Before creating your first release:

- [ ] Expo token added to GitHub secrets
- [ ] `eas.json` configured
- [ ] `app.json` has correct bundle ID
- [ ] Version numbers updated
- [ ] Release notes prepared
- [ ] Tested manually

---

## 🎉 You're Ready!

Your repository now has:
✅ Automated Android APK builds
✅ Automated iOS IPA builds
✅ Automatic checksum generation
✅ Release asset uploads
✅ Public download links

**Just create a release and let GitHub do the work!** 🚀

---

## 📞 Need Help?

- **GitHub Actions Docs**: https://docs.github.com/en/actions
- **EAS Build Docs**: https://docs.expo.dev/build/introduction/
- **Issues**: https://github.com/Dezirae-Stark/anonymous-tip-platform/issues

---

**Automated builds by GitHub Actions** 🤖
**Built with ❤️ by Dezirae Stark** 🔒
