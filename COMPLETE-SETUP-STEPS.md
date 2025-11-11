# 🚀 Complete Setup Steps - Do This Now!

## Current Status

✅ Workflow files are created locally
✅ Documentation is complete
❌ Workflows need to be uploaded to GitHub (requires browser)
❌ Expo token needs to be added (requires browser)
❌ First release needs to be created

---

## Step-by-Step Instructions

### Step 1: Upload Workflow Files to GitHub (5 minutes)

Since the GitHub CLI token needs additional permissions, let's upload the workflows via the web interface:

1. **Go to your repository:**
   https://github.com/Dezirae-Stark/anonymous-tip-platform

2. **Create the workflows directory:**
   - Click "Add file" → "Create new file"
   - In the filename field, type: `.github/workflows/build-release.yml`
   - This will create the directory structure

3. **Add build-release.yml:**
   ```yaml
   # Copy the contents from: anonymous-tip-platform/.github/workflows/build-release.yml
   # Or use this command to view it:
   cat .github/workflows/build-release.yml
   ```

   Paste the entire content and click "Commit new file"

4. **Add build-manual.yml:**
   - Click "Add file" → "Create new file"
   - Filename: `.github/workflows/build-manual.yml`
   - Copy contents from `.github/workflows/build-manual.yml`
   - Click "Commit new file"

5. **Verify workflows:**
   - Go to the "Actions" tab in your repo
   - You should see the workflows listed

---

### Step 2: Get Expo Access Token (3 minutes)

1. **Login to Expo:**
   ```bash
   npx eas-cli login
   # Or if already logged in:
   npx eas-cli whoami
   ```

