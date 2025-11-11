const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const crypto = require('crypto');

const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';
const DATA_DIR = path.join(__dirname, 'data');

// MIME types for different file extensions
const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.svg': 'image/svg+xml',
};

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Generate a random token
function generateToken() {
    return crypto.randomBytes(16).toString('hex');
}

// Save tip page data
function saveTipPage(token, data) {
    const filePath = path.join(DATA_DIR, `${token}.json`);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// Load tip page data
function loadTipPage(token) {
    const filePath = path.join(DATA_DIR, `${token}.json`);
    if (!fs.existsSync(filePath)) {
        return null;
    }
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
}

// Parse JSON body from request
function parseJsonBody(req) {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try {
                resolve(JSON.parse(body));
            } catch (error) {
                reject(error);
            }
        });
        req.on('error', reject);
    });
}

const server = http.createServer(async (req, res) => {
    // Parse URL
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const method = req.method;

    // Add security headers for privacy
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'no-referrer');
    res.setHeader('Permissions-Policy', 'interest-cohort=()'); // Disable FLoC

    // API: Create tip page
    if (pathname === '/api/create-tip-page' && method === 'POST') {
        try {
            const data = await parseJsonBody(req);

            // Validate data
            if (!data.displayName || !data.paymentMethods || Object.keys(data.paymentMethods).length === 0) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, error: 'Invalid data' }));
                return;
            }

            // Generate token
            const token = generateToken();

            // Save tip page
            saveTipPage(token, {
                displayName: data.displayName,
                message: data.message,
                paymentMethods: data.paymentMethods,
                createdAt: new Date().toISOString()
            });

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true, token }));
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, error: error.message }));
        }
        return;
    }

    // API: Get tip page data
    if (pathname.startsWith('/api/tip/') && method === 'GET') {
        const token = pathname.split('/api/tip/')[1];

        if (!token) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, error: 'Token required' }));
            return;
        }

        const tipData = loadTipPage(token);

        if (!tipData) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, error: 'Tip page not found' }));
            return;
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            success: true,
            displayName: tipData.displayName,
            message: tipData.message,
            paymentMethods: tipData.paymentMethods
        }));
        return;
    }

    // Route: /tip/TOKEN - serve tip page
    if (pathname.startsWith('/tip/')) {
        const filePath = path.join(__dirname, 'public', 'tip.html');
        const content = fs.readFileSync(filePath, 'utf8');
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content, 'utf-8');
        return;
    }

    // Legacy config endpoint (for backward compatibility)
    if (pathname === '/config') {
        const configPath = path.join(__dirname, 'config', 'payment-config.json');
        fs.readFile(configPath, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Failed to load configuration' }));
                return;
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(data);
        });
        return;
    }

    // Serve static files from public directory
    let filePath = pathname === '/' ? '/setup.html' : pathname;
    filePath = path.join(__dirname, 'public', filePath);

    // Get file extension
    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = mimeTypes[extname] || 'application/octet-stream';

    // Read and serve file
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 - Page Not Found</h1>', 'utf-8');
            } else {
                res.writeHead(500);
                res.end('Server Error: ' + err.code);
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, HOST, () => {
    console.log('\n==============================================');
    console.log('🔒 Anonymous Tipping Platform - Token Based');
    console.log('==============================================\n');
    console.log(`✅ Server running at http://${HOST}:${PORT}/`);
    console.log(`✅ Local access: http://localhost:${PORT}/\n`);
    console.log('🎯 Getting Started:');
    console.log(`   1. Visit: http://localhost:${PORT}/`);
    console.log('   2. Enter your payment details');
    console.log('   3. Get your anonymous shareable link\n');
    console.log('🛡️  Privacy features enabled:');
    console.log('   - Anonymous token-based links');
    console.log('   - No tracking or analytics');
    console.log('   - No IP logging');
    console.log('   - Secure headers enabled\n');
    console.log('📂 Tip pages stored in: ./data/\n');
    console.log('Press Ctrl+C to stop the server');
    console.log('==============================================\n');
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
    console.log('\n👋 Shutting down gracefully...');
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});

process.on('SIGINT', () => {
    console.log('\n👋 Shutting down gracefully...');
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});
