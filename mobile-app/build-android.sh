#!/bin/bash

# Android APK Build Script for Anonymous Tips
# This script automates the process of building an Android APK

set -e  # Exit on error

echo "========================================"
echo "Anonymous Tips - Android APK Builder"
echo "========================================"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if EAS CLI is installed
if ! command -v eas &> /dev/null; then
    echo -e "${RED}Error: EAS CLI is not installed${NC}"
    echo "Install it with: npm install -g eas-cli"
    exit 1
fi

# Check if logged in
if ! eas whoami &> /dev/null; then
    echo -e "${YELLOW}Not logged in to Expo. Please login:${NC}"
    eas login
fi

echo -e "${GREEN}✓ EAS CLI is ready${NC}"
echo ""

# Build options
echo "Select build type:"
echo "1) Preview APK (for testing)"
echo "2) Production Bundle (for Play Store)"
echo ""
read -p "Enter choice (1 or 2): " choice

case $choice in
    1)
        echo -e "${YELLOW}Building preview APK...${NC}"
        eas build -p android --profile preview
        ;;
    2)
        echo -e "${YELLOW}Building production bundle...${NC}"
        eas build -p android --profile production
        ;;
    *)
        echo -e "${RED}Invalid choice${NC}"
        exit 1
        ;;
esac

echo ""
echo -e "${GREEN}======================================${NC}"
echo -e "${GREEN}Build started successfully!${NC}"
echo -e "${GREEN}======================================${NC}"
echo ""
echo "Check build status at: https://expo.dev/accounts/[your-account]/projects/anonymous-tips/builds"
echo ""
echo "The build will take approximately 10-20 minutes."
echo "You'll receive an email when it's done."
echo ""