2. **Create access token:**
   - Visit: https://expo.dev/accounts/[your-account]/settings/access-tokens
   - Click "Create Token"
   - Name: `GitHub Actions`
   - Scope: Full access
   - Click "Create"
   - **Copy the token** (you'll only see it once!)

---

### Step 3: Add Expo Token to GitHub Secrets (2 minutes)

1. **Go to repository settings:**
   https://github.com/Dezirae-Stark/anonymous-tip-platform/settings/secrets/actions

2. **Add new secret:**
   - Click "New repository secret"
   - Name: `EXPO_TOKEN`
   - Value: [paste your Expo access token]
   - Click "Add secret"

3. **Verify:**
   - You should see `EXPO_TOKEN` listed in secrets

---

### Step 4: Create First Release (2 minutes)

**Option A: Via GitHub Web UI (Easiest)**

1. Go to: https://github.com/Dezirae-Stark/anonymous-tip-platform/releases

2. Click "Create a new release"

3. Fill in:
   - **Tag version**: `v1.0.0`
   - **Release title**: `v1.0.0 - Initial Release`
   - **Description**:
     ```markdown
     🎉 First public release of Anonymous Tips Platform!

     ## Downloads
     GitHub Actions will automatically build and attach:
     - Android APK (~15-20 minutes)
     - iOS IPA (~20-25 minutes)
     - SHA256 checksums

     Check back in ~25 minutes for the downloadable files!

     ## Features
     ✨ Complete anonymous tipping platform
     ✨ Web + Android + iOS apps
     ✨ Bitcoin, Lightning, Monero support
     ✨ Venmo, CashApp, PayPal integration
     ✨ Zero tracking, complete privacy
     ✨ Token-based anonymous links

     ## What's Included
     - Web application (Node.js backend + vanilla JS frontend)
     - React Native mobile app for Android & iOS
     - Complete documentation
     - Build scripts
     - Privacy-first architecture

     ## Installation

     ### Android
     1. Download the APK file (will appear below when build completes)
     2. Enable "Install from Unknown Sources" in Android settings
     3. Install the APK
     4. Open the app and create your anonymous tip page!

     ### iOS
     1. Download the IPA file (will appear below when build completes)
     2. Use for TestFlight distribution or App Store submission
     3. Or sideload with tools like AltStore

     ## Technology Stack
     - Backend: Node.js
     - Mobile: React Native + Expo
     - Storage: File-based tokens, encrypted mobile storage
     - Build: EAS Build (automated via GitHub Actions)

     ## Privacy & Security
     - No personal data collection
     - No tracking or analytics
     - 128-bit cryptographic tokens
     - Secure headers
     - End-to-end privacy

     ---

     **Built with ❤️ by Dezirae Stark** 🔒

     **Repository**: https://github.com/Dezirae-Stark/anonymous-tip-platform
     ```

4. Click "Publish release"

5. **GitHub Actions will automatically:**
   - Start building Android APK
   - Start building iOS IPA
   - Upload both when complete (~25 minutes)

**Option B: Via Command Line**

```bash
# Make sure you're in the repo directory
cd ~/anonymous-tip-platform

# Create and push tag
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin v1.0.0

# Create release
gh release create v1.0.0 \
  --title "v1.0.0 - Initial Release" \
  --notes-file <(cat <<'EOF'
🎉 First public release of Anonymous Tips Platform!

[Same description as above]
EOF
)
```

---

### Step 5: Monitor Build Progress (25 minutes)

1. **Go to Actions tab:**
   https://github.com/Dezirae-Stark/anonymous-tip-platform/actions

2. **Click on the running workflow:**
   - "Build and Release Apps"
   - You'll see real-time progress

3. **Build steps:**
   ```
   ⏳ Build Android APK (~15-20 min)
   ⏳ Build iOS IPA (~20-25 min)
   ⏳ Generate checksums (~1 min)
   ⏳ Upload to release (~2 min)
   ```

4. **When complete:**
   - Green checkmark appears
   - Files are attached to release
   - Users can download!

---

### Step 6: Verify Downloads (5 minutes)

1. **Go to your release:**
   https://github.com/Dezirae-Stark/anonymous-tip-platform/releases/tag/v1.0.0

2. **You should see:**
   ```
   📦 Assets:
   ├── AnonymousTips-v1.0.0.apk (~50 MB)
   ├── AnonymousTips-v1.0.0.ipa (~40 MB)
   ├── SHA256SUMS.txt
   ├── Source code (zip)
   └── Source code (tar.gz)
   ```

3. **Test download:**
   - Click the APK
   - Download should start
   - File should match checksum

---

## Quick Command Reference

```bash
# View workflow files locally
cat .github/workflows/build-release.yml
cat .github/workflows/build-manual.yml

# Check Expo login
npx eas-cli whoami

# Login to Expo
npx eas-cli login

# Create release (after workflows are uploaded)
gh release create v1.0.0 \
  --title "v1.0.0 - Initial Release" \
  --notes "First public release!"

# Monitor builds
gh run list
gh run watch

# View release
gh release view v1.0.0 --web
```

---

## Troubleshooting

### Workflows not showing in Actions tab?
- Make sure files are in `.github/workflows/` directory
- Check file extensions are `.yml`
- Refresh the page

### Build failed?
- Check `EXPO_TOKEN` secret is added
- Verify token hasn't expired
- Check build logs in Actions tab
- Ensure `eas.json` is configured

### APK/IPA not attaching to release?
- Wait full 25-30 minutes
- Check Actions tab for errors
- Verify workflow completed successfully

---

## What Happens Next

### Immediately After Release Creation
1. GitHub Actions triggers automatically
2. Two jobs start in parallel:
   - Android APK build
   - iOS IPA build

### During Build (~25 minutes)
3. EAS Build compiles the apps
4. Checksums are generated
5. Files are uploaded to GitHub

### After Build Completion
6. APK appears in release assets
7. IPA appears in release assets
8. SHA256SUMS.txt appears
9. Users can download!

---

## Timeline

```
T+0 min:  Create release
T+0 min:  GitHub Actions starts
T+1 min:  Dependencies installing
T+5 min:  Android build queued
T+5 min:  iOS build queued
T+20 min: Android APK ready
T+25 min: iOS IPA ready
T+26 min: Checksums generated
T+27 min: Files uploaded to release
T+27 min: ✅ Complete!
```

---

## After First Release

### For Subsequent Releases

1. **Update version in `mobile-app/app.json`:**
   ```json
   {
     "version": "1.1.0",
     "android": { "versionCode": 2 },
     "ios": { "buildNumber": "1.1.0" }
   }
   ```

2. **Commit changes:**
   ```bash
   git add .
   git commit -m "Bump version to 1.1.0"
   git push
   ```

3. **Create new release:**
   ```bash
   gh release create v1.1.0 \
     --title "v1.1.0 - Feature Update" \
     --notes "Added new features..."
   ```

4. **Builds happen automatically!**

---

## Sharing Your Release

Once the builds complete, share on social media:

```
🎉 Anonymous Tips v1.0.0 is now available!

📱 Download:
Android: https://github.com/Dezirae-Stark/anonymous-tip-platform/releases/tag/v1.0.0
iOS: https://github.com/Dezirae-Stark/anonymous-tip-platform/releases/tag/v1.0.0

✨ Features:
🔒 Complete privacy protection
💰 Bitcoin, Lightning, Monero
📱 Native Android & iOS apps
🌐 Web application
⚡ Token-based anonymous links

#Privacy #Bitcoin #OpenSource #ReactNative
```

---

## Support

- **Documentation**: See `GITHUB-ACTIONS-GUIDE.md`
- **Issues**: https://github.com/Dezirae-Stark/anonymous-tip-platform/issues
- **Actions**: https://github.com/Dezirae-Stark/anonymous-tip-platform/actions

---

## Checklist

Before creating release:
- [ ] Uploaded workflow files to GitHub
- [ ] Added `EXPO_TOKEN` to GitHub secrets
- [ ] Verified Expo login works
- [ ] Updated version in `app.json`

Creating release:
- [ ] Created release v1.0.0
- [ ] GitHub Actions triggered
- [ ] Monitoring build progress

After release:
- [ ] Waited ~25 minutes
- [ ] Downloaded APK/IPA
- [ ] Verified checksums
- [ ] Tested apps
- [ ] Announced release!

---

## ✅ You're Ready!

Follow these steps and in ~30 minutes you'll have:
- ✅ Public GitHub releases
- ✅ Downloadable Android APK
- ✅ Downloadable iOS IPA
- ✅ Automated builds for all future releases

**Let's go!** 🚀

---

**Built with ❤️ by Dezirae Stark** 🔒
