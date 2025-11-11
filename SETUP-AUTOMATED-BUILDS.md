# 🤖 Setup Automated Builds - Quick Start

## ✅ What's Been Created

Your repository now has **complete GitHub Actions workflows** for automated app building!

**Files Added:**
- `.github/workflows/build-release.yml` - Automatic builds on release
- `.github/workflows/build-manual.yml` - Manual build trigger
- `GITHUB-ACTIONS-GUIDE.md` - Complete documentation
- `create-release.sh` - Easy release creation script

---

## ⚡ Quick Setup (3 Steps)

### Step 1: Push Workflow Files to GitHub

The workflow files are committed but need the `workflow` scope to push. Run:

```bash
# Update GitHub CLI token with workflow permission
gh auth refresh -h github.com -s workflow

# Follow the prompts in your browser
# Then push:
git push origin main
```

**Alternative:** If the above doesn't work, you can manually upload the workflow files via GitHub web UI:
1. Go to your repo → Add file → Upload files
2. Upload `.github/workflows/build-release.yml`
3. Upload `.github/workflows/build-manual.yml`

### Step 2: Add Expo Token to GitHub Secrets

1. **Get your Expo token:**
   ```bash
   # If not logged in
   eas login

   # Create access token at:
   # https://expo.dev/accounts/[your-account]/settings/access-tokens
   ```

2. **Add to GitHub secrets:**
   - Go to: https://github.com/Dezirae-Stark/anonymous-tip-platform/settings/secrets/actions
   - Click "New repository secret"
   - Name: `EXPO_TOKEN`
   - Value: [paste your Expo token]
   - Click "Add secret"

### Step 3: Create Your First Release

```bash
# Use the helper script
./create-release.sh

# Or manually:
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin v1.0.0
gh release create v1.0.0 --title "v1.0.0 - Initial Release"
```

**That's it!** GitHub Actions will automatically:
- Build Android APK (~15-20 min)
- Build iOS IPA (~20-25 min)
- Generate SHA256 checksums
- Attach all files to your release

---

## 🎯 How It Works

### When You Create a Release

1. You create a release (e.g., `v1.0.0`)
2. GitHub Actions automatically triggers
3. Builds Android APK and iOS IPA in parallel
4. Uploads both to the release page
5. Users can download directly!

### Release Page Will Show

```
Assets:
📦 AnonymousTips-v1.0.0.apk (50 MB)
📦 AnonymousTips-v1.0.0.ipa (40 MB)
📄 SHA256SUMS.txt
📄 Source code (zip)
📄 Source code (tar.gz)
```

---

## 📱 Users Can Now Download

### Android Users
1. Go to your releases page
2. Download the `.apk` file
3. Install on their device
4. Start using the app!

### iOS Users
1. Download the `.ipa` file
2. Use for TestFlight distribution
3. Or submit to App Store

---

## 🔍 Monitor Builds

**View build progress:**
1. Go to: https://github.com/Dezirae-Stark/anonymous-tip-platform/actions
2. Click on the running workflow
3. Watch real-time logs

**Build times:**
- Android APK: ~15-20 minutes
- iOS IPA: ~20-25 minutes
- Total: ~25-30 minutes (parallel)

---

## 🎓 Full Documentation

See `GITHUB-ACTIONS-GUIDE.md` for:
- Detailed setup instructions
- Troubleshooting guide
- Advanced configuration
- Security best practices
- Update procedures

---

## 💡 Quick Tips

### Create Release via Web UI
1. Go to your repo
2. Click "Releases" → "Create a new release"
3. Fill in tag (e.g., `v1.0.0`) and details
4. Click "Publish release"
5. ✅ Builds start automatically!

### Create Release via CLI
```bash
./create-release.sh
# Interactive prompts guide you through
```

### Manual Build (No Release)
1. Go to Actions tab
2. Click "Build Apps (Manual)"
3. Click "Run workflow"
4. Select platform
5. Click "Run workflow"

---

## 🐛 Troubleshooting

### Can't Push Workflows?

**Error:** "refusing to allow an OAuth App to create or update workflow"

**Solution:**
```bash
gh auth refresh -h github.com -s workflow
# Follow browser prompts
git push origin main
```

Or upload manually via GitHub web UI.

### Build Fails?

**Check:**
1. `EXPO_TOKEN` is added to GitHub secrets
2. Token has not expired
3. Build logs in Actions tab
4. `eas.json` is configured correctly

---

## ✅ Checklist

Before creating first release:

- [ ] Push workflow files to GitHub
- [ ] Add `EXPO_TOKEN` to GitHub secrets
- [ ] Update version in `mobile-app/app.json`
- [ ] Test locally first
- [ ] Write release notes
- [ ] Create release

After first release:

- [ ] Monitor build progress in Actions tab
- [ ] Wait ~25 minutes for completion
- [ ] Download and test APK/IPA
- [ ] Announce your release!

---

## 🎉 Benefits

**For You:**
- ✅ No manual building needed
- ✅ Consistent, reproducible builds
- ✅ Automatic distribution
- ✅ Version control

**For Users:**
- ✅ Easy downloads from GitHub
- ✅ Verified checksums
- ✅ Always latest version
- ✅ No app store required (Android)

---

## 📞 Need Help?

1. Read `GITHUB-ACTIONS-GUIDE.md` (detailed docs)
2. Check Actions logs for errors
3. Verify Expo token is valid
4. Open an issue on GitHub

---

**Next Step:** Push the workflow files and add your Expo token! Then create your first release! 🚀

**Built with ❤️ by Dezirae Stark** 🔒
