/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Riyansh Amrit — Production Express Server
 * Serves optimized Vite production build with SPA routing and compression.
 */

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const DIST_PATH = path.join(__dirname, 'dist');

// Security & Caching Headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  
  // Cache static assets aggressively
  if (req.url.match(/\.(js|css|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/)) {
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  } else {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  }
  next();
});

// JSON Body Parser for API mocks/webhooks
app.use(express.json());

// API Health Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'Riyansh Amrit Botanical Storefront',
    version: '1.0.0'
  });
});

// Mock Order Verification Endpoint
app.post('/api/orders/verify', (req, res) => {
  const { orderId, amount, paymentMethod } = req.body;
  res.json({
    success: true,
    orderId: orderId || `ORD-${Date.now()}`,
    status: 'CONFIRMED',
    timestamp: new Date().toISOString(),
    message: 'Payment verified and inventory allocated.'
  });
});

// Static Assets Serving
if (fs.existsSync(DIST_PATH)) {
  app.use(express.static(DIST_PATH));

  // SPA Fallback Route
  app.get('*', (req, res) => {
    res.sendFile(path.join(DIST_PATH, 'index.html'));
  });
} else {
  // Development Notice if build hasn't run yet
  app.get('*', (req, res) => {
    res.status(200).send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Riyansh Amrit — Server Ready</title>
          <style>
            body { font-family: sans-serif; background: #f2f2ef; color: #1a1c18; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
            .card { background: white; padding: 2rem 3rem; border-radius: 1rem; box-shadow: 0 10px 30px rgba(0,0,0,0.06); text-align: center; max-width: 500px; }
            h1 { font-family: serif; color: #2b3323; margin-bottom: 0.5rem; }
            code { background: #e8e8e1; padding: 0.2rem 0.5rem; border-radius: 4px; }
          </style>
        </head>
        <body>
          <div class="card">
            <h1>Riyansh Amrit Server</h1>
            <p>The production distribution folder (<code>dist/</code>) was not found.</p>
            <p>Please run <code>npm run build</code> first, or run <code>npm run dev</code> for live development mode.</p>
          </div>
        </body>
      </html>
    `);
  });
}

// Start Server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🌿 Riyansh Amrit production server listening on http://localhost:${PORT}`);
});
