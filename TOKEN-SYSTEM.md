# Token-Based Anonymous Tipping System

## Overview

This platform now uses a **token-based system** that provides complete anonymity for both the tippee (you) and tippers (supporters).

## How It Works

### 1. Setup Process

1. Visit the setup page: `http://localhost:3000/`
2. Fill in your payment information:
   - Display name (pseudonym)
   - Payment methods (crypto, Venmo, CashApp, PayPal)
3. Click "Generate My Anonymous Tip Link"
4. Receive a unique token URL like: `http://localhost:3000/tip/abc123xyz`

### 2. Share Your Link

- Share the token URL on X (Twitter), Instagram, or anywhere
- The URL contains NO identifying information
- Your payment details are stored securely server-side

### 3. Complete Privacy

When someone visits your token URL:
- They see ONLY your display name and payment methods
- No personal information is exposed
- No tracking or analytics
- No connection to your real identity

## System Architecture

### File Structure

```
anonymous-tip-platform/
├── public/
│   ├── setup.html       # Setup page for creating tip pages
│   ├── tip.html         # Anonymous tip page template
│   └── index.html       # Legacy page (still works)
├── data/
│   └── *.json           # Token-based tip page data
├── config/
│   └── payment-config.json  # Legacy config (for backward compatibility)
└── server.js            # Node.js server with token API
```

### API Endpoints

#### Create Tip Page
```
POST /api/create-tip-page
Content-Type: application/json

{
  "displayName": "Anonymous Creator",
  "message": "Support my work",
  "paymentMethods": {
    "bitcoin": {
      "enabled": true,
      "address": "bc1..."
    },
    "cashapp": {
      "enabled": true,
      "username": "YourCashTag"
    }
  }
}

Response:
{
  "success": true,
  "token": "abc123xyz..."
}
```

#### Get Tip Page Data
```
GET /api/tip/{token}

Response:
{
  "success": true,
  "displayName": "Anonymous Creator",
  "message": "Support my work",
  "paymentMethods": { ... }
}
```

#### View Tip Page
```
GET /tip/{token}

Returns: HTML tip page with payment methods
```

## Token Security

- Tokens are generated using `crypto.randomBytes(16)` (128-bit)
- Each token is unique and unpredictable
- Tokens are stored as JSON files in the `./data/` directory
- No database required - simple file-based storage

## Example Usage

### Creating a Tip Page with API

```bash
curl -X POST http://localhost:3000/api/create-tip-page \
  -H "Content-Type: application/json" \
  -d '{
    "displayName": "Anonymous Dev",
    "message": "Support my open source work",
    "paymentMethods": {
      "bitcoin": {
        "enabled": true,
        "address": "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"
      },
      "monero": {
        "enabled": true,
        "address": "4AdUndX..."
      },
      "cashapp": {
        "enabled": true,
        "username": "MyCashTag"
      }
    }
  }'
```

Response:
```json
{
  "success": true,
  "token": "ae9f4227d8ce81f45ac7080f88659498"
}
```

### Shareable Link

After creating your tip page, share this link:
```
http://yourserver.com/tip/ae9f4227d8ce81f45ac7080f88659498
```

## Privacy Features

### What's Hidden
- ✅ Your real name
- ✅ Your email address
- ✅ Your personal information
- ✅ IP addresses
- ✅ Analytics/tracking data

### What's Shown
- ✅ Your chosen display name (pseudonym)
- ✅ Your payment methods
- ✅ Payment addresses/usernames only

## Payment Method Privacy Levels

### High Privacy 🟢
- **Monero (XMR)**: Untraceable transactions, maximum privacy
- **Bitcoin (BTC)**: Pseudonymous, use new addresses for each payment
- **Lightning Network**: Off-chain, enhanced privacy

### Low Privacy 🔴
- **Venmo**: Exposes real name and profile
- **CashApp**: Exposes username and profile
- **PayPal**: Links to name and email

## Deployment

### Local Testing
```bash
cd anonymous-tip-platform
node server.js
```
Visit: http://localhost:3000/

### Production Deployment

1. **Environment Variables**
   ```bash
   export PORT=3000
   ```

2. **Using PM2**
   ```bash
   pm2 start server.js --name "tip-platform"
   pm2 startup
   pm2 save
   ```

3. **Cloud Hosting**
   - Deploy to Vercel, Railway, Render, or your own VPS
   - Set environment variable `PORT` if needed
   - Ensure `./data/` directory is writable

## Token Management

### Backup Token Data
```bash
# Backup all tip pages
tar -czf tip-pages-backup.tar.gz anonymous-tip-platform/data/
```

### Delete a Tip Page
```bash
# Remove the token file
rm anonymous-tip-platform/data/{token}.json
```

### List All Active Tokens
```bash
ls anonymous-tip-platform/data/*.json
```

## Security Considerations

1. **HTTPS**: Always use HTTPS in production to protect data in transit
2. **Token Storage**: Keep `./data/` directory secure and backed up
3. **Access Control**: Consider adding authentication for the setup page
4. **Rate Limiting**: Implement rate limiting to prevent abuse
5. **Token Expiry**: Consider adding expiration dates for tokens

## Advantages Over Traditional Platforms

| Feature | Venmo/Cash App | This Platform |
|---------|----------------|---------------|
| Anonymous links | ❌ No | ✅ Yes |
| Token-based URLs | ❌ No | ✅ Yes |
| Privacy protection | ❌ No | ✅ Yes |
| Self-hosted | ❌ No | ✅ Yes |
| No personal info exposed | ❌ No | ✅ Yes |
| Multiple payment methods | ❌ Limited | ✅ Unlimited |

## Share on X (Twitter)

Example tweet:
```
Support my work anonymously! 🔒

No personal info, no tracking, complete privacy.

[Your token link]

Accept: Bitcoin, Monero, Cash App & more
```

---

**Built for privacy-conscious creators who value anonymity** 🔒
