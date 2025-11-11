#!/bin/bash

# Setup Script for Anonymous Tips Mobile App
# This script sets up the development environment

set -e  # Exit on error

echo "========================================"
echo "Anonymous Tips - Setup Script"
echo "========================================"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check Node.js
echo -e "${BLUE}Checking Node.js...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}Error: Node.js is not installed${NC}"
    echo "Install from: https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node -v)
echo -e "${GREEN}✓ Node.js ${NODE_VERSION} is installed${NC}"
echo ""

# Check npm
echo -e "${BLUE}Checking npm...${NC}"
if ! command -v npm &> /dev/null; then
    echo -e "${RED}Error: npm is not installed${NC}"
    exit 1
fi

NPM_VERSION=$(npm -v)
echo -e "${GREEN}✓ npm ${NPM_VERSION} is installed${NC}"
echo ""

# Install dependencies
echo -e "${BLUE}Installing project dependencies...${NC}"
npm install

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Dependencies installed successfully${NC}"
else
    echo -e "${RED}Error installing dependencies${NC}"
    exit 1
fi
echo ""

# Check for Expo CLI
echo -e "${BLUE}Checking Expo CLI...${NC}"
if ! command -v expo &> /dev/null; then
    echo -e "${YELLOW}Expo CLI not found. Installing globally...${NC}"
    npm install -g expo-cli
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ Expo CLI installed${NC}"
    else
        echo -e "${RED}Error installing Expo CLI${NC}"
        exit 1
    fi
else
    EXPO_VERSION=$(expo --version)
    echo -e "${GREEN}✓ Expo CLI ${EXPO_VERSION} is installed${NC}"
fi
echo ""

# Check for EAS CLI
echo -e "${BLUE}Checking EAS CLI (for building)...${NC}"
if ! command -v eas &> /dev/null; then
    echo -e "${YELLOW}EAS CLI not found. Installing globally...${NC}"
    npm install -g eas-cli
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ EAS CLI installed${NC}"
    else
        echo -e "${YELLOW}Warning: Could not install EAS CLI${NC}"
        echo "You can install it later with: npm install -g eas-cli"
    fi
else
    EAS_VERSION=$(eas --version)
    echo -e "${GREEN}✓ EAS CLI ${EAS_VERSION} is installed${NC}"
fi
echo ""

# Make build scripts executable
echo -e "${BLUE}Making build scripts executable...${NC}"
chmod +x build-android.sh build-ios.sh setup.sh
echo -e "${GREEN}✓ Build scripts are now executable${NC}"
echo ""

# Configuration check
echo -e "${BLUE}Checking configuration...${NC}"
if [ -f "utils/api.js" ]; then
    echo -e "${YELLOW}Don't forget to configure your backend URL in: utils/api.js${NC}"
else
    echo -e "${RED}Warning: utils/api.js not found${NC}"
fi
echo ""

# Success!
echo -e "${GREEN}======================================${NC}"
echo -e "${GREEN}Setup completed successfully! 🎉${NC}"
echo -e "${GREEN}======================================${NC}"
echo ""
echo "Next steps:"
echo ""
echo "1. Configure backend URL:"
echo "   Edit utils/api.js and set API_BASE_URL"
echo ""
echo "2. Start development server:"
echo "   npm start"
echo ""
echo "3. Run on Android:"
echo "   npm run android"
echo ""
echo "4. Run on iOS (macOS only):"
echo "   npm run ios"
echo ""
echo "5. Build APK:"
echo "   ./build-android.sh"
echo ""
echo "6. Build iOS app:"
echo "   ./build-ios.sh"
echo ""
echo "For more information, see README.md and BUILD-GUIDE.md"
echo ""
