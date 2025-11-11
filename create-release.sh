#!/bin/bash

# Create Release Script for Anonymous Tips Platform
# This script helps create a new release with proper versioning

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}Anonymous Tips - Create Release${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Check if gh is installed
if ! command -v gh &> /dev/null; then
    echo -e "${RED}Error: GitHub CLI (gh) is not installed${NC}"
    echo "Install with: pkg install gh"
    exit 1
fi

# Check if logged in
if ! gh auth status &> /dev/null; then
    echo -e "${YELLOW}Not logged in to GitHub. Please login:${NC}"
    gh auth login
fi

echo -e "${GREEN}✓ GitHub CLI is ready${NC}"
echo ""

# Get current version from app.json
CURRENT_VERSION=$(grep -o '"version": "[^"]*"' mobile-app/app.json | cut -d'"' -f4)
echo -e "Current version in app.json: ${YELLOW}${CURRENT_VERSION}${NC}"
echo ""

# Ask for new version
read -p "Enter new version number (e.g., 1.0.0): v" NEW_VERSION

if [[ ! $NEW_VERSION =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
    echo -e "${RED}Error: Invalid version format. Use X.Y.Z (e.g., 1.0.0)${NC}"
    exit 1
fi

TAG="v${NEW_VERSION}"

# Check if tag already exists
if git rev-parse "$TAG" >/dev/null 2>&1; then
    echo -e "${RED}Error: Tag ${TAG} already exists${NC}"
    exit 1
fi

echo ""
echo -e "${BLUE}Creating release ${TAG}${NC}"
echo ""

# Get release title
read -p "Release title (default: ${TAG} - Release): " RELEASE_TITLE
RELEASE_TITLE=${RELEASE_TITLE:-"${TAG} - Release"}

# Get release notes
echo ""
echo "Enter release notes (press Ctrl+D when done):"
echo "(You can also skip and edit later on GitHub)"
echo ""
RELEASE_NOTES=$(cat)

if [ -z "$RELEASE_NOTES" ]; then
    RELEASE_NOTES="Release ${TAG}

## Downloads

- **Android APK**: See assets below
- **iOS IPA**: See assets below
- **Checksums**: See SHA256SUMS.txt

GitHub Actions will automatically build and attach the APK and IPA files to this release in approximately 20-30 minutes.

## What's New

- Initial release
- Complete anonymous tipping platform
- Web + Android + iOS apps
- Bitcoin, Lightning, Monero support
- Complete privacy protection

## Installation

### Android
1. Download the APK file below
2. Enable 'Install from Unknown Sources' in Android settings
3. Install the APK
4. Open the app and create your tip page!

### iOS
1. Download the IPA file below
2. Use for TestFlight or App Store submission
3. Or sideload with tools like AltStore

---

**Built with ❤️ by Dezirae Stark** 🔒"
fi

echo ""
echo -e "${YELLOW}Summary:${NC}"
echo "Tag: $TAG"
echo "Title: $RELEASE_TITLE"
echo ""
echo -e "${YELLOW}Release Notes:${NC}"
echo "$RELEASE_NOTES"
echo ""

read -p "Create this release? (y/n): " CONFIRM

if [[ ! $CONFIRM =~ ^[Yy]$ ]]; then
    echo -e "${RED}Release cancelled${NC}"
    exit 0
fi

# Create and push tag
echo ""
echo -e "${BLUE}Creating tag ${TAG}...${NC}"
git tag -a "$TAG" -m "Release $TAG"

echo -e "${BLUE}Pushing tag to GitHub...${NC}"
git push origin "$TAG"

# Create GitHub release
echo -e "${BLUE}Creating GitHub release...${NC}"
gh release create "$TAG" \
    --title "$RELEASE_TITLE" \
    --notes "$RELEASE_NOTES"

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}✅ Release created successfully!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "${BLUE}📱 GitHub Actions is now building:${NC}"
echo "   - Android APK (~15-20 minutes)"
echo "   - iOS IPA (~20-25 minutes)"
echo ""
echo -e "${BLUE}🔗 View release:${NC}"
echo "   https://github.com/Dezirae-Stark/anonymous-tip-platform/releases/tag/$TAG"
echo ""
echo -e "${BLUE}📊 Monitor builds:${NC}"
echo "   https://github.com/Dezirae-Stark/anonymous-tip-platform/actions"
echo ""
echo -e "${YELLOW}⏳ The APK and IPA will be automatically attached to the release${NC}"
echo -e "${YELLOW}   when the builds complete (check back in ~25 minutes)${NC}"
echo ""
echo -e "${GREEN}🎉 Done! Your release is live!${NC}"
echo ""
