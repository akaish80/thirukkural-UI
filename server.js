/* eslint-disable import/order */
// Register ts-node to handle TypeScript imports
require('ts-node').register({
  transpileOnly: true,
  compilerOptions: {
    module: 'commonjs',
  },
});

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
// const compression = require("compression");

// const enforce = require('express-sslify');

// if (process.env.NODE_ENV !== 'production') require('dotenv').config();

// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();

// Use a single port configuration
const PORT = process.env.PORT || 5001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// console.log(`Arun -> ${process.env.NODE_ENV}`);

// Mount chatbot service API routes so the chat API runs on the same origin
try {
  const buildService = require('./src/services/chatbotService')();

  app.get('/health', (req, res) => res.json({ ok: true, kurrals: buildService.kurrals.length }));

  app.get('/kurral/:id', (req, res) => {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: 'invalid id' });
    const k = buildService.getKurralById(id);
    if (!k) return res.status(404).json({ error: 'not found' });
    res.json(k);
  });

  app.get('/adikaram/:num', (req, res) => {
    const n = Number(req.params.num);
    if (isNaN(n)) return res.status(400).json({ error: 'invalid number' });
    const a = buildService.getAdikaramInfo(n);
    if (!a) return res.status(404).json({ error: 'not found' });
    const kurrals = buildService.kurrals.filter((k) => Number(k.adikaram_number) === n);
    res.json({ adikaram: a, kurrals });
  });

  app.post('/chat', (req, res) => {
    const { query, topN } = req.body || {};
    if (!query || typeof query !== 'string')
      return res.status(400).json({ error: 'query (string) required' });
    const result = buildService.search(query, topN || 10);
    // append a small server-side log for auditing (timestamp, ip, query, result count)
    try {
      const logLine = JSON.stringify({
        ts: Date.now(),
        ip: req.ip || req.connection?.remoteAddress,
        query,
        topN: topN || 10,
        resultCount:
          result && result.results && result.results.length
            ? result.results.length
            : Array.isArray(result)
              ? result.length
              : result && result.kurral
                ? 1
                : 0,
      });
      const logPath = path.join(__dirname, 'chat_queries.log');
      fs.appendFile(logPath, `${logLine}\n`, (err) => {
        if (err) console.warn('Failed to append chat log:', err.message);
      });
    } catch (e) {
      // ignore logging errors
    }
    res.json({ query, result });
  });
} catch (e) {
  console.warn('chatbotService not available:', e.message);
}

// Serve static build in production from the project's build/ folder
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'build')));

  // serve service worker if present
  app.get('/service-worker.js', (req, res) => {
    const swPath = path.join(__dirname, 'build', 'service-worker.js');
    if (fs.existsSync(swPath)) return res.sendFile(swPath);
    return res.status(404).end();
  });

  // all other routes serve the React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
} else {
  // in dev, a root endpoint is useful
  app.get('/', (req, res) => res.send('App is running'));
}

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`server running on port ${PORT} (env=${process.env.NODE_ENV})`);
});

// app.post('/Commone', (req, res) => {
//   const body = {
//     source: req.body.token.id,
//     amount: req.body.amount,
//     currency: 'usd',
//   };

//   stripe.charges.create(body, (stripeErr, stripeRes) => {
//     if (stripeErr) {
//       res.status(500).send({ error: stripeErr });
//     } else {
//       res.status(200).send({ success: stripeRes });
//     }
//   });
// });
