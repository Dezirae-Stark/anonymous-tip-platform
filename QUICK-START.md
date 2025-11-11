# Quick Start Guide

## Your Anonymous Tipping Platform is Running! 🎉

Your privacy-first tipping platform is now live at:
- **http://localhost:3000** (for local testing)

## What You Need to Do Now

### Step 1: Get Cryptocurrency Wallets

You need wallets to receive anonymous payments. Here's where to start:

#### Option A: Monero (BEST PRIVACY) 🏆
1. Download: https://www.getmonero.org/downloads/
2. Install the Monero GUI wallet
3. Create a new wallet (write down your seed phrase!)
4. Copy your primary address (starts with "4...")

#### Option B: Bitcoin (Good Privacy)
1. Download Electrum: https://electrum.org/
2. Create a new wallet
3. Go to "Receive" tab
4. Copy a receiving address (starts with "bc1..." or "3...")

#### Option C: Lightning Network (Fast & Private)
1. Download Phoenix Wallet (mobile) or Breez
2. Get your Lightning address or LNURL
3. Copy for use

### Step 2: Update Your Configuration

Edit the config file with your addresses:

```bash
# Edit the config file
nano config/payment-config.json
```

Replace the example addresses with YOUR addresses:

```json
{
  "displayName": "Your Name or Pseudonym",
  "message": "Support my work - 100% anonymous",
  "paymentMethods": {
    "bitcoin": {
      "enabled": true,
      "address": "YOUR_BITCOIN_ADDRESS_HERE"
    },
    "lightning": {
      "enabled": true,
      "address": "YOUR_LIGHTNING_ADDRESS_HERE"
    },
    "monero": {
      "enabled": true,
      "address": "YOUR_MONERO_ADDRESS_HERE"
    }
  }
}
```

**Important:**
- Set `"enabled": false` for any payment method you don't want to use
- The example addresses in the config are NOT yours - replace them!

### Step 3: Restart the Server

After editing the config:

```bash
# Stop the server (if running)
# Press Ctrl+C in the terminal running the server

# Start it again
cd anonymous-tip-platform
node server.js
```

### Step 4: Test Your Page

Open in your browser:
- http://localhost:3000

You should see:
- Your display name
- Your message
- Payment options with QR codes
- Your cryptocurrency addresses

### Step 5: Deploy Online (Optional)

To share with the world, you need to deploy it online.

#### Option A: Vercel (Easiest, Free)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
cd anonymous-tip-platform
vercel
```

3. Follow the prompts and you'll get a URL like: `https://your-app.vercel.app`

#### Option B: Your Own Server

If you have a VPS or server:
```bash
# Install Node.js on your server
# Copy the files
# Run with PM2 or as a service
npm install -g pm2
pm2 start server.js
pm2 startup
pm2 save
```

### Step 6: Share on Twitter/X

Instead of enabling Venmo/Cash App (which exposes your info), share your link:

```
💰 Support my work anonymously!

🔒 100% private - no personal info revealed
🚫 No tracking, no data collection

[Your link here]
```

## Troubleshooting

### "Cannot connect to server"
- Make sure the server is running: `node server.js`
- Check if port 3000 is available

### "Payment addresses not showing"
- Check that you edited `config/payment-config.json`
- Make sure `"enabled": true` for methods you want to show
- Restart the server after changing config

### "How do I stop the server?"
- Press `Ctrl+C` in the terminal running the server

### "How do I run it in the background?"
```bash
# Using nohup
nohup node server.js > server.log 2>&1 &

# Or install PM2
npm install -g pm2
pm2 start server.js --name "tip-platform"
```

## Security Reminders

✅ **Never share your seed phrases or private keys**
✅ **Back up your wallet files**
✅ **Test with small amounts first**
✅ **Use new Bitcoin addresses for each payment**
✅ **Monero is most private by default**
✅ **Don't reuse addresses unnecessarily**

## Privacy Benefits Over Venmo/Cash App

When someone tips you via this platform:

| What They See | Venmo/Cash App | Your Platform |
|---------------|----------------|---------------|
| Your real name | ✅ Yes | ❌ No |
| Your username | ✅ Yes | ❌ No |
| Your photo | ✅ Yes | ❌ No |
| Transaction history | ✅ Yes | ❌ No |
| Your friends list | ✅ Yes | ❌ No |
| Your location | ✅ Sometimes | ❌ Never |

## Next Steps

1. ✅ Get wallets (Monero recommended)
2. ✅ Add your addresses to config
3. ✅ Test locally
4. ✅ Deploy online
5. ✅ Share your link
6. ✅ Receive anonymous tips!

## Need Help?

- Check `README.md` for detailed documentation
- Make sure your wallet addresses are correct
- Test with small amounts first
- Consider using Tor for extra privacy

---

**You now have a privacy-first alternative to Venmo and Cash App!** 🎉🔒
